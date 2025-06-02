import React from 'react';
import QuizList from "./components/QuizList";
import QuizView from "./components/QuizView";
import QuizCreate from "./components/QuizCreate";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>QuizQuest</h1>
      <QuizList />
    </div>
  );
}

export default App;
