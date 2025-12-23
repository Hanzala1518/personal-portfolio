"use client"

import { LazyMotion, domAnimation } from "framer-motion"
import type { ReactNode } from "react"

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <LazyMotion strict features={domAnimation}>
      {children}
    </LazyMotion>
  )
}
