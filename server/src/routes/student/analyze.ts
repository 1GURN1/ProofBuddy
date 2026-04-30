// =============================================================================
// POST /api/student/analyze
//
// Two modes:
//   Full document mode — documentId provided in body. Analysis is persisted,
//     linked to the document, and Process Log is attached.
//   Quick Analyze mode — no documentId. Analysis returned ephemerally.
//     Nothing saved.
//
// Two Gemini calls:
//   Call 1 (mechanical): grammar, style, clarity — sentence-level findings array
//   Call 2 (holistic):   paragraph structure, thesis alignment, AI risk narrative
//
// JS metrics and citation audit run before the Gemini calls and are passed
// as context into both prompts.
// =============================================================================

import { Router, Request, Response } from 'express';
import { supabaseAdmin } from '../../config/supabase';
import { analyzeText, calculateWritingMetrics } from '../../services/metrics';
import { auditCitations } from '../../services/citations';
import { analyzeWithLLM, STUDENT_SYSTEM_PROMPT } from '../../services/llm';

const router = Router();

// ---------------------------------------------------------------------------
// Response schemas for Gemini (enforced JSON via responseSchema)
// ---------------------------------------------------------------------------

const MECHANICAL_SCHEMA = {
  type: 'object',
  properties: {
    issues: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          category: { type: 'string', enum: ['grammar', 'style', 'clarity', 'mechanics'] },
          severity:  { type: 'string', enum: ['low', 'medium', 'high'] },
          excerpt:   { type: 'string' },
          suggestion: { type: 'string' },
          explanation: { type: 'string' },
        },
        required: ['category', 'severity', 'excerpt', 'suggestion', 'explanation'],
      },
    },
  },
  required: ['issues'],
};

const HOLISTIC_SCHEMA = {
  type: 'object',
  properties: {
    thesisStatement: { type: 'string' },
    thesisAlignment: { type: 'string', enum: ['strong', 'partial', 'weak', 'unclear'] },
    thesisAlignmentNote: { type: 'string' },
    paragraphAnalysis: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          index:   { type: 'number' },
          purpose: { type: 'string', enum: ['introduction', 'body', 'counter', 'conclusion', 'unclear'] },
          note:    { type: 'string' },
        },
        required: ['index', 'purpose', 'note'],
      },
    },
    structureSummary: { type: 'string' },
    aiRiskNarrative: { type: 'string' },
    aiRiskSignals: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          signal:      { type: 'string' },
          observation: { type: 'string' },
          advice:      { type: 'string' },
        },
        required: ['signal', 'observation', 'advice'],
      },
    },
    suggestedRewrites: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          original:  { type: 'string' },
          suggested: { type: 'string' },
          reason:    { type: 'string' },
        },
        required: ['original', 'suggested', 'reason'],
      },
    },
  },
  required: [
    'thesisStatement', 'thesisAlignment', 'thesisAlignmentNote',
    'paragraphAnalysis', 'structureSummary',
    'aiRiskNarrative', 'aiRiskSignals', 'suggestedRewrites',
  ],
};

// ---------------------------------------------------------------------------
// Prompt builders
// ---------------------------------------------------------------------------

function buildMechanicalPrompt(essay: string, metricsContext: string): string {
  return `
Analyze the following student essay for grammar, style, clarity, and mechanics.
Return specific, actionable issues only — do not invent problems that aren't there.
Limit to the 10 most impactful issues. Focus on genuine improvement, not nitpicking.

WRITING METRICS CONTEXT (for reference):
${metricsContext}

ESSAY:
${essay}
`.trim();
}

function buildHolisticPrompt(
  essay: string,
  metricsContext: string,
  citationContext: string,
  isEsl: boolean
): string {
  const eslNote = isEsl
    ? '\nIMPORTANT: The student has identified as an ESL writer. In the aiRiskNarrative and aiRiskSignals, acknowledge that ESL writing patterns are frequently false-flagged by AI detectors. Adjust signal interpretation accordingly.\n'
    : '';

  return `
Analyze the following student essay for structure, thesis alignment, and AI-detection risk.

For AI risk: explain what patterns AI detectors look for and how this essay scores on each.
Frame it educationally — "here's what detectors look for and here's what your essay shows."
Do NOT imply the student used AI. Do NOT say their essay was AI-generated.
This panel helps students understand and address false-flag risk in their genuine writing.
${eslNote}
WRITING METRICS CONTEXT:
${metricsContext}

CITATION AUDIT CONTEXT:
${citationContext}

ESSAY:
${essay}
`.trim();
}

function buildMetricsContext(metrics: ReturnType<typeof analyzeText>): string {
  const { metrics: m, signals: s } = metrics;
  return [
    `Words: ${m.wordCount} | Sentences: ${m.sentenceCount} | Paragraphs: ${m.paragraphCount}`,
    `Avg sentence length: ${m.averageSentenceLength} words | Sentence length variance (std dev): ${s.sentenceLengthVariance}`,
    `Lexical diversity: ${m.lexicalDiversity} | Avg word length: ${m.averageWordLength} chars`,
    `Em-dash density: ${s.emDashDensity}/100 words | AI-tell word density: ${s.aiTellWordDensity}/100 words`,
    `Hedge word density: ${s.hedgeWordDensity}/100 words | Generic transition density: ${s.genericTransitionDensity}/100 words`,
    `Passive voice density: ${s.passiveVoiceDensity}/100 words | Repetitive sentence openers: ${s.repetitiveSentenceOpeners}%`,
  ].join('\n');
}

