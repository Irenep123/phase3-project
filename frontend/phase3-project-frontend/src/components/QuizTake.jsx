import React, { useEffect, useState } from "react";
import { fetchQuizzes } from "../api";

function QuizTakeAll() {
  const [quizzes, setQuizzes] = useState([]);
  const [answers, setAnswers] = useState({}); // Tracks selected answers
  const [feedback, setFeedback] = useState({}); // Tracks feedback
  const [error, setError] = useState(null); // Error handling
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const loadQuizzes = async () => {
      try {
        const data = await fetchQuizzes();
        console.log("Fetched quizzes:", data);
        setQuizzes(data);
      } catch (err) {
        console.error("Error fetching quizzes:", err);
        setError("Failed to load quizzes.");
      } finally {
        setLoading(false);
      }
    };

    loadQuizzes();
  }, []);

  const handleAnswer = (quizId, selected, correct) => {
    setAnswers((prev) => ({ ...prev, [quizId]: selected }));
    setFeedback((prev) => ({
      ...prev,
      [quizId]: selected === correct ? "✅ Correct!" : "❌ Wrong answer.",
    }));
  };

  if (loading) return <p>Loading quizzes...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (quizzes.length === 0) return <p>No quizzes available.</p>;

  return (
    <div>
      <h2>Take All Quizzes</h2>
      {quizzes.map((quiz) => (
        <div key={quiz.id} style={{ marginBottom: "2rem" }}>
          <h4>{quiz.question}</h4>
          <ul style={{ listStyle: "none", paddingLeft: 0 }}>
            {Array.isArray(quiz.options) &&
              quiz.options.map((opt) => (
                
                <li key={opt.id} style={{ marginBottom: "0.5rem" }}>
                  <button
                    // disabled={!!answers[quiz.id]}
                    onClick={() =>
                      handleAnswer(
                        quiz.id,
                        opt.option_text,
                        quiz.correct_answer
                      )
                    }
                  >
                    question:{opt.option_text}
                  </button>
                </li>
              ))}
          </ul>
          {feedback[quiz.id] && (
            <p>
              <strong>{feedback[quiz.id]}</strong>
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default QuizTakeAll;
