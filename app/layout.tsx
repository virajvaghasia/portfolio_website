import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

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
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Suspense fallback={null}>{children}</Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}
