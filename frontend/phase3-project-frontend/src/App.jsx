import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import QuizList from "./components/QuizList";
import QuizView from "./components/QuizView";
import QuizCreate from "./components/QuizCreate";
import QuizTake from "./components/QuizTake";

import "./App.css";

function Navigation() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="header">
      <div className="container">
        <div className="nav-content">
          <h1 className="logo">QuizQuest</h1>
          <nav className="nav">
            <Link
              to="/"
              className={`nav-link ${isActive("/") ? "active" : ""}`}
            >
              Home
            </Link>
            <Link
              to="/create"
              className={`nav-link ${isActive("/create") ? "active" : ""}`}
            >
              Create
            </Link>

            <Link
              to="/take"
              className={`nav-link btn-primary ${
                isActive("/take") ? "active" : ""
              }`}
            >
              Take Quiz
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<QuizList />} />
            <Route path="/quiz/:quizId" element={<QuizView />} />
            <Route path="/create" element={<QuizCreate />} />
            <Route path="/take" element={<QuizTake />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
