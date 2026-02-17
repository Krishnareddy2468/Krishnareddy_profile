"use client"

import { motion } from "framer-motion"
import { Github, Heart, Linkedin } from "lucide-react"
import { fadeInUp } from "@/lib/motion"

export function Footer() {
  return (
    <motion.footer 
      className="py-12 px-4 border-t border-white/10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
            <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-xl font-bold text-foreground">
              N. Krishna Reddy
            </span>
          </div>

          {/* Quick Links */}
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#about" className="hover:text-primary transition-colors">About</a>
            <a href="#projects" className="hover:text-primary transition-colors">Projects</a>
            <a href="#experience" className="hover:text-primary transition-colors">Experience</a>
            <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <motion.a
              href="https://github.com"
              className="p-2 rounded-full bg-secondary/20 hover:bg-secondary/40 text-primary transition-colors"
              whileHover={{ y: -2 }}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="https://linkedin.com"
              className="p-2 rounded-full bg-secondary/20 hover:bg-secondary/40 text-primary transition-colors"
              whileHover={{ y: -2 }}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </motion.a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} N. Krishna Reddy. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  )
}
