"use client"

import { cn } from "@/lib/utils"
import { motion, useScroll, useTransform } from "framer-motion"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { navReveal } from "@/lib/motion"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/research", label: "Research" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
]

export function GlassNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const { scrollY } = useScroll()
  const bgOpacity = useTransform(scrollY, [0, 50], [0, 1])
  const pathname = usePathname()
  
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
          backgroundColor: useTransform(bgOpacity, (v) => `rgba(2, 6, 23, ${v * 0.7 + 0.3})`),
          borderColor: useTransform(bgOpacity, (v) => `rgba(255, 255, 255, ${v * 0.1})`),
          boxShadow: useTransform(bgOpacity, (v) => `0 4px 30px rgba(0, 0, 0, ${v * 0.1})`),
        }}
      >
        <nav className="flex items-center justify-between px-8 py-3">
          <Link href="/">
            <motion.span
              className="text-lg font-bold text-white tracking-widest cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              N.KRISHNA REDDY
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <li key={link.href}>
                  <Link href={link.href}>
                    <motion.span
                      className={cn(
                        "text-sm font-medium transition-colors cursor-pointer",
                        isActive 
                          ? "text-white" 
                          : "text-slate-400 hover:text-white"
                      )}
                      whileHover={{ y: -1 }}
                    >
                      {link.label}
                      {isActive && (
                        <motion.div
                          className="h-0.5 bg-primary mt-1 rounded-full"
                          layoutId="activeNav"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </motion.span>
                  </Link>
                </li>
              )
            })}
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
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "block transition-colors",
                      isActive 
                        ? "text-white font-medium" 
                        : "text-muted-foreground hover:text-foreground"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </motion.div>
      </motion.div>
    </motion.header>
  )
}
