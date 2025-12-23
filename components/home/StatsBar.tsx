"use client"

import { useEffect, useState } from "react"
import { m } from "@/components/shared/motion"
import { useInView } from "@/lib/hooks/useInView"

interface StatItem {
  label: string
  target: number
  suffix?: string
  prefix?: string
}

const stats: StatItem[] = [
  { label: "Projects Deployed", target: 18, prefix: "0" },
  { label: "Best Model Accuracy", target: 97, suffix: "%" },
  { label: "CTF Challenges Solved", target: 74 },
  { label: "Intelligence Briefings", target: 42 }
]

export default function StatsBar() {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.3 })
  const [values, setValues] = useState(stats.map(() => 0))

  useEffect(() => {
    if (!isInView) return
    const timers = stats.map((stat, index) => {
      return window.setInterval(() => {
  setValues((prev: number[]) => {
          const next = [...prev]
          if (next[index] < stat.target) {
            next[index] += 1
          }
          return next
        })
      }, 40)
    })

    return () => timers.forEach((timer) => window.clearInterval(timer))
  }, [isInView])

  return (
    <section ref={ref} className="border-b border-matrix-dark/70 bg-matrix-darker/80 py-16">
      <div className="mx-auto flex w-full max-w-[1200px] flex-wrap justify-between gap-8 px-6">
        {stats.map((stat, index) => (
          <m.div
            key={stat.label}
            className="flex min-w-[220px] flex-col gap-2"
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.1 }}
          >
            <span className="font-mono text-lg uppercase tracking-[0.25em] text-matrix-grey">{stat.label}</span>
            <span className="font-display text-4xl text-matrix-green">
              {stat.prefix ?? ""}
              {values[index].toString().padStart(2, "0")}
              {stat.suffix ?? ""}
            </span>
          </m.div>
        ))}
      </div>
    </section>
  )
}
