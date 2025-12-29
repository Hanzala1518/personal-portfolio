import type { ReactNode } from "react"

import Footer from "@/components/shared/Footer"
import Header from "@/components/shared/Header"
import { Vortex } from "@/components/ui/vortex"
import { Boxes } from "@/components/ui/background-boxes"

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col bg-matrix-black text-matrix-grey">
      {/* Global Vortex Background */}
      <div className="fixed inset-0 z-0">
        <Vortex
          backgroundColor="black"
          particleCount={700}
          rangeY={100}
          baseSpeed={0.0}
          rangeSpeed={1.5}
          baseRadius={1}
          rangeRadius={2}
          containerClassName="h-full w-full"
        />
      </div>
      
      {/* Global Background Boxes */}
      <div className="fixed inset-0 z-[1] pointer-events-none">
        <Boxes />
      </div>
      
      {/* Content Layer */}
      <div className="relative z-10 flex min-h-screen flex-col pointer-events-auto">
        <Header />
        <main className="flex-1 bg-grid bg-[length:24px_24px]">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  )
}
