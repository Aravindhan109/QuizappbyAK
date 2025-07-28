import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  CircularProgress,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
} from "@mui/material";

const medalEmojis = ["🥇", "🥈", "🥉"];

export default function ViewAttemptsPage() {
  const [quizList, setQuizList] = useState([]);
  const [selectedQuizId, setSelectedQuizId] = useState("");
  const [title, setTitle] = useState("");
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAllQuizzes = async () => {
      try {
        const res = await axios.get("https://ak-quizz-app-b.onrender.com/api/quiz/all");
        setQuizList(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load quiz list");
      }
    };
    fetchAllQuizzes();
  }, []);

  const handleQuizChange = async (e) => {
    const quizId = e.target.value;
    setSelectedQuizId(quizId);
    setLoading(true);
    try {
      const res = await axios.get(`https://ak-quizz-app-b.onrender.com/api/quiz/${quizId}`);
      setTitle(res.data.title);
      const sorted = res.data.submissions.sort((a, b) => b.score - a.score);
      setSubmissions(sorted);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load submissions");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-screen h-screen bg-cover bg-center overflow-auto"
      style={{
        backgroundImage: `url('/va.jpg')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container maxWidth="md" className="py-10">
        <Typography variant="h4" align="center" className="font-bold pb-5">
          View Quiz Attempts
        </Typography>

        <FormControl
          fullWidth
          variant="outlined"
          className="mb-6"
          sx={{
            "& .MuiInputLabel-root": {
              color: "black",
            },
            "& .MuiOutlinedInput-root": {
              color: "black,
              "& fieldset": {
                borderColor: "black",
              },
              "&:hover fieldset": {
                borderColor: "black",
              },
              "&.Mui-focused fieldset": {
                borderColor: "black",
              },
            },
            "& .MuiSvgIcon-root": {
              color: "black",
            },
          }}
        >
          <InputLabel>Select Quiz</InputLabel>
          <Select
            value={selectedQuizId}
            onChange={handleQuizChange}
            label="Select Quiz"
          >
            {quizList.map((quiz) => (
              <MenuItem key={quiz._id} value={quiz._id}>
                {quiz.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {loading && <CircularProgress className="mx-auto mt-10" />}
        {error && <Typography color="error">{error}</Typography>}

        {submissions.length > 0 && (
          <TableContainer component={Paper} elevation={8} className="mt-5">
            <Table>
              <TableHead>
                <TableRow className="bg-blue-200">
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Rank
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Username</TableCell>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Score
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {submissions.map((attempt, index) => {
                  const showMedal = attempt.score > 0 && index < 3;
                  return (
                    <TableRow
                      key={attempt._id}
                      className={showMedal ? "bg-yellow-100" : ""}
                    >
                      <TableCell align="center">
                        {attempt.score === 0
                          ? index + 1
                          : showMedal
                          ? medalEmojis[index]
                          : index + 1}
                      </TableCell>
                      <TableCell>{attempt.username}</TableCell>
                      <TableCell
                        align="center"
                        style={{
                          fontWeight: "bold",
                          color: attempt.score === 0 ? "gray" : "#1976d2",
                        }}
                      >
                        {attempt.score}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
    </div>
  );
}
