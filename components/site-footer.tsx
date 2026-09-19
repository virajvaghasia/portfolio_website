import { PROFILE } from "@/content/site"

/** The colophon: contact + place. Soft close, no hard rule. */
export function SiteFooter() {
  return (
    <footer className="bg-background">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
        <div className="flex flex-wrap items-baseline justify-between gap-6 border-t border-foreground/70 py-12 md:py-16">
          <a
            href={`mailto:${PROFILE.email}`}
            className="link-ink text-[17px] normal-case tracking-normal [overflow-wrap:anywhere] md:text-[24px]"
          >
            {PROFILE.email}
          </a>
          <span className="mono-figure block text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            {PROFILE.location}
          </span>
        </div>
      </div>
    </footer>
  )
}
