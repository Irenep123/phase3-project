QuizQuest – Custom Quiz Builder
QuizQuest is an interactive quiz application that allows users to create custom quizzes, take quizzes created by others, track scores, and browse quizzes by category. Built with React on the frontend and Python on the backend, this application provides a seamless quiz experience for both creators and participants.

User Stories
I can create a custom quiz
I can take quizzes made by others
I can track my quiz scores
I can browse quizzes by category
M.V.P.
Models/Entities and Relationships
User
Category
Quiz

Relationships
User - Quiz (One-to-Many)
One user can create multiple quizzes

Quiz - Question (One-to-Many)
Each quiz has multiple questions

Category - Quiz (One-to-Many)
Each quiz belongs to one category (Tech, Anime, Science)
A category can contain many quizzes

Features
Quiz builder (questions, options, correct answers)
Score tracker after taking a quiz
Stored quizzes + results
Category browsing
Public API integration (OpenTDB)
Tech Stack
Frontend: JavaScript, React
Backend: Python
Database: SQLite
