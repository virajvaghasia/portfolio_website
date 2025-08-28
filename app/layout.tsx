import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Viraj Vaghasia - Full-Stack Developer & AI Enthusiast",
  description:
    "Portfolio of Viraj Vaghasia - Passionate about building innovative web applications and AI tools, with experience in full-stack development and data-driven platforms.",
  generator: "v0.app",
  keywords: ["Full-Stack Developer", "AI", "React", "Next.js", "Python", "Web Development"],
  authors: [{ name: "Viraj Vaghasia" }],
  openGraph: {
    title: "Viraj Vaghasia - Full-Stack Developer & AI Enthusiast",
    description: "Portfolio showcasing innovative web applications and AI tools",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
      </body>
    </html>
  )
}
