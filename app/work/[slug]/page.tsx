import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import type { ReactNode } from "react"
import { allCaseStudies, getCaseStudy } from "@/content/work"
import { RecallChart, ClaimsWaffle, InjectionChart, LedgerBar } from "@/components/site/charts"
import { Transcript } from "@/components/site/transcript"
import { verdict } from "@/components/site/data"

export function generateStaticParams() {
  return allCaseStudies().map((s) => ({ slug: s.slug }))
}

/**
 * There are exactly as many case studies as `content/work` lists. Without this,
 * an unknown slug was rendered on demand, cached, and served with HTTP 200 —
 * a "not found" page that told a crawler it had found something.
 */
export const dynamicParams = false

// Next 15: params is a Promise.
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const study = getCaseStudy(slug)
  if (!study) return {}
  return { title: `${study.title} · Viraj Vaghasia`, description: study.summary }
}

/** The charts each study draws from its own measured figures. */
const FIGURES: Record<string, ReactNode> = {
  "sqlalchemy-upgrade-agent": (
    <>
      <RecallChart />
      <div className="duo tight">
        <ClaimsWaffle />
        <InjectionChart />
      </div>
    </>
  ),
  "geochem-pipeline": <LedgerBar />,
}

/** One layout for every section: a label on the left, the content on the right. */
function Section({ n, title, children }: { n: string; title: string; children: ReactNode }) {
  return (
    <section className="cs-sec" aria-labelledby={`s${n}`}>
      <h2 id={`s${n}`}>
        <span>{n}</span>
        {title}
      </h2>
      <div className="cs-body">{children}</div>
    </section>
  )
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const study = getCaseStudy(slug)
  if (!study) notFound()

  const studies = allCaseStudies()
  const next = studies[(studies.findIndex((s) => s.slug === slug) + 1) % studies.length]
  const live = study.links.find((l) => l.label.toLowerCase().startsWith("live"))
  const sections: [string, ReactNode][] = []

  sections.push([
    "The problem",
    <div className="serif-stack" key="p">
      {study.problem.map((p) => (
        <p key={p}>{p}</p>
      ))}
    </div>,
  ])
  sections.push([
    "What I built",
    <ol className="mech" key="m">
      {study.mechanism.map((m) => (
        <li key={m.step}>
          <h3>{m.step}</h3>
          <p>{m.detail}</p>
        </li>
      ))}
    </ol>,
  ])
  sections.push([
    "What it measures",
    <div key="e">
      {FIGURES[study.slug] ? <div className="cs-figs">{FIGURES[study.slug]}</div> : null}
      <ul className="ev">
        {study.evidence.map((e) => (
          <li key={e.claim}>
            <b>{e.value}</b>
            <div>
              <p className="ev-claim">{e.claim}</p>
              <p className="ev-method">
                {e.method}
                {e.asOf ? <span className="ev-date"> Measured {e.asOf}.</span> : null}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>,
  ])
  if (study.rejected && study.rejected.length > 0) {
    sections.push([
      "What I turned down",
      <ul className="turned" key="r">
        {study.rejected.map((r) => (
          <li key={r.change}>
            <span className="badge">{verdict(r.outcome)}</span>
            <div>
              <h3>{r.change}</h3>
              <p>{r.outcome}</p>
            </div>
          </li>
        ))}
      </ul>,
    ])
  }
  if (study.transcript) {
    sections.push(["A real answer", <Transcript key="t" data={study.transcript} url={live?.href} />])
  }
  sections.push([
    "Where it fails",
    <ul className="limits" key="l">
      {study.limits.map((l) => (
        <li key={l}>{l}</li>
      ))}
    </ul>,
  ])

  return (
    <main id="main" className="cs wrap">
      <p className="back">
        <Link href="/#work">← All work</Link>
      </p>

      <header className="cs-head">
        <p className="lab">
          {study.period} · {study.stack.join(" / ")}
        </p>
        <h1>{study.title}</h1>
        <p className="cs-sum">{study.summary}</p>
        {study.links.length > 0 ? (
          <p className="ctas">
            {study.links.map((l, i) => (
              <a key={l.href} className={i === 0 ? "btn" : "btn line"} href={l.href}>
                {l.label} ↗
              </a>
            ))}
          </p>
        ) : null}
      </header>

      <section className="cs-lead" aria-label="Headline figure">
        <b>{study.headline.value}</b>
        <div>
          <p className="ev-claim">{study.headline.claim}</p>
          <p className="ev-method">{study.headline.basis ?? study.headline.method}</p>
        </div>
      </section>

      {sections.map(([title, body], i) => (
        <Section key={title} n={String(i + 1).padStart(2, "0")} title={title}>
          {body}
        </Section>
      ))}

      <nav className="next" aria-label="Next case study">
        <span className="lab">Next</span>
        <Link href={`/work/${next.slug}`}>{next.title} →</Link>
      </nav>
    </main>
  )
}
