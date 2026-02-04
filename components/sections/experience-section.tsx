"use client"

import { GlassCard } from "@/components/glass-card"
import { motion, useInView } from "framer-motion"
import { Briefcase, ExternalLink, MapPin, Calendar } from "lucide-react"
import { useRef } from "react"
import { cinematicStagger, fadeInUp, cardReveal, viewportSettings } from "@/lib/motion"

const experiences = [
  {
    title: "Hardware and Software Developer",
    company: "Mineral Exploration and Consultancy Limited (MECL)",
    website: "https://mecl.co.in/index.aspx",
    location: "Hybrid",
    period: "Oct 2023 - Mar 2024",
    bullets: [
      "Designed and implemented a complete hardware–software solution for an Integrated Borehole Deviation System under direct faculty supervision.",
      "Developed system architecture, user-facing interfaces, and embedded control logic for real-time deviation measurement.",
      "Conducted extensive field testing and debugging in real operational environments, improving system reliability.",
      "Delivered a deployable prototype for a government-backed mineral exploration project, meeting real-world constraints.",
    ],
    tags: ["Embedded Systems", "Hardware Design", "IoT", "Field Testing"],
  },
  {
    title: "Web Application and IoT Developer",
    company: "eDrift Electric",
    website: "https://www.edriftelectric.com",
    location: "Hybrid",
    period: "Jun 2024 - Jul 2024",
    bullets: [
      "Built and deployed a web-based IoT management platform to improve EV infrastructure operations.",
      "Implemented intelligent power management using Io-Link systems combined with ML-based optimization.",
      "Developed full-stack modules using React and Django and deployed services on AWS EC2.",
      "Worked closely with engineers and researchers to support rapid prototyping and testing.",
    ],
    tags: ["React", "Django", "AWS EC2", "IoT", "Machine Learning"],
  },
]

export function ExperienceSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, viewportSettings)

  return (
    <section id="experience" className="py-20 px-4" ref={ref}>
      <motion.div
        className="max-w-4xl mx-auto"
        variants={cinematicStagger}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Section Header */}
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <span className="text-sm font-medium text-primary uppercase tracking-[0.2em]">
            Experience
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 text-foreground">
            Professional Journey
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Industry internships focused on real-world system development, hardware-software integration, and production deployments.
          </p>
        </motion.div>

        {/* Experience Cards */}
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={`${exp.company}-${index}`}
              variants={cardReveal}
            >
              <GlassCard className="p-8 relative overflow-hidden group">
                {/* Gradient accent */}
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary via-cyan-500 to-primary/50" />
                
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6 pl-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-[4px] bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <Briefcase className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-foreground">{exp.title}</h3>
                        <div className="flex items-center gap-2">
                          <a 
                            href={exp.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-cyan-400 transition-colors flex items-center gap-1 text-sm font-medium"
                          >
                            {exp.company}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Period & Location */}
                  <div className="flex flex-wrap gap-2 ml-0 md:ml-auto">
                    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                      <Calendar className="w-3 h-3" />
                      {exp.period}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                      <MapPin className="w-3 h-3" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Bullet Points */}
                <ul className="space-y-3 mb-6 pl-4">
                  {exp.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      {bullet}
                    </li>
                  ))}
                </ul>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 pl-4">
                  {exp.tags.map((tag, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary border border-primary/20 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
