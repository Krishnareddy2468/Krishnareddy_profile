"use client"

import { GlassButton } from "@/components/glass-button"
import { GlassCard } from "@/components/glass-card"
import { motion, useInView } from "framer-motion"
import { FileText, ExternalLink, Mic, Award, Users, Calendar, Globe } from "lucide-react"
import { useRef } from "react"
import { cinematicStagger, fadeInUp, viewportSettings } from "@/lib/motion"

const publications = [
  {
    title: "Deep Learning-Based Coconut Ripeness Classification and Yield Estimation",
    conference: "SENNET 2025",
    status: "Published",
    year: "2025",
    type: "publication",
  },
  {
    title: "AI-Driven Space Debris Detection and Trajectory Prediction Using Deep Learning and Orbital Mechanics",
    conference: "ICSIMA 2025",
    status: "Published",
    year: "2025",
    type: "publication",
  },
  {
    title: "Securing Reality: AI-Driven Detection of Deepfakes and Counterfeit Currency",
    conference: "iSAI-NLP 2025",
    status: "Published",
    year: "2025",
    type: "publication",
  },
]

const academicActivities = [
  {
    title: "Invited Speaker",
    event: "Geo Smart India 2024",
    link: "https://www.geosmartindia.net",
    year: "2024",
    icon: Mic,
  },
]

const positionsOfResponsibility = [
  {
    title: "Technical Projects Manager",
    organization: "Machine Learning Club, VIT-AP",
    icon: Users,
  },
  {
    title: "Team Lead",
    organization: "Self-Driving Electric Vehicle Project, VIT-AP",
    icon: Award,
  },
  {
    title: "Campus Ambassador (2025)",
    organization: "Unstop",
    icon: Globe,
  },
]

export function PublicationsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, viewportSettings)

  return (
    <section id="publications" className="relative py-20 px-4 overflow-hidden" ref={ref}>
      <motion.div
        className="max-w-5xl mx-auto relative z-10"
        variants={cinematicStagger}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Section Header */}
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <span className="text-sm font-medium text-primary uppercase tracking-[0.2em]">
            Research
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 text-foreground">
            Publications & Academic Activities
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto italic">
            All publications were completed under direct faculty supervision and accepted at peer-reviewed international conferences.
          </p>
          
          <div className="mt-8 flex justify-center">
            <GlassButton 
              href="https://www.researchgate.net/profile/Nalla-Reddy-3"
              target="_blank" 
              rel="noopener noreferrer"
              variant="secondary"
              className="text-sm px-5 py-2 h-auto min-h-0"
            >
              <ExternalLink className="w-4 h-4" />
              View ResearchGate Profile
            </GlassButton>
          </div>
        </motion.div>

        {/* Publications Grid */}
        <motion.div variants={fadeInUp} className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-[4px] bg-primary/10 border border-primary/20 flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Research Publications</h3>
          </div>
          
          <div className="space-y-4">
            {publications.map((pub, index) => (
              <motion.div 
                key={pub.title}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="p-5 relative overflow-hidden" hover={false}>
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-cyan-500" />
                  
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pl-4">
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground leading-tight mb-2">
                        {pub.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {pub.conference}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="px-3 py-1 text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30 rounded-full">
                        {pub.status}
                      </span>
                      <span className="px-3 py-1 text-xs font-medium bg-white/5 text-muted-foreground border border-white/10 rounded-full flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" />
                        {pub.year}
                      </span>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Academic Activities */}
        <motion.div variants={fadeInUp} className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-[4px] bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
              <Mic className="w-5 h-5 text-orange-400" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Speaking & Activities</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {academicActivities.map((activity, index) => {
              const Icon = activity.icon
              return (
                <motion.div 
                  key={activity.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <GlassCard className="p-5" hover={false}>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-orange-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{activity.title}</h4>
                        <a 
                          href={activity.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:text-cyan-400 transition-colors flex items-center gap-1"
                        >
                          {activity.event}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                        <span className="text-xs text-muted-foreground mt-1 block">{activity.year}</span>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Positions of Responsibility */}
        <motion.div variants={fadeInUp}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-[4px] bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
              <Award className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Positions of Responsibility</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            {positionsOfResponsibility.map((position, index) => {
              const Icon = position.icon
              return (
                <motion.div 
                  key={position.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <GlassCard className="p-5 h-full" hover={false}>
                    <div className="flex flex-col items-center text-center">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center mb-4">
                        <Icon className="w-7 h-7 text-purple-400" />
                      </div>
                      <h4 className="font-semibold text-foreground text-sm leading-tight mb-2">
                        {position.title}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {position.organization}
                      </p>
                    </div>
                  </GlassCard>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
