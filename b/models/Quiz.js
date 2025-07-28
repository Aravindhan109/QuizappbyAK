import mongoose from "mongoose";


const quizSchema = new mongoose.Schema({
  title: String,
  questions: [
    {
      question: String,
      options: [String],
      correctAnswer: String, // store the correct option text
    },
  ],
  passcode: {
    type: String,
    default: "1234",
  },
});

export default mongoose.model("dkQuiz", quizSchema);
