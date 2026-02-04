"use client"

import { cn } from "@/lib/utils"
import { motion, useScroll, useTransform } from "framer-motion"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { navReveal, fastTransition } from "@/lib/motion"

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#publications", label: "Research" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
]

export function GlassNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const { scrollY } = useScroll()
  const bgOpacity = useTransform(scrollY, [0, 50], [0, 1])
  
  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-transform duration-300",
        hidden ? "-translate-y-full" : "translate-y-0"
      )}
      variants={navReveal}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="mx-4 mt-4 rounded-full border border-transparent backdrop-blur-md transition-colors duration-200"
        style={{
          backgroundColor: useTransform(bgOpacity, (v) => `rgba(2, 6, 23, ${v * 0.7 + 0.3})`), // Always slightly dark, becomes darker on scroll
          borderColor: useTransform(bgOpacity, (v) => `rgba(255, 255, 255, ${v * 0.1})`), // Subtle white border on scroll
          boxShadow: useTransform(bgOpacity, (v) => `0 4px 30px rgba(0, 0, 0, ${v * 0.1})`),
        }}
      >
        <nav className="flex items-center justify-between px-8 py-3">
          <motion.a
            href="#"
            className="text-lg font-bold text-white tracking-widest"
            whileHover={{ scale: 1.05 }}
          >
            N.KRISHNA REDDY
          </motion.a>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <motion.a
                  href={link.href}
                  className="text-sm font-medium text-slate-400 transition-colors hover:text-white hover:text-glow"
                  whileHover={{ y: -1 }}
                >
                  {link.label}
                </motion.a>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        <motion.div
          initial={false}
          animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
          className="md:hidden overflow-hidden"
        >
          <ul className="flex flex-col gap-4 px-6 pb-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block text-muted-foreground transition-colors hover:text-foreground"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </motion.header>
  )
}
