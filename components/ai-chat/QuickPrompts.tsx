"use client"

import { Zap } from "lucide-react"

const PROMPTS = [
  "What projects has Hanzala built?",
  "Explain MarketMuse AI",
  "What skills does Hanzala have?",
  "What technologies does he use?",
] as const

interface QuickPromptsProps {
  onSelect: (prompt: string) => void
  disabled?: boolean
}

export default function QuickPrompts({ onSelect, disabled = false }: QuickPromptsProps) {
  return (
    <div className="px-4 py-3 border-b border-matrix-dark/40">
      {/* Label */}
      <div className="mb-2 flex items-center gap-1.5">
        <Zap className="h-3 w-3 text-matrix-green/70" />
        <span className="font-mono text-[10px] uppercase tracking-widest text-matrix-grey/50">
          Quick prompts
        </span>
      </div>

      {/* Prompt grid — 2-column on wider screens */}
      <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
        {PROMPTS.map((prompt) => (
          <button
            key={prompt}
            onClick={() => !disabled && onSelect(prompt)}
            disabled={disabled}
            className="
              group flex items-start gap-2 rounded-lg
              border border-matrix-dark/70 bg-matrix-black/30
              px-3 py-2 text-left
              hover:border-matrix-green/35 hover:bg-matrix-green/5
              disabled:cursor-not-allowed disabled:opacity-40
              transition-all duration-150
            "
          >
            <span className="mt-0.5 font-mono text-[10px] text-matrix-green/50 group-hover:text-matrix-green/80 transition-colors shrink-0">
              &gt;
            </span>
            <span className="font-sans text-[11px] leading-snug text-matrix-grey/75 group-hover:text-matrix-white transition-colors">
              {prompt}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
