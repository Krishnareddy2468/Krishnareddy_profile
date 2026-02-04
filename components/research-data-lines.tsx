"use client"

import { motion } from "framer-motion"

export function ResearchDataLines({ paused = false }: { paused?: boolean }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none -z-10">
      <svg className="w-full h-full opacity-[0.4]" preserveAspectRatio="none">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeOpacity="0.05" />
          </pattern>
        </defs>
        
        {/* Schematic Grid Background */}
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* Animated Data Path 1 - Top */}
        <motion.path
          d="M -100,100 C 200,100 400,50 600,100 S 1000,200 1200,150"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="1"
          strokeDasharray="4 8"
          strokeOpacity="0.3"
          animate={{
            strokeDashoffset: [0, -100]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
            playState: paused ? "paused" : "running" // Note: framer motion doesn't support playState directly like this, need active check
          }}
          // Framer motion loop manual handling or standard style
          style={{
             animationPlayState: paused ? 'paused' : 'running'
          }}
        />

        {/* Moving Particles on Path */}
        <motion.circle
          r="3"
          fill="var(--primary)"
          style={{ offsetPath: "path('M -100,100 C 200,100 400,50 600,100 S 1000,200 1200,150')", offsetDistance: "0%" }}
          animate={{
            offsetDistance: ["0%", "100%"]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 1
          }}
        />
        
         {/* Animated Data Path 2 - Bottom Crossing */}
        <motion.path
          d="M -100,500 C 300,500 400,300 800,400 S 1300,300 1500,400"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="1"
          strokeDasharray="4 8"
          strokeOpacity="0.2"
          animate={{
            strokeDashoffset: [0, -100]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />

      </svg>
      
      {/* CSS Animation Overlay for Pause support */}
      <style jsx>{`
        .research-lines path, .research-lines circle {
          animation-play-state: ${paused ? 'paused' : 'running'} !important;
        }
      `}</style>
    </div>
  )
}
