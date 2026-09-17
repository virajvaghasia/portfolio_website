import { PROFILE } from "@/content/site"
import { allCaseStudies } from "@/content/work"

export function Hero() {
  const headlines = allCaseStudies().map((s) => ({ slug: s.slug, ...s.headline }))
  return (
    <section className="pt-16 sm:pt-24">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{PROFILE.name}</h1>
      <p className="prose-measure mt-4 leading-relaxed text-muted-foreground">
        {PROFILE.positioning}
      </p>
      <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
        <a href="/resume.pdf" className="text-primary hover:underline">Résumé (PDF)</a>
        {PROFILE.links.map((l) => (
          <a key={l.href} href={l.href} className="text-primary hover:underline"
             target="_blank" rel="noreferrer">{l.label}</a>
        ))}
        <a href={`mailto:${PROFILE.email}`} className="text-primary hover:underline">Email</a>
      </div>

      {/* The point of the first screen: a number a reader can check. */}
      <dl className="mt-12 grid gap-8 border-t border-border pt-8 sm:grid-cols-2">
        {headlines.map((h) => (
          <div key={h.slug}>
            <dd className="mono-figure text-4xl font-semibold">{h.value}</dd>
            <dt className="mt-1 text-sm font-medium">{h.claim}</dt>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{h.method}</p>
          </div>
        ))}
      </dl>
    </section>
  )
}
