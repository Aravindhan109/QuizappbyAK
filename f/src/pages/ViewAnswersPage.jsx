import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Paper, Chip } from "@mui/material";
import axios from "axios";

export default function ViewAnswersPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(`https://ak-quizz-app-b.onrender.com/api/quiz/submission/${id}`).then((res) => setData(res.data));
  }, []);

  if (!data) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="w-screen h-screen bg-cover bg-center overflow-auto" style={{
        backgroundImage: `url('/cc.jpg')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
    <div className="p-6 max-w-5xl mx-auto space-y-6" 
    
    >
      <Typography variant="h5" className="text-black">Result of {data.username}</Typography>
      <Typography variant="h6" className="text-black">Score: {data.score} / {data.answers.length}</Typography>
      <a
  href={`https://web.whatsapp.com/send?phone=917502787852&text=${encodeURIComponent(
    `I scored ${data.score} on the quiz! View here: https://ak-quizz-app-b.onrender.com/result/${id}`
  )}`}
  target="_blank"
  rel="noreferrer"
  className="text-black underline"
>
  Share on WhatsApp Web
</a>


      {data.answers.map((ans, idx) => (
        <Paper key={idx} className="p-4 mt-6 " sx={{
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                backdropFilter: "blur(6px)",
                borderRadius: 2,
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
              }}>
          <div className="flex flex-col gap-3 ">
          <Typography>{idx + 1}. {ans.question}</Typography>
          <Typography>Your Answer: {ans.selected}</Typography>
          <Typography>Correct Answer: {ans.correctAnswer}</Typography>
          </div>
          <Chip className="mt-4" label={ans.correct ? "Correct" : "Incorrect"} color={ans.correct ? "success" : "error"} />
        </Paper>
      ))}
    </div>
    </div>
  );
}
