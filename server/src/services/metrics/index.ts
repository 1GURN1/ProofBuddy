// =============================================================================
// Writing metrics service
// Pure JS math on text. No API calls, no AI. Used by both analyze endpoints.
//
// Two layers:
//   TextMetrics  — basic stats (word count, sentence count, lexical diversity…)
//   TextSignals  — AI-detection signals (em-dash density, AI-tell words…)
//
// TextAnalysis combines both. WritingMetrics adds comparison when a previous
// sample is supplied.
// =============================================================================

// ---------------------------------------------------------------------------
// Word / phrase lists
// ---------------------------------------------------------------------------

// Words AI models use at higher rates than typical human writers.
// Source: publicly documented AI-detection research + observed GPT/Claude patterns.
const AI_TELL_WORDS = new Set([
  'delve', 'delves', 'delving', 'delved',
  'tapestry', 'tapestries',
  'nuanced', 'nuance', 'nuances',
  'multifaceted',
  'moreover',
  'furthermore',
  'notably',
  'pivotal',
  'crucial',
  'comprehensive', 'comprehensively',
  'underscores', 'underscore', 'underscored',
  'highlights', 'highlight', 'highlighted',
  'seamlessly', 'seamless',
  'vibrant', 'vibrancy',
  'thriving', 'thrive',
  'fostering', 'foster', 'fosters',
  'showcases', 'showcase', 'showcasing',
  'streamline', 'streamlines', 'streamlining',
  'realm', 'realms',
  'testament',
  'leverage', 'leverages', 'leveraging', 'leveraged',
  'paradigm', 'paradigms',
  'robust',
  'synergy', 'synergies', 'synergistic',
  'holistic',
  'bespoke',
  'intricate', 'intricately',
  'groundbreaking',
  'innovative', 'innovation',
  'revolutionary',
]);

// Words that soften claims — high density is an AI signal in expository writing.
const HEDGE_WORDS = new Set([
  'however',
  'although',
  'nevertheless',
  'nonetheless',
  'consequently',
  'subsequently',
  'accordingly',
  'therefore',
  'thus',
  'hence',
  'notwithstanding',
  'henceforth',
  'therein',
]);

// Multi-word phrases common in AI-generated conclusions and transitions.
const GENERIC_TRANSITION_PHRASES = [
  'in conclusion',
  'in summary',
  'to summarize',
  'it is worth noting',
  'it is important to note',
  'it should be noted',
  'it is crucial',
  'it is essential',
  'plays a crucial role',
  'play a crucial role',
  'a testament to',
  'in the realm of',
  'it is worth mentioning',
  'needless to say',
];

// Helping verb patterns used in passive voice approximation.
// Not a full POS tagger — catches the common forms with acceptable accuracy.
const PASSIVE_PATTERN =
  /\b(is|was|are|were|be|been|being)\s+\w*(?:ed|en)\b/gi;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function stdDev(values: number[]): number {
  if (values.length < 2) return 0;
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const variance =
    values.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / values.length;
  return Number(Math.sqrt(variance).toFixed(2));
}

