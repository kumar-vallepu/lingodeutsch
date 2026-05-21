from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

from ai.tutor import generate_reply

router = APIRouter()


class Message(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    messages: List[Message]


@router.post("/chat")
def chat(request: ChatRequest):

    messages = [
        {
            "role": msg.role,
            "content": msg.content
        }
        for msg in request.messages
    ]

    reply = generate_reply(messages)

    return {
        "reply": reply
    }