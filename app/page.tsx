"use client"

import { Footer } from "@/components/footer"
import { GlassNavbar } from "@/components/glass-navbar"
import { AboutSection } from "@/components/sections/about-section"
import { CertificationsSection } from "@/components/sections/certifications-section"
import { ContactSection } from "@/components/sections/contact-section"
import { ExperienceSection } from "@/components/sections/experience-section"
import { HeroSection } from "@/components/sections/hero-section"
import { ProjectsSection } from "@/components/sections/projects-section"
import { PublicationsSection } from "@/components/sections/publications-section"
import { SkillsSection } from "@/components/sections/skills-section"

export default function Portfolio() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      {/* Glass Navigation */}
      <GlassNavbar />

      {/* Page Sections */}
      <HeroSection />
      
      <AboutSection />
      
      {/* Publications - Research Portfolio */}
      <PublicationsSection />
      
      <SkillsSection />
      
      {/* Projects - Technical Work */}
      <ProjectsSection />
      
      <ExperienceSection />
      
      <CertificationsSection />
      
      <ContactSection />
      
      <Footer />
    </main>
  )
}

