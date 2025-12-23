"use client"

import { Brain, LineChart, Cloud, ShieldCheck, Code, Globe, Users } from "lucide-react"

import { cardVariants, m } from "@/components/shared/motion"
import { skillMatrix } from "@/config/skills"
import { useInView } from "@/lib/hooks/useInView"

const iconMap = {
  shield: ShieldCheck,
  "line-chart": LineChart,
  brain: Brain,
  cloud: Cloud,
  code: Code,
  globe: Globe,
  users: Users
}

export default function SkillsMatrix() {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.2 })

  return (
    <section className="relative border-b border-matrix-dark/70 bg-matrix-dark/40 py-20" ref={ref}>
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-12 px-6">
        <div>
          <p className="text-xs font-mono uppercase tracking-[0.4em] text-matrix-green">Skill Matrix</p>
          <h2 className="mt-3 font-display text-4xl text-matrix-white">Technical Expertise</h2>
          <p className="mt-4 max-w-3xl text-lg text-matrix-grey">
            A diverse skill set spanning multiple technologies and methodologies, constantly evolving with industry trends.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {skillMatrix.map((category) => {
            const Icon = iconMap[category.icon as keyof typeof iconMap]
            return (
              <m.article
                key={category.title}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="relative overflow-hidden rounded-xl border border-matrix-green/20 bg-matrix-darker/80 p-6 shadow-lg shadow-black/20 transition supports-hover:hover:-translate-y-1 supports-hover:hover:shadow-glow"
              >
                <div className="mb-5 flex items-center gap-3">
                  {Icon ? <Icon className="h-6 w-6 text-matrix-green" aria-hidden="true" /> : null}
                  <h3 className="font-display text-xl text-matrix-white">{category.title}</h3>
                </div>
                <ul className="space-y-2">
                  {category.skills.map((skill) => (
                    <li key={skill} className="flex items-center gap-2 text-sm text-matrix-grey">
                      <span className="h-1.5 w-1.5 rounded-full bg-matrix-green" aria-hidden="true" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </m.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
