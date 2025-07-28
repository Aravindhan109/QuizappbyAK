import express from "express";
import Quiz from "../models/Quiz.js";
import Submission from "../models/Submission.js";

const router = express.Router();

// Create Quiz
router.post("/create", async (req, res) => {
  const quiz = await Quiz.create(req.body);
  res.json(quiz);
});

// Get all quizzes
router.get("/list", async (req, res) => {
  const quizzes = await Quiz.find();
  res.json(quizzes);
});

// Join quiz
router.post("/join", async (req, res) => {
  const { quizId, passcode } = req.body;
  const quiz = await Quiz.findById(quizId);
  if (!quiz || quiz.passcode !== passcode) {
    return res.status(403).json({ message: "Invalid passcode" });
  }
  res.json(quiz);
});

// Submit quiz
router.post("/submit", async (req, res) => {
  const { quizId, username, userAnswers } = req.body;
  const quiz = await Quiz.findById(quizId);

  const answers = quiz.questions.map((q, idx) => {
    const selected = userAnswers[idx];
    return {
      question: q.question,
      selected,
      correctAnswer: q.correctAnswer,
      correct: selected === q.correctAnswer
    };
  });

  const score = answers.filter(a => a.correct).length;

  const submission = await Submission.create({
    quizId,
    username,
    answers,
    score,
  });

  res.json({ submissionId: submission._id });
});

// View submission
router.get("/submission/:id", async (req, res) => {
  const result = await Submission.findById(req.params.id);
  if (!result) return res.status(404).json({ message: "Result not found" });
  res.json(result);
});

router.get('/all', async (req, res) => {
  try {
    const quizzes = await Quiz.find({}, { title: 1 });
    res.json(quizzes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch quizzes' });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ error: "Quiz not found" });

    const submissions = await Submission.find({ quizId: req.params.id });

    res.json({
      title: quiz.title,
      submissions,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch quiz and submissions" });
  }
});


export default router;
