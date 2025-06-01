const API_BASE = "http://localhost:8000";

export const fetchQuizzes = async () => {
  const res = await fetch(`${API_BASE}/quizzes`);
  return res.json();
};

export const fetchQuiz = async (id) => {
  const res = await fetch(`${API_BASE}/quizzes/${id}`);
  return res.json();
};

export const createQuiz = async (quiz) => {
  const res = await fetch(`${API_BASE}/quizzes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(quiz),
  });
  return res.json();
};
