export interface TextMetrics {
  wordCount: number;
  sentenceCount: number;
  paragraphCount: number;
  averageSentenceLength: number;
  averageWordLength: number;
  lexicalDiversity: number;
}

export interface WritingMetrics {
  current: TextMetrics;
  previous: TextMetrics;
  comparison: {
    averageSentenceLengthChange: number;
    averageWordLengthChange: number;
    lexicalDiversityChange: number;
  };
}

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

  const words = cleanText
    .toLowerCase()
    .replace(/[^\w\s']/g, ' ')
    .split(/\s+/)
    .filter(Boolean);

  const sentences = cleanText
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter(Boolean);

  const paragraphs = cleanText
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  const uniqueWords = new Set(words);
  const totalCharacters = words.reduce((sum, word) => sum + word.length, 0);

  return {
    wordCount: words.length,
    sentenceCount: sentences.length,
    paragraphCount: paragraphs.length,
    averageSentenceLength:
      sentences.length > 0 ? Number((words.length / sentences.length).toFixed(2)) : 0,
    averageWordLength:
      words.length > 0 ? Number((totalCharacters / words.length).toFixed(2)) : 0,
    lexicalDiversity:
      words.length > 0 ? Number((uniqueWords.size / words.length).toFixed(2)) : 0,
  };
}

export function calculateWritingMetrics(
  studentSubmission: string,
  previousSample?: string
): WritingMetrics {
  const current = calculateTextMetrics(studentSubmission);
  const previous = calculateTextMetrics(previousSample);

  return {
    current,
    previous,
    comparison: {
      averageSentenceLengthChange: Number(
        (current.averageSentenceLength - previous.averageSentenceLength).toFixed(2)
      ),
      averageWordLengthChange: Number(
        (current.averageWordLength - previous.averageWordLength).toFixed(2)
      ),
      lexicalDiversityChange: Number(
        (current.lexicalDiversity - previous.lexicalDiversity).toFixed(2)
      ),
    },
  };
}
