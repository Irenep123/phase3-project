#from sqlalchemy.ext.declarative import declarative_base
#from sqlalchemy import Column, Interger, Text
#Base = declarative_base()

from sqlalchemy.ext.declarative import declarative_base
Base = declarative_base()

# Example model
from database import engine 

from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Quiz(Base):
    __tablename__ = 'quizzes'
    id = Column(Integer, primary_key=True, index=True)
    category = Column(String)
    difficulty = Column(String)
    question = Column(String)
    correct_answer = Column(String)
    type = Column(String)

    options = relationship("Option", back_populates="quiz")

class Option(Base):
    __tablename__ = 'options'
    id = Column(Integer, primary_key=True, index=True)
    quiz_id = Column(Integer, ForeignKey('quizzes.id'))
    option_text = Column(String)
    is_correct = Column(Boolean)

    quiz = relationship("Quiz", back_populates="options")