function per100Words(count: number, wordCount: number): number {
  if (wordCount === 0) return 0;
  return Number(((count / wordCount) * 100).toFixed(2));
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s']/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

function splitSentences(text: string): string[] {
  return text
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function splitParagraphs(text: string): string[] {
  return text
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface TextMetrics {
  wordCount: number;
  sentenceCount: number;
  paragraphCount: number;
  averageSentenceLength: number;
  averageWordLength: number;
  lexicalDiversity: number;
}

export interface TextSignals {
  // Structural variance — low variance = AI-like uniformity
  sentenceLengthVariance: number;    // std dev of per-sentence word counts
  paragraphLengthVariance: number;   // std dev of per-paragraph word counts
  averageParagraphLength: number;    // words per paragraph

  // AI-tell markers — higher = more AI-like
  emDashDensity: number;             // em-dashes per 100 words
  aiTellWordDensity: number;         // AI-tell words per 100 words
  hedgeWordDensity: number;          // hedge words per 100 words
  genericTransitionDensity: number;  // generic phrases per 100 words
  passiveVoiceDensity: number;       // approximate passive constructions per 100 words

  // Repetition — higher = more AI-like
  repetitiveSentenceOpeners: number; // % of sentences sharing their first word with another
}

export interface TextAnalysis {
  metrics: TextMetrics;
  signals: TextSignals;
}

export interface WritingMetrics {
  current: TextAnalysis;
  previous: TextAnalysis;
  comparison: {
    averageSentenceLengthChange: number;
    averageWordLengthChange: number;
    lexicalDiversityChange: number;
    sentenceLengthVarianceChange: number;
    aiTellWordDensityChange: number;
  };
}

// ---------------------------------------------------------------------------
// Core functions
// ---------------------------------------------------------------------------

export function calculateTextMetrics(text = ''): TextMetrics {
  const cleanText = text.trim();

  if (!cleanText) {
    return {
      wordCount: 0,
      sentenceCount: 0,
      paragraphCount: 0,
      averageSentenceLength: 0,
      averageWordLength: 0,
      lexicalDiversity: 0,
    };
  }

  const words = tokenize(cleanText);
  const sentences = splitSentences(cleanText);
  const paragraphs = splitParagraphs(cleanText);
  const uniqueWords = new Set(words);
  const totalCharacters = words.reduce((sum, w) => sum + w.length, 0);

  return {
    wordCount: words.length,
    sentenceCount: sentences.length,
    paragraphCount: paragraphs.length,
    averageSentenceLength:
      sentences.length > 0
        ? Number((words.length / sentences.length).toFixed(2))
        : 0,
    averageWordLength:
      words.length > 0
        ? Number((totalCharacters / words.length).toFixed(2))
        : 0,
    lexicalDiversity:
      words.length > 0
        ? Number((uniqueWords.size / words.length).toFixed(2))
        : 0,
  };
}

export function calculateTextSignals(text = ''): TextSignals {
  const cleanText = text.trim();

  const empty: TextSignals = {
    sentenceLengthVariance: 0,
    paragraphLengthVariance: 0,
    averageParagraphLength: 0,
    emDashDensity: 0,
    aiTellWordDensity: 0,
    hedgeWordDensity: 0,
    genericTransitionDensity: 0,
    passiveVoiceDensity: 0,
    repetitiveSentenceOpeners: 0,
  };

  if (!cleanText) return empty;

  const words = tokenize(cleanText);
  const wordCount = words.length;
  const sentences = splitSentences(cleanText);
  const paragraphs = splitParagraphs(cleanText);

  if (wordCount === 0) return empty;

  // --- Sentence length variance ---
  const sentenceLengths = sentences.map((s) => tokenize(s).length);
  const sentenceLengthVariance = stdDev(sentenceLengths);

  // --- Paragraph length variance ---
  const paragraphLengths = paragraphs.map((p) => tokenize(p).length);
  const paragraphLengthVariance = stdDev(paragraphLengths);
  const averageParagraphLength =
    paragraphs.length > 0
      ? Number((wordCount / paragraphs.length).toFixed(2))
      : 0;

  // --- Em-dash density ---
  const emDashCount = (cleanText.match(/—/g) ?? []).length;
  const emDashDensity = per100Words(emDashCount, wordCount);

  // --- AI-tell word density ---
  const aiTellCount = words.filter((w) => AI_TELL_WORDS.has(w)).length;
  const aiTellWordDensity = per100Words(aiTellCount, wordCount);

  // --- Hedge word density ---
  const hedgeCount = words.filter((w) => HEDGE_WORDS.has(w)).length;
  const hedgeWordDensity = per100Words(hedgeCount, wordCount);

  // --- Generic transition density ---
  const lowerText = cleanText.toLowerCase();
  const transitionCount = GENERIC_TRANSITION_PHRASES.reduce(
    (count, phrase) => count + (lowerText.split(phrase).length - 1),
    0
  );
  const genericTransitionDensity = per100Words(transitionCount, wordCount);

  // --- Passive voice density (approximate) ---
  const passiveMatches = cleanText.match(PASSIVE_PATTERN) ?? [];
  const passiveVoiceDensity = per100Words(passiveMatches.length, wordCount);

  // --- Repetitive sentence openers ---
  // % of sentences whose first word appears as the first word of at least one other sentence
  const openers = sentences
    .map((s) => tokenize(s)[0])
    .filter(Boolean);
  const openerCounts: Record<string, number> = {};
  for (const word of openers) {
    openerCounts[word] = (openerCounts[word] ?? 0) + 1;
  }
  const repetitiveCount = openers.filter((w) => openerCounts[w] > 1).length;
  const repetitiveSentenceOpeners =
    openers.length > 0
      ? Number(((repetitiveCount / openers.length) * 100).toFixed(2))
      : 0;

  return {
    sentenceLengthVariance,
    paragraphLengthVariance,
    averageParagraphLength,
    emDashDensity,
    aiTellWordDensity,
    hedgeWordDensity,
    genericTransitionDensity,
    passiveVoiceDensity,
    repetitiveSentenceOpeners,
  };
}

export function analyzeText(text = ''): TextAnalysis {
  return {
    metrics: calculateTextMetrics(text),
    signals: calculateTextSignals(text),
  };
}

export function calculateWritingMetrics(
  studentSubmission: string,
  previousSample?: string
): WritingMetrics {
  const current = analyzeText(studentSubmission);
  const previous = analyzeText(previousSample ?? '');

  return {
    current,
    previous,
    comparison: {
      averageSentenceLengthChange: Number(
        (
          current.metrics.averageSentenceLength -
          previous.metrics.averageSentenceLength
        ).toFixed(2)
      ),
      averageWordLengthChange: Number(
        (
          current.metrics.averageWordLength - previous.metrics.averageWordLength
        ).toFixed(2)
      ),
      lexicalDiversityChange: Number(
        (
          current.metrics.lexicalDiversity - previous.metrics.lexicalDiversity
        ).toFixed(2)
      ),
      sentenceLengthVarianceChange: Number(
        (
          current.signals.sentenceLengthVariance -
          previous.signals.sentenceLengthVariance
        ).toFixed(2)
      ),
      aiTellWordDensityChange: Number(
        (
          current.signals.aiTellWordDensity - previous.signals.aiTellWordDensity
        ).toFixed(2)
      ),
    },
  };
}
