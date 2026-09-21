import Link from "next/link"
import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"

export const metadata: Metadata = { title: "Page not found · Viraj Vaghasia" }

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-7xl px-6 py-12 md:px-10">
        <p className="mono-figure text-[11px] uppercase tracking-[0.18em] text-muted-foreground">404</p>
        <h1 className="mt-4 text-[40px] font-semibold leading-[1.06] tracking-[-0.02em]">Page not found</h1>
        <p className="mt-4 max-w-[62ch] leading-[1.6] text-muted-foreground">
          There is nothing at this address. The case studies and everything else on this site are
          linked from the landing page.
        </p>
        <p className="mt-8">
          <Link
            href="/"
            className="mono-figure border-b border-foreground py-1 text-[12px] uppercase tracking-[0.12em] hover:border-transparent"
          >
            ← Back to the landing page
          </Link>
        </p>
      </main>
    </>
  )
}
