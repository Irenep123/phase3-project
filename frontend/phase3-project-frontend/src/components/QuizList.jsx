import React, { useEffect, useState } from "react";
import { fetchQuizzes } from "../api";

function QuizList() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    fetchQuizzes().then(setQuizzes);
  }, []);

  return (
    <div>
      <h2>All Quizzes</h2>
      <ul>
        {quizzes.map((q) => (
          <li key={q.id}>
            {q.question} ({q.category})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuizList;
