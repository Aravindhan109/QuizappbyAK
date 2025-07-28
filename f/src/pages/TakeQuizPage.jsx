import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  Typography,
  Paper,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import axios from "axios";

export default function TakeQuizPage() {
  const { id } = useParams();
  const quiz = JSON.parse(localStorage.getItem("quiz"));
  const username = localStorage.getItem("username");
  const [answers, setAnswers] = useState(Array(quiz.questions.length).fill(""));
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes = 300 seconds
  const navigate = useNavigate();

  // Auto-submit when time runs out
  useEffect(() => {
    if (timeLeft === 0) {
      handleSubmit(); // auto-submit
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post("https://ak-quizz-app-b.onrender.com/api/quiz/submit", {
        quizId: id,
        username,
        userAnswers: answers,
      });
      localStorage.removeItem("quiz");
      navigate(`/result/${res.data.submissionId}`);
    } catch (err) {
      console.error("Submission failed:", err);
    }
  };

  return (
    <div
      className="w-screen h-screen bg-cover bg-center overflow-auto"
      style={{
        backgroundImage: `url('/pexels-njeromin-19027703.jpg')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="p-6 max-w-5xl mx-auto space-y-6 backdrop-blur-sm bg-white/10 rounded-xl mt-6">
        <div className="flex justify-between items-center">
          <Typography variant="h5" className="text-black font-extrabold pb-5">
            {quiz.title}
          </Typography>
          <Typography variant="h6" className="text-black font-bold">
            Time Left: {formatTime(timeLeft)}
          </Typography>
        </div>

        {quiz.questions.map((q, idx) => (
          <Paper
            key={idx}
            className="p-4 text-white font-semibold font-3xl"
            sx={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}
          >
            <Typography sx={{ fontSize: "1.2rem", fontWeight: 600 }}>
              {idx + 1}. {q.question}
            </Typography>
            <RadioGroup
              value={answers[idx]}
              onChange={(e) => {
                const newAns = [...answers];
                newAns[idx] = e.target.value;
                setAnswers(newAns);
              }}
            >
              {q.options.map((opt, i) => (
                <FormControlLabel
                  key={i}
                  value={opt}
                  control={<Radio />}
                  label={opt}
                />
              ))}
            </RadioGroup>
          </Paper>
        ))}
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit Quiz
        </Button>
      </div>
    </div>
  );
}
