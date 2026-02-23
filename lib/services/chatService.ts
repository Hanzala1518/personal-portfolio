/**
 * lib/services/chatService.ts
 *
 * Frontend API service for the AI portfolio assistant.
 * All communication with the backend is funnelled through this module so
 * the rest of the UI never touches fetch() or response parsing directly.
 *
 * Base URL is driven by NEXT_PUBLIC_CHAT_API (defaults to /api so it hits
 * the built-in Next.js proxy at app/api/chat/route.ts).
 */

import type { ChatRequest, ChatResponse } from "@/types/chat"

// ── Config ─────────────────────────────────────────────────────────────────

/**
 * Base URL for the chat API.
 *   • Local dev  → "" (empty) → resolves to /api/chat on the same origin
 *   • Override   → set NEXT_PUBLIC_CHAT_API=https://your-backend.com/api
 */
const BASE_URL =
  process.env.NEXT_PUBLIC_CHAT_API?.replace(/\/$/, "") ?? ""

const CHAT_ENDPOINT = `${BASE_URL}/api/chat`

const DEFAULT_TIMEOUT_MS = 30_000

// ── Typed error ────────────────────────────────────────────────────────────

/** Thrown by this service on any non-successful outcome. */
export class ChatServiceError extends Error {
  constructor(
    message: string,
    /** HTTP status code when available, 0 for network-level failures. */
    public readonly status: number = 0,
  ) {
    super(message)
    this.name = "ChatServiceError"
  }
}

// ── Internal helpers ───────────────────────────────────────────────────────

/** Parse a Response body as JSON, or throw a ChatServiceError. */
async function parseResponse(res: Response): Promise<ChatResponse> {
  let body: unknown

  try {
    body = await res.json()
  } catch {
    throw new ChatServiceError(
      `Server returned non-JSON response (HTTP ${res.status})`,
      res.status,
    )
  }

  if (!res.ok) {
    const detail =
      (body as { error?: string; detail?: string })?.error ??
      (body as { error?: string; detail?: string })?.detail ??
      `Request failed with status ${res.status}`
    throw new ChatServiceError(detail, res.status)
  }

  const data = body as ChatResponse
  if (typeof data.response !== "string") {
    throw new ChatServiceError(
      'Invalid response shape: missing "response" field',
      res.status,
    )
  }

  return data
}

// ── Public API ─────────────────────────────────────────────────────────────

/**
 * Send a full ChatRequest to the backend and return the raw ChatResponse.
 * Use this when you need session continuity (session_id + history).
 *
 * @throws {ChatServiceError} on network failure, timeout, or API error.
 */
export async function sendChatRequest(
  request: ChatRequest,
): Promise<ChatResponse> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS)

  try {
    const res = await fetch(CHAT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
      signal: controller.signal,
    })

    return await parseResponse(res)
  } catch (err) {
    if (err instanceof ChatServiceError) throw err

    if (err instanceof DOMException && err.name === "AbortError") {
      throw new ChatServiceError(
        "Request timed out. The AI assistant took too long to respond.",
        0,
      )
    }

    const msg =
      err instanceof Error ? err.message : "Unexpected network error."

    // Surface a user-friendly hint when the backend is simply offline
    if (
      msg.includes("ECONNREFUSED") ||
      msg.includes("fetch failed") ||
      msg.includes("Failed to fetch") ||
      msg.includes("NetworkError")
    ) {
      throw new ChatServiceError(
        "AI assistant is currently unavailable. Please try again later.",
        0,
      )
    }

    throw new ChatServiceError(msg, 0)
  } finally {
    clearTimeout(timer)
  }
}

/**
 * Convenience wrapper — send a single message and return the assistant's
 * reply as a plain string.
 *
 * @param message  The user's message text.
 * @returns        The assistant's response string.
 * @throws {ChatServiceError}
 */
export async function sendMessage(message: string): Promise<string> {
  const payload: ChatRequest = { message }
  const { response } = await sendChatRequest(payload)
  return response
}
