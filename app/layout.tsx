import React from "react"
import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: 'Krishna Reddy | AI Engineer & Computer Science',
  description: 'Personal portfolio of Krishna Reddy - Computer Science & AI Engineer targeting FAANG, top product companies, and AI startups. Specializing in Machine Learning, Deep Learning, and Generative AI.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

import { GlobalVolumetricLight } from "@/components/global-volumetric-light"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased relative min-h-screen selection:bg-blue-500/30 selection:text-blue-200`}
        suppressHydrationWarning
      >
        <GlobalVolumetricLight />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
