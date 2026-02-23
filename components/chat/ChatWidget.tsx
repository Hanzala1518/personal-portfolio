// components/chat/ChatWidget.tsx
// Floating chat button (bottom-right) + sliding chat window.
// Follows the portfolio's matrix / coral-red design language.

"use client"

import { useState, useEffect } from "react"
import { MessageSquare, X, RotateCcw, Bot } from "lucide-react"
import { AnimatePresence, m } from "framer-motion"

import { useChat } from "@/lib/hooks/useChat"
import ChatMessages from "@/components/chat/ChatMessages"
import ChatInput from "@/components/chat/ChatInput"

// Suggested seed questions shown below the welcome message
const SUGGESTIONS = [
  "What projects has he built?",
  "What are his main skills?",
  "Explain MarketMuse AI",
  "What certifications does he have?",
]

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasMounted, setHasMounted] = useState(false)
  const { messages, isLoading, sendMessage, clearChat } = useChat()

  // Avoid SSR mismatch — only render after mount
  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) return null

  const handleSuggestion = (text: string) => {
    sendMessage(text)
  }

  return (
    <>
      {/* ── Chat window ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            key="chat-window"
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            className="
              fixed bottom-24 right-4 z-50
              flex flex-col
              w-[340px] sm:w-[380px]
              h-[520px] max-h-[80vh]
              rounded-xl overflow-hidden
              border border-matrix-dark/80
              bg-matrix-darker
              shadow-[0_8px_40px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,56,56,0.08)]
            "
            role="dialog"
            aria-label="AI Portfolio Assistant"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-matrix-dark/60 bg-matrix-black/60 px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded border border-matrix-green/30 bg-matrix-green/10">
                  <Bot className="h-3.5 w-3.5 text-matrix-green" />
                </div>
                <div>
                  <p className="font-mono text-xs font-semibold text-matrix-white leading-none">
                    Portfolio Assistant
                  </p>
                  <p className="font-mono text-[10px] text-matrix-grey/60 mt-0.5">
                    Ask me anything about Hanzala
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {/* Clear chat */}
                <button
                  onClick={clearChat}
                  aria-label="Clear conversation"
                  title="Clear conversation"
                  className="rounded p-1.5 text-matrix-grey/50 hover:text-matrix-grey hover:bg-matrix-dark/60 transition-colors duration-150"
                >
                  <RotateCcw className="h-3 w-3" />
                </button>
                {/* Close */}
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chat"
                  className="rounded p-1.5 text-matrix-grey/50 hover:text-matrix-green hover:bg-matrix-green/10 transition-colors duration-150"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <ChatMessages messages={messages} isLoading={isLoading} />

            {/* Suggestion chips — only shown when only welcome message present */}
            {messages.length === 1 && !isLoading && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {SUGGESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSuggestion(q)}
                    className="
                      rounded-full border border-matrix-green/25 bg-matrix-green/5
                      px-2.5 py-1 font-mono text-[10px] text-matrix-grey/80
                      hover:border-matrix-green/50 hover:text-matrix-white hover:bg-matrix-green/10
                      transition-colors duration-150
                    "
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <ChatInput onSend={sendMessage} disabled={isLoading} />
          </m.div>
        )}
      </AnimatePresence>

      {/* ── Floating action button ────────────────────────────────────── */}
      <m.button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close chat" : "Open AI assistant"}
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.95 }}
        className="
          fixed bottom-6 right-4 z-50
          flex h-12 w-12 items-center justify-center
          rounded-full
          bg-matrix-green text-matrix-black
          shadow-[0_0_18px_rgba(255,56,56,0.45)]
          hover:shadow-[0_0_26px_rgba(255,56,56,0.6)]
          transition-shadow duration-300
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-matrix-green focus-visible:ring-offset-2 focus-visible:ring-offset-matrix-black
        "
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <m.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="h-5 w-5" />
            </m.span>
          ) : (
            <m.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageSquare className="h-5 w-5" />
            </m.span>
          )}
        </AnimatePresence>
      </m.button>
    </>
  )
}
