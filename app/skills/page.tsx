"use client"

import { Footer } from "@/components/footer"
import { GlassNavbar } from "@/components/glass-navbar"
import { SkillsSection } from "@/components/sections/skills-section"

export default function SkillsPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <GlassNavbar />
      <div className="pt-24">
        <SkillsSection />
      </div>
      <Footer />
    </main>
  )
}
