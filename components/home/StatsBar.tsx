"use client"

import { useEffect, useState, useCallback } from "react"
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

// Smooth easing function for count animation
function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4)
}

export default function StatsBar() {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.3 })
  const [values, setValues] = useState(stats.map(() => 0))
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (!isInView || hasAnimated) return
    setHasAnimated(true)
    
    const duration = 2000 // 2 seconds for the count animation
    const startTime = performance.now()
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easeOutQuart(progress)
      
      setValues(stats.map(stat => Math.round(easedProgress * stat.target)))
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    
    requestAnimationFrame(animate)
  }, [isInView, hasAnimated])

  return (
    <section ref={ref} className="relative border-b border-matrix-navy/40 bg-matrix-navyDark/30 py-20 overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-matrix-navy/20 via-transparent to-matrix-navy/20 pointer-events-none" />
      
      <div className="relative mx-auto flex w-full max-w-[1200px] flex-wrap justify-between gap-10 px-6">
        {stats.map((stat, index) => (
          <m.div
            key={stat.label}
            className="group flex min-w-[220px] flex-1 flex-col gap-3 text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ 
              delay: index * 0.1 + 0.2,
              duration: 0.6,
              ease: [0.25, 0.1, 0.25, 1.0]
            }}
          >
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-matrix-grey/80 transition-colors duration-300 group-hover:text-matrix-grey">
              {stat.label}
            </span>
            <span className="font-display text-5xl text-matrix-green transition-all duration-300 group-hover:text-matrix-cyan group-hover:drop-shadow-[0_0_10px_rgba(255,56,56,0.5)]">
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
