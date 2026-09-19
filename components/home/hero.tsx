import { PROFILE, EXPERIENCE, EDUCATION } from "@/content/site"

/**
 * Resume convention, not marketing-page convention: the name is the largest
 * single thing on the page, because a recruiter arrives with the PDF open and
 * matches the two at a glance. The tagline is a subhead under it, not the H1.
 */
function Label({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`mono-figure block text-[11px] font-medium uppercase tracking-[0.18em] ${className}`}>
      {children}
    </span>
  )
}

export function Hero() {
  const facts = [
    { k: "Now", v: `${EXPERIENCE[0].role}, ${EXPERIENCE[0].org}` },
    { k: "Prior", v: `${EXPERIENCE[1].role}, ${EXPERIENCE[1].org}` },
    { k: "Studying", v: `${EDUCATION[0].degree}, ${EDUCATION[0].org}` },
    { k: "Based", v: PROFILE.location },
  ]

  return (
    <section className="bg-background">
      <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
        <div className="grid gap-10 py-16 md:grid-cols-12 md:items-start md:gap-10 md:py-20">
          <div className="md:col-span-7">
            <h1 className="text-[40px] font-semibold leading-[1.02] tracking-[-0.02em] sm:text-[52px] md:text-[64px]">
              {PROFILE.name}
            </h1>
            <p className="mt-4 max-w-[42rem] text-[20px] font-medium leading-[1.3] tracking-[-0.01em] text-balance sm:text-[24px]">
              {PROFILE.tagline}
            </p>
            <p className="mt-6 max-w-[42rem] leading-[1.6] text-muted-foreground">{PROFILE.positioning}</p>
            <div className="mono-figure mt-8 flex flex-wrap gap-x-5 gap-y-3 text-[12px] uppercase tracking-[0.12em]">
              <a href="/resume.pdf" className="link-ink-strong">
                Resume (PDF)
              </a>
              {PROFILE.links.map((l) => (
                <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="link-ink">
                  {l.label}
                </a>
              ))}
              <a href={`mailto:${PROFILE.email}`} className="link-ink">
                Email
              </a>
            </div>
          </div>

          <dl className="md:col-span-5 md:border-l md:border-foreground/20 md:pl-10">
            {facts.map((f) => (
              <div key={f.k} className="border-t border-foreground/15 py-4 first:border-t-0 md:first:border-t">
                <dt>
                  <Label className="text-muted-foreground">{f.k}</Label>
                </dt>
                <dd className="mt-1 text-[15px] leading-[1.45]">{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
