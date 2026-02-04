"use client"

import { GlassButton } from "@/components/glass-button"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDown, Download, Briefcase } from "lucide-react"
import { useRef } from "react"
import { NeuroComputeBackground } from "@/components/neuro-compute-background"

export function HeroSection() {
  const name = "N. Krishna Reddy"
  const sectionRef = useRef<HTMLElement>(null)
  
  // Parallax effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  })
  
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  // Apple-style smooth cubic bezier
  const smoothEase = [0.25, 0.1, 0.25, 1] as const

  const nameVariant = {
    hidden: { opacity: 0, y: 30, scale: 0.96, filter: "blur(4px)" },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: { 
        duration: 1.2, 
        ease: smoothEase,
      } 
    }
  }

  const subVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { delay: 0.2, duration: 0.8, ease: smoothEase }
    }
  }
  
  const buttonVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { delay: 0.4, duration: 0.8, ease: smoothEase }
    }
  }

  const descVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delay: 0.8, duration: 1.0, ease: smoothEase }
    }
  }

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center px-4 pt-24 pb-12 overflow-hidden"
    >
      {/* Neuro-Technology Compute System - Canvas 2D */}
      <NeuroComputeBackground />
      
      <motion.div
        className="max-w-4xl mx-auto text-center relative z-10 bg-[radial-gradient(closest-side,rgba(2,6,23,0.6)_0%,transparent_100%)] py-20"
        initial="hidden"
        animate="visible"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        {/* Badge - Subtle fade in */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: smoothEase }}
          className="inline-flex items-center gap-2 rounded-[4px] border border-primary/20 bg-primary/5 px-4 py-2 text-sm text-primary mb-8"
        >
          <Briefcase className="w-4 h-4" />
          <span>Open to Work</span>
        </motion.div>

        {/* Name - Main Event */}
        <motion.h1 
          variants={nameVariant}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1] text-foreground tracking-tight"
        >
          {name}
        </motion.h1>

        {/* Role - Slides in later */}
        <motion.div variants={subVariant} className="mb-8">
          <span className="text-xl md:text-2xl lg:text-3xl font-medium text-primary text-glow">
            AI & Intelligent Systems Engineer
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={subVariant}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed font-light text-balance"
        >
          Building production-grade AI systems across Computer Vision, IoT, and applied research — from field-tested hardware to peer-reviewed publications.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={buttonVariant}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <GlassButton href="#projects" variant="primary">
            View Projects & Research
          </GlassButton>
          <GlassButton href="/resume.pdf" variant="secondary">
            <Download className="w-4 h-4" />
            Download Resume
          </GlassButton>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <motion.a
            href="#about"
            className="flex flex-col items-center gap-2 text-muted-foreground/60 hover:text-muted-foreground transition-colors"
          >
            <span className="text-xs uppercase tracking-[0.2em]">Scroll</span>
            <ArrowDown className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  )
}
