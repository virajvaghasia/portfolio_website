import Link from "next/link"
import { PROFILE } from "@/content/site"

/**
 * The nav mark is initials, not the full name. The hero on the home page
 * states "Viraj Vaghasia" once, large — the nav repeating the full string
 * right above it would put the same name on screen twice before a reader has
 * scrolled at all. `aria-label` keeps the full name for screen readers.
 */
export function SiteHeader() {
  const initials = PROFILE.name
    .split(" ")
    .map((w) => w[0])
    .join("")

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
        <div className="flex items-baseline justify-between gap-8 border-b border-foreground/70 py-4">
          <Link
            href="/"
            aria-label={PROFILE.name}
            className="link-nav mono-figure text-[13px] font-medium tracking-[0.06em] text-foreground"
          >
            {initials}
          </Link>
          <nav className="mono-figure flex gap-5 text-[11px] uppercase tracking-[0.16em]">
            <Link href="/#work" className="link-nav text-muted-foreground">
              Work
            </Link>
            <Link href="/#record" className="link-nav text-muted-foreground">
              Record
            </Link>
            <a href="/resume.pdf" className="link-nav text-muted-foreground">
              Resume
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}
