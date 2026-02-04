"use client"

import { Footer } from "@/components/footer"
import { GlassNavbar } from "@/components/glass-navbar"
import { ContactSection } from "@/components/sections/contact-section"

export default function ContactPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <GlassNavbar />
      <div className="pt-24">
        <ContactSection />
      </div>
      <Footer />
    </main>
  )
}
