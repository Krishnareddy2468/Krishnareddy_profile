"use client"

import { motion } from "framer-motion"
import { Cpu, Database, Activity, Radio, Server, Smartphone, Layers } from "lucide-react"

// Schematic visualization of AI + IoT Data Flow
export function SystemFlow() {
  return (
    <div className="w-full h-32 md:h-40 relative my-6 rounded border border-white/5 bg-white/[0.02] p-4 flex items-center justify-between overflow-hidden">
      {/* Background Grid */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{ 
          backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", 
          backgroundSize: "20px 20px" 
        }} 
      />

      {/* --- LAYER 1: SENSORS (INPUT) --- */}
      <div className="relative z-10 flex flex-col items-center gap-2">
        <motion.div 
          className="w-10 h-10 rounded bg-[#0F1218] border border-blue-500/30 flex items-center justify-center relative"
          whileHover={{ scale: 1.05, borderColor: "rgba(59,130,246,0.8)" }}
        >
          <Activity className="w-5 h-5 text-blue-400" />
          {/* Pulsing indicator */}
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
        </motion.div>
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-mono">Sensors</span>
      </div>

      {/* CONNECTION 1: SENSORS -> PROC */}
      <div className="flex-1 relative h-[2px] bg-white/10 mx-2">
        <motion.div
          className="absolute top-0 left-0 h-full w-1/3 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"
          animate={{ left: ["0%", "100%"], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        {/* Data Packets */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full"
            animate={{ left: ["0%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: i * 0.5 }}
          />
        ))}
      </div>

      {/* --- LAYER 2: PROCESSING (AI CORE) --- */}
      <div className="relative z-10 flex flex-col items-center gap-2">
        <motion.div 
          className="w-12 h-12 rounded bg-[#0F1218] border border-cyan-500/30 flex items-center justify-center relative shadow-[0_0_30px_-10px_rgba(34,211,238,0.2)]"
          animate={{ boxShadow: ["0 0 15px -5px rgba(34,211,238,0.1)", "0 0 25px -5px rgba(34,211,238,0.3)", "0 0 15px -5px rgba(34,211,238,0.1)"] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Cpu className="w-6 h-6 text-cyan-400" />
          {/* Orbiting particles */}
          <motion.div
            className="absolute inset-0 rounded border border-cyan-500/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-mono">AI Inference</span>
      </div>

      {/* CONNECTION 2: PROC -> OUTPUT */}
      <div className="flex-1 relative h-[2px] bg-white/10 mx-2">
        <motion.div
          className="absolute top-0 left-0 h-full w-1/3 bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.8)]"
          animate={{ left: ["0%", "100%"], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }}
        />
        {/* Data Packets */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full"
            animate={{ left: ["0%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 1 + i * 0.5 }}
          />
        ))}
      </div>

      {/* --- LAYER 3: OUTPUT (APP/DB) --- */}
      <div className="relative z-10 flex flex-col items-center gap-2">
        <div className="flex gap-2">
          <div className="w-10 h-10 rounded bg-[#0F1218] border border-white/10 flex items-center justify-center group hover:border-white/30 transition-colors">
            <Smartphone className="w-5 h-5 text-foreground/80" />
          </div>
          <div className="w-10 h-10 rounded bg-[#0F1218] border border-white/10 flex items-center justify-center group hover:border-white/30 transition-colors">
            <Database className="w-5 h-5 text-foreground/80" />
          </div>
        </div>
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-mono">Analytics</span>
      </div>

    </div>
  )
}
