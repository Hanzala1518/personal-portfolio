// components/chat/ChatMessages.tsx
// Renders the scrollable message list inside the chat window.

"use client"

import { useEffect, useRef } from "react"
import type { UIChatMessage } from "@/types/chat"

interface ChatMessagesProps {
  messages: UIChatMessage[]
  isLoading: boolean
}

export default function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isLoading])

  return (
    <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scroll-smooth">
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}

      {/* Typing indicator */}
      {isLoading && (
        <div className="flex items-start gap-2">
          <span className="mt-0.5 shrink-0 text-matrix-green font-mono text-xs select-none">
            AI&gt;
          </span>
          <div className="flex items-center gap-1 py-2">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block h-1.5 w-1.5 rounded-full bg-matrix-green animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  )
}

// ── Single message bubble ────────────────────────────────────────────────

function MessageBubble({ message }: { message: UIChatMessage }) {
  const isUser = message.role === "user"
  const isError = message.role === "error"

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] rounded-md rounded-tr-none bg-matrix-green/10 border border-matrix-green/30 px-3 py-2">
          <p className="font-mono text-xs text-matrix-white leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
          <Timestamp date={message.timestamp} className="text-right text-matrix-grey/50" />
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex items-start gap-2">
        <span className="mt-0.5 shrink-0 font-mono text-xs text-matrix-red select-none">ERR&gt;</span>
        <div className="max-w-[85%] rounded-md bg-matrix-red/10 border border-matrix-red/30 px-3 py-2">
          <p className="font-mono text-xs text-matrix-red leading-relaxed">{message.content}</p>
        </div>
      </div>
    )
  }

  // Assistant
  return (
    <div className="flex items-start gap-2">
      <span className="mt-0.5 shrink-0 font-mono text-xs text-matrix-green select-none">AI&gt;</span>
      <div className="max-w-[85%] rounded-md rounded-tl-none bg-matrix-dark border border-matrix-dark/80 px-3 py-2">
        <p className="font-mono text-xs text-matrix-grey leading-relaxed whitespace-pre-wrap">
          {message.content}
        </p>
        <Timestamp date={message.timestamp} className="text-left text-matrix-grey/40" />
      </div>
    </div>
  )
}

function Timestamp({
  date,
  className,
}: {
  date: Date
  className?: string
}) {
  const formatted = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  return (
    <span className={`block mt-1 font-mono text-[10px] ${className ?? ""}`}>{formatted}</span>
  )
}
