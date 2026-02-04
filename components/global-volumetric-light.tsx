"use client"

import { useEffect, useRef } from "react"

/**
 * Global Volumetric Light Field
 * Creates the "Deep Blue Beams" effect seen in modern AI interfaces.
 * Uses high-performance CSS gradients and minimal JS for mouse influence.
 */
export function GlobalVolumetricLight() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const { clientX, clientY } = e
      const x = (clientX / window.innerWidth) * 100
      const y = (clientY / window.innerHeight) * 100
      
      // Shift the 'spotlight' subtly with mouse
      containerRef.current.style.setProperty("--mouse-x", `${x}%`)
      containerRef.current.style.setProperty("--mouse-y", `${y}%`)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[-2] overflow-hidden pointer-events-none bg-[#020617]"
    >
      {/* 1. Main Volumetric Beam (Top Center) */}
      <div 
        className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[150%] h-[150%] opacity-20 blur-[100px]"
        style={{
          background: "conic-gradient(from 180deg at 50% 50%, #000000 0deg, #333333 25deg, #000000 50deg, #404040 120deg, #000000 180deg, #000000 360deg)",
          transform: "rotate(180deg)",
          animation: "pulse-beam 8s ease-in-out infinite alternate"
        }}
      />

      {/* 2. Interactive Spotlight (Follows Mouse) */}
      <div 
        className="absolute w-[800px] h-[800px] opacity-10 blur-[120px] transition-transform duration-1000 cubic-bezier(0.1, 0.7, 0.1, 1)"
        style={{
          background: "radial-gradient(circle, #ffffff 0%, transparent 70%)",
          left: "var(--mouse-x, 50%)",
          top: "var(--mouse-y, 50%)",
          transform: "translate(-50%, -50%)"
        }}
      />

      {/* 3. Ambient Haze (Bottom) */}
      <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-[#0a0a0a] via-[#202020]/20 to-transparent blur-3xl opacity-30" />

      {/* 4. Secondary Ray (Angled) */}
      <div 
        className="absolute top-[-10%] right-[-10%] w-[80%] h-[120%] opacity-10 blur-[80px]"
        style={{
          background: "linear-gradient(215deg, #ffffff 0%, transparent 60%)",
          transform: "rotate(-15deg)"
        }}
      />

      {/* Grain Texture for "Film" Look */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('/noise.png')] mix-blend-overlay" />
      
      <style jsx>{`
        @keyframes pulse-beam {
          0% { opacity: 0.3; transform: rotate(180deg) scale(1); }
          100% { opacity: 0.5; transform: rotate(180deg) scale(1.1); }
        }
      `}</style>
    </div>
  )
}
