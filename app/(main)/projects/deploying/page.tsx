"use client"

import Link from "next/link"
import { ArrowLeft, Rocket, Clock, Zap, Github } from "lucide-react"

import { m } from "@/components/shared/motion"
import { Button } from "@/components/ui/button"

export default function DeployingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-20">
      <div className="mx-auto flex w-full max-w-[600px] flex-col items-center gap-8 px-6 text-center">
        {/* Animated Rocket */}
        <m.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
          className="relative"
        >
          <m.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <div className="flex h-32 w-32 items-center justify-center rounded-full border-2 border-matrix-green/30 bg-gradient-to-br from-matrix-navyDark to-matrix-dark">
              <Rocket className="h-16 w-16 text-matrix-green" />
            </div>
            {/* Animated rings */}
            <m.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full border-2 border-matrix-green/20"
            />
            <m.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
              className="absolute inset-0 rounded-full border-2 border-matrix-green/10"
            />
          </m.div>
        </m.div>

        {/* Content */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
          <h1 className="font-display text-4xl md:text-5xl text-matrix-white">
            Deployment in <span className="text-matrix-green">Progress</span>
          </h1>
          <p className="text-lg text-matrix-grey/90 max-w-md mx-auto">
            This project is currently being deployed. Check back soon to see it live!
          </p>
        </m.div>

        {/* Status Indicators */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-6 py-6"
        >
          <div className="flex items-center gap-2 text-sm text-matrix-grey">
            <m.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="h-2 w-2 rounded-full bg-matrix-yellow"
            />
            <span>Building...</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-matrix-grey">
            <Clock className="h-4 w-4 text-matrix-green" />
            <span>Coming Soon</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-matrix-grey">
            <Zap className="h-4 w-4 text-matrix-cyan" />
            <span>Optimizing</span>
          </div>
        </m.div>

        {/* Progress Bar */}
        <m.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-full max-w-sm"
        >
          <div className="h-2 w-full rounded-full bg-matrix-navy/50 overflow-hidden">
            <m.div
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="h-full w-1/3 rounded-full bg-gradient-to-r from-transparent via-matrix-green to-transparent"
            />
          </div>
        </m.div>

        {/* Info Box */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="rounded-xl border border-matrix-navy/40 bg-matrix-navyDark/30 p-6 max-w-md"
        >
          <p className="text-sm text-matrix-grey/80 leading-relaxed">
            The live demo for this project is being prepared. In the meantime, you can explore the source code on GitHub or check out other completed projects.
          </p>
        </m.div>

        {/* Action Buttons */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Button asChild variant="outline" className="group border-matrix-navy text-matrix-grey hover:text-matrix-green hover:border-matrix-green/50">
            <Link href="/projects">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              Back to Projects
            </Link>
          </Button>
          <Button asChild className="bg-matrix-green/20 border border-matrix-green text-matrix-green hover:bg-matrix-green/30">
            <a href="https://github.com/Hanzala1518" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              View on GitHub
            </a>
          </Button>
        </m.div>
      </div>
    </div>
  )
}
