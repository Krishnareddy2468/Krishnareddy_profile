"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface GlassButtonProps {
  children: ReactNode
  className?: string
  variant?: "primary" | "secondary"
  onClick?: () => void
  href?: string
}

export function GlassButton({
  children,
  className,
  variant = "primary",
  onClick,
  href,
}: GlassButtonProps) {
  const baseStyles = cn(
    // Base: Sharp system button
    "relative inline-flex items-center justify-center gap-2 px-6 py-3 font-medium",
    "rounded-[4px] transition-all duration-200 ease-out group",
    // Variants
    variant === "primary" && [
      "bg-primary text-primary-foreground border border-primary/50",
      "hover:bg-primary/90 hover:border-primary",
      "hover:shadow-[0_0_20px_-5px_oklch(0.55_0.12_250_/_0.3)]",
    ],
    variant === "secondary" && [
      "bg-card text-foreground border border-border/50",
      "hover:bg-accent hover:border-border",
      "hover:shadow-[0_2px_10px_-2px_rgba(0,0,0,0.05)]",
    ],
    className
  )

  const Component = href ? motion.a : motion.button

  return (
    <Component
      href={href}
      onClick={onClick}
      className={baseStyles}
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <span className="flex items-center gap-2">
        {children}
      </span>
    </Component>
  )
}
