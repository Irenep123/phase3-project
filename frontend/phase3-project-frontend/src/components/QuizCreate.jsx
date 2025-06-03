"use client";

import { useState } from "react";
import { createQuiz, createOption } from "../api";

function QuizCreate() {
  const [quiz, setQuiz] = useState({
    category: "",
    difficulty: "",
    question: "",
    correct_answer: "",
    type: "multiple",
  });

  const [optionInputs, setOptionInputs] = useState(["", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMethod, setSubmitMethod] = useState("combined"); // "combined" or "separate"

  const handleSubmitCombined = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const validOptions = optionInputs.filter((text) => text.trim() !== "");

      if (validOptions.length < 2) {
        alert("Please provide at least 2 answer options!");
        setIsSubmitting(false);
        return;
      }

      const correctAnswerExists = validOptions.some(
        (option) => option.trim() === quiz.correct_answer.trim()
      );

      if (!correctAnswerExists) {
        alert(
          "The correct answer must match one of the provided options exactly!"
        );
        setIsSubmitting(false);
        return;
      }

      // Format options for combined request
      const formattedOptions = validOptions.map((text) => ({
        option_text: text.trim(),
        is_correct: text.trim() === quiz.correct_answer.trim(),
      }));

      const payload = {
        category: quiz.category.trim(),
        difficulty: quiz.difficulty,
        question: quiz.question.trim(),
        correct_answer: quiz.correct_answer.trim(),
        type: quiz.type,
        options: formattedOptions,
      };

      console.log("Attempting combined creation with payload:", payload);

      const result = await createQuiz(payload);
      console.log("Quiz created successfully:", result);

      alert("Quiz created successfully!");
      resetForm();
    } catch (error) {
      console.error("Combined creation failed:", error);
      alert(`Failed to create quiz: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitSeparate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const validOptions = optionInputs.filter((text) => text.trim() !== "");

      if (validOptions.length < 2) {
        alert("Please provide at least 2 answer options!");
        setIsSubmitting(false);
        return;
      }

      const correctAnswerExists = validOptions.some(
        (option) => option.trim() === quiz.correct_answer.trim()
      );

      if (!correctAnswerExists) {
        alert(
          "The correct answer must match one of the provided options exactly!"
        );
        setIsSubmitting(false);
        return;
      }

      // Step 1: Create quiz without options
      const quizPayload = {
        category: quiz.category.trim(),
        difficulty: quiz.difficulty,
        question: quiz.question.trim(),
        correct_answer: quiz.correct_answer.trim(),
        type: quiz.type,
      };

      console.log("Step 1: Creating quiz without options:", quizPayload);
      const createdQuiz = await createQuiz(quizPayload);
      console.log("Quiz created:", createdQuiz);

      // Step 2: Create options separately
      console.log("Step 2: Creating options...");
      const optionPromises = validOptions.map(async (text) => {
        const optionPayload = {
          quiz: createdQuiz.id,
          option_text: text.trim(),
          is_correct: text.trim() === quiz.correct_answer.trim(),
        };
        return createOption(optionPayload);
      });

      const createdOptions = await Promise.all(optionPromises);
      console.log("All options created:", createdOptions);

      alert("Quiz and options created successfully!");
      resetForm();
    } catch (error) {
      console.error("Separate creation failed:", error);
      alert(`Failed to create quiz: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setQuiz({
      category: "",
      difficulty: "",
      question: "",
      correct_answer: "",
      type: "multiple",
    });
    setOptionInputs(["", "", "", ""]);
  };

  const addOption = () => {
    setOptionInputs([...optionInputs, ""]);
  };

  const removeOption = (index) => {
    if (optionInputs.length > 2) {
      const newOptions = optionInputs.filter((_, i) => i !== index);
      setOptionInputs(newOptions);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <div className="page-header">
          <h2>Create New Quiz</h2>
          <p>Add a new quiz question with multiple choice answers</p>
        </div>

        <div className="method-selector">
          <label>
            <input
              type="radio"
              value="combined"
              checked={submitMethod === "combined"}
              onChange={(e) => setSubmitMethod(e.target.value)}
            />
            Combined Request (Quiz + Options together)
          </label>
          <label>
            <input
              type="radio"
              value="separate"
              checked={submitMethod === "separate"}
              onChange={(e) => setSubmitMethod(e.target.value)}
            />
            Separate Requests (Quiz first, then Options)
          </label>
        </div>

        <form
          onSubmit={
            submitMethod === "combined"
              ? handleSubmitCombined
              : handleSubmitSeparate
          }
          className="quiz-form"
        >
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <input
                id="category"
                type="text"
                placeholder="e.g., Geography, Math, Science"
                value={quiz.category}
                onChange={(e) => setQuiz({ ...quiz, category: e.target.value })}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="difficulty">Difficulty</label>
              <select
                id="difficulty"
                value={quiz.difficulty}
                onChange={(e) =>
                  setQuiz({ ...quiz, difficulty: e.target.value })
                }
                className="form-select"
                required
              >
                <option value="">Select difficulty</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="question">Question</label>
            <textarea
              id="question"
              placeholder="Enter your quiz question here..."
              value={quiz.question}
              onChange={(e) => setQuiz({ ...quiz, question: e.target.value })}
              rows={3}
              className="form-textarea"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="correct_answer">Correct Answer</label>
            <input
              id="correct_answer"
              type="text"
              placeholder="Enter the correct answer (must match one of the options exactly)"
              value={quiz.correct_answer}
              onChange={(e) =>
                setQuiz({ ...quiz, correct_answer: e.target.value })
              }
              className="form-input"
              required
            />
            <small className="form-hint">
              This must exactly match one of the answer options below
            </small>
          </div>

          <div className="form-group">
            <div className="options-header">
              <label>Answer Options</label>
              <button
                type="button"
                onClick={addOption}
                className="btn btn-outline btn-small"
              >
                Add Option
              </button>
            </div>
            <div className="options-container">
              {optionInputs.map((opt, idx) => (
                <div key={idx} className="option-input">
                  <label className="option-label">Option {idx + 1}</label>
                  <div className="option-input-group">
                    <input
                      type="text"
                      placeholder={`Enter option ${idx + 1}`}
                      value={opt}
                      onChange={(e) => {
                        const newOpts = [...optionInputs];
                        newOpts[idx] = e.target.value;
                        setOptionInputs(newOpts);
                      }}
                      className="form-input"
                      required={idx < 2}
                    />
                    {optionInputs.length > 2 && (
                      <button
                        type="button"
                        onClick={() => removeOption(idx)}
                        className="btn btn-outline btn-small remove-btn"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="preview-section">
            <h4>Preview</h4>
            <div className="preview-content">
              <p>
                <strong>Question:</strong>{" "}
                {quiz.question || "Enter your question above"}
              </p>
              <p>
                <strong>Method:</strong>{" "}
                {submitMethod === "combined"
                  ? "Combined Request"
                  : "Separate Requests"}
              </p>
              <p>
                <strong>Options:</strong>
              </p>
              <ul>
                {optionInputs
                  .filter((opt) => opt.trim() !== "")
                  .map((opt, idx) => (
                    <li
                      key={idx}
                      className={
                        opt.trim() === quiz.correct_answer.trim()
                          ? "correct-preview"
                          : ""
                      }
                    >
                      {opt}{" "}
                      {opt.trim() === quiz.correct_answer.trim() &&
                        "✓ (Correct)"}
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary btn-large"
            >
              {isSubmitting
                ? "Creating..."
                : `Create Quiz (${
                    submitMethod === "combined" ? "Combined" : "Separate"
                  })`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default QuizCreate;
