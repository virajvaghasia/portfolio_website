import { EXPERIENCE } from "@/content/site"

export function Timeline() {
  return (
    <section id="about" className="border-t border-border pt-10">
      <h2 className="mb-8 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        Experience and education
      </h2>
      <ul className="space-y-6">
        {EXPERIENCE.map((e) => (
          <li key={`${e.org}-${e.period}`} className="grid gap-1 sm:grid-cols-[12rem_minmax(0,1fr)] sm:gap-6">
            <p className="mono-figure text-sm text-muted-foreground">{e.period}</p>
            <div>
              <p className="font-medium">{e.role}, {e.org}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{e.note}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
