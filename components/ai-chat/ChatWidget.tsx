"use client"

import { useState, useEffect } from "react"
import { MessageSquare, X, Sparkles } from "lucide-react"
import { AnimatePresence, m } from "framer-motion"

import { useChat }    from "@/lib/hooks/useChat"
import ChatWindow     from "@/components/ai-chat/ChatWindow"

/**
 * ChatWidget
 *
 * Root component for the AI portfolio assistant.
 * Renders a fixed floating-action button (bottom-right) that toggles a
 * slide-up chat window. All conversation state lives in the useChat hook
 * which calls chatService.ts internally.
 *
 * Usage: drop <ChatWidget /> anywhere in a client boundary — it is already
 * placed in app/(main)/layout.tsx.
 */
export default function ChatWidget() {
  const [isOpen,      setIsOpen]      = useState(false)
  const [hasMounted,  setHasMounted]  = useState(false)
  const [unread,      setUnread]      = useState(0)
  const [showBubble,  setShowBubble]  = useState(true)

  const { messages, isLoading, sendMessage, clearChat } = useChat()

  // Avoid hydration mismatch — portal-like fixed elements need client-only render
  useEffect(() => { setHasMounted(true) }, [])

  // Increment unread badge when a new assistant message arrives while closed
  useEffect(() => {
    if (isOpen) { setUnread(0); return }
    const last = messages[messages.length - 1]
    if (last && last.role === "assistant" && last.id !== "welcome") {
      setUnread((n) => n + 1)
    }
  }, [messages, isOpen])

  // Clear badge on open
  const handleOpen = () => {
    setIsOpen(true)
    setUnread(0)
    setShowBubble(false)
  }

  const handleClose  = () => { setIsOpen(false); setShowBubble(true) }
  const handleToggle = () => (isOpen ? handleClose() : handleOpen())

  if (!hasMounted) return null

  return (
    <>
      {/* ── Chat window ───────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            key="ai-chat-window"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0,  scale: 1     }}
            exit  ={{ opacity: 0, y: 20, scale: 0.96  }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="
              fixed bottom-[88px] right-4 z-50
              w-[92vw] sm:w-[400px]
              h-[580px] max-h-[82vh]
              rounded-2xl overflow-hidden
              border border-matrix-dark/70
              bg-matrix-darker
              shadow-[0_12px_48px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,56,56,0.06)]
            "
            role="dialog"
            aria-modal="true"
            aria-label="AI Portfolio Assistant"
          >
            <ChatWindow
              messages={messages}
              isLoading={isLoading}
              onSend={sendMessage}
              onClear={clearChat}
              onClose={handleClose}
            />
          </m.div>
        )}
      </AnimatePresence>

      {/* ── Speech bubble cloud ──────────────────────────────────── */}
      <AnimatePresence>
        {showBubble && !isOpen && (
          <m.div
            key="speech-bubble"
            initial={{ opacity: 0, scale: 0.8, x: 16 }}
            animate={{ opacity: 1, scale: 1,   x: 0  }}
            exit   ={{ opacity: 0, scale: 0.8, x: 16 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
            className="fixed bottom-3 right-[72px] z-50 max-w-[220px]"
          >
            <div
              className="
                relative rounded-xl rounded-br-none
                border border-[#FF3838]/50
                bg-[#050E3C]/90 backdrop-blur-md
                px-4 py-3
                shadow-[0_0_0_1px_rgba(255,56,56,0.12),0_0_24px_rgba(255,56,56,0.2),0_8px_32px_rgba(0,0,0,0.7)]
              "
            >
              {/* Scanline overlay — subtle cyberpunk texture */}
              <div
                className="pointer-events-none absolute inset-0 rounded-xl rounded-br-none opacity-[0.04]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg,#fff,#fff 1px,transparent 1px,transparent 4px)",
                }}
              />

              {/* Dismiss button */}
              <button
                onClick={() => setShowBubble(false)}
                aria-label="Dismiss"
                className="
                  absolute -right-2 -top-2
                  flex h-[18px] w-[18px] items-center justify-center
                  rounded-full border border-[#FF3838]/40
                  bg-[#050E3C] text-[#FF6B6B]/70
                  shadow-md hover:text-[#FF3838] transition-colors
                "
              >
                <X className="h-2.5 w-2.5" />
              </button>

              {/* Header row */}
              <div className="mb-1.5 flex items-center gap-1.5">
                <Sparkles className="h-3 w-3 shrink-0 text-[#FFD700]" />
                <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#FFD700]/80">
                  AI&nbsp;Assistant
                </span>
              </div>

              {/* Message */}
              <p className="text-[12.5px] font-medium leading-snug text-slate-200">
                Hi! I&apos;m{" "}
                <span className="font-extrabold text-[#FF3838]">Hanzala&apos;s</span>{" "}
                AI&nbsp;Resume&nbsp;Assistant&nbsp;👋
              </p>

              {/* Typing dots */}
              <div className="mt-2 flex items-center gap-1">
                {[0, 160, 320].map((delay) => (
                  <span
                    key={delay}
                    className="h-1.5 w-1.5 rounded-full animate-bounce"
                    style={{
                      background: "#FF3838",
                      animationDelay: `${delay}ms`,
                      boxShadow: "0 0 4px #FF3838",
                    }}
                  />
                ))}
                <span className="ml-1.5 text-[10px] tracking-wide text-slate-400">
                  Ask me anything
                </span>
              </div>

              {/* Tail — bottom-right corner pointing toward the FAB */}
              <span
                className="absolute -right-[7px] bottom-3 h-3.5 w-3.5 rotate-45"
                style={{
                  background: "#050E3C",
                  borderRight: "1px solid rgba(255,56,56,0.5)",
                  borderBottom: "1px solid rgba(255,56,56,0.5)",
                }}
              />
            </div>
          </m.div>
        )}
      </AnimatePresence>

      {/* ── Floating action button ────────────────────────────────── */}
      <m.button
        onClick={handleToggle}
        whileHover={{ scale: 1.08 }}
        whileTap ={{ scale: 0.94 }}
        aria-label={isOpen ? "Close AI assistant" : "Open AI assistant"}
        className="
          fixed bottom-6 right-4 z-50
          flex h-13 w-13 items-center justify-center
          rounded-full
          bg-matrix-green text-matrix-black
          shadow-[0_0_20px_rgba(255,56,56,0.4)]
          hover:shadow-[0_0_30px_rgba(255,56,56,0.65)]
          transition-shadow duration-300
          focus-visible:outline-none
          focus-visible:ring-2 focus-visible:ring-matrix-green
          focus-visible:ring-offset-2 focus-visible:ring-offset-matrix-black
        "
        style={{ height: 52, width: 52 }}
      >
        {/* Icon swap */}
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <m.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate:   0, opacity: 1 }}
              exit   ={{ rotate:  90, opacity: 0 }}
              transition={{ duration: 0.14 }}
            >
              <X className="h-5 w-5" />
            </m.span>
          ) : (
            <m.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate:  0, opacity: 1 }}
              exit   ={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.14 }}
            >
              <MessageSquare className="h-5 w-5" />
            </m.span>
          )}
        </AnimatePresence>

        {/* Unread badge */}
        <AnimatePresence>
          {unread > 0 && !isOpen && (
            <m.span
              key="badge"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit   ={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="
                absolute -right-1 -top-1
                flex h-5 w-5 items-center justify-center
                rounded-full bg-white text-matrix-black
                font-sans text-[10px] font-bold leading-none
                shadow-md
              "
            >
              {unread > 9 ? "9+" : unread}
            </m.span>
          )}
        </AnimatePresence>
      </m.button>
    </>
  )
}
