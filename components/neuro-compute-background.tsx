"use client"

import { useEffect, useRef } from "react"

/**
 * Neuro-Technology Compute System v2.0
 * 
 * Core Vision:
 * - Central 3D Intelligence Core (Neural Nucleus)
 * - Multi-depth layers (Background, Core, Foreground)
 * - Neural Signal Arcs (Synaptic firing)
 * - Living System behavior (Destabilization & Self-Correction)
 */

export function NeuroComputeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width: number, height: number, dpr: number
    let particles: Particle[] = []
    let animationFrameId: number
    
    // Config matches locked design system
    const particleCount = 600
    const connectionDistance = 110 // Max distance for neural arcs
    const colors = {
      cyan: [226, 232, 240], // Slate-200 (Silver)
      teal: [148, 163, 184],  // Slate-400 (Steel)
      steel: [71, 85, 105], // Slate-600 (Dark Steel)
      core: [15, 23, 42],  // Slate-900 (Deep Charcoal)
      highlight: [255, 255, 255]
    }

    // System States
    let rotationX = 0.5
    let rotationY = 0
    let targetRotationX = 0.5
    let targetRotationY = 0
    let tiltEntropy = 0 // Represents "instability"
    let pulseIndex = 0

    // Layers
    enum Layer {
      BACKGROUND = 0,
      CORE = 1,
      FOREGROUND = 2,
      FEATURE = 3 // Major nodes for links
    }

    class Particle {
      index: number
      x: number = 0
      y: number = 0
      z: number = 0
      
      baseRadius: number = 0
      speed: number = 0
      angle: number = 0
      size: number = 0
      layer: Layer
      color: number[]
      
      // Projected
      px: number = 0
      py: number = 0
      pz: number = 0
      alpha: number = 0

      constructor(index: number) {
        this.index = index
        // Distribution: First 8 are FEATURE, then 20% BG, 75% Core, rest FG
        if (index < 8) this.layer = Layer.FEATURE
        else if (index < particleCount * 0.2) this.layer = Layer.BACKGROUND
        else if (index < particleCount * 0.95) this.layer = Layer.CORE
        else this.layer = Layer.FOREGROUND
        
        this.color = colors.steel // Default, overridden in reset
        this.reset()
      }

      reset() {
        this.angle = Math.random() * Math.PI * 2
        
        if (this.layer === Layer.FEATURE) {
          // Stable, prominent orbital nodes - EXPANDED to frame content
          const r = 350 + Math.random() * 200 
          this.baseRadius = r
          // Evenly distribute initial angles for structure
          this.angle = (this.index / 8) * Math.PI * 2 
          this.x = Math.cos(this.angle) * r
          this.y = (Math.random() - 0.5) * 60 // More vertical variation
          this.z = Math.sin(this.angle) * r
          
          this.speed = 0.0008 // Slower, majestic
          this.size = 2.0 
          this.color = colors.highlight
        }
        else if (this.layer === Layer.BACKGROUND) {
          // Distant, slow, stable
          const r = 400 + Math.random() * 400
          this.x = (Math.random() - 0.5) * r * 2
          this.y = (Math.random() - 0.5) * r * 2
          this.z = (Math.random() - 0.5) * r * 2
          this.baseRadius = r
          this.speed = 0.0003
          this.size = Math.random() * 1.5
          this.color = colors.steel
        } 
        else if (this.layer === Layer.CORE) {
          // Spiraling Neural Nucleus
          // Golden angle approximation for nice spiral packing
          const phi = this.index * 0.5 // spiral tightness
          // Expanded core to reduce central density - Hollow Center for text
          const r = 220 + (this.index * 0.3) 
          
          this.baseRadius = r
          this.angle = phi
          
          // Flattened sphere (disk-like)
          this.x = Math.cos(this.angle) * this.baseRadius
          this.y = (Math.random() - 0.5) * 45 
          this.z = Math.sin(this.angle) * this.baseRadius
          
          this.speed = 0.002 + Math.random() * 0.002
          this.size = Math.random() * 1.5 + 0.5 // Smaller particles
          
          // Core colors - Monochrome Scale
          const rand = Math.random()
          if (rand > 0.85) this.color = colors.highlight
          else if (rand > 0.6) this.color = colors.cyan
          else if (rand > 0.4) this.color = colors.teal
          else this.color = colors.steel
        } 
        else {
          // Foreground pulses / signals
          const r = 40 + Math.random() * 40
          this.baseRadius = r
          this.angle = Math.random() * Math.PI * 2
          this.x = Math.cos(this.angle) * r
          this.y = (Math.random() - 0.5) * 60
          this.z = Math.sin(this.angle) * r
          
          this.speed = 0.02 // Fast
          this.size = Math.random() * 3 + 1
          this.color = colors.highlight
        }
      }

      update(time: number) {
        // Entropy affects Core heavily, Background barely
        let entropyFactor = 0
        if (this.layer === Layer.CORE) entropyFactor = tiltEntropy
        if (this.layer === Layer.FOREGROUND) entropyFactor = tiltEntropy * 2
        
        // Destabilization drift
        const drift = Math.sin(time * 0.002 + this.index) * entropyFactor * 40
        
        this.angle += this.speed * (1 + entropyFactor)
        
        // Update positions
        if (this.layer === Layer.CORE) {
          const r = this.baseRadius * (1 - entropyFactor * 0.3) // Collapse inward
          this.x = Math.cos(this.angle) * r + drift
          this.z = Math.sin(this.angle) * r
        } else if (this.layer === Layer.FOREGROUND) {
          this.x = Math.cos(this.angle) * this.baseRadius
          this.z = Math.sin(this.angle) * this.baseRadius
          this.y += Math.sin(time * 0.01 + this.index) * 0.5
        } else if (this.layer === Layer.FEATURE) {
          // Feature Nodes orbit steadily but tilt with the system
          this.x = Math.cos(this.angle) * this.baseRadius
          this.z = Math.sin(this.angle) * this.baseRadius
          // Slight vertical wave
          this.y = Math.sin(time * 0.0005 + this.index) * 20
        } else {
           // Background rotates slowly as a whole
           const r = this.baseRadius
           // Simple rotation around Y
           const x = this.x
           const z = this.z
           this.x = x * Math.cos(0.001) - z * Math.sin(0.001)
           this.z = x * Math.sin(0.001) + z * Math.cos(0.001)
        }
      }

      project(viewRotX: number, viewRotY: number) {
        // 3D Rotation
        let x1 = this.x
        let y1 = this.y * Math.cos(viewRotX) - this.z * Math.sin(viewRotX)
        let z1 = this.y * Math.sin(viewRotX) + this.z * Math.cos(viewRotX)

        let x2 = x1 * Math.cos(viewRotY) + z1 * Math.sin(viewRotY)
        let y2 = y1
        let z2 = -x1 * Math.sin(viewRotY) + z1 * Math.cos(viewRotY)

        const fov = 1000
        const perspective = fov / (fov + z2)
        
        this.px = x2 * perspective + width / 2
        this.py = y2 * perspective + height / 2
        this.pz = z2
        
        // Depth-based Alpha
        if (this.layer === Layer.BACKGROUND) {
           this.alpha = 0.15 // Very faint
        } else {
           this.alpha = (perspective - 0.4)
           if (this.alpha > 1) this.alpha = 1
           if (this.alpha < 0) this.alpha = 0
        }
      }
    }

    const resize = () => {
      dpr = window.devicePixelRatio || 1
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)
    }

    const init = () => {
      resize()
      particles = []
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(i))
      }
    }

    const drawNeuralArcs = (particles: Particle[]) => {
      // Connect nearby particles in the CORE layer to simulate synapses
      // Optimization: Only check a subset or use grid
      // Simple Approach: Connect randomly based on pulseIndex
      
      const coreParticles = particles.filter(p => p.layer === Layer.CORE && p.alpha > 0.1)
      
      ctx!.lineWidth = 0.5
      
      // Select active "firing" regions based on time
      // This iterates a window through the array
      const startIdx = Math.floor(pulseIndex) % (coreParticles.length - 50)
      const activeGroup = coreParticles.slice(startIdx, startIdx + 40)
      
      activeGroup.forEach((p1, i) => {
        // Connect to neighbors in this group
        for (let j = i + 1; j < activeGroup.length; j++) {
           const p2 = activeGroup[j]
           const dx = p1.px - p2.px
           const dy = p1.py - p2.py
           const dist = Math.sqrt(dx*dx + dy*dy)
           
           if (dist < connectionDistance) {
             const alpha = (1 - dist / connectionDistance) * p1.alpha * 0.4
             ctx!.strokeStyle = `rgba(${colors.cyan[0]}, ${colors.cyan[1]}, ${colors.cyan[2]}, ${alpha})`
             ctx!.beginPath()
             ctx!.moveTo(p1.px, p1.py)
             ctx!.lineTo(p2.px, p2.py)
             ctx!.stroke()
           }
        }
      })
    }

    const drawFeatureConnections = (particles: Particle[]) => {
      const featureParticles = particles.filter(p => p.layer === Layer.FEATURE)
      const coreCenter = { x: width / 2, y: height / 2 }
      
      ctx!.lineWidth = 0.8
      
      featureParticles.forEach((p, i) => {
        if (p.alpha < 0.1) return
        
        // 1. Anchor Line to Core (Web Spoke)
        const distToCenter = Math.sqrt(Math.pow(p.px - coreCenter.x, 2) + Math.pow(p.py - coreCenter.y, 2))
        // Reduced opacity to 0.5 for subtlety
        const opacity = (1 - distToCenter / (Math.max(width, height) * 0.5)) * p.alpha * 0.4
        
        const grad = ctx!.createLinearGradient(coreCenter.x, coreCenter.y, p.px, p.py)
        grad.addColorStop(0, `rgba(${colors.cyan[0]}, ${colors.cyan[1]}, ${colors.cyan[2]}, 0)`) 
        // Start visible line at 55% distance to keep text clear
        grad.addColorStop(0.55, `rgba(${colors.cyan[0]}, ${colors.cyan[1]}, ${colors.cyan[2]}, ${opacity})`)
        grad.addColorStop(1, `rgba(${colors.cyan[0]}, ${colors.cyan[1]}, ${colors.cyan[2]}, 0)`) 
        
        ctx!.lineWidth = 0.6 // Thinner lines
        ctx!.strokeStyle = grad
        ctx!.beginPath()
        ctx!.moveTo(coreCenter.x, coreCenter.y)
        ctx!.lineTo(p.px, p.py)
        ctx!.stroke()
        
        // 2. Inter-node connections (The "Web")
        for (let j = 1; j <= 2; j++) {
           const neighbor = featureParticles[(i + j) % featureParticles.length]
           if (neighbor) {
             ctx!.strokeStyle = `rgba(${colors.teal[0]}, ${colors.teal[1]}, ${colors.teal[2]}, ${p.alpha * 0.4})`
             ctx!.beginPath()
             ctx!.moveTo(p.px, p.py)
             ctx!.lineTo(neighbor.px, neighbor.py)
             ctx!.stroke()
           }
        }
      })
    }

    const animate = (time: number) => {
      animationFrameId = requestAnimationFrame(animate)
      if (!ctx) return
      
      // Cinematic Trail Fade
      ctx.fillStyle = 'rgba(2, 6, 23, 0.25)' // Background clearing
      ctx.fillRect(0, 0, width, height)
      
      // Entropy Logic
      if (Math.random() > 0.998 && tiltEntropy < 0.1) {
        tiltEntropy = 0.6 // Trigger destabilization
      }
      tiltEntropy *= 0.97 // Self-correct / stabilize
      
      // Pulse indexing
      pulseIndex += 1
      
      // Camera Smoothing
      rotationX += (targetRotationX - rotationX) * 0.03
      rotationY += (targetRotationY - rotationY) * 0.03
      
      // System Tilt
      const systemTilt = rotationX + (Math.sin(time * 0.0008) * 0.05 * tiltEntropy)

      // Update & Sort
      particles.forEach(p => {
        p.update(time)
        p.project(systemTilt, rotationY)
      })
      particles.sort((a, b) => b.pz - a.pz)

      // Render
      // 1. Draw Arcs (behind some particles)
      drawNeuralArcs(particles)
      drawFeatureConnections(particles)

      // 2. Draw Particles
      particles.forEach(p => {
        if (p.alpha <= 0.01) return
        
        ctx.fillStyle = `rgba(${p.color[0]}, ${p.color[1]}, ${p.color[2]}, ${p.alpha})`
        ctx.beginPath()
        
        // Feature Nodes (Project Links / Papers) - Distinct Look
        if (p.layer === Layer.FEATURE) {
           // Outer Ring
           ctx.strokeStyle = `rgba(${colors.cyan[0]}, ${colors.cyan[1]}, ${colors.cyan[2]}, ${p.alpha * 0.8})`
           ctx.lineWidth = 1.5
           ctx.beginPath()
           ctx.arc(p.px, p.py, p.size * 2.5, 0, Math.PI * 2)
           ctx.stroke()
           
           // Inner Core
           ctx.shadowBlur = 15
           ctx.shadowColor = `rgba(${colors.cyan[0]}, ${colors.cyan[1]}, ${colors.cyan[2]}, 1)`
           ctx.arc(p.px, p.py, p.size, 0, Math.PI * 2)
           ctx.fill()
           ctx.shadowBlur = 0
           
           // Label indicator (small dot next to it)
           ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`
           ctx.fillRect(p.px + p.size * 3, p.py - 1, 2, 2)
        } else {
           // Standard Particle
           ctx.arc(p.px, p.py, p.size, 0, Math.PI * 2)
           ctx.fill()
        }
        
        // Add glow to specific layers
        if (p.layer === Layer.FOREGROUND) {
           ctx.shadowBlur = 10
           ctx.shadowColor = `rgba(${p.color[0]}, ${p.color[1]}, ${p.color[2]}, 0.5)`
           ctx.fill() // Fill again for intensity
           ctx.shadowBlur = 0
        }
      })
    }

    const handleMouseMove = (e: MouseEvent) => {
      targetRotationY = (e.clientX / window.innerWidth - 0.5) * 0.4
      targetRotationX = (e.clientY / window.innerHeight - 0.5) * 0.1 + 0.5
    }

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', handleMouseMove)
    
    init()
    requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="absolute inset-0 z-[-1] overflow-hidden">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full opacity-100"
      />
      
      {/* Volumetric Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_90%)] pointer-events-none" />
    </div>
  )
}
