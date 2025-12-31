"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"

import siteConfig from "@/config/site"
import { cn } from "@/lib/utils/cn"

export default function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Add scroll detection for header styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header 
      className={cn(
        "sticky top-0 z-40 border-b backdrop-blur-xl transition-all duration-500 ease-out",
        scrolled 
          ? "border-matrix-green/20 bg-matrix-black/95 shadow-[0_4px_30px_rgba(0,0,0,0.3)]" 
          : "border-matrix-navy/40 bg-matrix-black/80"
      )}
    >
      <div className="container mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4">
        <Link 
          href="/" 
          className="group flex items-center gap-2 text-lg font-display text-matrix-white transition-all duration-300 hover:text-matrix-green"
        >
          <span className="relative">
            {siteConfig.author.name}
            <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-matrix-green to-matrix-cyan transition-all duration-300 group-hover:w-full" />
          </span>
        </Link>
        <button
          className="supports-no-hover:inline-flex supports-hover:hidden rounded border border-matrix-green/40 px-3 py-1.5 text-sm text-matrix-green transition-all duration-300 hover:bg-matrix-green/10"
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((open: boolean) => !open)}
        >
          {menuOpen ? "CLOSE" : "MENU"}
        </button>
        <nav
          className={cn(
            "supports-hover:flex hidden items-center gap-8 text-sm font-mono uppercase tracking-wide",
            menuOpen && "supports-no-hover:flex flex-col absolute left-0 right-0 top-full border-b border-matrix-navy/60 bg-matrix-black/95 backdrop-blur-xl px-6 py-4"
          )}
        >
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative py-1 transition-all duration-300 hover:text-matrix-white",
                pathname === item.href ? "text-matrix-green" : "text-matrix-grey"
              )}
            >
              {item.label}
              <span 
                className={cn(
                  "absolute -bottom-1 left-0 h-px bg-gradient-to-r from-matrix-green to-matrix-cyan transition-all duration-300",
                  pathname === item.href ? "w-full" : "w-0 group-hover:w-full"
                )} 
              />
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
