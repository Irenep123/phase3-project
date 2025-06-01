import React, { useEffect, useState } from "react";
import { fetchQuiz } from "../api";

function QuizView({ quizId }) {
  const [quiz, setQuiz] = useState(null);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    fetchQuiz(quizId).then(setQuiz);
  }, [quizId]);

  const handleSelect = (index) => {
    setSelected(index);
    setFeedback(
      quiz.options[index].is_correct ? "✅ Correct!" : "❌ Incorrect!"
    );
  };

  if (!quiz) return <div>Loading...</div>;

  return (
    <div>
      <h2>{quiz.question}</h2>
      <ul>
        {quiz.options.map((opt, idx) => (
          <li key={idx}>
            <button onClick={() => handleSelect(idx)}>{opt.option_text}</button>
          </li>
        ))}
      </ul>
      {feedback && <p>{feedback}</p>}
    </div>
  );
}

export default QuizView;
