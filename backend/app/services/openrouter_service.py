"""
backend/app/services/openrouter_service.py

Reliable OpenRouter Chat Completions client.

Public API
──────────
  ask_openrouter(prompt: str) -> str
      Accepts a plain-text prompt, calls
      https://openrouter.ai/api/v1/chat/completions with
      model mistralai/mistral-7b-instruct, and returns the
      generated reply as a clean string.

Error handling
──────────────
  All recoverable errors surface as OpenRouterError (subclass of RuntimeError)
  so callers can catch a single, typed exception.
"""

from __future__ import annotations

import os
import logging
from typing import Any

import requests
from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger(__name__)

# ── Configuration ───────────────────────────────────────────────────────────

_API_URL     = "https://openrouter.ai/api/v1/chat/completions"
_MODEL       = os.getenv("OPENROUTER_MODEL", "mistralai/mistral-7b-instruct")
_SITE_URL    = os.getenv("SITE_URL",  "http://localhost:3000")
_SITE_NAME   = os.getenv("SITE_NAME", "Portfolio AI Assistant")
_TIMEOUT     = int(os.getenv("OPENROUTER_TIMEOUT", "30"))   # seconds
_MAX_TOKENS  = int(os.getenv("OPENROUTER_MAX_TOKENS", "512"))
_TEMPERATURE = float(os.getenv("OPENROUTER_TEMPERATURE", "0.7"))


def _api_key() -> str:
    """
    Return the OpenRouter API key from the environment.
    Raises OpenRouterError immediately if the key is absent so the problem
    is reported at call time rather than producing a confusing 401 later.
    """
    key = os.getenv("OPENROUTER_API_KEY", "").strip()
    if not key:
        raise OpenRouterError(
            "OPENROUTER_API_KEY is not set. "
            "Copy backend/.env.example to backend/.env and add your key."
        )
    return key


def _build_headers() -> dict[str, str]:
    return {
        "Authorization": f"Bearer {_api_key()}",
        "HTTP-Referer":  _SITE_URL,
        "X-Title":       _SITE_NAME,
        "Content-Type":  "application/json",
    }


def _parse_response(data: dict[str, Any]) -> str:
    """
    Extract the assistant message text from a chat-completions response.

    Expected shape:
        { "choices": [ { "message": { "content": "..." } } ] }

    Raises:
        OpenRouterError: If the JSON structure is missing expected keys,
                         the content is empty, or a model-level error is
                         present in the response body.
    """
    # Surface model-level errors (e.g. context-length exceeded)
    if "error" in data:
        err = data["error"]
        code = err.get("code", "unknown")
        msg  = err.get("message", str(err))
        raise OpenRouterError(f"Model error [{code}]: {msg}")

    try:
        choices = data["choices"]
        if not choices:
            raise OpenRouterError("OpenRouter returned an empty choices list.")

        content: str = choices[0]["message"]["content"]
    except (KeyError, IndexError, TypeError) as exc:
        raise OpenRouterError(
            f"Unexpected response structure from OpenRouter: {data}"
        ) from exc

    text = content.strip()
    if not text:
        raise OpenRouterError("OpenRouter returned an empty reply.")

    return text


# ── Public API ─────────────────────────────────────────────────────────────

class OpenRouterError(RuntimeError):
    """
    Raised for any failure in the OpenRouter integration:
      - Missing API key
      - Network / timeout errors
      - Non-200 HTTP status
      - Unexpected or empty response
      - Model-level errors in the response body
    """


def ask_openrouter(
    prompt: str,
    *,
    max_tokens:  int   = _MAX_TOKENS,
    temperature: float = _TEMPERATURE,
) -> str:
    """
    Send a plain-text prompt to OpenRouter and return the generated reply.

    The prompt is sent as a single ``user`` message so that it carries the
    full system context assembled by ``context_builder.build_prompt()``.

    Args:
        prompt:      The complete prompt string (system context + user question).
        max_tokens:  Maximum reply length in tokens (default: 512, overridable
                     via ``OPENROUTER_MAX_TOKENS`` env var).
        temperature: Sampling temperature — 0 is deterministic, 1 is creative
                     (default: 0.7, overridable via ``OPENROUTER_TEMPERATURE``).

    Returns:
        The assistant's reply as a plain, stripped string.

    Raises:
        OpenRouterError: For any failure — missing key, network issue,
                         bad status code, or malformed response.

    Example::

        from app.services.openrouter_service import ask_openrouter, OpenRouterError

        try:
            reply = ask_openrouter(prompt)
        except OpenRouterError as exc:
            # surface to caller as 502
            ...
    """
    payload: dict[str, Any] = {
        "model":       _MODEL,
        "messages":    [{"role": "user", "content": prompt.strip()}],
        "max_tokens":  max_tokens,
        "temperature": temperature,
    }

    logger.debug("POST %s  model=%s  prompt_len=%d", _API_URL, _MODEL, len(prompt))

    # ── Network call with explicit timeout ────────────────────────────────
    try:
        response = requests.post(
            _API_URL,
            headers=_build_headers(),
            json=payload,
            timeout=_TIMEOUT,
        )
    except requests.exceptions.Timeout:
        raise OpenRouterError(
            f"OpenRouter request timed out after {_TIMEOUT}s. "
            "Try a shorter prompt or increase OPENROUTER_TIMEOUT."
        )
    except requests.exceptions.ConnectionError as exc:
        raise OpenRouterError(
            f"Could not reach OpenRouter API ({_API_URL}): {exc}"
        ) from exc
    except requests.exceptions.RequestException as exc:
        # Catch-all for any other requests-level failure
        raise OpenRouterError(f"HTTP request failed: {exc}") from exc

    # ── HTTP status check ────────────────────────────────────────────────
    if response.status_code == 401:
        raise OpenRouterError(
            "OpenRouter rejected the API key (401 Unauthorized). "
            "Verify OPENROUTER_API_KEY in backend/.env."
        )
    if response.status_code == 429:
        retry_after = response.headers.get("Retry-After", "unknown")
        raise OpenRouterError(
            f"OpenRouter rate limit exceeded (429). "
            f"Retry after: {retry_after}s."
        )
    if response.status_code >= 500:
        raise OpenRouterError(
            f"OpenRouter server error ({response.status_code}): {response.text[:300]}"
        )
    if response.status_code != 200:
        raise OpenRouterError(
            f"OpenRouter returned HTTP {response.status_code}: {response.text[:300]}"
        )

    # ── Parse and validate the response body ─────────────────────────────
    try:
        data: dict[str, Any] = response.json()
    except ValueError as exc:
        raise OpenRouterError(
            f"OpenRouter response is not valid JSON: {response.text[:300]}"
        ) from exc

    text = _parse_response(data)
    logger.debug("OpenRouter reply length: %d chars", len(text))
    return text
