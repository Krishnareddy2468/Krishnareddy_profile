"use client"

import { Footer } from "@/components/footer"
import { GlassNavbar } from "@/components/glass-navbar"
import { ExperienceSection } from "@/components/sections/experience-section"

export default function ExperiencePage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <GlassNavbar />
      <div className="pt-24">
        <ExperienceSection />
      </div>
      <Footer />
    </main>
  )
}
