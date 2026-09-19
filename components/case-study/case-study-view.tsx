import Link from "next/link"
import type { CaseStudy } from "@/content/work"
import { EvidenceList } from "./evidence-list"
import { Mechanism } from "./mechanism"
import { Transcript } from "./transcript"

/**
 * One layout for every section: the label sits in a narrow left column and the
 * content in a wide right one, so every block on the page shares the same left
 * and right edges. The previous version put a 34rem `prose-measure` cap on the
 * summary, the problem and the limits but left the mechanism, the evidence and
 * the transcript uncapped — so half the page was a narrow column and half ran
 * the full width, which read as broken rather than as a deliberate measure.
 */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-4 border-t border-foreground/20 py-12 md:grid-cols-12 md:gap-10">
      <h2 className="mono-figure text-[14px] font-semibold uppercase tracking-[0.14em] text-foreground md:col-span-3">
        {title}
      </h2>
      <div className="md:col-span-8">{children}</div>
    </section>
  )
}

export function CaseStudyView({ study }: { study: CaseStudy }) {
  return (
    <article>
      <header className="grid gap-4 py-12 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-3">
          <Link
            href="/#work"
            className="mono-figure border-b border-foreground py-1 text-[12px] uppercase tracking-[0.12em] hover:border-transparent"
          >
            ← Back to work
          </Link>
          <p className="mono-figure mt-8 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            {study.period}
          </p>
        </div>

        <div className="md:col-span-8">
          <h1 className="text-[32px] font-semibold leading-[1.08] tracking-[-0.02em] md:text-[44px]">
            {study.title}
          </h1>
          <p className="mt-6 text-[20px] leading-[1.5] text-muted-foreground">{study.summary}</p>
          <p className="mono-figure mt-6 text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
            {study.stack.join("  ·  ")}
          </p>
          {study.links.length > 0 ? (
            <div className="mono-figure mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[12px] uppercase tracking-[0.12em]">
              {study.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="border-b border-border py-1 hover:border-foreground"
                >
                  {l.label}
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </header>

      <Section title="The problem">
        <div className="space-y-4 leading-[1.6]">
          {study.problem.map((p) => (
            <p key={p}>{p}</p>
          ))}
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
                <p className="mt-1 text-[15px] leading-[1.6] text-muted-foreground">{r.outcome}</p>
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
        <ul className="space-y-3">
          {study.limits.map((l) => (
            <li key={l} className="text-[15px] leading-[1.6] text-muted-foreground">
              {l}
            </li>
          ))}
        </ul>
      </Section>
    </article>
  )
}