function buildCitationContext(citations: Awaited<ReturnType<typeof auditCitations>>): string {
  if (citations.findings.length === 0) return 'No DOIs or ISBNs detected in the essay.';

  const lines = [
    `DOIs found: ${citations.doiCount} | ISBNs found: ${citations.isbnCount}`,
    `Verified: ${citations.verifiedCount} | Not found: ${citations.unverifiedCount} | API errors: ${citations.apiErrorCount}`,
  ];

  for (const f of citations.findings) {
    if (f.verified) {
      lines.push(`✓ ${f.type.toUpperCase()} ${f.normalized}: "${f.metadata?.title ?? 'Unknown title'}" (${f.metadata?.year ?? '?'})`);
    } else {
      lines.push(`✗ ${f.type.toUpperCase()} ${f.normalized}: ${f.error === 'not_found' ? 'Not found in database' : 'Could not verify (API error)'}`);
    }
  }

  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// Mechanical and holistic Gemini types
// ---------------------------------------------------------------------------

interface MechanicalResult {
  issues: {
    category: 'grammar' | 'style' | 'clarity' | 'mechanics';
    severity: 'low' | 'medium' | 'high';
    excerpt: string;
    suggestion: string;
    explanation: string;
  }[];
}

interface HolisticResult {
  thesisStatement: string;
  thesisAlignment: 'strong' | 'partial' | 'weak' | 'unclear';
  thesisAlignmentNote: string;
  paragraphAnalysis: { index: number; purpose: string; note: string }[];
  structureSummary: string;
  aiRiskNarrative: string;
  aiRiskSignals: { signal: string; observation: string; advice: string }[];
  suggestedRewrites: { original: string; suggested: string; reason: string }[];
}

// ---------------------------------------------------------------------------
// Usage limits
// ---------------------------------------------------------------------------

const MONTHLY_LIMIT: Record<string, number> = {
  free: Infinity,
  student: Infinity,
};

function startOfCurrentMonth(): Date {
  const d = new Date();
  d.setUTCDate(1);
  d.setUTCHours(0, 0, 0, 0);
  return d;
}

function startOfNextMonth(): Date {
  const d = new Date();
  d.setUTCMonth(d.getUTCMonth() + 1, 1);
  d.setUTCHours(0, 0, 0, 0);
  return d;
}

// ---------------------------------------------------------------------------
// Route
// ---------------------------------------------------------------------------

router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { content, documentId, isEsl = false } = req.body;

    if (!content || typeof content !== 'string' || !content.trim()) {
      res.status(400).json({ error: 'content is required.' });
      return;
    }

    // --- Free-tier enforcement (full document mode only) ---
    if (documentId) {
      const { data: profile } = await supabaseAdmin
        .from('users')
        .select('tier')
        .eq('id', req.user!.id)
        .single();

      const tier = profile?.tier ?? 'free';
      const limit = MONTHLY_LIMIT[tier] ?? 3;

      if (isFinite(limit)) {
        const { count } = await supabaseAdmin
          .from('usage_tracking')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', req.user!.id)
          .eq('analysis_type', 'student')
          .gte('created_at', startOfCurrentMonth().toISOString());

        if ((count ?? 0) >= limit) {
          res.status(429).json({
            error: 'Monthly analysis limit reached.',
            limit,
            used: count ?? 0,
            resetAt: startOfNextMonth().toISOString(),
          });
          return;
        }
      }
    }

    // In full document mode, verify the document belongs to this user
    if (documentId) {
      const { data: doc } = await supabaseAdmin
        .from('documents')
        .select('id')
        .eq('id', documentId)
        .eq('user_id', req.user!.id)
        .is('deleted_at', null)
        .maybeSingle();

      if (!doc) {
        res.status(404).json({ error: 'Document not found.' });
        return;
      }
    }

    // --- JS metrics + citation audit (run before Gemini calls) ---
    const [textAnalysis, citations] = await Promise.all([
      Promise.resolve(analyzeText(content)),
      auditCitations(content),
    ]);

    const metricsContext = buildMetricsContext(textAnalysis);
    const citationContext = buildCitationContext(citations);

    // --- Two Gemini calls in parallel ---
    const [mechanical, holistic] = await Promise.all([
      analyzeWithLLM<MechanicalResult>({
        systemPrompt: STUDENT_SYSTEM_PROMPT,
        userPrompt: buildMechanicalPrompt(content, metricsContext),
        schema: MECHANICAL_SCHEMA,
      }),
      analyzeWithLLM<HolisticResult>({
        systemPrompt: STUDENT_SYSTEM_PROMPT,
        userPrompt: buildHolisticPrompt(content, metricsContext, citationContext, isEsl),
        schema: HOLISTIC_SCHEMA,
      }),
    ]);

    const report = {
      metrics: textAnalysis,
      citations,
      mechanical,
      holistic,
      isEsl,
      analyzedAt: new Date().toISOString(),
    };

    // --- Full document mode: persist and track usage ---
    if (documentId) {
      await Promise.all([
        supabaseAdmin.from('student_analyses').insert({
          document_id: documentId,
          user_id: req.user!.id,
          report,
        }),
        supabaseAdmin.from('usage_tracking').insert({
          user_id: req.user!.id,
          analysis_type: 'student',
        }),
      ]);
    }

    res.json({ report });
  } catch (err) {
    console.error('Student analyze error:', err);
    res.status(500).json({ error: 'Analysis failed.' });
  }
});

export default router;
