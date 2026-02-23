"""
backend/app/main.py
Entry point for the Portfolio AI Assistant FastAPI application.
"""

from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.chat import router as chat_router
from app.database.db import init_db


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Run startup tasks (DB initialisation) before serving requests."""
    init_db()
    yield


app = FastAPI(
    title="Portfolio AI Assistant",
    description="Answers recruiter questions about Hanzala Saify's portfolio.",
    version="1.0.0",
    lifespan=lifespan,
)

# Allow requests from the Next.js frontend (adjust origin in production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
        "https://yourportfolio.com",   # replace with your deployed domain
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(chat_router, prefix="/api")


@app.get("/health")
def health() -> dict:
    """Simple liveness check."""
    return {"status": "ok", "service": "portfolio-ai-assistant"}
