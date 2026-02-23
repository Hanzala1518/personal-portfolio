// lib/hooks/useChat.ts
// Manages AI chat state: messages, loading, error, and session tracking.

"use client"

import { useState, useCallback, useRef } from "react"
import type { UIChatMessage, ChatRequest, ChatResponse, ChatRole } from "@/types/chat"
import { sendChatRequest, ChatServiceError } from "@/lib/services/chatService"

const uid = () => crypto.randomUUID()

const WELCOME_MESSAGE: UIChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Hi! I'm Hanzala's AI assistant. Ask me anything about his projects, skills, or experience. For example: \"What projects has he built?\" or \"Explain MarketMuse AI\".",
  timestamp: new Date(),
}

interface UseChatReturn {
  messages: UIChatMessage[]
  isLoading: boolean
  error: string | null
  sendMessage: (text: string) => Promise<void>
  clearChat: () => void
}

export function useChat(): UseChatReturn {
  const [messages, setMessages] = useState<UIChatMessage[]>([WELCOME_MESSAGE])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const sessionIdRef = useRef<string>(uid())

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || isLoading) return

    setError(null)

    // Optimistically add user message
    const userMsg: UIChatMessage = {
      id: uid(),
      role: "user",
      content: trimmed,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMsg])
    setIsLoading(true)

    try {
      // Build history (exclude welcome & error messages)
      const history = messages
        .filter((m) => m.id !== "welcome" && m.role !== "error")
        .map((m) => ({ role: m.role as ChatRole, content: m.content }))

      const body: ChatRequest = {
        message: trimmed,
        session_id: sessionIdRef.current,
        history,
      }

      const data: ChatResponse = await sendChatRequest(body)

      // Store session id returned by backend after first turn
      sessionIdRef.current = data.session_id

      const assistantMsg: UIChatMessage = {
        id: uid(),
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMsg])
    } catch (err) {
      const message =
        err instanceof ChatServiceError
          ? err.message
          : err instanceof Error
            ? err.message
            : "Unexpected error. Please try again."
      setError(message)
      setMessages((prev) => [
        ...prev,
        {
          id: uid(),
          role: "error",
          content: `⚠ ${message}`,
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }, [messages, isLoading])

  const clearChat = useCallback(() => {
    sessionIdRef.current = uid()
    setMessages([WELCOME_MESSAGE])
    setError(null)
  }, [])

  return { messages, isLoading, error, sendMessage, clearChat }
}
