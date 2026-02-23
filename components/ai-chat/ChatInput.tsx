"use client"

import { useState, useRef, KeyboardEvent } from "react"
import { SendHorizonal, Loader2 } from "lucide-react"

interface ChatInputProps {
  onSend: (text: string) => void
  isLoading?: boolean
  disabled?: boolean
  placeholder?: string
}

export default function ChatInput({
  onSend,
  isLoading  = false,
  disabled   = false,
  placeholder = "Ask about projects, skills, experience…",
}: ChatInputProps) {
  const [value, setValue] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const isDisabled = disabled || isLoading

  /* ── helpers ────────────────────────────────────────────────────── */

  const submit = () => {
    const trimmed = value.trim()
    if (!trimmed || isDisabled) return
    onSend(trimmed)
    setValue("")
    if (textareaRef.current) textareaRef.current.style.height = "auto"
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      submit()
    }
  }

  const handleInput = () => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = "auto"
    el.style.height = `${Math.min(el.scrollHeight, 128)}px`
  }

  /* ── render ─────────────────────────────────────────────────────── */

  return (
    <div className="border-t border-matrix-dark/60 bg-matrix-darker/80 px-3 py-3">
      <div className="flex items-end gap-2 rounded-xl border border-matrix-dark/60 bg-matrix-black/40 px-3 py-2 transition-colors focus-within:border-matrix-green/40">

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          rows={1}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
          disabled={isDisabled}
          placeholder={placeholder}
          aria-label="Chat message input"
          className="
            flex-1 resize-none overflow-hidden bg-transparent
            font-sans text-[13px] text-matrix-white
            placeholder:text-matrix-grey/35
            focus:outline-none disabled:cursor-not-allowed disabled:opacity-50
            leading-relaxed py-0.5 min-h-[22px]
          "
        />

        {/* Send / Loading button */}
        <button
          onClick={submit}
          disabled={isDisabled || !value.trim()}
          aria-label={isLoading ? "Waiting for response" : "Send message"}
          className="
            mb-0.5 flex h-7 w-7 shrink-0 items-center justify-center
            rounded-lg bg-matrix-green/90 text-matrix-black
            hover:bg-matrix-green disabled:opacity-30 disabled:cursor-not-allowed
            transition-all duration-150 active:scale-95
          "
        >
          {isLoading
            ? <Loader2 className="h-3.5 w-3.5 animate-spin" />
            : <SendHorizonal className="h-3.5 w-3.5" />
          }
        </button>
      </div>

      <p className="mt-1.5 px-1 font-mono text-[10px] text-matrix-grey/30">
        Enter to send · Shift+Enter for new line
      </p>
    </div>
  )
}
