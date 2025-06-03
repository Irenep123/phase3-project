import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import QuizList from './components/QuizList';
import QuizView from './components/QuizView';
import QuizCreate from './components/QuizCreate';
import QuizTake from './components/QuizTake';
function App() {
  return (
    <Router>
      <div className="App">
        <h1>QuizQuest</h1>
        <nav>
          <Link to="/">Home</Link> | <Link to="/create">Create Quiz</Link>|{" "}
          <Link to="/take">Take Quizzes</Link>
        </nav>

        <Routes>
          <Route path="/" element={<QuizList />} />
          <Route path="/quiz" element={<QuizView />} />
          <Route path="/create" element={<QuizCreate />} />
          <Route path="/take" element={<QuizTake/>} />
        </Routes>
      </div>
    </Router>
  );
}

// This wrapper is necessary to access the dynamic :quizId route param
// import { useParams } from 'react-router-dom';

// function QuizViewWrapper() {
//   const { quizId } = useParams();
//   return <QuizView quizId={quizId} />;
// }

// function QuizTakeWrapper() {
//   const { quizId } = useParams();
//   return <QuizTake quizId={ quizId }/>
// }
 export default App;
