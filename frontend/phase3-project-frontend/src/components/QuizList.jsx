"use client";

import { useEffect, useState } from "react";
import { fetchQuizzes } from "../api";

function QuizList() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadQuizzes = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchQuizzes();
        console.log("Loaded quizzes:", data);
        setQuizzes(data);
      } catch (err) {
        console.error("Failed to load quizzes:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadQuizzes();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading quizzes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">Error: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="btn btn-primary"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h2>All Quizzes</h2>
        <p>Browse and select quizzes to take</p>
      </div>

      {quizzes.length === 0 ? (
        <div className="empty-state">
          <p>No quizzes available yet.</p>
          <p>Create some quizzes to get started!</p>
        </div>
      ) : (
        <div className="quiz-grid">
          {quizzes.map((quiz) => (
            <div key={quiz.id} className="quiz-card">
              <div className="quiz-card-header">
                <span
                  className={`badge badge-${
                    quiz.difficulty?.toLowerCase() || "medium"
                  }`}
                >
                  {quiz.category}
                </span>
                <span className="difficulty">{quiz.difficulty}</span>
              </div>
              <h3 className="quiz-question">{quiz.question}</h3>
              <button className="btn btn-outline">View Quiz</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default QuizList;
