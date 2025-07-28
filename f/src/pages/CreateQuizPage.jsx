import React, { useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateQuizPage() {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""], correctAnswer: "" },
  ]);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const valid = questions.every(
      (q) => q.question && q.options.every((o) => o) && q.correctAnswer
    );

    if (!title || !valid) {
      alert("Please fill all fields before submitting.");
      return;
    }

    await axios.post("https://ak-quizz-app-b.onrender.com/api/quiz/create", {
      title,
      questions,
    });

    alert("Quiz Created!");
    setTitle("");
    setQuestions([{ question: "", options: ["", "", "", ""], correctAnswer: "" }]);
  };

  

  return (
    <div
      className="min-h-screen p-4  relative"
      style={{
        backgroundImage: `url('/cqq.jpg')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Top-right Attempts Button */}
      <div className="absolute top-4 right-4">
        <Button
      variant="contained"
      onClick={() => navigate("/attempts")}
       className="mt-4"
      >
  View Attempts
</Button>

      </div>

      <center>
        <div className="max-w-3xl text-center">
          <div className="flex flex-col gap-3">
            <Typography variant="h5">Create Quiz</Typography>
            <TextField
              fullWidth
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {questions.map((q, idx) => (
            <Paper
              key={idx}
              className="p-4 flex flex-col gap-5 mt-4"
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                backdropFilter: "blur(6px)",
                borderRadius: 2,
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
              }}
            >
              <TextField
                fullWidth
                label={`Question ${idx + 1}`}
                value={q.question}
                onChange={(e) => {
                  const newQs = [...questions];
                  newQs[idx].question = e.target.value;
                  setQuestions(newQs);
                }}
              />

              {q.options.map((opt, i) => (
                <TextField
                  key={i}
                  fullWidth
                  label={`Option ${i + 1}`}
                  value={opt}
                  onChange={(e) => {
                    const newQs = [...questions];
                    newQs[idx].options[i] = e.target.value;
                    if (newQs[idx].correctAnswer === opt) {
                      newQs[idx].correctAnswer = "";
                    }
                    setQuestions(newQs);
                  }}
                />
              ))}

              <FormControl fullWidth>
                <InputLabel id={`correct-answer-label-${idx}`}>Correct Answer</InputLabel>
                <Select
                  labelId={`correct-answer-label-${idx}`}
                  value={q.correctAnswer}
                  label="Correct Answer"
                  onChange={(e) => {
                    const newQs = [...questions];
                    newQs[idx].correctAnswer = e.target.value;
                    setQuestions(newQs);
                  }}
                >
                  {q.options.map((opt, i) => (
                    <MenuItem key={i} value={opt}>
                      {`Option ${i + 1}: ${opt || "(empty)"}`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Paper>
          ))}

          <div className="flex justify-center items-center gap-5 mt-5">
            <Button
              variant="outlined"
              onClick={() =>
                setQuestions([
                  ...questions,
                  { question: "", options: ["", "", "", ""], correctAnswer: "" },
                ])
              }
            >
              Add Question
            </Button>

            <Button variant="contained" onClick={handleSubmit}>
              Submit Quiz
            </Button>
          </div>
        </div>
      </center>
    </div>
  );
}
