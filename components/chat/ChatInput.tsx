// components/chat/ChatInput.tsx
// Text input + send button for the chat window.

"use client"

import { useState, useRef, KeyboardEvent } from "react"
import { SendHorizonal } from "lucide-react"

interface ChatInputProps {
  onSend: (text: string) => void
  disabled?: boolean
}

export default function ChatInput({ onSend, disabled = false }: ChatInputProps) {
  const [value, setValue] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSend = () => {
    const trimmed = value.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setValue("")
    // Reset textarea height
    if (textareaRef.current) textareaRef.current.style.height = "auto"
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleInput = () => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = "auto"
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`
  }

  return (
    <div className="flex items-end gap-2 border-t border-matrix-dark/60 bg-matrix-darker px-3 py-3">
      {/* Prompt prefix */}
      <span className="mb-2 shrink-0 font-mono text-xs text-matrix-green select-none">&gt;</span>

      <textarea
        ref={textareaRef}
        rows={1}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onInput={handleInput}
        disabled={disabled}
        placeholder="Ask about projects, skills…"
        className="
          flex-1 resize-none overflow-hidden bg-transparent
          font-mono text-xs text-matrix-white placeholder:text-matrix-grey/40
          focus:outline-none disabled:opacity-50
          leading-relaxed py-1
        "
      />

      <button
        onClick={handleSend}
        disabled={disabled || !value.trim()}
        aria-label="Send message"
        className="
          mb-0.5 shrink-0 rounded p-1.5
          text-matrix-green border border-matrix-green/30
          hover:bg-matrix-green/10 hover:border-matrix-green/60
          disabled:opacity-30 disabled:cursor-not-allowed
          transition-colors duration-200
        "
      >
        <SendHorizonal className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}
