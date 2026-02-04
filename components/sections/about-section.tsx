"use client"

import { GlassCard } from "@/components/glass-card"
import { motion, useInView } from "framer-motion"
import { User, Briefcase, Target } from "lucide-react"
import { useRef } from "react"
import { cinematicStagger, fadeInUp, cardReveal, viewportSettings } from "@/lib/motion"

const aboutBlocks = [
  {
    icon: User,
    title: "Who I Am",
    content: "Integrated M.Tech Computer Science student with strong experience in AI, Computer Vision, and IoT-based intelligent systems.",
  },
  {
    icon: Briefcase,
    title: "Proof of Work",
    content: "Hands-on experience with government-backed and industry projects involving real hardware deployment, production ML pipelines, and system-level design. Author of multiple peer-reviewed research papers under faculty supervision.",
  },
  {
    icon: Target,
    title: "What I'm Seeking",
    content: "Actively seeking research-oriented or applied AI internships focused on real-world systems, not toy problems.",
  },
]

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, viewportSettings)

  return (
    <section id="about" className="py-16 px-4" ref={ref}>
      <motion.div
        className="max-w-4xl mx-auto"
        variants={cinematicStagger}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Section Header */}
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <span className="text-sm font-medium text-primary uppercase tracking-[0.2em]">
            About
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 text-foreground">
            Background & Focus
          </h2>
        </motion.div>

        {/* Three Blocks - Staggered reveal */}
        <motion.div 
          className="grid md:grid-cols-3 gap-6"
          variants={cinematicStagger}
        >
          {aboutBlocks.map((block) => (
            <motion.div key={block.title} variants={cardReveal}>
              <GlassCard className="p-6 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-[4px] bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <block.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">{block.title}</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {block.content}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
