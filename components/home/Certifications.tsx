"use client"

import { Award, ExternalLink } from "lucide-react"

import { cardVariants, m, staggerContainer } from "@/components/shared/motion"
import { certifications } from "@/config/certifications"
import { useInView } from "@/lib/hooks/useInView"

export default function Certifications() {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.15 })

  return (
    <section className="relative border-b border-matrix-navy/40 bg-matrix-darker/60 py-24" ref={ref}>
      {/* Subtle background texture */}
      <div className="absolute inset-0 bg-gradient-to-b from-matrix-navy/[0.05] via-transparent to-matrix-navy/[0.05] pointer-events-none" />
      
      <div className="relative mx-auto flex w-full max-w-[1200px] flex-col gap-14 px-6">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }}
        >
          <p className="text-xs font-mono uppercase tracking-[0.4em] text-matrix-green">Certifications</p>
          <h2 className="mt-3 font-display text-4xl text-matrix-white">Professional Credentials</h2>
          <p className="mt-4 max-w-3xl text-lg text-matrix-grey/90 leading-relaxed">
            Industry-recognized certifications demonstrating expertise and commitment to continuous learning.
          </p>
        </m.div>
        
        <m.div 
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {certifications.map((cert, index) => (
            <m.article
              key={cert.id}
              variants={cardVariants}
              custom={index}
              className="group relative overflow-hidden rounded-xl border border-matrix-navy/40 bg-matrix-navyDark/40 p-6 shadow-lg shadow-black/20 transition-all duration-500 ease-out supports-hover:hover:-translate-y-2 supports-hover:hover:border-matrix-green/40 supports-hover:hover:shadow-[0_20px_40px_rgba(0,0,0,0.3),0_0_20px_rgba(255,56,56,0.1)]"
            >
              {/* Hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-matrix-green/0 to-matrix-navy/0 transition-all duration-500 group-hover:from-matrix-green/5 group-hover:to-matrix-navy/10" />
              
              <div className="relative">
                {/* Badge Icon */}
                <div className="mb-5 flex h-20 items-center justify-center rounded-lg bg-matrix-navy/30 transition-all duration-300 group-hover:bg-matrix-green/10">
                  <Award className="h-12 w-12 text-matrix-green opacity-60 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110" />
                </div>

                {/* Certificate Info */}
                <div className="space-y-3">
                  <h3 className="font-display text-lg text-matrix-white transition-colors duration-300 group-hover:text-matrix-green">
                    {cert.name}
                  </h3>
                  
                  <div className="space-y-1.5 text-sm text-matrix-grey">
                    <p className="flex items-center gap-2">
                      <span className="text-matrix-green/80">Issuer:</span>
                      <span className="text-matrix-grey/90">{cert.issuer}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-matrix-green/80">Date:</span>
                      <span className="text-matrix-grey/90">{cert.issueDate}</span>
                    </p>
                    {cert.credentialId && (
                      <p className="flex items-center gap-2 font-mono text-xs">
                        <span className="text-matrix-green/80">ID:</span>
                        <span className="text-matrix-grey/70">{cert.credentialId}</span>
                      </p>
                    )}
                  </div>

                  {cert.description && (
                    <p className="text-sm text-matrix-grey/70 pt-3 border-t border-matrix-navy/40 leading-relaxed">
                      {cert.description}
                    </p>
                  )}

                  {/* Verify Link */}
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link inline-flex items-center gap-2 text-sm text-matrix-green transition-all duration-300 hover:text-matrix-cyan pt-3"
                    >
                      <span>Verify Credential</span>
                      <ExternalLink className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </a>
                  )}
                </div>
              </div>
            </m.article>
          ))}
        </m.div>
      </div>
    </section>
  )
}
