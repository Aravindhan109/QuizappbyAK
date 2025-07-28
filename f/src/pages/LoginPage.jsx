import React, { useState, useMemo } from "react";
import { Button, TextField, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      if (res.data.success) {
        localStorage.setItem("admin", "true");
        navigate("/create");
      }
    } catch {
      alert("Unauthorized! Only arav@gmail.com can login.");
    }
  };

  // Bubble colors and memoized bubble style list
  const bubbleColors = ["#ff6b6b", "#6bc1ff", "#6bff95", "#ffe16b", "#d36bff"];

  const bubbles = useMemo(() => {
    return Array.from({ length: 40 }, () => ({
      width: `${Math.random() * 30 + 15}px`,
      height: `${Math.random() * 30 + 15}px`,
      left: `${Math.random() * 100}%`,
      bottom: `-${Math.random() * 200}px`,
      backgroundColor: bubbleColors[Math.floor(Math.random() * bubbleColors.length)],
      opacity: Math.random() * 0.3 + 0.3,
      filter: "blur(1px)",
      animationDuration: `${Math.random() * 6 + 4}s`,
      animationDelay: `${Math.random() * 3}s`,
    }));
  }, []); // Empty dependency ensures styles are generated once

  return (
    <div className="relative h-screen w-screen flex items-center justify-center overflow-hidden">
      {/* Animated Colorful Bubbles */}
      {bubbles.map((style, i) => (
        <div key={i} className="absolute rounded-full animate-bubble" style={style} />
      ))}

      {/* Login Card */}
      <Paper elevation={6} className="z-10 max-w-lg w-full flex flex-col gap-5 p-6 space-y-4"
       sx={{
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // transparent white
    backdropFilter: 'blur(6px)', // optional blur effect for glassmorphism
    borderRadius: 2,
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)', // optional shadow
  }}>
        <Typography variant="h5" className="text-center">AK QUIZZ Login</Typography>
        <TextField
          fullWidth
          label="Email"
          value={email}
          inputProps={{ autoComplete: "off" }}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          value={password}
          inputProps={{ autoComplete: "new-password" }}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" fullWidth onClick={handleLogin}>
          Login
        </Button>
        <Button variant="outlined" fullWidth onClick={() => navigate("/join")}>
          Join a Quiz
        </Button>
      </Paper>

      {/* Bubble Animation */}
      <style>
        {`
          @keyframes bubble {
            0% {
              transform: translateY(0) scale(1);
              opacity: 0.4;
            }
            50% {
              opacity: 0.7;
            }
            100% {
              transform: translateY(-100vh) scale(1.2);
              opacity: 0;
            }
          }

          .animate-bubble {
            animation-name: bubble;
            animation-timing-function: ease-in-out;
            animation-iteration-count: infinite;
          }
        `}
      </style>
    </div>
  );
}
