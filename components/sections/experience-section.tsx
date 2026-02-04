"use client"

import { GlassCard } from "@/components/glass-card"
import { motion, useInView } from "framer-motion"
import { Briefcase, GraduationCap } from "lucide-react"
import { useRef } from "react"
import { cinematicStagger, fadeInUp, cardReveal, viewportSettings } from "@/lib/motion"

const experiences = [
  {
    type: "work",
    title: "Research Intern - AI & Embedded Systems",
    company: "Government R&D Lab",
    period: "2024",
    bullets: [
      "Designed borehole deviation measurement system with MEMS sensors achieving < 0.5° accuracy",
      "Deployed embedded firmware on STM32; reduced calibration time by 40%",
      "Authored technical documentation for govt. project handover",
    ],
  },
  {
    type: "work",
    title: "Project Intern - Computer Vision",
    company: "Agricultural Research Institute",
    period: "2023",
    bullets: [
      "Built plant disease detection pipeline with 92% accuracy across 15 disease classes",
      "Deployed as Android app; tested by 50+ field researchers",
      "Contributed to research paper on multi-modal crop monitoring",
    ],
  },
  {
    type: "education",
    title: "Integrated M.Tech in Computer Science",
    company: "University Name",
    period: "2020 - Present",
    bullets: [
      "Specialization: AI, Computer Vision, Embedded Systems",
      "CGPA: 8.5/10 | Top 5% of batch",
      "Published 3 peer-reviewed papers under faculty supervision",
      "Led technical team for IoT-based smart campus project",
    ],
  },
]

const typeIcons = {
  work: Briefcase,
  education: GraduationCap,
}

export function ExperienceSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, viewportSettings)

  return (
    <section id="experience" className="py-16 px-4" ref={ref}>
      <motion.div
        className="max-w-3xl mx-auto"
        variants={cinematicStagger}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Section Header */}
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <span className="text-sm font-medium text-primary uppercase tracking-widest">
            Experience
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 text-foreground">
            Work & Education
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-white/10 hidden md:block" />

          <div className="space-y-6">
            {experiences.map((exp, index) => {
              const Icon = typeIcons[exp.type as keyof typeof typeIcons]

              return (
                <motion.div
                  key={`${exp.title}-${index}`}
                  variants={fadeInUp}
                  className="relative pl-0 md:pl-14"
                >
                  {/* Timeline Node */}
                  <div className="absolute left-2 top-5 hidden md:flex items-center justify-center w-6 h-6 rounded-full bg-[#0a0a0a] border border-white/20 z-10">
                    <Icon className="w-3 h-3 text-primary" />
                  </div>

                  <GlassCard className="p-5" hover={false}>
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                      <div>
                        <div className="flex items-center gap-2 md:hidden mb-1">
                          <Icon className="w-4 h-4 text-primary" />
                        </div>
                        <h3 className="font-semibold text-foreground">{exp.title}</h3>
                        <p className="text-sm text-foreground font-medium">{exp.company}</p>
                      </div>
                      <span className="text-xs text-muted-foreground bg-secondary/20 px-2 py-1 rounded whitespace-nowrap h-fit border border-white/10">
                        {exp.period}
                      </span>
                    </div>

                    {/* Bullet Points */}
                    <ul className="space-y-1.5">
                      {exp.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </GlassCard>
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
