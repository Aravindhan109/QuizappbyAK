import Quiz from '../models/Quiz.js';
import Submission from '../models/Submission.js';

export const login = (req, res) => {
  const { email, password } = req.body;
  if (email === 'arav@gmail.com' && password === '1234') {
    return res.json({ success: true });
  }
  return res.status(401).json({ success: false, message: "Invalid credentials" });
};


export const createQuiz = async (req, res) => {
  const { title, questions, creator } = req.body;
  const newQuiz = new Quiz({ title, questions, creator, passcode: "1234" });
  await newQuiz.save();
  res.json({ success: true, quizId: newQuiz._id });
};

export const getQuizzesByPasscode = async (req, res) => {
  const { passcode } = req.params;
  const quizzes = await Quiz.find({ passcode });
  res.json(quizzes);
};

export const getQuizById = async (req, res) => {
  const quiz = await Quiz.findById(req.params.id);
  res.json(quiz);
};

export const submitQuiz = async (req, res) => {
  const { quizId, userName, answers } = req.body;
  const quiz = await Quiz.findById(quizId);
  const results = quiz.questions.map((q, index) => ({
    question: q.question,
    userAnswer: answers[index],
    correctAnswer: q.correctAnswer,
    correct: q.correctAnswer === answers[index]
  }));
  const submission = new Submission({ quizId, userName, answers, results });
  await submission.save();
  res.json({ score: results.filter(r => r.correct).length, results, title: quiz.title });
};

export const getSubmission = async (req, res) => {
  const sub = await Submission.findById(req.params.id);
  res.json(sub);
};
