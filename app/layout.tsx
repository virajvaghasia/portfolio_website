import type React from "react"
import type { Metadata } from "next"
import { fontVars } from "@/components/site/fonts"
import { SiteNav, SiteFooter } from "@/components/site/chrome"
import "./globals.css"
import "@/components/site/charts.css"
import "./site.css"

export const metadata: Metadata = {
  title: "Viraj Vaghasia · Software Engineer",
  description:
    "M.S. Computer Science candidate building backend services, data pipelines and document retrieval systems. Case studies with the measurements behind them.",
  keywords: ["software engineer", "backend", "information retrieval", "Python", "TypeScript"],
  authors: [{ name: "Viraj Vaghasia" }],
  openGraph: {
    title: "Viraj Vaghasia · Software Engineer",
    description: "Case studies with the measurements behind them.",
    type: "website",
  },
}

/**
 * Light only, on purpose: the warm grey in site.css is the design, not one of
 * two themes, so there is no theme provider and no dark palette to undo it.
 */
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={fontVars}>
      <body className="site">
        <a className="skip" href="#main">
          Skip to content
        </a>
        <SiteNav />
        {children}
        <SiteFooter />
      </body>
    </html>
  )
}
