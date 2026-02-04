"use client"

import { GlassCard } from "@/components/glass-card"
import { motion, useInView } from "framer-motion"
import { Github, ExternalLink, Calendar, Cpu, Brain, Rocket, Globe } from "lucide-react"
import { useRef, useState } from "react"
import { cinematicStagger, fadeInUp, cardReveal, viewportSettings } from "@/lib/motion"
import { cn } from "@/lib/utils"

// ============ DATA ============

const allProjects = [
  {
    title: "Deep Learning Projects",
    category: "ai",
    period: "Jul 2024 - Oct 2024",
    description: "Advanced deep learning pipelines for agricultural applications and computer vision.",
    bullets: [
      "Developed deep learning pipelines for object detection and yield estimation using YOLOv11 with tracking via Hungarian Algorithm and Kalman Filter.",
      "Conducted experiments on agricultural datasets and evaluated model performance for real-world deployment.",
      "Implemented disease classification pipelines for plant health monitoring using CNN-based architectures.",
      "Project outcomes contributed to peer-reviewed research publications.",
    ],
    tech: ["Python", "YOLOv11", "Hungarian Algorithm", "Kalman Filter", "TensorFlow", "Keras"],
    icon: Brain,
    featured: true,
  },
  {
    title: "Borehole Deviation System",
    subtitle: "Seamless Hardware-Software Synchronization",
    category: "hardware",
    period: "Oct 2023 - Mar 2024",
    description: "Complete hardware-software solution for measuring borehole deviations for MECL.",
    bullets: [
      "Developed a web application and hardware solution for MECL's project to measure borehole deviations.",
      "Introduced a synchronization mechanism that eliminated the need for wired or wireless connections between hardware and software.",
      "Conducted extensive field tests, ensuring system reliability and ease of deployment.",
      "Contributed to advancing government projects with innovative IoT applications.",
    ],
    tech: ["Python", "Flask", "HTML", "CSS", "JavaScript", "Embedded C", "IoT", "ESP32"],
    icon: Cpu,
    featured: true,
  },
  {
    title: "CUBE-SAT Project",
    subtitle: "Satellite Systems Development",
    category: "hardware",
    period: "Jun 2023 - Aug 2023",
    description: "Hardware and software development for satellite systems at IIEC VIT.",
    bullets: [
      "Contributed to the design and development of hardware and software for the CUBE-SAT project at IIEC VIT.",
      "Optimized satellite systems for improved communication and data collection.",
      "Collaborated with a multidisciplinary team to enhance system performance and reliability.",
    ],
    tech: ["C", "Embedded Systems", "IoT", "MATLAB"],
    icon: Rocket,
    featured: false,
  },
  {
    title: "Web Applications",
    subtitle: "Specialized Framework Development",
    category: "web",
    period: "Ongoing",
    description: "IoT-focused web applications using modern frameworks.",
    bullets: [
      "Specialized in designing and deploying IoT-focused web applications using Flask and Django frameworks.",
      "Integrated IoT devices with web platforms, enabling intelligent interaction and monitoring.",
      "Delivered scalable solutions tailored to industry requirements.",
    ],
    tech: ["Flask", "Django", "Python", "JavaScript", "Java"],
    icon: Globe,
    featured: false,
  },
]

type CategoryType = "all" | "ai" | "hardware" | "web"

const categories = [
  { id: "all", label: "All Projects", icon: Cpu },
  { id: "ai", label: "AI & Deep Learning", icon: Brain },
  { id: "hardware", label: "Hardware & IoT", icon: Rocket },
  { id: "web", label: "Web Applications", icon: Globe },
]

// ============ COMPONENT ============

export function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, viewportSettings)
  const [activeCategory, setActiveCategory] = useState<CategoryType>("all")

  const filteredProjects = activeCategory === "all" 
    ? allProjects 
    : allProjects.filter(p => p.category === activeCategory)

  return (
    <section id="projects" className="relative py-20 px-4 overflow-hidden" ref={ref}>
      <motion.div
        className="max-w-6xl mx-auto relative z-10"
        variants={cinematicStagger}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Section Header */}
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <span className="text-sm font-medium text-primary uppercase tracking-[0.2em]">
            Projects
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 text-foreground">
            Systems I&apos;ve Built
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            From deep learning pipelines to embedded systems and satellite projects — real-world solutions built with cutting-edge technology.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => {
            const Icon = cat.icon
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as CategoryType)}
                className={cn(
                  "flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all backdrop-blur-md border",
                  activeCategory === cat.id
                    ? "bg-primary/20 border-primary text-primary shadow-[0_0_20px_rgba(59,130,246,0.2)]"
                    : "bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10 hover:text-white"
                )}
              >
                <Icon className="w-4 h-4" />
                {cat.label}
              </button>
            )
          })}
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {filteredProjects.map((project, idx) => {
            const Icon = project.icon
            return (
              <motion.div 
                key={project.title} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <GlassCard className="p-6 h-full relative overflow-hidden group">
                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 right-4">
                      <span className="px-2 py-1 text-xs font-medium bg-primary/20 text-primary rounded-full border border-primary/30">
                        Featured
                      </span>
                    </div>
                  )}

                  {/* Header */}
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-12 h-12 rounded-[4px] bg-gradient-to-br from-primary/20 to-cyan-500/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg text-foreground leading-tight">
                        {project.title}
                      </h3>
                      {project.subtitle && (
                        <p className="text-sm text-muted-foreground mt-0.5">
                          {project.subtitle}
                        </p>
                      )}
                      <div className="flex items-center gap-2 mt-2">
                        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                          <Calendar className="w-3 h-3" />
                          {project.period}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Bullet Points */}
                  <ul className="space-y-2 mb-5">
                    {project.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                    {project.tech.map((t) => (
                      <span 
                        key={t} 
                        className="px-2.5 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
                      >
                        {t}
                      </span>
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
