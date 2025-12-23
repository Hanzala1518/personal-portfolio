"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

import siteConfig from "@/config/site"
import { cn } from "@/lib/utils/cn"

export default function Header() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-matrix-dark/60 bg-matrix-black/90 backdrop-blur-xl">
      <div className="container mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4">
        <Link href="/" className="group flex items-center gap-2 text-lg font-display text-matrix-white hover:text-matrix-green transition-colors">
          {siteConfig.author.name}
        </Link>
        <button
          className="supports-no-hover:inline-flex supports-hover:hidden rounded border border-matrix-green/40 px-2 py-1 text-sm text-matrix-green"
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen((open: boolean) => !open)}
        >
          {menuOpen ? "CLOSE" : "MENU"}
        </button>
        <nav
          className={cn(
            "supports-hover:flex hidden items-center gap-6 text-sm font-mono uppercase tracking-wide",
            menuOpen && "supports-no-hover:flex flex-col absolute left-0 right-0 top-full border-b border-matrix-dark/80 bg-matrix-black px-6 py-4"
          )}
        >
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative transition-colors hover:text-matrix-white",
                pathname === item.href ? "text-matrix-green" : "text-matrix-grey"
              )}
            >
              {item.label}
              {pathname === item.href ? (
                <span className="absolute -bottom-1 left-0 h-px w-full bg-gradient-to-r from-matrix-green to-matrix-cyan" />
              ) : null}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
