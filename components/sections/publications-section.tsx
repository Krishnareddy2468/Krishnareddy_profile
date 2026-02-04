"use client"

import { GlassCard } from "@/components/glass-card"
import { ImageSlideshow } from "@/components/image-slideshow"
import { motion, useInView } from "framer-motion"
import { FileText, ExternalLink } from "lucide-react"
import { useRef } from "react"
import { cinematicStagger, fadeInUp, cardReveal, viewportSettings } from "@/lib/motion"

const publications = [
  {
    title: "Efficient Fine-tuning Methods for Domain-Specific Large Language Models",
    conference: "International Conference on Machine Learning (Under Review)",
    year: "2024",
    contribution: "Proposed LoRA-based adaptation achieving comparable performance with 90% less compute.",
    link: "#",
    images: [
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop",
    ],
  },
  {
    title: "Multi-Modal Fusion Architecture for Agricultural Stress Detection",
    conference: "IEEE International Conference on Computer Vision (ICCV Workshop)",
    year: "2024",
    contribution: "Late-fusion of RGB, NIR, and thermal imagery improving detection accuracy by 15%.",
    link: "#",
    images: [
      "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&auto=format&fit=crop",
    ],
  },
  {
    title: "Real-time Borehole Deviation Measurement Using MEMS-based Inertial Navigation",
    conference: "Journal of Sensors and Actuators",
    year: "2023",
    contribution: "Novel calibration algorithm reducing angular error to sub-degree accuracy in field conditions.",
    link: "#",
    images: [
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop",
    ],
  },
]

export function PublicationsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, viewportSettings)

  return (
    <section id="publications" className="relative py-16 px-4 overflow-hidden" ref={ref}>
      <motion.div
        className="max-w-4xl mx-auto relative z-10"
        variants={cinematicStagger}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Section Header */}
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <span className="text-sm font-medium text-primary uppercase tracking-widest">
            Research
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 text-foreground">
            Publications
          </h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto text-sm">
            Peer-reviewed contributions in AI, Computer Vision, and Embedded Systems.
          </p>
        </motion.div>

        {/* Publications List */}
        <div className="space-y-6">
          {publications.map((pub, index) => (
            <motion.div key={pub.title} variants={fadeInUp}>
              <GlassCard className="p-0 overflow-hidden" hover={false}>
                <div className="flex flex-col md:flex-row">
                  {/* Image Slideshow */}
                  <div className="md:w-64 h-48 md:h-auto flex-shrink-0">
                    <ImageSlideshow images={pub.images} interval={6000} />
                  </div>
                  
                  {/* Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Title */}
                      <h3 className="font-semibold text-foreground leading-tight mb-2">
                        {pub.title}
                      </h3>
                      
                      {/* Conference & Year */}
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <span className="text-xs text-muted-foreground">
                          {pub.conference}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded bg-secondary/20 text-foreground font-medium border border-white/10">
                          {pub.year}
                        </span>
                      </div>
                      
                      {/* Contribution */}
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        <span className="font-medium text-primary">Contribution:</span>{" "}
                        {pub.contribution}
                      </p>
                    </div>
                    
                    {/* Link */}
                    <div className="mt-4">
                      <a
                        href={pub.link}
                        className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
                      >
                        <FileText className="w-4 h-4" />
                        View Paper
                        <ExternalLink className="w-3 h-3 opacity-50" />
                      </a>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
