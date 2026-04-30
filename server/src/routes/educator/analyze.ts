// =============================================================================
// POST /api/educator/analyze-submission
//
// One Gemini call. EDUCATOR_SYSTEM_PROMPT enforces cautious language at the
// model level — no percentages, no accusations, no certainty claims.
//
// The disclaimer field is hardcoded server-side and never comes from Gemini.
// It appears in every response regardless of content.
//
// attentionLevel is determined by Gemini based on the full picture (metrics +
// style comparison + citation audit + assignment alignment). Values:
//   routine         — nothing unusual
//   some_signals    — one or two things worth discussing
//   several_signals — multiple patterns that warrant a conversation
// =============================================================================

import { Router, Request, Response } from 'express';
import { supabaseAdmin } from '../../config/supabase';
import { calculateWritingMetrics } from '../../services/metrics';
import { auditCitations } from '../../services/citations';
import { analyzeWithLLM, EDUCATOR_SYSTEM_PROMPT } from '../../services/llm';

const router = Router();

const DISCLAIMER =
  'This report surfaces patterns for discussion. It does not determine whether a student ' +
  'used AI or violated academic integrity policy. No automated tool can make that determination. ' +
  'Use this report to ask better questions, not to reach conclusions.';

// ---------------------------------------------------------------------------
// Response schema — field names intentionally signal-not-verdict framing
// ---------------------------------------------------------------------------

const EDUCATOR_SCHEMA = {
  type: 'object',
  properties: {
    attentionLevel: {
      type: 'string',
      enum: ['routine', 'some_signals', 'several_signals'],
    },
    summary: { type: 'string' },
    promptAlignment: {
      type: 'array',
      items: { type: 'string' },
    },
    writingConsistency: {
      type: 'array',
      items: { type: 'string' },
    },
    possibleSignals: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          observation: { type: 'string' },
          alternativeExplanations: {
            type: 'array',
            items: { type: 'string' },
          },
        },
        required: ['observation', 'alternativeExplanations'],
      },
    },
    followUpQuestions: {
      type: 'array',
      items: { type: 'string' },
    },
    recommendedNextSteps: {
      type: 'array',
      items: { type: 'string' },
    },
  },
  required: [
    'attentionLevel',
    'summary',
    'promptAlignment',
    'writingConsistency',
    'possibleSignals',
    'followUpQuestions',
    'recommendedNextSteps',
  ],
};

// ---------------------------------------------------------------------------
// Prompt builder
// ---------------------------------------------------------------------------

function buildEducatorPrompt(params: {
  assignmentPrompt: string;
  submissionText: string;
  previousSample?: string;
  aiPolicy: string;
  rubric?: string;
  metricsContext: string;
  citationContext: string;
}): string {
  const sections: string[] = [];

  sections.push(`COURSE AI POLICY: ${params.aiPolicy}`);

  if (params.rubric) {
    sections.push(`RUBRIC / GRADING CRITERIA:\n${params.rubric}`);
  }

  sections.push(`ASSIGNMENT PROMPT:\n${params.assignmentPrompt}`);

  sections.push(`STUDENT SUBMISSION:\n${params.submissionText}`);

  if (params.previousSample?.trim()) {
    sections.push(`PREVIOUS WRITING SAMPLE (for style comparison):\n${params.previousSample}`);
  } else {
    sections.push(
      'PREVIOUS WRITING SAMPLE: Not provided. ' +
      'Style comparison is limited — note this in writingConsistency.'
    );
  }

  sections.push(`WRITING METRICS:\n${params.metricsContext}`);
  sections.push(`CITATION AUDIT:\n${params.citationContext}`);

  sections.push(
    'INSTRUCTIONS:\n' +
    'Generate a structured review following your language constraints exactly.\n' +
    'For attentionLevel: choose based on the totality of signals — not any single metric.\n' +
    'For possibleSignals: each entry must include at least 2 alternativeExplanations.\n' +
    'For followUpQuestions: write 5–7 questions that reference specific content in the submission ' +
    '(mention actual arguments, examples, or paragraphs — not generic questions).\n' +
    'For recommendedNextSteps: frame as educator actions, not conclusions about the student.'
  );

  return sections.join('\n\n');
}

