import Link from "next/link"
import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"

export const metadata: Metadata = { title: "Page not found — Viraj Vaghasia" }

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-16 sm:py-24">
        <p className="mono-figure text-sm text-muted-foreground">404</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Page not found</h1>
        <p className="prose-measure mt-3 leading-relaxed text-muted-foreground">
          There is nothing at this address. The two case studies and everything else on this
          site are linked from the landing page.
        </p>
        <p className="mt-6">
          <Link href="/" className="text-sm text-primary hover:underline">
            ← Back to the landing page
          </Link>
        </p>
      </main>
    </>
  )
}
