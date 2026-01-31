"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState, useEffect } from "react"

import siteConfig from "@/config/site"
import { cn } from "@/lib/utils/cn"

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("/")

  // Add scroll detection for header styling and active section tracking
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      // Only track sections on home page
      if (pathname !== "/") return

      // Get all sections
      const sections = ["skills", "certifications", "projects", "testimonials", "contact"]
      const scrollPosition = window.scrollY + 150 // Offset for header

      // Check if we're at the top of the page
      if (window.scrollY < 200) {
        setActiveSection("/")
        return
      }

      // Find the current section
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(`/#${sectionId}`)
            return
          }
        }
      }
    }

    handleScroll() // Call once on mount
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  // Handle navigation click with smooth scroll for section links
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Close mobile menu
    setMenuOpen(false)

    // Check if it's a section link (starts with /#)
    if (href.startsWith("/#")) {
      e.preventDefault()
      const sectionId = href.replace("/#", "")
      
      // If we're not on the home page, navigate there first
      if (pathname !== "/") {
        router.push(href)
        return
      }

      // Smooth scroll to section with offset for sticky header
      const section = document.getElementById(sectionId)
      if (section) {
        const headerOffset = 80 // Account for sticky header height
        const elementPosition = section.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.scrollY - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        })
      }
    }
  }

  // Check if current section is active (for highlighting)
  const isActive = (href: string) => {
    // On home page, use scroll-based active section
    if (pathname === "/") {
      return activeSection === href
    }
    // On other pages, use pathname
    return pathname === href
  }

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
              onClick={(e) => handleNavClick(e, item.href)}
              className={cn(
                "relative py-1 transition-all duration-300 hover:text-matrix-white",
                isActive(item.href) ? "text-matrix-green" : "text-matrix-grey"
              )}
            >
              {item.label}
              <span 
                className={cn(
                  "absolute -bottom-1 left-0 h-px bg-gradient-to-r from-matrix-green to-matrix-cyan transition-all duration-300",
                  isActive(item.href) ? "w-full" : "w-0 group-hover:w-full"
                )} 
              />
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
