"use client"

import { Footer } from "@/components/footer"
import { GlassNavbar } from "@/components/glass-navbar"
import { PublicationsSection } from "@/components/sections/publications-section"

export default function ResearchPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <GlassNavbar />
      <div className="pt-24">
        <PublicationsSection />
      </div>
      <Footer />
    </main>
  )
}
