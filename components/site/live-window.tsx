import { sqlalchemyUpgradeAgent as agent } from "@/content/work/sqlalchemy-upgrade-agent"

/**
 * The deployed service answering a real question: the first paragraph of the
 * stored transcript, with its [n] markers turned into chips and every source
 * the service returned, the uncited one included. Styled by the page using it.
 */
const t = agent.transcript!
const parts = t.answer.split("\n\n")[0].split(/\[\[(\d)\]\]\(#src-\d\)/)

export function LiveWindow() {
  return (
    <figure className="window" aria-label="The deployed SQLAlchemy Upgrade Agent answering a question">
      <div className="chrome" aria-hidden="true">
        <i /><i /><i />
        <span className="url">virajvaghasia--sqlalchemy-upgrade-agent.modal.run</span>
      </div>
      <div className="win-body">
        <p className="q">
          <span className="who">Question</span>
          {t.question}
        </p>
        <div className="a">
          <span className="who">Answer</span>
          <p>
            {parts.map((p, i) =>
              i % 2 ? <span key={i} className="cite">{p}</span> : <span key={i}>{p.replace(/`/g, "")}</span>,
            )}
          </p>
        </div>
        <ul className="srcs">
          {t.sources.map((s) => (
            <li key={s.n} className={s.cited ? "" : "uncited"}>
              <span className="cite">{s.n}</span>
              <code>{s.path}</code>
              <span className={`ver ${s.version.startsWith("1") ? "old" : ""}`}>{s.version}</span>
              {!s.cited && <span className="tag">retrieved, not cited</span>}
            </li>
          ))}
        </ul>
      </div>
    </figure>
  )
}
