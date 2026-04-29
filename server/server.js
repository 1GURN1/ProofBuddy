import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.get("/", (req, res) => {
  res.json({
    message: "ProofBuddy backend is running",
  });
});

app.post("/api/analyze", async (req, res) => {
  try {
    const {
      assignmentPrompt,
      studentSubmission,
      previousSample,
      aiPolicy,
      rubric,
    } = req.body;

    if (!assignmentPrompt || !studentSubmission) {
      return res.status(400).json({
        error: "Assignment prompt and student submission are required.",
      });
    }

    const metrics = calculateWritingMetrics(studentSubmission, previousSample);

    const report = generateMockHybridReview({
      assignmentPrompt,
      studentSubmission,
      previousSample,
      aiPolicy,
      rubric,
      metrics,
    });

    res.json(report);
  } catch (error) {
    console.error("Analyze error:", error);
    res.status(500).json({
      error: "Something went wrong while analyzing the submission.",
    });
  }
});

function generateMockHybridReview({
  aiPolicy,
  metrics,
  previousSample,
}) {
  const hasPreviousSample = previousSample && previousSample.trim().length > 0;
  const sentenceJump = metrics.comparison.averageSentenceLengthChange;
  const diversityJump = metrics.comparison.lexicalDiversityChange;

  let reviewLevel = "Low";

  if (hasPreviousSample && (sentenceJump > 8 || diversityJump > 0.15)) {
    reviewLevel = "Medium";
  }

  if (hasPreviousSample && sentenceJump > 14 && diversityJump > 0.2) {
    reviewLevel = "High";
  }

  return {
    reviewLevel,
    summary:
      "This hybrid report combines objective writing metrics with educator-safe review guidance. It does not determine misconduct, but it identifies areas that may deserve a fair follow-up conversation.",
    metrics,
    promptAlignment: [
      "The submission appears to address the general topic of the assignment.",
      "Some sections should be checked for direct connection to the specific assignment requirements.",
      "The instructor may want to verify whether required course concepts are used in enough depth.",
    ],
    writingConsistency: hasPreviousSample
      ? [
          `Average sentence length changed by ${sentenceJump} words compared with the previous sample.`,
          `Lexical diversity changed by ${diversityJump} compared with the previous sample.`,
          "A noticeable style shift may have innocent explanations such as revision, tutoring, or stronger effort.",
        ]
      : [
          "No previous writing sample was provided, so personalized style comparison is limited.",
          "The report relies more heavily on prompt alignment, citation review, and generic-writing signals.",
        ],
    citationAudit: [
      "Check whether major factual claims are supported with citations.",
      "Review whether the bibliography, if present, connects clearly to claims in the essay.",
      "This MVP does not yet verify sources against the web or library databases.",
    ],
    possibleAiAssistanceSignals: [
      "Look for overly even tone across paragraphs.",
      "Look for broad claims that sound polished but lack assignment-specific detail.",
      "Look for repetitive paragraph structures or generic transitions.",
    ],
    alternativeExplanations: [
      "The student may have revised the work heavily.",
      "The student may have used tutoring or writing centre support.",
      "The student may naturally write in a more formal style for this assignment.",
      "The difference may be caused by assignment type, topic familiarity, or available preparation time.",
    ],
    followUpQuestions: [
      "Can you explain your main argument in your own words?",
      "Which part of the essay changed the most between your first draft and final version?",
      "Which source or idea most influenced your conclusion?",
      "Can you walk me through how you developed one body paragraph?",
    ],
    recommendedNextSteps: [
      "Do not treat this report as proof of misconduct.",
      "Use the selected course AI policy when deciding whether follow-up is appropriate.",
      `Selected policy: ${aiPolicy || "No policy selected"}.`,
      "Ask process-based questions before making any academic integrity decision.",
    ],
  };
}

function calculateTextMetrics(text = "") {
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
    .replace(/[^\w\s']/g, " ")
    .split(/\s+/)
    .filter(Boolean);

  const sentences = cleanText
    .split(/[.!?]+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);

  const paragraphs = cleanText
    .split(/\n+/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  const uniqueWords = new Set(words);
  const totalCharacters = words.reduce((sum, word) => sum + word.length, 0);

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

function calculateWritingMetrics(studentSubmission, previousSample) {
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

app.listen(PORT, () => {
  console.log(`ProofBuddy server running on port ${PORT}`);
});