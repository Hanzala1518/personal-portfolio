"use client"

import { useState } from "react"
import { Send, User, Mail, MessageSquare, Briefcase, CheckCircle, AlertCircle, Loader2 } from "lucide-react"

import { m } from "@/components/shared/motion"
import { Button } from "@/components/ui/button"
import { useInView } from "@/lib/hooks/useInView"
import siteConfig from "@/config/site"

interface FormData {
  name: string
  email: string
  projectType: string
  budget: string
  message: string
}

interface FormStatus {
  type: "idle" | "loading" | "success" | "error"
  message: string
}

const projectTypes = [
  "Web Development",
  "AI/ML Project",
  "Data Analysis",
  "Full-Stack Application",
  "API Development",
  "Consulting",
  "Other"
]

const budgetRanges = [
  "< $500",
  "$500 - $1,000",
  "$1,000 - $5,000",
  "$5,000 - $10,000",
  "$10,000+"
]

export default function ContactForm() {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.1 })
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    projectType: "",
    budget: "",
    message: ""
  })
  const [status, setStatus] = useState<FormStatus>({ type: "idle", message: "" })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus({ type: "loading", message: "Sending your message..." })

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        setStatus({ type: "success", message: "Message sent successfully! I'll get back to you soon." })
        setFormData({ name: "", email: "", projectType: "", budget: "", message: "" })
      } else {
        setStatus({ type: "error", message: data.error || "Something went wrong. Please try again." })
      }
    } catch {
      setStatus({ type: "error", message: "Failed to send message. Please try again later." })
    }
  }

  return (
    <section id="contact" className="relative border-t border-matrix-navy/40 bg-matrix-darker/60 py-24" ref={ref}>
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-matrix-navy/[0.05] via-transparent to-matrix-navy/[0.05] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-matrix-green/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative mx-auto flex w-full max-w-[1200px] flex-col gap-14 px-6">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }}
          className="text-center"
        >
          <p className="text-xs font-mono uppercase tracking-[0.4em] text-matrix-green">Get In Touch</p>
          <h2 className="mt-3 font-display text-4xl text-matrix-white">Let's Work <span className="text-matrix-green">Together</span></h2>
          <p className="mt-4 mx-auto max-w-2xl text-lg text-matrix-grey/90 leading-relaxed">
            Have a project in mind? I'm available for freelance work. Fill out the form below and let's discuss how I can help bring your ideas to life.
          </p>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto w-full max-w-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name & Email Row */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="name" className="flex items-center gap-2 text-sm font-mono text-matrix-grey">
                  <User className="h-4 w-4 text-matrix-green" />
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="w-full rounded-lg border border-matrix-navy/50 bg-matrix-navyDark/50 px-4 py-3 text-matrix-white placeholder:text-matrix-grey/50 transition-all duration-300 focus:border-matrix-green/50 focus:outline-none focus:ring-1 focus:ring-matrix-green/30"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="flex items-center gap-2 text-sm font-mono text-matrix-grey">
                  <Mail className="h-4 w-4 text-matrix-green" />
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                  className="w-full rounded-lg border border-matrix-navy/50 bg-matrix-navyDark/50 px-4 py-3 text-matrix-white placeholder:text-matrix-grey/50 transition-all duration-300 focus:border-matrix-green/50 focus:outline-none focus:ring-1 focus:ring-matrix-green/30"
                />
              </div>
            </div>

            {/* Project Type & Budget Row */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="projectType" className="flex items-center gap-2 text-sm font-mono text-matrix-grey">
                  <Briefcase className="h-4 w-4 text-matrix-green" />
                  Project Type
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-matrix-navy/50 bg-matrix-navyDark/50 px-4 py-3 text-matrix-white transition-all duration-300 focus:border-matrix-green/50 focus:outline-none focus:ring-1 focus:ring-matrix-green/30 appearance-none cursor-pointer"
                >
                  <option value="" disabled className="bg-matrix-dark">Select project type</option>
                  {projectTypes.map((type) => (
                    <option key={type} value={type} className="bg-matrix-dark">{type}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="budget" className="flex items-center gap-2 text-sm font-mono text-matrix-grey">
                  <span className="text-matrix-green">$</span>
                  Budget Range
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-matrix-navy/50 bg-matrix-navyDark/50 px-4 py-3 text-matrix-white transition-all duration-300 focus:border-matrix-green/50 focus:outline-none focus:ring-1 focus:ring-matrix-green/30 appearance-none cursor-pointer"
                >
                  <option value="" disabled className="bg-matrix-dark">Select budget range</option>
                  {budgetRanges.map((range) => (
                    <option key={range} value={range} className="bg-matrix-dark">{range}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label htmlFor="message" className="flex items-center gap-2 text-sm font-mono text-matrix-grey">
                <MessageSquare className="h-4 w-4 text-matrix-green" />
                Project Details
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Tell me about your project, goals, and timeline..."
                className="w-full rounded-lg border border-matrix-navy/50 bg-matrix-navyDark/50 px-4 py-3 text-matrix-white placeholder:text-matrix-grey/50 transition-all duration-300 focus:border-matrix-green/50 focus:outline-none focus:ring-1 focus:ring-matrix-green/30 resize-none"
              />
            </div>

            {/* Status Message */}
            {status.type !== "idle" && (
              <m.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-center gap-3 rounded-lg border px-4 py-3 ${
                  status.type === "success"
                    ? "border-matrix-green/50 bg-matrix-green/10 text-matrix-green"
                    : status.type === "error"
                    ? "border-red-500/50 bg-red-500/10 text-red-400"
                    : "border-matrix-navy/50 bg-matrix-navy/20 text-matrix-grey"
                }`}
              >
                {status.type === "success" && <CheckCircle className="h-5 w-5" />}
                {status.type === "error" && <AlertCircle className="h-5 w-5" />}
                {status.type === "loading" && <Loader2 className="h-5 w-5 animate-spin" />}
                <span className="text-sm">{status.message}</span>
              </m.div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={status.type === "loading"}
              className="group w-full bg-matrix-green/20 border border-matrix-green text-matrix-green hover:bg-matrix-green/30 py-6 text-base font-mono tracking-wide transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status.type === "loading" ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  Send Message
                </>
              )}
            </Button>
          </form>

          {/* Alternative Contact */}
          <m.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 text-center"
          >
            <p className="text-sm text-matrix-grey/70">
              Prefer email? Reach me directly at{" "}
              <a href={`mailto:${siteConfig.author.email}`} className="text-matrix-green hover:text-matrix-cyan transition-colors">
                {siteConfig.author.email}
              </a>
            </p>
          </m.div>
        </m.div>
      </div>
    </section>
  )
}
