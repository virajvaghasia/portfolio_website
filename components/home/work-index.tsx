import Link from "next/link"
import { allCaseStudies } from "@/content/work"
import { schematicFor, captionFor } from "./schematics"

function Label({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`mono-figure block text-[11px] font-medium uppercase tracking-[0.18em] ${className}`}>
      {children}
    </span>
  )
}

export function WorkIndex() {
  const studies = allCaseStudies()

  return (
    // Grey band with black edges — clear section shift, no pale hairlines.
    <section
      id="work"
      className="scroll-mt-14 bg-[linear-gradient(to_bottom,oklch(0.88_0_0)_0%,oklch(0.91_0_0)_28%,oklch(0.93_0_0)_58%,oklch(0.90_0_0)_100%)] dark:bg-[linear-gradient(to_bottom,oklch(0.22_0_0)_0%,oklch(0.19_0_0)_28%,oklch(0.17_0_0)_58%,oklch(0.20_0_0)_100%)]"
    >
      <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-b border-foreground/25 py-5">
          <h2 className="mono-figure text-[13px] font-semibold uppercase tracking-[0.16em] text-foreground">Selected work</h2>
          <Label className="text-muted-foreground">Every figure states its basis</Label>
        </div>

        <ul className="border-b border-foreground/70">
          {studies.map((s, i) => {
            const flipped = i % 2 === 1
            return (
              <li key={s.slug} className="border-b border-foreground/20 last:border-b-0">
                <article className="grid items-start gap-8 py-12 md:grid-cols-12 md:gap-10">
                  <div className={`md:col-span-5 ${flipped ? "md:order-2" : ""}`}>
                    <figure className="flex h-full flex-col border border-foreground/20 bg-card p-6 text-muted-foreground">
                      <figcaption className="flex items-baseline justify-between gap-4 border-b border-foreground/15 pb-4">
                        <Label>Fig. {String(i + 1).padStart(2, "0")}</Label>
                        <Label className="text-muted-foreground">{captionFor(s.slug)}</Label>
                      </figcaption>
                      <div className="flex flex-1 items-center pt-6">{schematicFor(s.slug)}</div>
                    </figure>
                  </div>

                  <div className={`md:col-span-7 ${flipped ? "md:order-1" : ""}`}>
                    <Label className="text-muted-foreground">
                      {String(i + 1).padStart(2, "0")} · {s.period}
                    </Label>
                    <h3 className="mt-2 text-[26px] font-semibold leading-[1.12] tracking-[-0.01em] md:text-[32px]">
                      <Link href={`/work/${s.slug}`} className="link-ink">
                        {s.title}
                      </Link>
                    </h3>

                    {/* The figure and the basis it rests on, never one without the other. */}
                    <div className="mt-8 border-t border-foreground pt-4">
                      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                        <span className="mono-figure text-[32px] font-medium leading-none tracking-[-0.02em] md:text-[40px]">
                          {s.headline.value}
                        </span>
                        <Label className="text-muted-foreground">{s.headline.claim}</Label>
                      </div>
                      {s.headline.basis ? (
                        <p className="mono-figure mt-2 text-[12px] leading-[1.5] text-muted-foreground">
                          {s.headline.basis}
                        </p>
                      ) : null}
                    </div>

                    <p className="mt-6 max-w-[42rem] leading-[1.6] text-muted-foreground">{s.summary}</p>

                    <p className="mono-figure mt-6 text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                      {s.stack.join("  ·  ")}
                    </p>

                    <div className="mono-figure mt-5 flex flex-wrap gap-x-5 gap-y-3 text-[12px] uppercase tracking-[0.12em]">
                      <Link href={`/work/${s.slug}`} className="link-ink-strong">
                        Case study
                      </Link>
                      {s.links.map((l) => (
                        <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="link-ink">
                          {l.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </article>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
