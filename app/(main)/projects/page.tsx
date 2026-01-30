"use client"

import Link from "next/link"
import { useState } from "react"
import { ExternalLink, Github, Filter, Rocket } from "lucide-react"

import { projects, projectCategories } from "@/config/projects"
import { fadeUp, m } from "@/components/shared/motion"

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory)

  return (
    <div className="min-h-screen py-20">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-12 px-6">
        {/* Header */}
        <div>
          <p className="text-xs font-mono uppercase tracking-[0.4em] text-matrix-green">Portfolio</p>
          <h1 className="mt-3 font-display text-5xl text-matrix-white">All <span className="text-matrix-green">Projects</span></h1>
          <p className="mt-4 max-w-3xl text-lg text-matrix-grey">
            A comprehensive collection of my work spanning various technologies and domains.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center gap-3">
          <Filter className="h-4 w-4 text-matrix-green" />
          <span className="text-sm text-matrix-grey">Filter:</span>
          {projectCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full border px-4 py-1.5 text-sm transition-all duration-300 ${
                selectedCategory === category
                  ? "border-matrix-green/70 bg-matrix-green/10 text-matrix-green shadow-[0_0_10px_rgba(255,56,56,0.2)]"
                  : "border-matrix-navy/50 bg-matrix-navyDark/30 text-matrix-grey hover:border-matrix-green/50 hover:text-matrix-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <m.article
              key={project.id}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.05 }}
              className="group relative overflow-hidden rounded-xl border border-matrix-navy/40 bg-matrix-navyDark/40 shadow-lg transition-all duration-500 supports-hover:hover:-translate-y-2 supports-hover:hover:border-matrix-green/50 supports-hover:hover:shadow-[0_20px_40px_rgba(0,0,0,0.3),0_0_20px_rgba(255,56,56,0.15)]"
            >
              {/* Clickable overlay for project details */}
              <Link href={`/projects/${project.id}`} className="absolute inset-0 z-20" aria-label={`View ${project.title} details`} />
              
              {/* Project Image Placeholder */}
              <div className="h-48 bg-gradient-to-br from-matrix-navyDark to-matrix-dark flex items-center justify-center border-b border-matrix-navy/30">
                <span className="text-6xl opacity-20">
                  {project.category === "Cybersecurity" && "🔒"}
                  {project.category === "Web Development" && "🌐"}
                  {project.category === "Data Science" && "📊"}
                  {project.category === "Mobile Development" && "📱"}
                  {project.category === "DevOps" && "⚙️"}
                  {!["Cybersecurity", "Web Development", "Data Science", "Mobile Development", "DevOps"].includes(project.category) && "🚀"}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Category Badge */}
                <span className="inline-block rounded-sm border border-matrix-navy/50 bg-matrix-navy/30 px-2 py-1 text-[10px] font-mono uppercase tracking-[0.3em] text-matrix-green">
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
                      className="rounded-full border border-matrix-navy/40 bg-matrix-navyDark/50 px-2 py-1 text-xs text-matrix-grey"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="rounded-full border border-matrix-navy/40 bg-matrix-navyDark/50 px-2 py-1 text-xs text-matrix-grey">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>

                {/* Links */}
                <div className="flex gap-3 pt-2 border-t border-matrix-navy/30 relative z-30">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-matrix-green hover:text-matrix-cyan transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github className="h-4 w-4" />
                      Code
                    </a>
                  )}
                  <a
                    href={project.liveUrl || "/projects/deploying"}
                    target={project.liveUrl ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-matrix-green hover:text-matrix-cyan transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {project.liveUrl ? (
                      <ExternalLink className="h-4 w-4" />
                    ) : (
                      <Rocket className="h-4 w-4" />
                    )}
                    {project.liveUrl ? "Live Demo" : "Deploying..."}
                  </a>
                </div>
              </div>
            </m.article>
          ))}
        </div>

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-matrix-grey text-lg">No projects found in this category.</p>
          </div>
        )}
      </div>
    </div>
  )
}
