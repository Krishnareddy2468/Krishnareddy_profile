"use client"

import { GlassCard } from "@/components/glass-card"
import { motion, useInView } from "framer-motion"
import { Mail, Linkedin, Github, MessageCircle, Calendar, MapPin, Send } from "lucide-react"
import { useRef } from "react"
import { cinematicStagger, fadeInUp, viewportSettings } from "@/lib/motion"

const contactLinks = [
  { 
    icon: Mail, 
    label: "Email", 
    value: "nkrishnareddy2003@gmail.com", 
    href: "mailto:nkrishnareddy2003@gmail.com",
    color: "from-red-500 to-orange-500",
  },
  { 
    icon: Linkedin, 
    label: "LinkedIn", 
    value: "linkedin.com/in/n-krishna-reddy", 
    href: "https://www.linkedin.com/in/n-krishna-reddy-924437337/",
    color: "from-blue-600 to-blue-400",
  },
  { 
    icon: Github, 
    label: "GitHub", 
    value: "github.com/Krishnareddy2468", 
    href: "https://github.com/Krishnareddy2468",
    color: "from-gray-600 to-gray-400",
  },
  { 
    icon: MessageCircle, 
    label: "WhatsApp", 
    value: "+91 7207276994", 
    href: "https://wa.me/917207276994",
    color: "from-green-600 to-green-400",
  },
]

export function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, viewportSettings)

  return (
    <section id="contact" className="py-20 px-4" ref={ref}>
      <motion.div
        className="max-w-4xl mx-auto"
        variants={cinematicStagger}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Section Header */}
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <span className="text-sm font-medium text-primary uppercase tracking-[0.2em]">
            Contact
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 text-foreground">
            Let&apos;s Connect
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            I&apos;m actively seeking research-oriented or applied AI internships. 
            If you have an opportunity or just want to discuss ideas, I&apos;d love to hear from you.
          </p>
        </motion.div>

        {/* Availability Notice */}
        <motion.div variants={fadeInUp} className="mb-10">
          <GlassCard className="p-6 relative overflow-hidden" hover={false}>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-cyan-500" />
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-lg font-semibold text-foreground">
                  Available for Internships
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">2026 - 2027</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Andhra Pradesh, India</span>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Contact Links Grid */}
        <motion.div variants={fadeInUp}>
          <div className="grid md:grid-cols-2 gap-4">
            {contactLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <GlassCard className="p-5 h-full transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]" hover={false}>
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-[4px] bg-gradient-to-br ${link.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                      <link.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-muted-foreground mb-1">{link.label}</p>
                      <p className="text-foreground font-semibold truncate group-hover:text-primary transition-colors">
                        {link.value}
                      </p>
                    </div>
                    <Send className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100" />
                  </div>
                </GlassCard>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div variants={fadeInUp} className="mt-12 text-center">
          <GlassCard className="p-8 inline-block" hover={false}>
            <h3 className="text-xl font-bold text-foreground mb-3">
              Ready to discuss your next project?
            </h3>
            <p className="text-muted-foreground text-sm mb-6 max-w-md">
              Whether it&apos;s AI research, embedded systems, or full-stack development — I&apos;m excited to contribute and learn.
            </p>
            <a
              href="mailto:nkrishnareddy2003@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-cyan-500 text-white font-semibold rounded-full hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all"
            >
              <Mail className="w-5 h-5" />
              Send me an email
            </a>
          </GlassCard>
        </motion.div>

        {/* Response Time */}
        <motion.p variants={fadeInUp} className="text-center text-xs text-muted-foreground mt-8">
          I typically respond within 24-48 hours.
        </motion.p>
      </motion.div>
    </section>
  )
}
