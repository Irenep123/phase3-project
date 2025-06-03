QUIZQUEST – CUSTOM QUIZ BUILDER
QuizQuest is an interactive quiz application that allows users to create custom quizzes, take quizzes created by others, track scores, and browse quizzes by category. Built with React on the frontend and Python on the backend, this application provides a seamless quiz experience for both creators and participants.<BR>



USER STORIES
I can create a custom quiz<BR>
I can take quizzes made by others <BR>
I can track my quiz scores <BR>
I can browse quizzes by category <BR>



M.V.P.
Models/Entities and Relationships <BR>
User <BR>
Category <BR>
Quiz <BR>



RELATIONSHIPS
User - Quiz (One-to-Many)
One user can create multiple quizzes<BR>

Quiz - Question (One-to-Many)
Each quiz has multiple questions<BR>

Category - Quiz (One-to-Many)
Each quiz belongs to one category (Tech, Anime, Science)
A category can contain many quizzes<BR>



FEATURES
Quiz builder (questions, options, correct answers)<BR>
Score tracker after taking a quiz<BR>
Stored quizzes + results<BR>
Category browsing<BR>




TECH STACK
Frontend: JavaScript, React<BR>
Backend: Python<BR>
Database: SQLite<BR>
