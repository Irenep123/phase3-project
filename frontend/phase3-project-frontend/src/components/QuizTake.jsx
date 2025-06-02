import React, { useEffect, useState } from "react";
import { fetchQuizzes } from "../api";

function QuizTakeAll() {
  const [quizzes, setQuizzes] = useState([]);
  const [answers, setAnswers] = useState({}); // Track answers per quiz ID
  const [feedback, setFeedback] = useState({}); // Track feedback per quiz ID

  useEffect(() => {
    fetchQuizzes().then(setQuizzes);
  }, []);

  const handleAnswer = (quizId, selected, correct) => {
    setAnswers({ ...answers, [quizId]: selected });
    setFeedback({
      ...feedback,
      [quizId]: selected === correct ? "✅ Correct!" : "❌ Wrong answer.",
    });
  };

  return (
    <div>
      <h2>Take All Quizzes</h2>
      {quizzes.map((quiz) => (
        <div key={quiz.id} style={{ marginBottom: "2rem" }}>
          <h4>{quiz.question}</h4>
          <ul>
            {quiz.options.map((opt) => (
              <li key={opt.id}>
                <button
                  disabled={answers[quiz.id]}
                  onClick={() =>
                    handleAnswer(quiz.id, opt.option_text, quiz.correct_answer)
                  }
                >
                  {opt.option_text}
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
