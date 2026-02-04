"use client"

import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useRef, useMemo, useState, useEffect } from "react"
import * as THREE from "three"

// --- xAI / Colossus Style Data Infrastructure v2 ---
// "Clean curved data conduits" with directional flow

function DataPipeline({ curve, opacity = 0.1 }: { curve: THREE.CatmullRomCurve3, opacity?: number }) {
  const geometry = useMemo(() => new THREE.TubeGeometry(curve, 128, 0.015, 8, false), [curve])
  
  return (
    <mesh geometry={geometry}>
      <meshPhysicalMaterial
        color="#94a3b8" // Soft metallic gray
        emissive="#3b82f6"
        emissiveIntensity={0.05} // Very subtle
        metalness={0.4} // Less metallic, more matte
        roughness={0.7} // High roughness for matte finish
        transparent
        opacity={opacity}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

function DataPacket({ curve, speed, offset, size = 0.08 }: { curve: THREE.CatmullRomCurve3, speed: number, offset: number, size?: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime()
    // Constant, engineered flow
    const t = (time * speed + offset) % 1
    
    const point = curve.getPointAt(t)
    const tangent = curve.getTangentAt(t)
    
    meshRef.current.position.copy(point)
    meshRef.current.lookAt(point.clone().add(tangent))
  })

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[size, size, size * 2.5]} />
      <meshBasicMaterial color="#ffffff" /> {/* Warm white core */}
      <mesh>
         <boxGeometry args={[size * 1.5, size * 1.5, size * 4]} />
         <meshBasicMaterial color="#3b82f6" transparent opacity={0.15} /> {/* Steel Blue trail */}
      </mesh>
    </mesh>
  )
}

function PipelineSystem({ count = 12 }: { count?: number }) {
  const pipelines = useMemo(() => {
    const lines: { curve: THREE.CatmullRomCurve3, speed: number, packets: number[] }[] = []
    
    for (let i = 0; i < count; i++) {
      const points: THREE.Vector3[] = []
      
      // ORGANIZED FLOW: Left/Bottom -> Center -> Right/Top/Deep
      
      const startX = (Math.random() - 0.5) * 15
      const startY = -4 + Math.random() * 3
      const startZ = 2 + Math.random() * 3
      
      points.push(new THREE.Vector3(startX, startY, startZ))
      
      const midX = (Math.random() - 0.5) * 5
      const midY = (Math.random() - 0.5) * 2
      const midZ = -2 + Math.random() * 2
      
      points.push(new THREE.Vector3(startX * 0.5, startY * 0.5, startZ * 0.5))
      points.push(new THREE.Vector3(midX, midY, midZ))
      
      const endX = (Math.random() - 0.5) * 20
      const endY = 2 + Math.random() * 4
      const endZ = -15 - Math.random() * 5
      
      points.push(new THREE.Vector3(endX, endY, endZ))
      
      const curve = new THREE.CatmullRomCurve3(points)
      const speed = 0.03 + Math.random() * 0.04
      const packets = Array.from({ length: 1 + Math.floor(Math.random() * 2) }, () => Math.random())
      
      lines.push({ curve, speed, packets })
    }
    return lines
  }, [count])

  return (
    <group>
      {pipelines.map((line, i) => (
        <group key={i}>
          <DataPipeline curve={line.curve} opacity={0.1 + Math.random() * 0.15} />
          {line.packets.map((offset, j) => (
            <DataPacket 
              key={`${i}-${j}`} 
              curve={line.curve} 
              speed={line.speed} 
              offset={offset} 
              size={0.04 + Math.random() * 0.02}
            />
          ))}
        </group>
      ))}
    </group>
  )
}

