"use client"

import { useEffect, useRef } from "react"
import { X, RotateCcw, Bot, Sparkles } from "lucide-react"

import type { UIChatMessage } from "@/types/chat"
import ChatMessage  from "@/components/ai-chat/ChatMessage"
import ChatInput    from "@/components/ai-chat/ChatInput"
import QuickPrompts from "@/components/ai-chat/QuickPrompts"

interface ChatWindowProps {
  messages:  UIChatMessage[]
  isLoading: boolean
  onSend:    (text: string) => void
  onClear:   () => void
  onClose:   () => void
}

export default function ChatWindow({
  messages,
  isLoading,
  onSend,
  onClear,
  onClose,
}: ChatWindowProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto-scroll whenever messages or loading state changes
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" })
  }, [messages, isLoading])

  const showQuickPrompts = messages.length <= 1 && !isLoading

  return (
    <div className="flex h-full flex-col">

      {/* ── Header ───────────────────────────────────────────────────── */}
      <div className="flex shrink-0 items-center justify-between border-b border-matrix-dark/60 bg-matrix-black/70 px-4 py-3">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="relative flex h-8 w-8 items-center justify-center rounded-full border border-matrix-green/30 bg-gradient-to-br from-matrix-green/20 to-matrix-green/5">
            <Bot className="h-4 w-4 text-matrix-green" />
            {/* Online dot */}
            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-matrix-darker bg-emerald-400" />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <p className="font-sans text-sm font-semibold text-matrix-white leading-none">
                Portfolio Assistant
              </p>
              <Sparkles className="h-3 w-3 text-matrix-green/60" />
            </div>
            <p className="font-mono text-[10px] text-matrix-grey/55 mt-0.5">
              Ask me anything about Hanzala
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-0.5">
          <button
            onClick={onClear}
            title="New conversation"
            aria-label="Clear conversation"
            className="rounded-lg p-1.5 text-matrix-grey/40 hover:bg-matrix-dark/60 hover:text-matrix-grey transition-colors duration-150"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={onClose}
            aria-label="Close assistant"
            className="rounded-lg p-1.5 text-matrix-grey/40 hover:bg-matrix-green/10 hover:text-matrix-green transition-colors duration-150"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* ── Message list ─────────────────────────────────────────────── */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto py-4 space-y-3 scroll-smooth"
        role="log"
        aria-label="Conversation"
        aria-live="polite"
      >
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}

        {/* Typing indicator */}
        {isLoading && (
          <div className="flex items-end gap-2.5 px-4">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-matrix-green/30 bg-matrix-green/10">
              <Bot className="h-3.5 w-3.5 text-matrix-green" />
            </div>
            <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm border border-matrix-dark/70 bg-matrix-dark px-4 py-3">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="block h-1.5 w-1.5 rounded-full bg-matrix-green/70 animate-bounce"
                  style={{ animationDelay: `${i * 0.18}s` }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Quick prompts (only on fresh window) ─────────────────────── */}
      {showQuickPrompts && (
        <QuickPrompts onSelect={onSend} disabled={isLoading} />
      )}

      {/* ── Input ────────────────────────────────────────────────────── */}
      <ChatInput onSend={onSend} isLoading={isLoading} />
    </div>
  )
}