function buildMetricsContext(
  metrics: ReturnType<typeof calculateWritingMetrics>,
  hasPrevious: boolean
): string {
  const c = metrics.current.metrics;
  const cs = metrics.current.signals;
  const lines = [
    `Submission — Words: ${c.wordCount} | Sentences: ${c.sentenceCount} | Paragraphs: ${c.paragraphCount}`,
    `Avg sentence length: ${c.averageSentenceLength} words | Sentence length variance: ${cs.sentenceLengthVariance}`,
    `Lexical diversity: ${c.lexicalDiversity} | Avg word length: ${c.averageWordLength}`,
    `Em-dash density: ${cs.emDashDensity}/100w | AI-tell word density: ${cs.aiTellWordDensity}/100w`,
    `Hedge words: ${cs.hedgeWordDensity}/100w | Generic transitions: ${cs.genericTransitionDensity}/100w`,
    `Passive voice: ${cs.passiveVoiceDensity}/100w | Repetitive openers: ${cs.repetitiveSentenceOpeners}%`,
  ];

  if (hasPrevious && metrics.previous.metrics.wordCount > 0) {
    const cmp = metrics.comparison;
    lines.push(
      `\nComparison to previous sample:`,
      `Avg sentence length change: ${cmp.averageSentenceLengthChange > 0 ? '+' : ''}${cmp.averageSentenceLengthChange} words`,
      `Lexical diversity change: ${cmp.lexicalDiversityChange > 0 ? '+' : ''}${cmp.lexicalDiversityChange}`,
      `Sentence length variance change: ${cmp.sentenceLengthVarianceChange > 0 ? '+' : ''}${cmp.sentenceLengthVarianceChange}`,
      `AI-tell word density change: ${cmp.aiTellWordDensityChange > 0 ? '+' : ''}${cmp.aiTellWordDensityChange}/100w`
    );
  }

  return lines.join('\n');
}

function buildCitationContext(
  citations: Awaited<ReturnType<typeof auditCitations>>
): string {
  if (citations.findings.length === 0) return 'No DOIs or ISBNs detected.';
  const lines = [
    `DOIs: ${citations.doiCount} | ISBNs: ${citations.isbnCount} | Verified: ${citations.verifiedCount} | Not found: ${citations.unverifiedCount}`,
  ];
  for (const f of citations.findings) {
    if (!f.verified) {
      lines.push(`Unverified ${f.type.toUpperCase()}: ${f.normalized} — ${f.error === 'not_found' ? 'not found in database' : 'API error'}`);
    }
  }
  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// Gemini response type
// ---------------------------------------------------------------------------

interface EducatorAnalysisResult {
  attentionLevel: 'routine' | 'some_signals' | 'several_signals';
  summary: string;
  promptAlignment: string[];
  writingConsistency: string[];
  possibleSignals: { observation: string; alternativeExplanations: string[] }[];
  followUpQuestions: string[];
  recommendedNextSteps: string[];
}

// ---------------------------------------------------------------------------
// Route
// ---------------------------------------------------------------------------

router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      assignmentPrompt,
      submissionText,
      previousSample,
      aiPolicy,
      rubric,
    } = req.body;

    if (!assignmentPrompt || !submissionText || !aiPolicy) {
      res.status(400).json({
        error: 'assignmentPrompt, submissionText, and aiPolicy are required.',
      });
      return;
    }

    const hasPrevious = typeof previousSample === 'string' && previousSample.trim().length > 0;

    const [metrics, citations] = await Promise.all([
      Promise.resolve(calculateWritingMetrics(submissionText, hasPrevious ? previousSample : undefined)),
      auditCitations(submissionText),
    ]);

    const metricsContext = buildMetricsContext(metrics, hasPrevious);
    const citationContext = buildCitationContext(citations);

    const geminiResult = await analyzeWithLLM<EducatorAnalysisResult>({
      systemPrompt: EDUCATOR_SYSTEM_PROMPT,
      userPrompt: buildEducatorPrompt({
        assignmentPrompt,
        submissionText,
        previousSample: hasPrevious ? previousSample : undefined,
        aiPolicy,
        rubric,
        metricsContext,
        citationContext,
      }),
      schema: EDUCATOR_SCHEMA,
    });

    const report = {
      disclaimer: DISCLAIMER,
      attentionLevel: geminiResult.attentionLevel,
      summary: geminiResult.summary,
      metrics,
      citations,
      promptAlignment: geminiResult.promptAlignment,
      writingConsistency: geminiResult.writingConsistency,
      possibleSignals: geminiResult.possibleSignals,
      followUpQuestions: geminiResult.followUpQuestions,
      recommendedNextSteps: geminiResult.recommendedNextSteps,
      aiPolicy,
      analyzedAt: new Date().toISOString(),
    };

  const userId = req.user?.id ?? null;

  if (userId) {
    await Promise.all([
      supabaseAdmin.from('educator_reviews').insert({
        user_id: userId,
        assignment_prompt: assignmentPrompt,
        submission_text: submissionText,
        previous_sample: hasPrevious ? previousSample : null,
        ai_policy: aiPolicy,
        rubric: rubric ?? null,
        report,
        attention_level: geminiResult.attentionLevel,
      }),
      supabaseAdmin.from('usage_tracking').insert({
        user_id: userId,
        analysis_type: 'educator',
      }),
    ]);
  }

    res.json({ report });
  } catch (err) {
    console.error('Educator analyze error:', err);
    res.status(500).json({ error: 'Analysis failed.' });
  }
});

export default router;
