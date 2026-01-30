"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { m, AnimatePresence } from "framer-motion"
import { ArrowRight, Download, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { EncryptedText } from "@/components/ui/encrypted-text"
import MatrixRain from "@/components/home/MatrixRain"
import siteConfig from "@/config/site"

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1.0]
    }
  }
}

export default function HeroSection() {
  const [showInitializing, setShowInitializing] = useState(true)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Show "Initializing..." for ~1.5 seconds, then fade out and show content
    const initTimer = setTimeout(() => {
      setShowInitializing(false)
    }, 1500)

    const contentTimer = setTimeout(() => {
      setShowContent(true)
    }, 1800)

    return () => {
      clearTimeout(initTimer)
      clearTimeout(contentTimer)
    }
  }, [])

  return (
    <section className="relative flex min-h-[90vh] flex-col justify-center overflow-hidden border-b border-matrix-dark/70 bg-matrix-darker/60">
      <MatrixRain />
      
      {/* Subtle gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-matrix-black/20 via-transparent to-matrix-black/40 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-matrix-black/30 via-transparent to-matrix-black/30 pointer-events-none" />
      
      <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-col gap-12 px-6 py-24">
        <div className="font-mono text-lg md:text-xl">
          {/* Initializing text that fades out */}
          <AnimatePresence>
            {showInitializing && (
              <m.p 
                className="flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0] }}
              >
                <span className="text-matrix-green animate-pulse">&gt;</span>
                <EncryptedText
                  text="Initializing..."
                  encryptedClassName="text-matrix-grey"
                  revealedClassName="text-matrix-green"
                  revealDelayMs={40}
                />
              </m.p>
            )}
          </AnimatePresence>

          {/* Main content that appears after initializing */}
          <AnimatePresence>
            {showContent && (
              <m.div 
                initial="hidden" 
                animate="visible"
                variants={containerVariants}
                className="space-y-3"
              >
                <m.p variants={itemVariants}>
                  <span className="text-matrix-green">&gt; </span>
                  <EncryptedText
                    text={`Hello. I'm ${siteConfig.author.name}`}
                    encryptedClassName="text-matrix-grey"
                    revealedClassName="text-matrix-white"
                    revealDelayMs={35}
                  />
                </m.p>
                <m.p variants={itemVariants}>
                  <span className="text-matrix-green">&gt; </span>
                  <EncryptedText
                    text="Full-Stack Web Development | Data Analysis | Machine Learning | Cybersecurity"
                    encryptedClassName="text-matrix-grey"
                    revealedClassName="text-matrix-green/80"
                    revealDelayMs={25}
                  />
                </m.p>
                
                <m.p 
                  variants={itemVariants}
                  className="mt-10 max-w-2xl text-lg text-matrix-grey/90 leading-relaxed font-sans"
                >
                  Welcome to my portfolio. I enjoy building full-stack and AI-powered products, solving complex problems, and continuously pushing my engineering skills through real-world projects.
                </m.p>
              </m.div>
            )}
          </AnimatePresence>
        </div>
        
        {showContent && (
          <m.div
            className="flex flex-wrap gap-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.12,
                  delayChildren: 0.5
                }
              }
            }}
          >
          <m.div 
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] } } }}
          >
            <Button asChild className="group border border-matrix-green/50 bg-matrix-green/10 px-6 py-3 text-sm tracking-wide text-matrix-green shadow-glow hover:bg-matrix-green/20 hover:shadow-[0_0_30px_rgba(255,56,56,0.3)]">
              <Link href="/projects">
                <span className="mr-2 align-middle">View Projects</span>
                <ArrowRight className="h-4 w-4 inline transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </m.div>
          <m.div 
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] } } }}
          >
            <Button asChild variant="outline" className="group border border-matrix-navy/50 bg-matrix-navy/20 px-6 py-3 text-sm tracking-wide text-matrix-grey hover:text-matrix-white hover:border-matrix-green/70 hover:bg-matrix-navy/30">
              <a href={`mailto:${siteConfig.author.email}`}>
                <Sparkles className="h-4 w-4 mr-2 inline opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="align-middle">Get in Touch</span>
              </a>
            </Button>
          </m.div>
          <m.div 
            variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] } } }}
          >
            <Button asChild variant="ghost" className="group border border-matrix-navy/40 bg-transparent px-6 py-3 text-sm tracking-wide text-matrix-grey hover:text-matrix-white hover:border-matrix-green/50 hover:bg-matrix-green/5">
              <a href={siteConfig.author.resumeUrl} target="_blank" rel="noopener noreferrer" download="Hanzala_Resume.pdf">
                <Download className="h-4 w-4 mr-2 inline transition-transform duration-300 group-hover:-translate-y-0.5" />
                <span className="align-middle">Download Resume</span>
              </a>
            </Button>
          </m.div>
        </m.div>
        )}
      </div>
    </section>
  )
}
