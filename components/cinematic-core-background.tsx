"use client"

import { useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Cloud, Float, Sparkles, Trail, MeshDistortMaterial } from "@react-three/drei"
import * as THREE from "three"

/**
 * AI + IoT Architecture System
 * - Visualizes a central AI Core receiving data from orbiting IoT nodes.
 * - Engineered, deep-tech aesthetic.
 * - Not a space animation, but a system visualization.
 */

// Rotating light for cinematic shadows/highlights
function MovingLight() {
  const ref = useRef<THREE.PointLight>(null)
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.getElapsedTime() * 0.2
    ref.current.position.x = Math.sin(t) * 10
    ref.current.position.z = Math.cos(t) * 10
  })
  return <pointLight ref={ref} intensity={2} color="#60a5fa" distance={15} />
}

// Subtle particle shell representing active computation
function ProcessingParticles() {
  const points = useRef<THREE.Points>(null)
  useFrame((state) => {
    if (!points.current) return
    points.current.rotation.y = state.clock.getElapsedTime() * 0.05
  })
  
  return (
    <Sparkles 
      count={40}
      scale={2.5}
      size={1.2}
      speed={0.2}
      opacity={0.3}
      color="#93c5fd"
    />
  )
}

// Brain-like Neural Core with Destabilization effects
function AICore({ instability }: { instability: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime()
    
    // Rotation speeds up during instability
    meshRef.current.rotation.y = time * (0.1 + instability * 0.2)
    
    // Core "breaths" more heavily during instability
    const breathe = Math.sin(time * 2) * 0.05 * instability
    const baseScale = 1.2
    // Collapse effect: scale shrinks slightly then expands
    const collapse = instability * 0.1
    const currentScale = baseScale - collapse + breathe
    
    meshRef.current.scale.setScalar(currentScale)
  })

  // Material distortion increases with instability
  const distort = 0.2 + instability * 0.4

  return (
    <Float speed={1.5} rotationIntensity={0.1 + instability} floatIntensity={0.2 + instability * 0.5}>
      {/* Halo / Rim Glow */}
      <mesh scale={[1.15, 1.15, 1.15]}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial color="#1e3a8a" transparent opacity={0.1 + instability * 0.1} side={THREE.BackSide} />
      </mesh>

      {/* Central Intelligence Sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.2, 64, 64]} />
        <MeshDistortMaterial
          color="#020617" 
          emissive="#1d4ed8" 
          emissiveIntensity={0.2 + instability * 0.3} // Glows brighter when unstable
          roughness={0.2}
          metalness={0.9}
          distort={distort}
          speed={0.4 + instability * 2} // Turbulent surface when unstable
        />
      </mesh>
      
      {/* Active Processing Layer */}
      <ProcessingParticles />
      
      {/* Neural Network Connections Shell */}
      <mesh scale={[1.45, 1.45, 1.45]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          color="#60a5fa" 
          transparent 
          opacity={0.02 + instability * 0.05} 
          wireframe 
        />
      </mesh>
    </Float>
  )
}

function IoTNode({ radius, speed, color, offset, instability }: { radius: number, speed: number, color: string, offset: number, instability: number }) {
  const ref = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (!ref.current) return
    const time = state.clock.getElapsedTime()
    
    // Orbit collapse effect: radius shrinks during instability
    const collapseFactor = 1 - (instability * 0.3) 
    const currentRadius = radius * collapseFactor
    
    // Orbits tilt/wobble during instability
    const wobbleY = Math.sin(time * 5) * instability * 0.5
    
    const xRadius = currentRadius * 1.2
    const zRadius = currentRadius * 0.9
    
    ref.current.position.x = Math.cos(time * speed + offset) * xRadius
    ref.current.position.z = Math.sin(time * speed + offset) * zRadius
    ref.current.position.y = wobbleY
    
    ref.current.lookAt(0, 0, 0)
  })

  return (
    <group>
      <Trail
        width={0.8}
        length={10}
        color={new THREE.Color(color)}
        attenuation={(t) => t * t}
        target={ref as React.RefObject<THREE.Object3D>}
      >
        <mesh ref={ref}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial 
            color="#cbd5e1" 
            emissive={color}
            emissiveIntensity={1 + instability} // Flashes during instability
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>
      </Trail>
    </group>
  )
}

function SystemController() {
  // State for system stability (0 = stable, 1 = maximum instability)
  const instabilityRef = useRef(0)
  const targetInstabilityRef = useRef(0)
  const nextEventTimeRef = useRef(0)
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    // Event Scheduler
    if (time > nextEventTimeRef.current) {
      // Schedule next event (randomly between 5 and 15 seconds)
      nextEventTimeRef.current = time + 8 + Math.random() * 10
      
      // Trigger instability event (chaos duration 2-4s)
      targetInstabilityRef.current = 0.8 // High instability
      setTimeout(() => {
        targetInstabilityRef.current = 0 // Return to stable
      }, 2500)
    }
    
    // Smooth Lerp
    instabilityRef.current = THREE.MathUtils.lerp(instabilityRef.current, targetInstabilityRef.current, 0.05)
  })

  // We can pass this state down via context, but for simplicity in this component
  // we will clone the children logic here or use a shared mutable object.
  // Actually, let's just return the components with the prop passed down.
  // To do that efficiently in R3F within one component:
  
  return (
    <>
       <AICore instability={instabilityRef.current} />

      <IoTNode radius={3.2} speed={0.4} color="#60a5fa" offset={0} instability={instabilityRef.current} />
      <IoTNode radius={4.8} speed={0.25} color="#38bdf8" offset={2} instability={instabilityRef.current} />
      <IoTNode radius={6.0} speed={0.15} color="#818cf8" offset={4} instability={instabilityRef.current} />
    </>
  )
}

function Scene() {
  const { camera, mouse } = useThree()
  const instabilityRef = useRef(0) // Local Ref to bridge logic if needed, but SystemController handles it.
  
  useFrame((state) => {
    const targetX = mouse.x * 0.4
    const targetY = mouse.y * 0.4
    camera.position.x += (targetX - camera.position.x) * 0.015
    camera.position.y += (targetY - camera.position.y) * 0.015
    camera.lookAt(0, 0, 0)
  })

  // We need to 'lift' the state or use a render-prop pattern if we want Scene to control it.
  // But SystemController can render the nodes directly.
  
  return (
    <>
      {/* Background is now handled by GlobalVolumetricLight */}
      
      {/* Cinematic Lighting Setup */}
      <ambientLight intensity={0.2} />
      <MovingLight /> 
      <pointLight position={[-10, -5, -5]} intensity={1} color="#1d4ed8" distance={20} />
      
      {/* The System Controller manages the "Living" state logic */}
      <SystemController />

      <Cloud 
        opacity={0.03} 
        speed={0.05} 
        bounds={[15, 5, 15]}
        segments={6} 
        color="#0f172a" 
      />
    </>
  )
}

export function CinematicCoreBackground() {
  return (
    <div className="absolute inset-0 z-[-1]">
      <Canvas camera={{ position: [0, 2, 12], fov: 35 }}>
        <Scene />
        <fog attach="fog" args={['#020617', 5, 25]} />
      </Canvas>
      {/* Increased Contrast Overlay Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-95" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.8)_100%)]" />
    </div>
  )
}
