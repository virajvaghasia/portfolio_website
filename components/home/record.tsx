import { EXPERIENCE, EDUCATION, PUBLICATIONS } from "@/content/site"

function Label({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`mono-figure block text-[11px] font-medium uppercase tracking-[0.18em] ${className}`}>
      {children}
    </span>
  )
}

export function Record() {
  return (
    <section id="record" className="scroll-mt-14 bg-background">
      <div className="mx-auto w-full max-w-7xl px-6 py-16 md:px-10 md:py-20">
        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <h2 className="block mono-figure text-[13px] font-semibold uppercase tracking-[0.16em] text-foreground border-b border-foreground pb-4">Experience</h2>
            <ul>
              {EXPERIENCE.map((e) => (
                <li key={`${e.org}-${e.period}`} className="border-b border-foreground/20 py-6">
                  <Label className="text-muted-foreground">{e.period}</Label>
                  <p className="mt-2 text-[24px] font-semibold leading-[1.2]">{e.role}</p>
                  <p className="mt-1 text-[15px] text-muted-foreground">{e.org}</p>
                  <p className="mt-4 max-w-[42rem] text-[15px] leading-[1.6] text-muted-foreground">{e.note}</p>
                </li>
              ))}
            </ul>

            <h2 className="mt-16 block mono-figure text-[13px] font-semibold uppercase tracking-[0.16em] text-foreground border-b border-foreground pb-4">Writing</h2>
            <ul>
              {PUBLICATIONS.map((p) => (
                <li key={p.title} className="border-b border-foreground/20 py-6">
                  <Label className="text-muted-foreground">
                    {p.venue} · {p.year}
                  </Label>
                  {p.href ? (
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noreferrer"
                      className="link-ink mt-2 block max-w-[42rem] text-[17px] leading-[1.4] normal-case tracking-normal"
                    >
                      {p.title}
                    </a>
                  ) : (
                    <p className="mt-2 max-w-[42rem] text-[17px] leading-[1.4]">{p.title}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-5">
            <h2 className="block mono-figure text-[13px] font-semibold uppercase tracking-[0.16em] text-foreground border-b border-foreground pb-4">Education</h2>
            <ul>
              {EDUCATION.map((e) => (
                <li key={`${e.org}-${e.period}`} className="border-b border-foreground/20 py-6">
                  <Label className="text-muted-foreground">{e.period}</Label>
                  <p className="mt-2 text-[17px] font-semibold leading-[1.25]">{e.degree}</p>
                  <p className="mt-1 text-[15px] text-muted-foreground">{e.org}</p>
                  <p className="mt-4 text-[15px] leading-[1.6] text-muted-foreground">{e.note}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
