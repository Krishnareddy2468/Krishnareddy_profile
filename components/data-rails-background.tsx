"use client"

import { motion } from "framer-motion"

/**
 * Strict Data Rails Background
 * - 3-5 large, faint diagonal/horizontal rails
 * - Fixed geometry, no randomness
 * - Small packets moving in one direction
 * - Max opacity: 6%
 */

interface DataPacket {
  railId: number
  offset: number
  speed: number
}

export function DataRailsBackground() {
  // Fixed rail definitions - no randomness
  const rails = [
    { id: 1, x1: "-10%", y1: "20%", x2: "110%", y2: "30%" },  // Diagonal top
    { id: 2, x1: "-10%", y1: "50%", x2: "110%", y2: "50%" },  // Horizontal middle
    { id: 3, x1: "-10%", y1: "70%", x2: "110%", y2: "80%" },  // Diagonal bottom
  ]

  // Fixed data packets - predictable positions
  const packets: DataPacket[] = [
    { railId: 1, offset: 0, speed: 25 },
    { railId: 1, offset: 0.5, speed: 25 },
    { railId: 2, offset: 0.2, speed: 30 },
    { railId: 2, offset: 0.7, speed: 30 },
    { railId: 3, offset: 0.1, speed: 28 },
    { railId: 3, offset: 0.6, speed: 28 },
  ]

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      <svg 
        className="w-full h-full" 
        preserveAspectRatio="none"
        style={{ opacity: 0.036 }} // Reduced by 40% from 6% to 3.6%
      >
        {/* Rail Lines - Thin strokes, muted steel blue */}
        {rails.map((rail) => (
          <line
            key={rail.id}
            x1={rail.x1}
            y1={rail.y1}
            x2={rail.x2}
            y2={rail.y2}
            stroke="oklch(0.55 0.10 250)" // Muted steel blue
            strokeWidth="1"
            strokeOpacity="0.8"
          />
        ))}

        {/* Data Packets - Moving along rails */}
        {packets.map((packet, idx) => {
          const rail = rails.find(r => r.id === packet.railId)
          if (!rail) return null

          return (
            <motion.circle
              key={idx}
              r="3"
              fill="oklch(0.55 0.10 250)"
              fillOpacity="1"
              initial={{ offsetDistance: `${packet.offset * 100}%` }}
              animate={{ offsetDistance: ["0%", "100%"] }}
              transition={{
                duration: packet.speed,
                repeat: Infinity,
                ease: "linear",
                delay: packet.offset * packet.speed,
              }}
              style={{
                offsetPath: `path('M ${rail.x1} ${rail.y1} L ${rail.x2} ${rail.y2}')`,
              }}
            />
          )
        })}
      </svg>
    </div>
  )
}
