import Link from "next/link"
import { allCaseStudies } from "@/content/work"

export function WorkIndex() {
  return (
    <section id="work" className="border-t border-border pt-10">
      <h2 className="mb-8 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        Selected work
      </h2>
      <ul className="space-y-10">
        {allCaseStudies().map((s) => (
          <li key={s.slug}>
            <Link href={`/work/${s.slug}`} className="group block">
              <h3 className="text-xl font-medium group-hover:text-primary">{s.title}</h3>
              <p className="prose-measure mt-2 text-sm leading-relaxed text-muted-foreground">
                {s.summary}
              </p>
              <p className="mono-figure mt-3 text-sm text-muted-foreground">
                {s.period} · {s.stack.join(" · ")}
              </p>
              <span className="mt-3 inline-block text-sm text-primary group-hover:underline">
                Read the case study →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
