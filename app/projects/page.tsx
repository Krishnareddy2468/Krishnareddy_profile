"use client"

import { Footer } from "@/components/footer"
import { GlassNavbar } from "@/components/glass-navbar"
import { ProjectsSection } from "@/components/sections/projects-section"

export default function ProjectsPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <GlassNavbar />
      <div className="pt-24">
        <ProjectsSection />
      </div>
      <Footer />
    </main>
  )
}
