import { GlassCard } from "@/components/glass-card"
import { motion, useInView } from "framer-motion"
import { Award } from "lucide-react"
import { useRef } from "react"
import { cinematicStagger, fadeInUp, cardReveal, viewportSettings } from "@/lib/motion"

const certifications = [
  {
    title: "AWS Certified Machine Learning",
    issuer: "Amazon Web Services",
    date: "2024",
    type: "certification",
  },
  {
    title: "TensorFlow Developer Certificate",
    issuer: "Google",
    date: "2024",
    type: "certification",
  },
  {
    title: "Deep Learning Specialization",
    issuer: "DeepLearning.AI",
    date: "2023",
    type: "certification",
  },
  {
    title: "Azure AI Engineer Associate",
    issuer: "Microsoft",
    date: "2024",
    type: "certification",
  },
]

export function CertificationsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, viewportSettings)
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <section id="certifications" className="py-16 px-4 overflow-hidden" ref={ref}>
      <motion.div
        className="max-w-6xl mx-auto"
        variants={cinematicStagger}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div variants={fadeInUp}>
          <div className="text-center mb-16">
            <span className="text-sm font-medium text-primary uppercase tracking-widest">
              Credentials
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 text-foreground">
              Certifications
            </h2>
          </div>
          
          <div
            ref={scrollRef}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {certifications.map((cert, index) => (
              <motion.div
                key={`${cert.title}-${index}`}
                variants={fadeInUp}
              >
                <GlassCard className="p-6 h-full" hover={true}>
                  <div className="flex flex-col h-full justify-between">
                    <div className="mb-4">
                      <div className="w-12 h-12 rounded-xl bg-secondary/20 border border-white/10 flex items-center justify-center mb-4">
                        <Award className="w-6 h-6 text-primary" />
                      </div>
                      <h4 className="font-semibold text-base leading-tight text-foreground">{cert.title}</h4>
                      <p className="text-sm text-muted-foreground mt-2">{cert.issuer}</p>
                    </div>
                    <div className="pt-4 border-t border-white/10">
                      <span className="text-xs font-medium text-primary bg-secondary/20 px-2 py-1 rounded">
                        {cert.date}
                      </span>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
