"use client"

import { GlassCard } from "@/components/glass-card"
import { motion, useInView } from "framer-motion"
import { 
  User, 
  GraduationCap, 
  Target, 
  MapPin, 
  Mail, 
  Phone, 
  Linkedin, 
  Github,
  Award,
  BookOpen
} from "lucide-react"
import { useRef } from "react"
import { cinematicStagger, fadeInUp, cardReveal, viewportSettings } from "@/lib/motion"

const educationData = [
  {
    degree: "Integrated M.Tech in Computer Science and Engineering",
    institution: "Vellore Institute of Technology – Andhra Pradesh, India",
    gpa: "8.84 / 10.00",
    year: "2027",
    current: true,
  },
  {
    degree: "Higher Secondary Education (Science Stream)",
    institution: "Vector Junior College, Telangana State Board, India",
    gpa: "96%",
    year: "2022",
    current: false,
  },
  {
    degree: "Secondary Education",
    institution: "Vedham High School, State Board, India",
    gpa: "10 / 10",
    year: "2020",
    current: false,
  },
]

const socialLinks = [
  {
    icon: Mail,
    label: "Email",
    value: "krishna.22mic7024@vitapstudent.ac.in",
    href: "mailto:krishna.22mic7024@vitapstudent.ac.in",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "n-krishna-reddy",
    href: "https://linkedin.com/in/n-krishna-reddy-924437337",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "Krishnareddy2468",
    href: "https://github.com/Krishnareddy2468",
  },
]

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, viewportSettings)

  return (
    <section id="about" className="py-20 px-4" ref={ref}>
      <motion.div
        className="max-w-6xl mx-auto"
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

        {/* Main Profile Card */}
        <motion.div variants={cardReveal} className="mb-8">
          <GlassCard className="p-8 md:p-10">
            <div className="grid md:grid-cols-[1fr,auto] gap-8 items-start">
              {/* Left: Profile Info */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-[4px] bg-gradient-to-br from-primary/20 to-cyan-500/20 border border-primary/30 flex items-center justify-center">
                    <User className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                      Nalla Krishna Reddy
                    </h3>
                    <p className="text-primary font-medium">
                      Integrated M.Tech • Computer Science and Engineering
                    </p>
                  </div>
                </div>

                {/* Location Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-muted-foreground mb-6">
                  <MapPin className="w-3.5 h-3.5" />
                  Vellore Institute of Technology, Andhra Pradesh
                </div>

                {/* Objective */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="w-4 h-4 text-primary" />
                    <span className="text-sm font-semibold text-foreground uppercase tracking-wider">
                      Research Objective
                    </span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    A research-oriented Integrated M.Tech student in Computer Science with strong experience in{" "}
                    <span className="text-foreground font-medium">Artificial Intelligence</span>,{" "}
                    <span className="text-foreground font-medium">Computer Vision</span>, and{" "}
                    <span className="text-foreground font-medium">IoT-based intelligent systems</span>. 
                    Experienced in supervised research, industry-grade system development, and peer-reviewed publications. 
                    Seeking a research-focused internship to contribute to applied AI, data-driven systems, and real-world problem solving.
                  </p>
                </div>

                {/* Social Links */}
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-[4px] bg-white/5 border border-white/10 text-sm text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
                    >
                      <link.icon className="w-4 h-4" />
                      <span>{link.value}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Right: Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-1 gap-4 md:min-w-[180px]">
                <div className="p-4 rounded-[4px] bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                  <div className="flex items-center gap-2 mb-1">
                    <GraduationCap className="w-4 h-4 text-primary" />
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Current GPA</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">8.84<span className="text-sm text-muted-foreground">/10</span></p>
                </div>
                <div className="p-4 rounded-[4px] bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border border-cyan-500/20">
                  <div className="flex items-center gap-2 mb-1">
                    <BookOpen className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">Research</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">Active<span className="text-sm text-muted-foreground ml-1">Profile</span></p>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Education Section */}
        <motion.div variants={fadeInUp} className="mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-[4px] bg-primary/10 border border-primary/20 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Education</h3>
          </div>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-4"
          variants={cinematicStagger}
        >
          {educationData.map((edu, index) => (
            <motion.div key={edu.degree} variants={cardReveal}>
              <GlassCard className={`p-6 h-full relative overflow-hidden ${edu.current ? 'border-primary/30' : ''}`}>
                {/* Current Badge */}
                {edu.current && (
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 text-xs font-medium bg-primary/20 text-primary rounded-full border border-primary/30">
                      Current
                    </span>
                  </div>
                )}

                {/* Year Badge */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-muted-foreground mb-4">
                  <Award className="w-3 h-3" />
                  {edu.year}
                </div>

                {/* Degree */}
                <h4 className="font-semibold text-foreground mb-2 leading-snug">
                  {edu.degree}
                </h4>

                {/* Institution */}
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {edu.institution}
                </p>

                {/* GPA/Percentage */}
                <div className="mt-auto pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">
                      {edu.gpa.includes('%') ? 'Percentage' : 'GPA'}
                    </span>
                    <span className="text-lg font-bold text-primary">
                      {edu.gpa}
                    </span>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
