"use client"

import { cn } from "@/lib/utils"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import React, { useRef, useState } from "react"
import type { ReactNode } from "react"

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  tilt?: boolean
}

export function GlassCard({ children, className, hover = true, tilt = true }: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  // Motion values for tilt
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Smooth spring physics for tilt (no elastic bounce, just smooth dampening)
  const mouseX = useSpring(x, { stiffness: 100, damping: 20, mass: 0.5 })
  const mouseY = useSpring(y, { stiffness: 100, damping: 20, mass: 0.5 })

  // Transform mouse position to rotation
  // Very subtle: max 3 degrees
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["3deg", "-3deg"])
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-3deg", "3deg"])
  
  // Parallax for inner content
  const contentX = useTransform(mouseX, [-0.5, 0.5], ["-5px", "5px"])
  const contentY = useTransform(mouseY, [-0.5, 0.5], ["-5px", "5px"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !tilt) return

    const rect = ref.current.getBoundingClientRect()
    
    // Normalized coordinates -0.5 to 0.5
    const width = rect.width
    const height = rect.height
    
    const mouseXPos = e.clientX - rect.left
    const mouseYPos = e.clientY - rect.top
    
    const xPct = (mouseXPos / width) - 0.5
    const yPct = (mouseYPos / height) - 0.5
    
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: tilt ? rotateX : 0,
        rotateY: tilt ? rotateY : 0,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className={cn(
        // Base: Dark Deep Glass
        "relative bg-[#050505]/60 backdrop-blur-md border border-white/10",
        // Shape
        "rounded-[12px] overflow-hidden", // Slightly softer corners as per image
        // Transition
        "transition-colors duration-300 ease-out",
        // Hover state
        isHovered && "border-white/20",
        className
      )}
      animate={{
        boxShadow: isHovered 
          ? "0 20px 40px -10px rgba(255, 255, 255, 0.08)" // Silver glow shadow
          : "0 0px 0px 0px rgba(0,0,0,0)",
      }}
      transition={{ duration: 0.2 }}
    >
      {/* Spotlight Effect */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useTransform(
            [x, y],
            ([latestX, latestY]) => `radial-gradient(
              600px circle at ${latestX * 100 + 50}% ${latestY * 100 + 50}%,
              rgba(255, 255, 255, 0.05),
              transparent 40%
            )`
          ),
          opacity: isHovered ? 1 : 0
        }}
      />

      {/* Content Layer - Slight Parallax */}
      <motion.div
        style={{
          x: tilt ? contentX : 0,
          y: tilt ? contentY : 0,
          translateZ: "20px", // Pushes content forward in 3D space
        }}
        className="relative z-10 h-full p-1" // Added padding wrapper
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
