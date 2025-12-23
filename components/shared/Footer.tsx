import Link from "next/link"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"

import siteConfig from "@/config/site"

const currentYear = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="border-t border-matrix-dark/60 bg-matrix-darker/80 py-10">
      <div className="container mx-auto flex max-w-[1280px] flex-col gap-6 px-6 text-sm text-matrix-grey">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="font-display text-xl text-matrix-white mb-2">{siteConfig.author.name}</h3>
            <p className="text-xs text-matrix-grey max-w-md">{siteConfig.description}</p>
          </div>
          <div className="flex items-center gap-4">
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
                  className="text-matrix-grey hover:text-matrix-green transition-colors"
                  aria-label={isGithub ? 'GitHub' : isLinkedIn ? 'LinkedIn' : isTwitter ? 'Twitter' : `Social ${index + 1}`}
                >
                  {isGithub && <Github className="h-5 w-5" />}
                  {isLinkedIn && <Linkedin className="h-5 w-5" />}
                  {isTwitter && <Twitter className="h-5 w-5" />}
                  {!isGithub && !isLinkedIn && !isTwitter && '🔗'}
                </a>
              )
            })}
            <a
              href={`mailto:${siteConfig.author.email}`}
              className="text-matrix-grey hover:text-matrix-green transition-colors"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
        <div className="border-t border-matrix-dark/60 pt-6">
          <p className="text-xs text-matrix-grey text-center">
            &copy; {currentYear} {siteConfig.author.name}. All rights reserved. Built with Next.js and Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  )
}
