import type { ReactNode } from "react"

import Footer from "@/components/shared/Footer"
import Header from "@/components/shared/Header"

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col bg-matrix-black text-matrix-grey">
      <Header />
      <main className="flex-1 bg-grid bg-[length:24px_24px]">
        {children}
      </main>
      <Footer />
    </div>
  )
}
