"""
backend/app/database/db.py

Lightweight SQLite chat logger using only the Python standard library.

Schema
------
  chat_logs
    id        INTEGER  PRIMARY KEY AUTOINCREMENT
    role      TEXT     NOT NULL   -- "user" | "assistant" | "error"
    message   TEXT     NOT NULL
    timestamp TEXT     NOT NULL   -- ISO-8601 UTC, e.g. "2026-02-21T14:30:00.123456"

Public API
----------
  init_db()                   -- create the DB file + table if they don't exist
  log_message(role, message)  -- insert one row; silently swallows errors so
                                 logging never breaks the chat flow
"""

from __future__ import annotations

import logging
import sqlite3
import threading
from datetime import datetime, timezone
from pathlib import Path

logger = logging.getLogger(__name__)

# ── Paths ──────────────────────────────────────────────────────────────────

_DB_DIR:  Path = Path(__file__).parent
_DB_PATH: Path = _DB_DIR / "chat_logs.db"

# ── Thread safety ──────────────────────────────────────────────────────────
# SQLite connections are not thread-safe by default.  We keep one shared
# connection (check_same_thread=False) guarded by a reentrant lock so that
# concurrent FastAPI worker threads can safely log without contention.

_lock:       threading.Lock      = threading.Lock()
_connection: sqlite3.Connection | None = None


# ── DDL ────────────────────────────────────────────────────────────────────

_CREATE_TABLE_SQL = """
CREATE TABLE IF NOT EXISTS chat_logs (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    role      TEXT    NOT NULL,
    message   TEXT    NOT NULL,
    timestamp TEXT    NOT NULL
);
"""

_CREATE_INDEX_SQL = """
CREATE INDEX IF NOT EXISTS idx_chat_logs_timestamp
    ON chat_logs (timestamp);
"""


# ── Internal helpers ───────────────────────────────────────────────────────

def _get_connection() -> sqlite3.Connection:
    """
    Return the module-level SQLite connection, creating it on first call.
    Must be called with _lock held.
    """
    global _connection
    if _connection is None:
        _DB_DIR.mkdir(parents=True, exist_ok=True)
        _connection = sqlite3.connect(
            str(_DB_PATH),
            check_same_thread=False,   # guarded by _lock
            isolation_level=None,       # autocommit
        )
        _connection.execute("PRAGMA journal_mode=WAL;")   # better concurrency
        _connection.execute("PRAGMA synchronous=NORMAL;") # safe + fast
    return _connection


def _utc_now() -> str:
    """Return current UTC time as an ISO-8601 string."""
    return datetime.now(tz=timezone.utc).isoformat()


# ── Public API ─────────────────────────────────────────────────────────────

def init_db() -> None:
    """
    Create the ``chat_logs`` table (and a timestamp index) if they do not
    already exist.  Safe to call multiple times — all statements use
    ``IF NOT EXISTS``.

    Called automatically at module import so the database is always ready
    before the first request arrives.
    """
    with _lock:
        conn = _get_connection()
        conn.execute(_CREATE_TABLE_SQL)
        conn.execute(_CREATE_INDEX_SQL)
    logger.info("chat_logs DB initialised at %s", _DB_PATH)


def log_message(role: str, message: str) -> None:
    """
    Insert one row into ``chat_logs``.

    Args:
        role:    Speaker identifier — typically ``"user"`` or ``"assistant"``.
                 Pass ``"error"`` to log failed exchanges.
        message: The raw text to persist.

    This function never raises.  Any database error is caught and logged at
    WARNING level so that a storage failure never interrupts the chat flow.
    """
    timestamp = _utc_now()
    try:
        with _lock:
            conn = _get_connection()
            conn.execute(
                "INSERT INTO chat_logs (role, message, timestamp) VALUES (?, ?, ?);",
                (role, message, timestamp),
            )
        logger.debug("chat_logs ← [%s] %d chars at %s", role, len(message), timestamp)
    except Exception as exc:  # noqa: BLE001
        logger.warning("Failed to log chat message (role=%s): %s", role, exc)


# ── Auto-init on import ────────────────────────────────────────────────────
# Ensures the table exists as soon as this module is imported, with no
# explicit setup step required by the caller.

init_db()
