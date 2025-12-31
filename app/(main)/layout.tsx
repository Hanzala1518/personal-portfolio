import type { ReactNode } from "react"

import Footer from "@/components/shared/Footer"
import Header from "@/components/shared/Header"
import { BGPattern } from "@/components/ui/bg-pattern"
import { Vortex } from "@/components/ui/vortex"

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col bg-black text-matrix-grey">
      {/* Grid Pattern Background */}
      <div className="fixed inset-0 z-0">
        <BGPattern 
          variant="grid" 
          mask="fade-edges" 
          size={40}
          fill="rgba(0, 36, 85, 0.25)"
          className="z-0"
        />
      </div>
      
      {/* Vortex Particle Effect */}
      <div className="fixed inset-0 z-[1] pointer-events-none">
        <Vortex
          backgroundColor="transparent"
          particleCount={600}
          rangeY={100}
          baseSpeed={0.0}
          rangeSpeed={1.5}
          baseRadius={1}
          rangeRadius={2}
          baseHue={220}
          containerClassName="h-full w-full"
        />
      </div>
      
      {/* Content Layer */}
      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  )
}
