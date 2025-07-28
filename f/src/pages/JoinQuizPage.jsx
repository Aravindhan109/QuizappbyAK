import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function JoinQuizPage() {
  const [quizzes, setQuizzes] = useState([]);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/quiz/list").then((res) => {
      setQuizzes(res.data);
    });
  }, []);

  const handleJoin = async (quizId) => {
  if (!username.trim()) {
    return alert("Please enter your name before joining.");
  }

  const passcode = prompt("Enter passcode:");
  if (passcode !== "1234") return alert("Invalid passcode");

  const res = await axios.post("http://localhost:5000/api/quiz/join", {
    quizId,
    passcode,
  });

  localStorage.setItem("quiz", JSON.stringify(res.data));
  localStorage.setItem("username", username);
  navigate(`/take/${quizId}`);
};


  return (
    <div
      className="h-screen w-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url('cq.jpg')`,
      }}
    >
      <div className="bg-white/70 p-8 rounded-xl shadow-xl w-full max-w-3xl space-y-6">
        <Typography variant="h5" className="text-center font-bold pb-5">
          Join a Quiz
        </Typography>

        <TextField
          fullWidth
          label="Your Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <div className="flex flex-col gap-4 mt-7">
          {quizzes.map((quiz) => (
            <Paper
              key={quiz._id}
              className="p-4 flex justify-between items-center"
              elevation={3}
            >
              <Typography className="font-medium">{quiz.title}</Typography>
              <Button
                variant="contained"
                onClick={() => handleJoin(quiz._id)}
              >
                Join
              </Button>
            </Paper>
          ))}
        </div>
      </div>
    </div>
  );
}
