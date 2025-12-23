"use client"

import Link from "next/link"
import { m } from "@/components/shared/motion"
import { ArrowRight, Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import MatrixRain from "@/components/home/MatrixRain"
import TypewriterText from "@/components/home/TypewriterText"
import siteConfig from "@/config/site"

const heroLines = [
  "> Initializing...",
  `> Hello. I'm ${siteConfig.author.name}`,
  "> Software Engineer | Cybersecurity Enthusiast | Problem Solver"
]

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[90vh] flex-col justify-center overflow-hidden border-b border-matrix-dark/70">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E14] via-[#13171E] to-[#0D1117]" />
      <div className="absolute inset-0 bg-grid bg-[length:24px_24px] opacity-[0.02]" />
      <MatrixRain />
      <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-col gap-10 px-6 py-24">
        <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <TypewriterText lines={heroLines} />
          <p className="mt-8 max-w-2xl text-lg text-matrix-grey">
            Welcome to my portfolio. I build innovative solutions, tackle complex challenges, 
            and continuously expand my technical expertise across multiple domains.
          </p>
        </m.div>
        <m.div
          className="flex flex-wrap gap-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          <m.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
            <Button asChild className="border border-matrix-green/50 bg-matrix-green/10 px-6 py-3 text-sm tracking-wide text-matrix-green shadow-glow hover:bg-matrix-green/20">
              <Link href="/projects">
                <span className="mr-2 align-middle">View Projects</span>
                <ArrowRight className="h-4 w-4 inline" />
              </Link>
            </Button>
          </m.div>
          <m.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
            <Button asChild variant="outline" className="border border-matrix-green/50 bg-matrix-dark/40 px-6 py-3 text-sm tracking-wide text-matrix-grey hover:text-matrix-white">
              <a href={`mailto:${siteConfig.author.email}`}>
                <span className="mr-2 align-middle">Get in Touch</span>
              </a>
            </Button>
          </m.div>
          <m.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
            <Button asChild variant="ghost" className="border border-matrix-green/30 bg-transparent px-6 py-3 text-sm tracking-wide text-matrix-grey hover:text-matrix-white hover:border-matrix-green/50">
              <a href="/resume.pdf" download>
                <Download className="h-4 w-4 mr-2 inline" />
                <span className="align-middle">Download Resume</span>
              </a>
            </Button>
          </m.div>
        </m.div>
      </div>
    </section>
  )
}
