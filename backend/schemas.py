from pydantic import BaseModel

class QuizSchema(BaseModel):
    category: str
    difficulty: str
    question: str
    correct_answer: str
    type: str


class OptionSchema(BaseModel):
    name: str
    category_id: int
    correct_answer:str