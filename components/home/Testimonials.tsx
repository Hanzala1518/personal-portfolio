"use client"

import { AnimatedTestimonials } from "@/components/ui/animated-testimonials"
import { m } from "@/components/shared/motion"
import { useInView } from "@/lib/hooks/useInView"

const testimonials = [
  {
    quote:
      "We brought Hanzala in to help us prototype and validate an AI-driven internal tool, and he quickly proved to be far more than just an implementer. He understood our business constraints, translated vague requirements into a clear technical roadmap, and delivered a working solution that we could actually iterate on. What stood out most was his ability to balance speed with clean architecture — nothing felt rushed or fragile. He's someone you can trust with real product responsibility.",
    name: "Aditya Dubey",
    designation: "Founder @ Innov8 Solutions",
  },
  {
    quote:
      "Hanzala worked closely with us on building MarketMuse AI, collaborating end-to-end on backend APIs, AI workflows, and the overall system architecture. He was able to step into a complex, evolving codebase, identify bottlenecks in our RAG pipelines and data flows, and propose improvements without slowing down development. His understanding of databases, system design, and AI integration made collaboration seamless. Most importantly, he communicates clearly — you always know what's being built, why it's being built, and the trade-offs involved.",
    name: "Dhruv Agrawal",
    designation: "CTO @ NineAgents",
  },
  {
    quote:
      "Hanzala was a key contributor in developing MarketMuse AI alongside our core team. From taking ideas on paper to delivering a deployable, production-ready platform, he consistently took ownership and executed with clarity. He didn't just focus on features — he actively considered performance, scalability, and long-term maintainability. From a leadership standpoint, he's reliable, proactive, and thinks like an engineer who understands product impact.",
    name: "Tanishq Vyas",
    designation: "CEO @ NineAgents",
  },
  {
    quote:
      "I collaborated with Hanzala on data-heavy and ML-driven features, and his analytical approach really stood out. He understands data pipelines, model evaluation, and how to turn raw data into something actionable. What I appreciated most was his ability to explain complex technical decisions clearly, which made cross-functional collaboration much smoother.",
    name: "Rajwardhan Singh Tomar",
    designation: "Data Scientist",
  },
  {
    quote:
      "Hanzala joined us as a Web Developer & Database Administrator Intern and made meaningful contributions from day one. He worked on optimizing web applications and handling sensitive medical data with a strong focus on security, privacy, and compliance. His awareness of HIPAA and GDPR practices, combined with his problem-solving ability, made him a dependable part of our technical team. He approaches work with maturity and accountability.",
    name: "Murtuza Saifee",
    designation: "CEO @ Medisoft Technologies",
  },
  {
    quote:
      "What impressed me about Hanzala is his security-aware mindset. Whether it's web development or AI systems, he consistently considers threat surfaces, data exposure, and secure handling practices. He asks the right questions and doesn't treat security as an afterthought. That's a rare quality, especially for someone with such a strong full-stack and AI background.",
    name: "Sahil Agasi",
    designation: "Cybersecurity Analyst",
  },
]

export default function Testimonials() {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.1 })

  return (
    <section id="testimonials" className="relative border-b border-matrix-navy/40 bg-matrix-dark/40 py-24" ref={ref}>
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-matrix-navy/[0.05] via-transparent to-matrix-navy/[0.05] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-matrix-green/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative mx-auto flex w-full max-w-[1200px] flex-col gap-8 px-6">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }}
          className="text-center"
        >
          <p className="text-xs font-mono uppercase tracking-[0.4em] text-matrix-green">Testimonials</p>
          <h2 className="mt-3 font-display text-4xl text-matrix-white">What Clients <span className="text-matrix-green">Say</span></h2>
          <p className="mt-4 mx-auto max-w-2xl text-lg text-matrix-grey/90 leading-relaxed">
            Feedback from clients and collaborators I&apos;ve had the pleasure of working with on various projects.
          </p>
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <AnimatedTestimonials testimonials={testimonials} autoplay />
        </m.div>
      </div>
    </section>
  )
}
