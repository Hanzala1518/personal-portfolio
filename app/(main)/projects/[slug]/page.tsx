"use client"

import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { useParams } from "next/navigation"
import { ArrowLeft, Github, ExternalLink, Calendar, Rocket, CheckCircle } from "lucide-react"

import { projects } from "@/config/projects"
import { m } from "@/components/shared/motion"
import { Button } from "@/components/ui/button"

export default function ProjectPage() {
  const params = useParams()
  const slug = params.slug as string
  const project = projects.find((p) => p.id === slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen py-20">
      <div className="mx-auto flex w-full max-w-[1000px] flex-col gap-12 px-6">
        {/* Back Button */}
        <m.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Button asChild variant="ghost" className="group text-matrix-grey hover:text-matrix-green">
            <Link href="/projects">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              Back to Projects
            </Link>
          </Button>
        </m.div>

        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-6"
        >
          {/* Category & Year */}
          <div className="flex items-center gap-4">
            <span className="inline-block rounded-sm border border-matrix-green/50 bg-matrix-green/10 px-3 py-1.5 text-xs font-mono uppercase tracking-[0.3em] text-matrix-green">
              {project.category}
            </span>
            {project.year && (
              <span className="flex items-center gap-1.5 text-sm text-matrix-grey">
                <Calendar className="h-4 w-4" />
                {project.year}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="font-display text-5xl md:text-6xl text-matrix-white">
            {project.title}
          </h1>

          {/* Description */}
          <p className="text-xl text-matrix-grey/90 leading-relaxed max-w-3xl">
            {project.longDescription || project.description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            {project.githubUrl && (
              <Button asChild className="group bg-matrix-navy/50 border border-matrix-green/50 text-matrix-green hover:bg-matrix-green/20">
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-5 w-5" />
                  View Source Code
                </a>
              </Button>
            )}
            <Button asChild className="group bg-matrix-green/20 border border-matrix-green text-matrix-green hover:bg-matrix-green/30">
              <a 
                href={project.liveUrl || "/projects/deploying"} 
                target={project.liveUrl ? "_blank" : "_self"} 
                rel="noopener noreferrer"
              >
                {project.liveUrl ? (
                  <ExternalLink className="mr-2 h-5 w-5" />
                ) : (
                  <Rocket className="mr-2 h-5 w-5" />
                )}
                {project.liveUrl ? "Live Demo" : "Deploying Soon..."}
              </a>
            </Button>
          </div>
        </m.div>

        {/* Hero Image */}
        <m.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative aspect-video w-full overflow-hidden rounded-xl border border-matrix-navy/40 bg-gradient-to-br from-matrix-navyDark to-matrix-dark"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-8xl opacity-20">🚀</span>
          </div>
          {/* Decorative grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
        </m.div>

        {/* Technologies */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-4"
        >
          <h2 className="font-display text-2xl text-matrix-white">Technologies Used</h2>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-matrix-green/40 bg-matrix-navy/30 px-4 py-2 text-sm text-matrix-grey transition-all duration-300 hover:border-matrix-green hover:text-matrix-green"
              >
                {tech}
              </span>
            ))}
          </div>
        </m.div>

        {/* Features */}
        {project.features && project.features.length > 0 && (
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-6"
          >
            <h2 className="font-display text-2xl text-matrix-white">Key Features</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {project.features.map((feature, index) => (
                <m.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="flex items-start gap-3 rounded-lg border border-matrix-navy/40 bg-matrix-navyDark/30 p-4 transition-all duration-300 hover:border-matrix-green/40"
                >
                  <CheckCircle className="h-5 w-5 mt-0.5 text-matrix-green flex-shrink-0" />
                  <span className="text-matrix-grey/90">{feature}</span>
                </m.div>
              ))}
            </div>
          </m.div>
        )}

        {/* Screenshots */}
        {project.screenshots && project.screenshots.length > 0 && (
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="space-y-6"
          >
            <h2 className="font-display text-2xl text-matrix-white">Screenshots</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {project.screenshots.map((screenshot, index) => (
                <m.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                  className="group relative aspect-video overflow-hidden rounded-xl border border-matrix-navy/40 bg-gradient-to-br from-matrix-navyDark to-matrix-dark transition-all duration-300 hover:border-matrix-green/40"
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl opacity-30">📸</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-matrix-black/80 to-transparent p-4">
                    <span className="text-sm text-matrix-grey">Screenshot {index + 1}</span>
                  </div>
                </m.div>
              ))}
            </div>
          </m.div>
        )}

        {/* Call to Action */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-8 rounded-xl border border-matrix-navy/40 bg-gradient-to-r from-matrix-navyDark/50 to-matrix-navy/30 p-8 text-center"
        >
          <h3 className="font-display text-2xl text-matrix-white mb-4">Interested in this project?</h3>
          <p className="text-matrix-grey mb-6">Feel free to explore the code or reach out to discuss collaboration opportunities.</p>
          <div className="flex justify-center gap-4">
            {project.githubUrl && (
              <Button asChild variant="outline" className="border-matrix-green text-matrix-green hover:bg-matrix-green/10">
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  Star on GitHub
                </a>
              </Button>
            )}
            <Button asChild className="bg-matrix-green/20 border border-matrix-green text-matrix-green hover:bg-matrix-green/30">
              <Link href="/#contact">
                Get in Touch
              </Link>
            </Button>
          </div>
        </m.div>
      </div>
    </div>
  )
}
