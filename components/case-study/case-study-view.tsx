import Link from "next/link"
import type { CaseStudy } from "@/content/work"
import { EvidenceList } from "./evidence-list"
import { Mechanism } from "./mechanism"
import { Transcript } from "./transcript"

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-border pt-10">
      <h2 className="mb-6 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        {title}
      </h2>
      {children}
    </section>
  )
}

export function CaseStudyView({ study }: { study: CaseStudy }) {
  return (
    <article className="space-y-12">
      <header>
        <Link href="/" className="text-sm text-primary hover:underline">
          ← Back
        </Link>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">{study.title}</h1>
        <p className="prose-measure mt-3 leading-relaxed text-muted-foreground">{study.summary}</p>
        <p className="mono-figure mt-4 text-sm text-muted-foreground">
          {study.period} · {study.stack.join(" · ")}
        </p>
        {study.links.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-4">
            {study.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-primary hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                {l.label} ↗
              </a>
            ))}
          </div>
        ) : null}
      </header>

      <Section title="The problem">
        <div className="prose-measure space-y-4 leading-relaxed">
          {study.problem.map((p) => <p key={p}>{p}</p>)}
        </div>
      </Section>

      <Section title="What I built">
        <Mechanism steps={study.mechanism} />
      </Section>

      <Section title="The evidence">
        <EvidenceList items={study.evidence} />
      </Section>

      {study.rejected && study.rejected.length > 0 ? (
        <Section title="What I rejected">
          <ul className="space-y-6">
            {study.rejected.map((r) => (
              <li key={r.change}>
                <h3 className="font-medium">{r.change}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{r.outcome}</p>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {study.transcript ? (
        <Section title="A real answer">
          <Transcript data={study.transcript} />
        </Section>
      ) : null}

      <Section title="Limits">
        <ul className="prose-measure space-y-3">
          {study.limits.map((l) => (
            <li key={l} className="text-sm leading-relaxed text-muted-foreground">{l}</li>
          ))}
        </ul>
      </Section>
    </article>
  )
}
