"use client"

import { Bot, User, AlertTriangle } from "lucide-react"
import type { UIChatMessage } from "@/types/chat"

interface ChatMessageProps {
  message: UIChatMessage
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser      = message.role === "user"
  const isAssistant = message.role === "assistant"
  const isError     = message.role === "error"

  const time = message.timestamp.toLocaleTimeString([], {
    hour:   "2-digit",
    minute: "2-digit",
  })

  /* ── Error bubble ─────────────────────────────────────────────────── */
  if (isError) {
    return (
      <div className="flex items-start gap-2.5 px-4">
        <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-red-500/30 bg-red-500/10">
          <AlertTriangle className="h-3 w-3 text-red-400" />
        </div>
        <div className="max-w-[85%] rounded-lg rounded-tl-none border border-red-500/20 bg-red-500/5 px-3.5 py-2.5">
          <p className="font-mono text-[11px] leading-relaxed text-red-400">
            {message.content}
          </p>
        </div>
      </div>
    )
  }

  /* ── User bubble ──────────────────────────────────────────────────── */
  if (isUser) {
    return (
      <div className="flex items-end justify-end gap-2.5 px-4">
        <div className="flex max-w-[80%] flex-col items-end gap-1">
          <div className="rounded-2xl rounded-br-sm bg-matrix-green/15 border border-matrix-green/25 px-4 py-2.5 shadow-sm">
            <p className="font-sans text-[13px] font-medium leading-relaxed text-matrix-white">
              {message.content}
            </p>
          </div>
          <span className="pr-1 font-mono text-[10px] text-matrix-grey/40">{time}</span>
        </div>
        <div className="mb-5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-matrix-green/20 bg-matrix-green/10">
          <User className="h-3.5 w-3.5 text-matrix-green" />
        </div>
      </div>
    )
  }

  /* ── Assistant bubble ─────────────────────────────────────────────── */
  if (isAssistant) {
    return (
      <div className="flex items-end gap-2.5 px-4">
        <div className="mb-5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-matrix-green/30 bg-matrix-green/10">
          <Bot className="h-3.5 w-3.5 text-matrix-green" />
        </div>
        <div className="flex max-w-[82%] flex-col gap-1">
          <div className="rounded-2xl rounded-bl-sm border border-matrix-dark/70 bg-matrix-dark px-4 py-2.5 shadow-sm">
            <p className="font-sans text-[13px] leading-relaxed text-matrix-grey whitespace-pre-wrap">
              {message.content}
            </p>
          </div>
          <span className="pl-1 font-mono text-[10px] text-matrix-grey/40">{time}</span>
        </div>
      </div>
    )
  }

  return null
}
