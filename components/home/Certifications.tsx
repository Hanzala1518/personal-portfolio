"use client"

import { Award, ExternalLink } from "lucide-react"

import { cardVariants, m } from "@/components/shared/motion"
import { certifications } from "@/config/certifications"
import { useInView } from "@/lib/hooks/useInView"

export default function Certifications() {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.2 })

  return (
    <section className="relative border-b border-matrix-dark/70 bg-matrix-darker/60 py-20" ref={ref}>
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-12 px-6">
        <div>
          <p className="text-xs font-mono uppercase tracking-[0.4em] text-matrix-green">Certifications</p>
          <h2 className="mt-3 font-display text-4xl text-matrix-white">Professional Credentials</h2>
          <p className="mt-4 max-w-3xl text-lg text-matrix-grey">
            Industry-recognized certifications demonstrating expertise and commitment to continuous learning.
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, index) => (
            <m.article
              key={cert.id}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-xl border border-matrix-green/20 bg-matrix-dark/80 p-6 shadow-lg shadow-black/20 transition supports-hover:hover:-translate-y-1 supports-hover:hover:border-matrix-green/40 supports-hover:hover:shadow-glow"
            >
              {/* Badge Icon */}
              <div className="mb-4 flex h-24 items-center justify-center rounded-lg bg-matrix-black/50">
                <Award className="h-16 w-16 text-matrix-green opacity-50" />
              </div>

              {/* Certificate Info */}
              <div className="space-y-3">
                <h3 className="font-display text-lg text-matrix-white group-hover:text-matrix-green transition-colors">
                  {cert.name}
                </h3>
                
                <div className="space-y-1 text-sm text-matrix-grey">
                  <p className="flex items-center gap-2">
                    <span className="text-matrix-green">Issuer:</span>
                    {cert.issuer}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-matrix-green">Date:</span>
                    {cert.issueDate}
                  </p>
                  {cert.credentialId && (
                    <p className="flex items-center gap-2 font-mono text-xs">
                      <span className="text-matrix-green">ID:</span>
                      {cert.credentialId}
                    </p>
                  )}
                </div>

                {cert.description && (
                  <p className="text-sm text-matrix-grey/80 pt-2 border-t border-matrix-dark">
                    {cert.description}
                  </p>
                )}

                {/* Verify Link */}
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-matrix-green hover:text-matrix-cyan transition-colors pt-2"
                  >
                    Verify Credential
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </m.article>
          ))}
        </div>
      </div>
    </section>
  )
}
