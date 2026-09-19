import type React from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

/**
 * The site's whole type system: Source Serif 4 for display and body, JetBrains
 * Mono for every figure, label and date (`.mono-figure`, `--font-mono`). No UI
 * sans anywhere — see app/globals.css, where `--font-sans` now points at the
 * serif variable rather than at a grotesque.
 *
 * The files are committed rather than fetched. `next/font/google` downloads
 * from fonts.gstatic.com *at build time*, which made every deploy depend on
 * Google being reachable from the build container — four Vercel builds failed
 * on exactly that ("Failed to fetch `JetBrains Mono` from Google Fonts"),
 * reproducible locally by building with the network blocked. Both faces are
 * OFL-licensed, so serving them from the repo is permitted and it makes the
 * build hermetic.
 */
const editorial = localFont({
  src: "./fonts/SourceSerif4-Variable.woff2",
  weight: "400 700",
  style: "normal",
  display: "swap",
  variable: "--font-editorial",
  fallback: ["Georgia", "serif"],
})

const figure = localFont({
  src: "./fonts/JetBrainsMono-Variable.woff2",
  weight: "400 700",
  style: "normal",
  display: "swap",
  variable: "--font-figure",
  fallback: ["ui-monospace", "monospace"],
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
      <body className={`font-sans ${editorial.variable} ${figure.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Suspense fallback={null}>{children}</Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}
