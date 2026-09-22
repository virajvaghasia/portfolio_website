import Link from "next/link"
import { PROFILE } from "@/content/site"

/**
 * Opens in a new tab rather than downloading: a recruiter can read it at once
 * and keep this site open behind it. The file name is what they get if they
 * save it, so it carries the full name.
 */
export const RESUME = "/Viraj_Vaghasia_Resume.pdf"

/**
 * Sticky, so the resume and the way back home are one click away however far
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
          <a className="btn sm" href={RESUME} target="_blank" rel="noopener">
            Resume
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
        <a href={RESUME} target="_blank" rel="noopener">
          Resume
        </a>
      </nav>
    </footer>
  )
}
