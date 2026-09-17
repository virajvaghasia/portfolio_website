import Link from "next/link"
import { PROFILE } from "@/content/site"

export function SiteHeader() {
  return (
    <header className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-6">
      <Link href="/" className="font-medium hover:text-primary">{PROFILE.name}</Link>
      <nav className="flex flex-wrap gap-5 text-sm">
        <Link href="/#work" className="text-muted-foreground hover:text-primary">Work</Link>
        <Link href="/#about" className="text-muted-foreground hover:text-primary">About</Link>
        <a href="/resume.pdf" className="text-muted-foreground hover:text-primary">Résumé</a>
      </nav>
    </header>
  )
}
