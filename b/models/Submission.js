import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
    required: true,
  },
  username: String,
  answers: [
    {
      question: String,
      selected: String,
      correctAnswer: String,
      correct: Boolean,
    },
  ],
  score: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("dkSubmission", submissionSchema);
