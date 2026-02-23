/**
 * types/chat.ts
 * Shared TypeScript types for the AI chat assistant.
 */

// ── Core public types ──────────────────────────────────────────────────────

/** The two roles that exist in a real conversation turn. */
export type ChatRole = "user" | "assistant"

/** A single message in a conversation. */
export interface ChatMessage {
  /** Unique identifier for the message. */
  id: string
  role: ChatRole
  content: string
  timestamp: Date
}

/** Payload sent to POST /api/chat. */
export interface ChatRequest {
  message: string
  /** Optional session identifier for multi-turn continuity. */
  session_id?: string
  /** Prior conversation turns (optional for single-shot queries). */
  history?: Array<{ role: ChatRole; content: string }>
}

/** Payload returned by POST /api/chat. */
export interface ChatResponse {
  response: string
  /** Session identifier echoed back or newly created by the backend. */
  session_id: string
  /** Name of the model that produced the response. */
  model: string
}

// ── UI-layer extension ─────────────────────────────────────────────────────

/**
 * Extends ChatMessage with an "error" role used by the chat UI to render
 * inline error states without polluting the public ChatRole type.
 */
export type UIChatMessage = Omit<ChatMessage, "role"> & {
  role: ChatRole | "error"
}
