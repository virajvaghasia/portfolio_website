import Link from "next/link"
import { PROFILE, EXPERIENCE, EDUCATION, PUBLICATIONS } from "@/content/site"
import { sqlalchemyUpgradeAgent as agent } from "@/content/work/sqlalchemy-upgrade-agent"
import { geochemPipeline as pipe } from "@/content/work/geochem-pipeline"
import { RecallChart, ClaimsWaffle, InjectionChart, LedgerBar, AGENT_FLOW, PIPE_FLOW } from "@/components/site/charts"
import { LiveWindow } from "@/components/site/live-window"
import { verdict } from "@/components/site/data"

function Steps({ steps, label }: { steps: { k: string; t: string }[]; label: string }) {
  return (
    <ol className="steps" aria-label={label}>
      {steps.map((s, i) => (
        <li key={s.k}>
          <span className="n">{String(i + 1).padStart(2, "0")}</span>
          <b>{s.k}</b>
          <span className="t">{s.t}</span>
        </li>
      ))}
    </ol>
  )
}

export default function Home() {
  // The first rejected change is the retraction, told in full above the list.
  const rest = agent.rejected!.slice(1)
  return (
    <>
      <main id="main">
        <section className="hero wrap">
          <div className="hero-text">
            <p className="status">
              <span className="dot" aria-hidden="true" /> Open to software engineer new-grad roles from May 2027
            </p>
            <h1>
              I build systems that cite their sources, and I publish the numbers <em>when they miss.</em>
            </h1>
            <p className="ctas">
              <a className="btn" href="/Viraj_Vaghasia_Resume.pdf">Download résumé</a>
              <a className="btn ghost" href={`mailto:${PROFILE.email}`}>Email me</a>
            </p>
          </div>
          <div className="hero-side">
            <img src="/mypic.png" alt="Viraj Vaghasia" width={370} height={314} />
            <dl className="facts">
              <div><dt>Now</dt><dd>M.S. Computer Science, USC · Research assistant, USC ISI</dd></div>
              <div><dt>Before</dt><dd>3 years, Senior Software Engineer, Decimal Point Analytics</dd></div>
              <div><dt>Based in</dt><dd>{PROFILE.location}</dd></div>
            </dl>
          </div>
        </section>

        <article className="proj wrap" id="work" aria-labelledby="t1">
          <header className="proj-top">
            <span className="no" aria-hidden="true">01</span>
            <div>
              <p className="lab">{agent.period} · {agent.stack.join(" / ")}</p>
              <h2 id="t1">{agent.title}</h2>
              <p className="sum">{agent.summary}</p>
            </div>
          </header>

          <div className="duo">
            <div>
              <p className="cap">
                The live service, answering a real question
                <a href={agent.links[0].href}>Try it ↗</a>
              </p>
              <LiveWindow />
            </div>
            <div>
              <p className="cap">Retrieval, lever by lever</p>
              <RecallChart />
            </div>
          </div>

          <Steps steps={AGENT_FLOW} label="How a question is answered" />

          <div className="duo">
            <ClaimsWaffle />
            <InjectionChart />
          </div>

          <aside className="retract" aria-labelledby="rt">
            <h3 id="rt">Retracted</h3>
            <div>
              <p className="serif">
                <s>&ldquo;The agent architecture reasons worse than the pipeline.&rdquo;</s> I published that, then
                withdrew it. The agent was truncating every passage to 600 characters against a median of 1,299. On
                the full text it scores 0.43, level with the pipeline.
              </p>
              <ul className="rej" aria-label="Other changes that did not ship">
                {rest.map((r) => (
                  <li key={r.change}>
                    <span className="badge">{verdict(r.outcome)}</span>
                    <span>{r.change}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <p className="links">
            <Link className="btn line" href="/work/sqlalchemy-upgrade-agent">Read the case study →</Link>
            {agent.links.map((l) => (
              <a key={l.href} href={l.href}>{l.label} ↗</a>
            ))}
          </p>
        </article>

        <article className="proj wrap" aria-labelledby="t2">
          <header className="proj-top">
            <span className="no" aria-hidden="true">02</span>
            <div>
              <p className="lab">{pipe.period} · USC ISI · {pipe.stack.join(" / ")}</p>
              <h2 id="t2">Geological literature pipeline</h2>
              <p className="sum">
                Acquires and organises geology journal articles for a critical-minerals research project. The
                checkpoint is a ledger row, never a flag, so resuming an interrupted run is re-running the command.
              </p>
            </div>
          </header>

          <div className="ledger">
            <LedgerBar />
            <dl className="stats">
              <div><dt>journals</dt><dd>10</dd></div>
              <div><dt>tests</dt><dd>{pipe.evidence[2].value}</dd></div>
              <div><dt>platforms driven by JSON recipes, not code</dt><dd>{pipe.evidence[1].value}</dd></div>
              <div><dt>open-access papers recovered by one parsing fix</dt><dd>{pipe.evidence[4].value}</dd></div>
            </dl>
          </div>

          <Steps steps={PIPE_FLOW} label="How an article is acquired" />

          <div className="duo">
            <p className="serif">
              A DOI points at the publisher&rsquo;s host, but the library licenses the journal through whatever
              platform it has an agreement with. Asking the library catalogue instead of guessing from the DOI made one
              journal reachable at all: <strong>{pipe.evidence[3].value}</strong> articles so far, of roughly 2,856.
            </p>
            <table className="route">
              <caption>European Journal of Mineralogy</caption>
              <tbody>
                <tr><th scope="row">DOI host</th><td>schweizerbart.de</td><td className="bad">not carried</td></tr>
                <tr><th scope="row">Catalogue</th><td>GeoScienceWorld</td><td className="good">licensed</td></tr>
                <tr><th scope="row">Segment</th><td>eurjmin</td><td>not &ldquo;ejm&rdquo;</td></tr>
              </tbody>
            </table>
          </div>

          <p className="links">
            <Link className="btn line" href="/work/geochem-pipeline">Read the case study →</Link>
          </p>
        </article>

        <section className="rec wrap" id="record" aria-label="Experience, education and papers">
          <div>
            <h2>Experience</h2>
            {EXPERIENCE.map((e) => (
              <div className="entry" key={e.org}>
                <p className="when">{e.period}</p>
                <p className="what">{e.role}</p>
                <p className="org">{e.org}</p>
                <p className="note">{e.note}</p>
              </div>
            ))}
          </div>
          <div>
            <h2>Education</h2>
            {EDUCATION.map((e) => (
              <div className="entry" key={e.org}>
                <p className="when">{e.period}</p>
                <p className="what">{e.degree}</p>
                <p className="org">{e.org}</p>
                <p className="note">{e.note}</p>
              </div>
            ))}
          </div>
          <div>
            <h2>Papers</h2>
            {PUBLICATIONS.map((p) => (
              <div className="entry" key={p.title}>
                <p className="when">{p.venue}, {p.year}</p>
                <p className="what"><a href={p.href}>{p.title}</a></p>
              </div>
            ))}
          </div>
        </section>

      </main>
    </>
  )
}
