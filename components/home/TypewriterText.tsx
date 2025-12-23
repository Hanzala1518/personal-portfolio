"use client"

import { m } from "@/components/shared/motion"
import { useTypewriter } from "@/lib/hooks/useTypewriter"

interface TypewriterTextProps {
  lines: string[]
}

export default function TypewriterText({ lines }: TypewriterTextProps) {
  const { text, isComplete } = useTypewriter({ lines })

  return (
    <div className="font-mono text-lg text-matrix-green">
      <m.pre
        className="whitespace-pre-wrap text-left"
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        {text}
        <m.span
          aria-hidden="true"
          animate={{ opacity: [0, 0, 1, 1] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
          className="ml-2 inline-block h-5 w-[2px] bg-matrix-green align-middle"
        />
      </m.pre>
      {isComplete ? (
        <m.p
          className="mt-3 max-w-2xl text-base text-matrix-grey"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Final-year B.Tech | Cybersecurity × Data Science × Machine Learning
        </m.p>
      ) : null}
    </div>
  )
}