function InfrastructureScene({ 
  particleCount, 
  active,
  variant
}: { 
  particleCount: number, 
  active: boolean,
  variant: 'hero' | 'minimal'
}) {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (!groupRef.current) return
    const scrollY = window.scrollY
    
    // ENGINEERED MOTION: precise horizontal shift based on scroll
    groupRef.current.position.x = -scrollY * 0.0005
    
    // Slight vertical parallax
    groupRef.current.position.y = scrollY * 0.0002

    groupRef.current.rotation.set(0, 0, 0)
  })

  // Adjust pipeline count
  const baseCount = variant === 'hero' ? particleCount : Math.floor(particleCount * 0.5)
  const pipelineCount = Math.max(4, Math.floor(baseCount / 1.5))

  return (
    <group ref={groupRef}>
      {/* Lighting - Warm White + Steel Blue */}
      <ambientLight intensity={0.6} color="#fafaf9" />
      <pointLight position={[10, 5, 5]} intensity={0.8} color="#60a5fa" /> {/* Steel Blue */}
      <pointLight position={[-10, 5, -5]} intensity={0.4} color="#94a3b8" /> {/* Gray */}
      
      {/* Fog adjustment for "Sharpening" effect - reduced fog when active */}
      <fog attach="fog" args={['#fafaf9', 2, variant === 'hero' ? (active ? 35 : 25) : 35]} />
      
      <PipelineSystem count={pipelineCount} />
    </group>
  )
}

function CameraRig({ variant, active }: { variant: 'hero' | 'minimal', active: boolean }) {
  const { camera } = useThree()
  
  useFrame(() => {
    const scrollY = window.scrollY
    
    // Base Target Z
    // Hero: 6 normally, 5 when active (Zoom in/Sharpen focus)
    const baseZ = variant === 'hero' ? (active ? 5 : 6) : 9
    
    const targetZ = baseZ + (scrollY * 0.001)
    
    // Smooth lerp to target
    camera.position.z += (targetZ - camera.position.z) * 0.05
    camera.lookAt(0, 0, -5)
  })
  
  return null
}

export function NeuralFieldBackground({ 
  active = false, 
  variant = 'hero' 
}: { 
  active?: boolean,
  variant?: 'hero' | 'minimal' 
}) {
  const [shouldRender, setShouldRender] = useState(false)
  const [particleCount, setParticleCount] = useState(60)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const isLowEnd = () => {
      const memory = (navigator as any).deviceMemory
      const cores = navigator.hardwareConcurrency
      const connection = (navigator as any).connection
      
      if (memory && memory < 4) return true
      if (cores && cores < 4) return true
      if (connection?.saveData) return true
      if (connection?.effectiveType === '2g' || connection?.effectiveType === 'slow-2g') return true
      
      return false
    }

    const checkDevice = () => {
      const width = window.innerWidth
      
      if (width <= 1024) {
        setShouldRender(false)
        return
      }
      
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setShouldRender(false)
        return
      }
      
      if (isLowEnd()) {
        setShouldRender(false)
        return
      }
      
      const reductionFactor = variant === 'minimal' ? 0.7 : 1
      
      if (width <= 1280) {
        setParticleCount(Math.floor(40 * reductionFactor))
      } else if (width <= 1600) {
        setParticleCount(Math.floor(60 * reductionFactor))
      } else {
        setParticleCount(Math.floor(80 * reductionFactor))
      }
      
      const loadDelay = 800
      
      if (typeof requestIdleCallback !== 'undefined') {
        requestIdleCallback(() => {
          setShouldRender(true)
          setTimeout(() => setIsVisible(true), 100)
        }, { timeout: loadDelay })
      } else {
        setTimeout(() => {
          setShouldRender(true)
          setTimeout(() => setIsVisible(true), 100)
        }, loadDelay)
      }
    }
    
    checkDevice()
    window.addEventListener('resize', checkDevice)
    return () => window.removeEventListener('resize', checkDevice)
  }, [variant])

  if (!shouldRender) {
    return null
  }

  return (
    <div 
      className="absolute inset-0 -z-10 overflow-hidden pointer-events-none transition-opacity duration-1000"
      style={{ 
        opacity: isVisible ? (variant === 'hero' ? 1 : 0.4) : 0,
        willChange: 'transform',
        transform: 'translateZ(0)',
      }}
    >
      {/* Warm Clean Background */}
      <div className="absolute inset-0 bg-[#fafaf9]" /> 
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0),rgba(245,245,244,0.8))]" />

      <Canvas
        camera={{ position: [0, 0, variant === 'hero' ? 6 : 9], fov: 40 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
          failIfMajorPerformanceCaveat: true,
        }}
        dpr={[1, 1.25]}
        frameloop="always" 
        performance={{ min: 0.3 }}
      >
        <CameraRig variant={variant} active={active} />
        <InfrastructureScene 
          particleCount={particleCount} 
          active={active}
          variant={variant}
        />
      </Canvas>
    </div>
  )
}
