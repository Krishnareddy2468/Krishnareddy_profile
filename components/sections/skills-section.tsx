"use client"

import { GlassCard } from "@/components/glass-card"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { cinematicStagger, fadeInUp, viewportSettings } from "@/lib/motion"
import { Brain, Code, Cpu, Globe } from "lucide-react"

const skillCategories = [
  {
    title: "AI & Machine Learning",
    icon: Brain,
    color: "from-blue-500 to-cyan-500",
    skills: [
      "Deep Learning",
      "Computer Vision", 
      "Object Detection",
      "Tracking",
      "TensorFlow",
      "PyTorch",
      "Keras",
      "OpenCV",
    ],
  },
  {
    title: "Programming Languages",
    icon: Code,
    color: "from-purple-500 to-pink-500",
    skills: [
      "Python",
      "C++",
      "Java",
      "Embedded C",
    ],
  },
  {
    title: "IoT & Embedded Systems",
    icon: Cpu,
    color: "from-green-500 to-emerald-500",
    skills: [
      "ESP32",
      "NVIDIA Jetson",
      "Raspberry Pi",
      "Wi-Fi",
      "Bluetooth",
    ],
  },
  {
    title: "Web & Cloud Technologies",
    icon: Globe,
    color: "from-orange-500 to-yellow-500",
    skills: [
      "Django",
      "Flask",
      "AWS EC2/S3",
      "Docker",
      "Git",
    ],
  },
]

export function SkillsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, viewportSettings)

  return (
    <section id="skills" className="py-20 px-4 relative" ref={ref}>
      <motion.div
        className="max-w-6xl mx-auto"
        variants={cinematicStagger}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Section Header */}
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <span className="text-sm font-medium text-primary uppercase tracking-[0.2em]">
            Technical Skills
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 text-foreground">
            Technologies I Work With
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            A comprehensive toolkit spanning AI/ML, embedded systems, and full-stack development.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={cinematicStagger}
          className="grid md:grid-cols-2 gap-6"
        >
          {skillCategories.map((category, categoryIdx) => {
            const Icon = category.icon
            return (
              <motion.div 
                key={category.title} 
                variants={fadeInUp}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: categoryIdx * 0.1 }}
              >
                <GlassCard className="p-6 h-full relative overflow-hidden group" hover={false}>
                  {/* Gradient accent */}
                  <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${category.color}`} />
                  
                  {/* Header */}
                  <div className="flex items-center gap-4 mb-6 pl-4">
                    <div className={`w-12 h-12 rounded-[4px] bg-gradient-to-br ${category.color} bg-opacity-20 border border-white/10 flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">
                      {category.title}
                    </h3>
                  </div>
                  
                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-2 pl-4">
                    {category.skills.map((skill, idx) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                        transition={{ delay: categoryIdx * 0.1 + idx * 0.05 }}
                        className="px-4 py-2 text-sm font-medium bg-white/5 hover:bg-white/10 text-foreground border border-white/10 rounded-full transition-all hover:border-primary/50 hover:text-primary cursor-default"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            )
          })}
        </motion.div>
      </motion.div>
    </section>
  )
}
