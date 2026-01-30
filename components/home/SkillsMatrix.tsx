"use client"

import Image from "next/image"
import { Brain, LineChart, Cloud, ShieldCheck, Code, Globe, Users, Settings, BookOpen } from "lucide-react"

import { cardVariants, m, staggerContainer } from "@/components/shared/motion"
import { skillMatrix } from "@/config/skills"
import { useInView } from "@/lib/hooks/useInView"

const iconMap = {
  shield: ShieldCheck,
  "line-chart": LineChart,
  brain: Brain,
  cloud: Cloud,
  code: Code,
  globe: Globe,
  users: Users,
  settings: Settings,
  book: BookOpen
}

export default function SkillsMatrix() {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.15 })

  return (
    <section id="skills" className="relative border-b border-matrix-navy/40 bg-matrix-dark/40 py-24" ref={ref}>
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-matrix-navy/[0.05] to-transparent pointer-events-none" />
      
      <div className="relative mx-auto flex w-full max-w-[1200px] flex-col gap-14 px-6">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }}
        >
          <p className="text-xs font-mono uppercase tracking-[0.4em] text-matrix-green">Skill Matrix</p>
          <h2 className="mt-3 font-display text-4xl text-matrix-white">Technical Expertise</h2>
          <p className="mt-4 max-w-3xl text-lg text-matrix-grey/90 leading-relaxed">
            A diverse skill set spanning multiple technologies and methodologies, constantly evolving with industry trends.
          </p>
        </m.div>
        
        <m.div 
          className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {skillMatrix.map((category, index) => {
            const Icon = iconMap[category.icon as keyof typeof iconMap]
            return (
              <m.article
                key={category.title}
                variants={cardVariants}
                custom={index}
                className="group relative overflow-hidden rounded-xl border border-matrix-navy/40 bg-matrix-navyDark/40 p-6 shadow-lg shadow-black/20 transition-all duration-500 ease-out supports-hover:hover:-translate-y-2 supports-hover:hover:border-matrix-green/40 supports-hover:hover:shadow-[0_20px_40px_rgba(0,0,0,0.3),0_0_20px_rgba(255,56,56,0.1)]"
              >
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-matrix-green/0 to-matrix-navy/0 transition-all duration-500 group-hover:from-matrix-green/5 group-hover:to-matrix-navy/10" />
                
                <div className="relative">
                  <div className="mb-5 flex items-center gap-3">
                    {Icon ? (
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-matrix-navy/40 transition-all duration-300 group-hover:bg-matrix-green/20">
                        <Icon className="h-5 w-5 text-matrix-green" aria-hidden="true" />
                      </div>
                    ) : null}
                    <h3 className="font-display text-xl text-matrix-white transition-colors duration-300 group-hover:text-matrix-green">{category.title}</h3>
                  </div>
                  <ul className="space-y-2.5">
                    {category.skills.map((skill, skillIndex) => (
                      <li 
                        key={skill.name} 
                        className="flex items-center gap-3 text-sm text-matrix-grey transition-colors duration-300 group-hover:text-matrix-grey/90"
                      >
                        {skill.logo ? (
                          <Image 
                            src={skill.logo} 
                            alt={`${skill.name} logo`}
                            width={18}
                            height={18}
                            className="h-[18px] w-[18px] object-contain"
                            unoptimized
                          />
                        ) : (
                          <span className="h-1.5 w-1.5 rounded-full bg-matrix-green/60 transition-all duration-300 group-hover:bg-matrix-green" aria-hidden="true" />
                        )}
                        {skill.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </m.article>
            )
          })}
        </m.div>
      </div>
    </section>
  )
}
