"use client"

import Link from "next/link"
import { ExternalLink, Github, ArrowUpRight, Rocket } from "lucide-react"

import { featuredProjects } from "@/config/projects"
import { fadeUp, m, staggerContainer } from "@/components/shared/motion"
import { Button } from "@/components/ui/button"
import { useInView } from "@/lib/hooks/useInView"

export default function FeaturedProjects() {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.1 })
  
  return (
    <section id="projects" className="relative border-b border-matrix-dark/60 bg-matrix-dark/30 py-24" ref={ref}>
      {/* Subtle ambient glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-matrix-green/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-matrix-navy/20 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative mx-auto flex w-full max-w-[1200px] flex-col gap-14 px-6">
        <m.div 
          className="flex items-end justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }}
        >
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.4em] text-matrix-green">Featured Work</p>
            <h2 className="mt-3 font-display text-4xl text-matrix-white">Selected <span className="text-matrix-green">Projects</span></h2>
            <p className="mt-4 max-w-3xl text-lg text-matrix-grey/90 leading-relaxed">
              A showcase of recent projects demonstrating technical expertise and problem-solving capabilities.
            </p>
          </div>
          <Button asChild variant="outline" className="group hidden md:inline-flex border-matrix-navy text-matrix-green hover:bg-matrix-green/10 hover:border-matrix-green/50">
            <Link href="/projects">
              View All Projects
              <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </Button>
        </m.div>

        <m.div 
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {featuredProjects.map((project, index) => (
            <m.article
              key={project.id}
              variants={fadeUp}
              custom={index}
              className="group relative overflow-hidden rounded-xl border border-matrix-navy/40 bg-matrix-navyDark/40 shadow-lg transition-all duration-500 ease-out supports-hover:hover:-translate-y-2 supports-hover:hover:border-matrix-green/50 supports-hover:hover:shadow-[0_20px_40px_rgba(0,0,0,0.3),0_0_20px_rgba(255,56,56,0.15)]"
            >
              {/* Clickable overlay for project details */}
              <Link href={`/projects/${project.id}`} className="absolute inset-0 z-20" aria-label={`View ${project.title} details`} />
              
              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-matrix-green/0 to-matrix-green/0 transition-all duration-500 group-hover:from-matrix-navy/30 group-hover:to-transparent pointer-events-none z-10" />
              
              {/* Project Image Placeholder */}
              <div className="relative h-48 bg-gradient-to-br from-matrix-navyDark to-matrix-dark flex items-center justify-center border-b border-matrix-navy/30 overflow-hidden">
                <span className="text-6xl opacity-20 transition-transform duration-500 group-hover:scale-110">🚀</span>
                {/* Shine effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full transition-transform duration-700 group-hover:translate-x-full" />
              </div>

              {/* Content */}
              <div className="relative p-6 space-y-4">
                {/* Category Badge */}
                <span className="inline-block rounded-sm border border-matrix-navy/50 bg-matrix-navy/30 px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.3em] text-matrix-green transition-all duration-300 group-hover:bg-matrix-green/10 group-hover:border-matrix-green/30">
                  {project.category}
                </span>

                <h3 className="font-display text-xl text-matrix-white transition-colors duration-300 group-hover:text-matrix-green">
                  {project.title}
                </h3>

                <p className="text-sm text-matrix-grey/80 line-clamp-3 leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-matrix-navy/40 bg-matrix-navyDark/50 px-2.5 py-1 text-xs text-matrix-grey transition-all duration-300 group-hover:border-matrix-green/40"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="rounded-full border border-matrix-navy/40 bg-matrix-navyDark/50 px-2.5 py-1 text-xs text-matrix-grey">
                      +{project.technologies.length - 3} more
                    </span>
                  )}
                </div>

                {/* Links */}
                <div className="flex gap-4 pt-2 relative z-30">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link inline-flex items-center gap-1.5 text-sm text-matrix-green transition-all duration-300 hover:text-matrix-cyan"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github className="h-4 w-4" />
                      <span>Code</span>
                    </a>
                  )}
                  <a
                    href={project.liveUrl || "/projects/deploying"}
                    target={project.liveUrl ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    className="group/link inline-flex items-center gap-1.5 text-sm text-matrix-green transition-all duration-300 hover:text-matrix-cyan"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {project.liveUrl ? (
                      <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    ) : (
                      <Rocket className="h-4 w-4" />
                    )}
                    <span>{project.liveUrl ? "Live Demo" : "Deploying..."}</span>
                  </a>
                </div>
              </div>
            </m.article>
          ))}
        </m.div>

        <m.div 
          className="text-center md:hidden"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <Button asChild variant="outline" className="border-matrix-navy text-matrix-green hover:bg-matrix-green/10 hover:border-matrix-green/50">
            <Link href="/projects">View All Projects</Link>
          </Button>
        </m.div>
      </div>
    </section>
  )
}
