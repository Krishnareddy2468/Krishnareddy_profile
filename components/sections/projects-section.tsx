"use client"

import { GlassCard } from "@/components/glass-card"
import { ImageSlideshow } from "@/components/image-slideshow"
import { motion, useInView } from "framer-motion"
import { Github, ExternalLink, FileText, Cpu, Eye, LayoutGrid } from "lucide-react"
import { useRef, useState } from "react"
import { cinematicStagger, fadeInUp, cardReveal, viewportSettings } from "@/lib/motion"
import { cn } from "@/lib/utils"

// ============ DATA ============

const flagshipProjects = [
  {
    title: "Borehole Deviation Monitoring System",
    problem: "Manual borehole surveys are time-consuming, error-prone, and require expensive imported equipment.",
    approach: "Designed and deployed a complete hardware+software system using MEMS sensors, embedded firmware, and real-time visualization dashboard.",
    outcome: "Government-backed project deployed in field conditions. Reduced survey time by 60% with sub-degree accuracy.",
    tech: ["STM32", "MEMS Sensors", "Python", "Qt", "Signal Processing"],
    images: [
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop",
    ],
    github: "#",
  },
  {
    title: "eDrift Electric IoT Platform",
    problem: "Electric vehicles lack unified telemetry and predictive maintenance capabilities.",
    approach: "Built an end-to-end IoT platform with custom sensor nodes, edge computing, and cloud-based analytics for EV fleet management.",
    outcome: "Production system monitoring 50+ vehicles with real-time anomaly detection and predictive alerts.",
    tech: ["ESP32", "MQTT", "Node.js", "InfluxDB", "Grafana", "TensorFlow Lite"],
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&auto=format&fit=crop",
    ],
    github: "#",
  },
]

const appliedAIProjects = [
  {
    title: "Plant Health Detection System",
    problem: "Early disease detection in crops requires expert knowledge not available to small farmers.",
    approach: "CNN-based classification pipeline with mobile deployment for real-time leaf disease identification.",
    outcome: "92% accuracy across 15 disease classes. Deployed as Android app for field use.",
    tech: ["PyTorch", "MobileNet", "Android", "OpenCV"],
  },
  {
    title: "Fruit Detection & Yield Estimation",
    problem: "Manual yield estimation is labor-intensive and inaccurate for large orchards.",
    approach: "YOLOv8-based object detection with custom training on orchard imagery and automated counting pipeline.",
    outcome: "Achieved mAP of 0.89. Tested on mango and citrus orchards with <5% counting error.",
    tech: ["YOLOv8", "Python", "OpenCV", "Roboflow"],
  },
  {
    title: "Multi-Object Tracking Pipeline",
    problem: "Real-time tracking of multiple objects in video streams for surveillance and analytics.",
    approach: "DeepSORT integration with custom re-identification features for robust tracking across occlusions.",
    outcome: "Deployed in campus security pilot with 30fps processing on edge hardware.",
    tech: ["DeepSORT", "PyTorch", "NVIDIA Jetson", "GStreamer"],
  },
]

// ============ COMPONENT ============

export function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, viewportSettings)
  const [activeTab, setActiveTab] = useState<"flagship" | "ai">("flagship")

  return (
    <section id="projects" className="relative py-16 px-4 overflow-hidden" ref={ref}>
      <motion.div
        className="max-w-5xl mx-auto relative z-10"
        variants={cinematicStagger}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Section Header */}
        <motion.div variants={fadeInUp} className="text-center mb-10">
          <span className="text-sm font-medium text-primary uppercase tracking-widest">
            Projects
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 text-foreground">
            Systems I&apos;ve Built
          </h2>
        </motion.div>

        {/* Tab Controls */}
        <motion.div variants={fadeInUp} className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab("flagship")}
            className={cn(
              "flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all backdrop-blur-md border",
              activeTab === "flagship"
                ? "bg-primary/20 border-primary text-primary shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                : "bg-black/30 border-white/10 text-muted-foreground hover:bg-white/5 hover:text-white"
            )}
          >
            <Cpu className="w-4 h-4" />
            Flagship Systems
          </button>
          
          <button
            onClick={() => setActiveTab("ai")}
            className={cn(
              "flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all backdrop-blur-md border",
              activeTab === "ai"
                ? "bg-primary/20 border-primary text-primary shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                : "bg-black/30 border-white/10 text-muted-foreground hover:bg-white/5 hover:text-white"
            )}
          >
            <Eye className="w-4 h-4" />
            Applied AI & CV
          </button>
        </motion.div>

        {/* Content Area - Min Height to prevent jumpiness */}
        <div className="min-h-[500px]">
          {/* ========== CATEGORY 1: FLAGSHIP SYSTEMS ========== */}
          {activeTab === "flagship" && (
            <motion.div 
              key="flagship"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 gap-6"
            >
              {flagshipProjects.map((project, idx) => (
                <motion.div 
                  key={project.title} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <GlassCard className="p-0 overflow-hidden h-full" hover={false}>
                    {/* Image Slideshow */}
                    <div className="h-48 w-full">
                      <ImageSlideshow images={project.images} interval={5000} />
                    </div>
                    
                    <div className="p-5">
                      <h4 className="font-semibold text-foreground mb-3">{project.title}</h4>
                      
                      <div className="space-y-2 text-sm mb-4">
                        <div>
                          <span className="font-medium text-primary">Problem:</span>{" "}
                          <span className="text-muted-foreground">{project.problem}</span>
                        </div>
                        <div>
                          <span className="font-medium text-primary">Approach:</span>{" "}
                          <span className="text-muted-foreground">{project.approach}</span>
                        </div>
                        <div>
                          <span className="font-medium text-primary">Outcome:</span>{" "}
                          <span className="text-foreground font-medium">{project.outcome}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.tech.map((t) => (
                          <span key={t} className="px-2 py-0.5 text-xs rounded bg-secondary/20 text-foreground border border-white/10">
                            {t}
                          </span>
                        ))}
                      </div>
                      
                      <a
                        href={project.github}
                        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        View Code
                      </a>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* ========== CATEGORY 2: APPLIED AI & CV ========== */}
          {activeTab === "ai" && (
             <motion.div 
               key="ai"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20 }}
               transition={{ duration: 0.3 }}
               className="grid md:grid-cols-3 gap-4"
             >
              {appliedAIProjects.map((project, idx) => (
                <motion.div 
                  key={project.title} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <GlassCard className="p-5 h-full" hover={false}>
                    <h4 className="font-semibold text-foreground text-sm mb-3">{project.title}</h4>
                    
                    <div className="space-y-2 text-xs mb-4">
                      <div>
                        <span className="font-medium text-primary">Problem:</span>{" "}
                        <span className="text-muted-foreground">{project.problem}</span>
                      </div>
                      <div>
                        <span className="font-medium text-primary">Approach:</span>{" "}
                        <span className="text-muted-foreground">{project.approach}</span>
                      </div>
                      <div>
                        <span className="font-medium text-primary">Outcome:</span>{" "}
                        <span className="text-foreground font-medium">{project.outcome}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {project.tech.map((t) => (
                        <span key={t} className="px-1.5 py-0.5 text-[10px] rounded bg-secondary/20 text-foreground border border-white/10">
                          {t}
                        </span>
                      ))}
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  )
}
