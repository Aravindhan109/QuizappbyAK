import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CreateQuizPage from "./pages/CreateQuizPage";
import JoinQuizPage from "./pages/JoinQuizPage";
import TakeQuizPage from "./pages/TakeQuizPage";
import ViewAnswersPage from "./pages/ViewAnswersPage";
import ViewAttempts from "./pages/ViewAttempts";


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/create" element={<CreateQuizPage />} />
        <Route path="/join" element={<JoinQuizPage />} />
        <Route path="/take/:id" element={<TakeQuizPage />} />
        <Route path="/result/:id" element={<ViewAnswersPage />} />
        <Route path="/attempts" element={<ViewAttempts />} />

      </Routes>
    </Router>
  );
}
