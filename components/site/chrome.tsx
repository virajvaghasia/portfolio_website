import Link from "next/link"
import { PROFILE } from "@/content/site"

const RESUME = "/Viraj_Vaghasia_Resume.pdf"

/**
 * Sticky, so the résumé and the way back home are one click away however far
 * down a case study the reader is. Section links are absolute (`/#work`) so the
 * same bar works on every page.
 */
export function SiteNav() {
  return (
    <header className="nav">
      <div className="wrap top">
        <Link className="name" href="/">
          {PROFILE.name}
        </Link>
        <nav aria-label="Primary">
          <Link href="/#work">Work</Link>
          <Link href="/#record">Record</Link>
          <a href={PROFILE.links[0].href}>GitHub</a>
          <a href={PROFILE.links[1].href}>LinkedIn</a>
          <a className="btn sm" href={RESUME}>
            Résumé
          </a>
        </nav>
      </div>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="end wrap">
      <span>
        {PROFILE.name} · {PROFILE.location}
      </span>
      <nav aria-label="Contact">
        <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
        <a href={PROFILE.links[0].href}>GitHub</a>
        <a href={PROFILE.links[1].href}>LinkedIn</a>
        <a href={RESUME}>Résumé</a>
      </nav>
    </footer>
  )
}
