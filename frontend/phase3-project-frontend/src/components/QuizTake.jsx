

import { useEffect, useState } from "react";
import {
  fetchQuizzes,
  fetchQuizOptions,
} from "../api";

function QuizTake() {
  const [quizzes, setQuizzes] = useState([]);
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQuizzes = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log("Loading quizzes...");
        const quizzesData = await fetchQuizzes();
        console.log("Quizzes loaded:", quizzesData);

        // For each quiz, try to fetch its options
        const quizzesWithOptions = await Promise.all(
          quizzesData.map(async (quiz) => {
            try {
              console.log(`Fetching options for quiz ${quiz.id}...`);
              const options = await fetchQuizOptions(quiz.id);
              console.log(`Options for quiz ${quiz.id}:`, options);
              return { ...quiz, options };
            } catch (error) {
              console.error(
                `Failed to fetch options for quiz ${quiz.id}:`,
                error
              );
              return { ...quiz, options: [] };
            }
          })
        );

        console.log("Final quizzes with options:", quizzesWithOptions);
        setQuizzes(quizzesWithOptions);
      } catch (err) {
        console.error("Error loading quizzes:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadQuizzes();
  }, []);

  const handleAnswer = (quizId, selectedOption, correctAnswer) => {
    if (!selectedOption) return;

    setAnswers((prev) => ({ ...prev, [quizId]: selectedOption }));
    setFeedback((prev) => ({
      ...prev,
      [quizId]:
        selectedOption === correctAnswer ? "✅ Correct!" : "❌ Wrong answer.",
    }));
  };

  const resetQuiz = () => {
    setAnswers({});
    setFeedback({});
  };

  const getScore = () => {
    const correctAnswers = Object.values(feedback).filter((f) =>
      f.includes("✅")
    ).length;
    return { correct: correctAnswers, total: Object.keys(feedback).length };
  };

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

  if (quizzes.length === 0) {
    return (
      <div className="empty-state">
        <p>No quizzes available.</p>
        <p>Create some quizzes first to start taking them!</p>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h2>Take All Quizzes</h2>
        <p>Answer all questions and get instant feedback</p>

        {Object.keys(feedback).length > 0 && (
          <div className="score-summary">
            <p>
              Score: {getScore().correct} / {getScore().total}
              {getScore().total > 0 && (
                <span>
                  {" "}
                  ({Math.round((getScore().correct / getScore().total) * 100)}%)
                </span>
              )}
            </p>
            <button onClick={resetQuiz} className="btn btn-outline">
              Reset Quiz
            </button>
          </div>
        )}
      </div>

      <div className="quiz-container">
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="quiz-card quiz-take">
            <div className="quiz-card-header">
              <div className="quiz-meta">
                <span
                  className={`badge badge-${
                    quiz.difficulty?.toLowerCase() || "medium"
                  }`}
                >
                  {quiz.category}
                </span>
                <span className="difficulty">{quiz.difficulty}</span>
              </div>
            </div>

            <h3 className="quiz-question">{quiz.question}</h3>

            <div className="quiz-answer-section">
              {Array.isArray(quiz.options) && quiz.options.length > 0 ? (
                <div className="select-container">
                  <label htmlFor={`quiz-${quiz.id}`} className="select-label">
                    Choose your answer:
                  </label>
                  <select
                    id={`quiz-${quiz.id}`}
                    value={answers[quiz.id] || ""}
                    onChange={(e) =>
                      handleAnswer(quiz.id, e.target.value, quiz.correct_answer)
                    }
                    disabled={!!answers[quiz.id]}
                    className={`quiz-select ${
                      answers[quiz.id]
                        ? answers[quiz.id] === quiz.correct_answer
                          ? "correct"
                          : "incorrect"
                        : ""
                    }`}
                  >
                    <option value="">-- Select an answer --</option>
                    {quiz.options.map((option, index) => (
                      <option
                        key={option.id || index}
                        value={option.option_text}
                      >
                        {option.option_text}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div className="no-options">
                  <p>No options available for this quiz.</p>
                  <p className="debug-info">
                    Debug: Quiz ID {quiz.id}, Options:{" "}
                    {JSON.stringify(quiz.options)}
                  </p>
                </div>
              )}
            </div>

            {feedback[quiz.id] && (
              <div
                className={`feedback ${
                  feedback[quiz.id].includes("✅") ? "success" : "error"
                }`}
              >
                <p className="feedback-text">{feedback[quiz.id]}</p>
                {feedback[quiz.id].includes("❌") && (
                  <p className="correct-answer">
                    Correct answer: {quiz.correct_answer}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuizTake;
