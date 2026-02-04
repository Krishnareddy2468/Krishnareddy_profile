"use client"

import { Footer } from "@/components/footer"
import { GlassNavbar } from "@/components/glass-navbar"
import { AboutSection } from "@/components/sections/about-section"

export default function AboutPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <GlassNavbar />
      <div className="pt-24">
        <AboutSection />
      </div>
      <Footer />
    </main>
  )
}
