"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { useRef, useMemo, useState, useEffect } from "react"
import * as THREE from "three"

function NeuralMesh() {
  const meshRef = useRef<THREE.Points>(null)
  const lineRef = useRef<THREE.LineSegments>(null)
  const groupRef = useRef<THREE.Group>(null)

  // Create grid of points
  const { positions, linePositions } = useMemo(() => {
    const gridSize = 24
    const spacing = 0.6
    const points: number[] = []
    const lines: number[] = []
    
    for (let x = 0; x < gridSize; x++) {
      for (let z = 0; z < gridSize; z++) {
        const px = (x - gridSize / 2) * spacing
        const pz = (z - gridSize / 2) * spacing
        points.push(px, 0, pz)
        
        if (x < gridSize - 1) {
          const nx = (x + 1 - gridSize / 2) * spacing
          lines.push(px, 0, pz, nx, 0, pz)
        }
        if (z < gridSize - 1) {
          const nz = (z + 1 - gridSize / 2) * spacing
          lines.push(px, 0, pz, px, 0, nz)
        }
      }
    }
    
    return {
      positions: new Float32Array(points),
      linePositions: new Float32Array(lines),
    }
  }, [])

  useFrame((state) => {
    if (!meshRef.current || !lineRef.current) return
    
    // Very slow ambient time
    const time = state.clock.getElapsedTime() * 0.15 
    
    const pointsArray = meshRef.current.geometry.attributes.position.array as Float32Array
    const linesArray = lineRef.current.geometry.attributes.position.array as Float32Array
    
    // Very gentle wave
    for (let i = 0; i < pointsArray.length; i += 3) {
      const x = pointsArray[i]
      const z = pointsArray[i + 2]
      pointsArray[i + 1] = Math.sin(x * 0.3 + time) * Math.cos(z * 0.3 + time) * 0.2
    }
    
    for (let i = 0; i < linesArray.length; i += 6) {
      const x1 = linesArray[i]
      const z1 = linesArray[i + 2]
      const x2 = linesArray[i + 3]
      const z2 = linesArray[i + 5]
      linesArray[i + 1] = Math.sin(x1 * 0.3 + time) * Math.cos(z1 * 0.3 + time) * 0.2
      linesArray[i + 4] = Math.sin(x2 * 0.3 + time) * Math.cos(z2 * 0.3 + time) * 0.2
    }
    
    meshRef.current.geometry.attributes.position.needsUpdate = true
    lineRef.current.geometry.attributes.position.needsUpdate = true
    
    // Subtle rotation
    if (groupRef.current) {
        groupRef.current.rotation.y = Math.sin(time * 0.2) * 0.1
    }
  })

  // Basic scroll effect without extra deps
  useFrame(() => {
    if (typeof window !== 'undefined' && groupRef.current) {
        const scrollY = window.scrollY
        // Subtle tilt based on scroll
        groupRef.current.rotation.x = -0.4 + (scrollY * 0.0002)
    }
  })

  return (
    <group ref={groupRef} position={[0, -1.5, -4]} rotation={[-0.4, 0, 0]}>
      {/* Grid lines - faint gray */}
      <lineSegments ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#b0b0b0" 
          transparent
          opacity={0.08}
        />
      </lineSegments>
      
      {/* Grid nodes - slightly clearer gray points */}
      <points ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#808080" 
          size={0.02}
          transparent
          opacity={0.15}
          sizeAttenuation
        />
      </points>
    </group>
  )
}

export function AnimatedBackground() {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    // Only show on desktop (>768px)
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth > 768)
    }
    
    checkDesktop()
    window.addEventListener('resize', checkDesktop)
    return () => window.removeEventListener('resize', checkDesktop)
  }, [])

  // Don't render heavy 3D on mobile
  if (!isDesktop) {
    return null
  }

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none opacity-60">
      <Canvas
        camera={{ position: [0, 2, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <NeuralMesh />
      </Canvas>
    </div>
  )
}
