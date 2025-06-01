import React, { useState } from "react";
import { createQuiz } from "../api";

function QuizCreate() {
  const [quiz, setQuiz] = useState({
    category: "",
    difficulty: "",
    question: "",
    correct_answer: "",
    type: "multiple",
    options: [],
  });

  const [optionInputs, setOptionInputs] = useState(["", "", "", ""]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedOptions = optionInputs.map((text) => ({
      option_text: text,
      is_correct: text === quiz.correct_answer,
    }));
    const payload = { ...quiz, options: formattedOptions };
    await createQuiz(payload);
    alert("Quiz created!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New Quiz</h2>
      <input
        type="text"
        placeholder="Category"
        value={quiz.category}
        onChange={(e) => setQuiz({ ...quiz, category: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Difficulty"
        value={quiz.difficulty}
        onChange={(e) => setQuiz({ ...quiz, difficulty: e.target.value })}
        required
      />
      <textarea
        placeholder="Question"
        value={quiz.question}
        onChange={(e) => setQuiz({ ...quiz, question: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Correct Answer"
        value={quiz.correct_answer}
        onChange={(e) => setQuiz({ ...quiz, correct_answer: e.target.value })}
        required
      />
      <h4>Answer Options</h4>
      {optionInputs.map((opt, idx) => (
        <input
          key={idx}
          type="text"
          placeholder={`Option ${idx + 1}`}
          value={opt}
          onChange={(e) => {
            const newOpts = [...optionInputs];
            newOpts[idx] = e.target.value;
            setOptionInputs(newOpts);
          }}
          required
        />
      ))}
      <button type="submit">Create Quiz</button>
    </form>
  );
}

export default QuizCreate;
