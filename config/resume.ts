/**
 * config/resume.ts
 *
 * Centralized knowledge file for the AI assistant.
 * Imports from the individual config modules and assembles a single
 * typed object that the backend context-builder (and any other consumer)
 * can import without touching the source configs.
 */

import { projects, type Project } from "@/config/projects"
import { skillMatrix, type SkillCategory } from "@/config/skills"
import { certifications, type Certification } from "@/config/certifications"
import siteConfig from "@/config/site"

// ── Owner identity ─────────────────────────────────────────────────────────

export interface ResumeOwner {
  name: string
  title: string
  email: string
  github: string
  linkedin: string
  twitter: string
  summary: string
}

// ── Top-level resume shape ─────────────────────────────────────────────────

export interface ResumeData {
  owner: ResumeOwner
  skills: SkillCategory[]
  projects: Project[]
  certifications: Certification[]
}

// ── Data ───────────────────────────────────────────────────────────────────

const owner: ResumeOwner = {
  name: siteConfig.author.name,
  title: "AI Developer & Cybersecurity Enthusiast",
  email: siteConfig.author.email,
  github: "https://github.com/Hanzala1518",
  linkedin: "https://www.linkedin.com/in/hanzala-saify-11aa3a262/",
  twitter: "https://x.com/HanzalaSaify",
  summary:
    "Full-stack software engineer and AI specialist with hands-on experience building " +
    "production-grade AI systems, RAG pipelines, multi-agent platforms, and web applications. " +
    "Passionate about the intersection of cybersecurity and artificial intelligence. " +
    "Proficient across the full development lifecycle — from designing scalable backends " +
    "with FastAPI and Node.js to crafting polished frontends with React and Next.js. " +
    "Certified in ethical hacking, cloud architecture (AWS), and Google Cybersecurity, " +
    "with ongoing CEH v13 AI certification.",
}

/**
 * The single source-of-truth object consumed by the AI assistant backend.
 * All fields are typed against the interfaces defined in their source modules,
 * so any change to a config file is automatically reflected here.
 */
export const resumeData: ResumeData = {
  owner,
  skills: skillMatrix,
  projects,
  certifications,
}

// ── Convenience re-exports (so callers can import from one place) ──────────

export type { Project, SkillCategory, Certification }
