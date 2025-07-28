import express from "express";
const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (email === "arav@gmail.com" && password === "1234") {
    return res.json({ success: true });
  }
  res.status(401).json({ message: "Invalid credentials" });
});

export default router;
