import type React from "react"
import type { Metadata } from "next"
import { Source_Serif_4, JetBrains_Mono } from "next/font/google"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

/**
 * The site's whole type system: Source Serif 4 for display and body, JetBrains
 * Mono for every figure, label and date (`.mono-figure`, `--font-mono`). No UI
 * sans anywhere — see app/globals.css, where `--font-sans` now points at the
 * serif variable rather than at a grotesque.
 */
const serif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-editorial",
})

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-figure",
})

export const metadata: Metadata = {
  title: "Viraj Vaghasia — Software Engineer",
  description:
    "M.S. Computer Science candidate building backend services, data pipelines and document retrieval systems. Case studies with the measurements behind them.",
  keywords: ["software engineer", "backend", "information retrieval", "Python", "TypeScript"],
  authors: [{ name: "Viraj Vaghasia" }],
  openGraph: {
    title: "Viraj Vaghasia — Software Engineer",
    description: "Case studies with the measurements behind them.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${serif.variable} ${mono.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Suspense fallback={null}>{children}</Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}
