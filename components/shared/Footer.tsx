"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"

import siteConfig from "@/config/site"
import { m } from "@/components/shared/motion"

export default function Footer() {
  const [currentYear, setCurrentYear] = useState<number | null>(null)

  useEffect(() => {
    setCurrentYear(new Date().getFullYear())
  }, [])

  return (
    <footer className="relative border-t border-matrix-navy/40 bg-matrix-navyDark/30 py-12 overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-matrix-black/50 to-transparent pointer-events-none" />
      
      <div className="container relative mx-auto flex max-w-[1280px] flex-col gap-8 px-6 text-sm text-matrix-grey">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <m.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="font-display text-xl text-matrix-white mb-3">{siteConfig.author.name}</h3>
            <p className="text-sm text-matrix-grey/80 max-w-md leading-relaxed">{siteConfig.description}</p>
          </m.div>
          <m.div 
            className="flex items-center gap-5"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {siteConfig.author.social.map((link, index) => {
              const isGithub = link.includes('github')
              const isLinkedIn = link.includes('linkedin')
              const isTwitter = link.includes('twitter') || link.includes('x.com')
              
              return (
                <a
                  key={link}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-2 text-matrix-grey transition-all duration-300 hover:text-matrix-green hover:-translate-y-1"
                  aria-label={isGithub ? 'GitHub' : isLinkedIn ? 'LinkedIn' : isTwitter ? 'Twitter' : `Social ${index + 1}`}
                >
                  {isGithub && <Github className="h-5 w-5" />}
                  {isLinkedIn && <Linkedin className="h-5 w-5" />}
                  {isTwitter && <Twitter className="h-5 w-5" />}
                  {!isGithub && !isLinkedIn && !isTwitter && '🔗'}
                  <span className="absolute inset-0 rounded-lg bg-matrix-navy/0 transition-all duration-300 group-hover:bg-matrix-navy/40" />
                </a>
              )
            })}
            <a
              href={`mailto:${siteConfig.author.email}`}
              className="group relative p-2 text-matrix-grey transition-all duration-300 hover:text-matrix-green hover:-translate-y-1"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
              <span className="absolute inset-0 rounded-lg bg-matrix-navy/0 transition-all duration-300 group-hover:bg-matrix-navy/40" />
            </a>
          </m.div>
        </div>
        <m.div 
          className="border-t border-matrix-navy/30 pt-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-xs text-matrix-grey/60 text-center tracking-wide">
            &copy; {currentYear ?? ""} {siteConfig.author.name}. All rights reserved. Built with Next.js and Tailwind CSS.
          </p>
        </m.div>
      </div>
    </footer>
  )
}
