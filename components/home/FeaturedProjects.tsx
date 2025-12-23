"use client"

import Link from "next/link"
import { ExternalLink, Github } from "lucide-react"

import { featuredProjects } from "@/config/projects"
import { fadeUp, m } from "@/components/shared/motion"
import { Button } from "@/components/ui/button"

export default function FeaturedProjects() {
  return (
    <section className="border-b border-matrix-dark/60 bg-matrix-dark/30 py-20">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-12 px-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.4em] text-matrix-green">Featured Work</p>
            <h2 className="mt-3 font-display text-4xl text-matrix-white">Selected Projects</h2>
            <p className="mt-4 max-w-3xl text-lg text-matrix-grey">
              A showcase of recent projects demonstrating technical expertise and problem-solving capabilities.
            </p>
          </div>
          <Button asChild variant="outline" className="hidden md:inline-flex border-matrix-green/50 text-matrix-green hover:bg-matrix-green/10">
            <Link href="/projects">View All Projects</Link>
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <m.article
              key={project.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-xl border border-matrix-green/20 bg-matrix-darker/80 shadow-lg transition supports-hover:hover:-translate-y-1 supports-hover:hover:border-matrix-green/40 supports-hover:hover:shadow-glow"
            >
              {/* Project Image Placeholder */}
              <div className="h-48 bg-gradient-to-br from-matrix-dark to-matrix-darker flex items-center justify-center border-b border-matrix-green/10">
                <span className="text-6xl opacity-20">🚀</span>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Category Badge */}
                <span className="inline-block rounded-sm border border-matrix-green/30 bg-matrix-dark/80 px-2 py-1 text-[10px] font-mono uppercase tracking-[0.3em] text-matrix-green">
                  {project.category}
                </span>

                <h3 className="font-display text-xl text-matrix-white group-hover:text-matrix-green transition-colors">
                  {project.title}
                </h3>

                <p className="text-sm text-matrix-grey line-clamp-3">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-matrix-green/20 px-2 py-1 text-xs text-matrix-grey"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="rounded-full border border-matrix-green/20 px-2 py-1 text-xs text-matrix-grey">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>

                {/* Links */}
                <div className="flex gap-3 pt-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-matrix-green hover:text-matrix-cyan transition-colors"
                    >
                      <Github className="h-4 w-4" />
                      Code
                    </a>
                  )}
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-matrix-green hover:text-matrix-cyan transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </m.article>
          ))}
        </div>

        <div className="text-center md:hidden">
          <Button asChild variant="outline" className="border-matrix-green/50 text-matrix-green hover:bg-matrix-green/10">
            <Link href="/projects">View All Projects</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
