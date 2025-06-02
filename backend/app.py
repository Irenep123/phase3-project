from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from  models import  Quiz ,Option, get_db
from schemas import QuizSchema, OptionSchema


from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get("/quizzes")
def get_quizzes(session: Session = Depends(get_db)):
    quizzes = session.query(Quiz).all()
    return quizzes


@app.post("/quizzes")
def add_quiz(quiz: QuizSchema, db: Session = Depends(get_db)):
    new_quiz = Quiz(**quiz.model_dump())
    db.add(new_quiz)
    db.commit()
    print("Product created successfully") 
    return new_quiz

# @app.get("/quizzes/{quiz_id}", response_model=schemas.Quiz)
# def read_quiz(quiz_id: int, db: Session = Depends(get_db)):
#     return crud.get_quiz(db, quiz_id)

# @app.post("/quizzes", response_model=schemas.Quiz)
# def create_quiz(quiz: schemas.QuizCreate, db: Session = Depends(get_db)):
#     return crud.create_quiz(db, quiz)