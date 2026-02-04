"use client"

import { GlassCard } from "@/components/glass-card"
import { motion, useInView } from "framer-motion"
import { Mail, Linkedin, Github } from "lucide-react"
import { useRef } from "react"
import { cinematicStagger, fadeInUp, cardReveal, viewportSettings } from "@/lib/motion"

const contactLinks = [
  { 
    icon: Mail, 
    label: "Email", 
    value: "krishnareddy@example.com", 
    href: "mailto:krishnareddy@example.com" 
  },
  { 
    icon: Linkedin, 
    label: "LinkedIn", 
    value: "linkedin.com/in/krishnareddy", 
    href: "https://linkedin.com/in/krishnareddy" 
  },
  { 
    icon: Github, 
    label: "GitHub", 
    value: "github.com/krishnareddy", 
    href: "https://github.com/krishnareddy" 
  },
]

export function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, viewportSettings)

  return (
    <section id="contact" className="py-16 px-4" ref={ref}>
      <motion.div
        className="max-w-2xl mx-auto"
        variants={cinematicStagger}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Section Header */}
        <motion.div variants={fadeInUp} className="text-center mb-10">
          <span className="text-sm font-medium text-primary uppercase tracking-widest">
            Contact
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 text-foreground">
            Let&apos;s Connect
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto text-sm">
            I&apos;m actively seeking research-oriented or applied AI internships. 
            If you have an opportunity or just want to discuss ideas, I&apos;d love to hear from you.
          </p>
        </motion.div>

        {/* Availability Notice */}
        <motion.div variants={fadeInUp} className="mb-8">
          <GlassCard className="p-4" hover={false}>
            <div className="flex items-center justify-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
              <span className="text-sm font-medium text-foreground">
                Available for Internships — Summer 2025
              </span>
            </div>
          </GlassCard>
        </motion.div>

        {/* Contact Links */}
        <motion.div variants={fadeInUp}>
          <GlassCard className="p-6" hover={false}>
            <div className="space-y-4">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("mailto") ? undefined : "_blank"}
                  rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  className="flex items-center gap-4 p-3 -mx-3 rounded-lg hover:bg-secondary/20 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-secondary/20 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <link.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{link.label}</p>
                    <p className="text-xs text-muted-foreground">{link.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Response Time */}
        <motion.p variants={fadeInUp} className="text-center text-xs text-muted-foreground mt-6">
          I typically respond within 24-48 hours.
        </motion.p>
      </motion.div>
    </section>
  )
}
