"""
backend/app/api/chat.py

POST /api/chat  — main endpoint consumed by the Next.js frontend.
GET  /api/chat/suggestions — returns seed questions for the chat UI.

Request body for POST:
    { "message": "...", "session_id": "...", "history": [...] }

The session_id and history fields are optional; when supplied the
client can maintain multi-turn context across page reloads.
"""

from __future__ import annotations

import logging
import uuid
from typing import Literal

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from app.database.db import log_message
from app.services.context_builder import build_prompt
from app.services.openrouter_service import ask_openrouter, OpenRouterError

logger = logging.getLogger(__name__)
router = APIRouter()


# ── Request / Response models ──────────────────────────────────────────────

class HistoryMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str


class ChatRequest(BaseModel):
    message:    str  = Field(..., min_length=1, max_length=1000, description="User question")
    session_id: str | None = Field(None, description="Opaque session identifier")
    history:    list[HistoryMessage] = Field(
        default_factory=list,
        description="Prior conversation turns (newest last, max 10 honoured)",
    )


class ChatResponse(BaseModel):
    response:   str = Field(..., description="AI-generated answer")
    session_id: str = Field(..., description="Session identifier (echo or newly generated)")


# ── POST /api/chat ─────────────────────────────────────────────────────────

@router.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest) -> ChatResponse:
    """
    Accepts a user question about the portfolio owner and returns an
    AI-generated answer grounded in resume data.

    - session_id is generated server-side when not supplied by the client.
    - history (up to last 10 turns) is included in the prompt so the model
      can give contextually coherent follow-up answers.
    """
    session_id = request.session_id or str(uuid.uuid4())

    # 1. Log incoming user message
    log_message("user", request.message)

    # 2. Build full prompt string (system context + optional history + question)
    history_dicts = [
        {"role": h.role, "content": h.content}
        for h in request.history[-10:]
    ]
    prompt: str = build_prompt(request.message, history=history_dicts)

    # 3. Call OpenRouter
    try:
        answer = ask_openrouter(prompt)
    except OpenRouterError as exc:
        logger.error("OpenRouter error [session=%s]: %s", session_id, exc)
        log_message("error", str(exc))
        raise HTTPException(status_code=502, detail=str(exc))

    # 4. Log assistant reply
    log_message("assistant", answer)

    return ChatResponse(response=answer, session_id=session_id)


# ── GET /api/chat/suggestions ──────────────────────────────────────────────

@router.get("/chat/suggestions")
def suggestions() -> dict:
    """Return seed questions to populate the chat UI quick-prompt buttons."""
    return {
        "questions": [
            "What projects has Hanzala built?",
            "What are his main technical skills?",
            "Explain the MarketMuse AI project.",
            "What certifications does he hold?",
            "Has he worked with RAG or LLMs?",
            "What databases and cloud platforms does he use?",
        ]
    }
