from pydantic import BaseModel


class User(BaseModel):
    email: str
    password: str


class Log(BaseModel):
    name: str
    type: str
    date: str