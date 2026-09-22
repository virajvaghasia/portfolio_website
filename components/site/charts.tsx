import { RECALL_STEPS, END_TO_END, CLAIMS, INJECTION, LEDGER, LEDGER_AS_OF, fmt } from "./data"

/**
 * Charts drawn from the measured figures. Built in HTML rather than SVG so the
 * text stays real text at every width. Each option colours them through the
 * --ch-* custom properties it declares; nothing here picks a colour itself.
 */

const LO = 0.4
const HI = 0.7
const pos = (v: number) => `${((v - LO) / (HI - LO)) * 100}%`

/** Dot plot on a labelled, truncated axis. A bar would lie about a truncated axis; a dot does not. */
export function RecallChart() {
  const summary = RECALL_STEPS.map((s) => `${s.label} ${s.value}`).join(", ")
  return (
    <figure className="ch ch-recall" role="img" aria-label={`recall@5: ${summary}; end to end ${END_TO_END}`}>
      <div className="ch-axis" aria-hidden="true">
        <span />
        <div className="ch-ticks">
          {[0.4, 0.5, 0.6, 0.7].map((t) => (
            <span key={t} style={{ left: pos(t) }}>
              {t.toFixed(2)}
            </span>
          ))}
        </div>
        <span />
      </div>
      {RECALL_STEPS.map((s, i) => {
        const prev = i === 0 ? s.value : RECALL_STEPS[i - 1].value
        return (
          <div className="ch-row" key={s.label} aria-hidden="true">
            <span className="ch-label">{s.label}</span>
            <div className="ch-track">
              {i > 0 && <span className="ch-seg" style={{ left: pos(prev), width: `calc(${pos(s.value)} - ${pos(prev)})` }} />}
              <span className="ch-dot" style={{ left: pos(s.value) }} />
            </div>
            <span className="ch-val">{String(s.value)}</span>
          </div>
        )
      })}
      <div className="ch-row ch-miss" aria-hidden="true">
        <span className="ch-label">End to end: answer correct</span>
        <div className="ch-track">
          <span className="ch-gap" style={{ left: pos(END_TO_END), width: `calc(${pos(0.64)} - ${pos(END_TO_END)})` }} />
          <span className="ch-dot" style={{ left: pos(END_TO_END) }} />
        </div>
        <span className="ch-val">{END_TO_END.toFixed(2)}</span>
      </div>
      <figcaption>recall@5 on 100 hand-verified questions. The hatched gap is lost in generation, not search.</figcaption>
    </figure>
  )
}

/** One square per checkable claim. */
export function ClaimsWaffle() {
  return (
    <figure className="ch ch-waffle" role="img" aria-label={`${CLAIMS.survived} of ${CLAIMS.total} claims survived execution`}>
      <div className="ch-cells" aria-hidden="true">
        {Array.from({ length: CLAIMS.total }, (_, i) => (
          <span key={i} className={i < CLAIMS.survived ? "on" : "off"} />
        ))}
      </div>
      <figcaption>
        <strong>{CLAIMS.survived} of {CLAIMS.total}</strong> claims survived being run against SQLAlchemy 2.0.51
      </figcaption>
    </figure>
  )
}

export function InjectionChart() {
  const scale = (n: number) => `${(n / 20) * 100}%`
  const rows = [
    { label: "No fencing", n: INJECTION.before },
    { label: "Fenced user turn", n: INJECTION.after },
  ]
  return (
    <figure
      className="ch ch-inj"
      role="img"
      aria-label={`Injection attempts obeyed out of ${INJECTION.attempts}: ${INJECTION.before} before fencing, ${INJECTION.after} after, against a pre-registered bar of ${INJECTION.bar}. Did not ship.`}
    >
      <div className="ch-inj-plot" aria-hidden="true">
        {rows.map((r) => (
          <div className="ch-row" key={r.label}>
            <span className="ch-label">{r.label}</span>
            <div className="ch-track">
              <span className="ch-bar" style={{ width: scale(r.n) }} />
            </div>
            <span className="ch-val">{r.n}</span>
          </div>
        ))}
        <div className="ch-bar-line" style={{ left: `calc(var(--ch-lw) + (100% - var(--ch-lw) - var(--ch-vw)) * ${INJECTION.bar / 20})` }}>
          <span>bar &le; {INJECTION.bar}</span>
        </div>
      </div>
      <figcaption>Obeyed, of {INJECTION.attempts} pre-registered attempts. Above the bar written before the run, so it did not ship.</figcaption>
    </figure>
  )
}

export function LedgerBar() {
  const total = LEDGER.reduce((a, r) => a + r.n, 0)
  return (
    <figure
      className="ch ch-ledger"
      role="img"
      aria-label={`Acquisition ledger: ${LEDGER.map((r) => `${r.status} ${fmt(r.n)}`).join(", ")}`}
    >
      <div className="ch-stack" aria-hidden="true">
        {LEDGER.map((r, i) => (
          <span key={r.status} className={`s${i + 1}`} style={{ flexGrow: r.n }} />
        ))}
      </div>
      <ul className="ch-legend" aria-hidden="true">
        {LEDGER.map((r, i) => (
          <li key={r.status}>
            <i className={`s${i + 1}`} />
            <code>{r.status}</code>
            <span>{fmt(r.n)}</span>
          </li>
        ))}
      </ul>
      <figcaption>
        Every article is one ledger row, {fmt(total)} in all, as of {LEDGER_AS_OF}. Resuming is re-running the
        command.
      </figcaption>
    </figure>
  )
}

export const AGENT_FLOW = [
  { k: "3,284", t: "passages chunked and embedded" },
  { k: "874", t: "chunks in cross-version twin pairs; one copy kept" },
  { k: "RRF", t: "dense + BM25 fused on rank" },
  { k: "seat 5", t: "one cross-encoder promotion" },
  { k: "cite", t: "or decline, naming what it looked for" },
]

export const PIPE_FLOW = [
  { k: "ledger", t: "one row per article, seven states" },
  { k: "OA first", t: "a fifth needs no login" },
  { k: "%PDF", t: "header checked before size" },
  { k: "3 kinds", t: "of block, three responses" },
  { k: "recipe", t: "JSON per platform, not code" },
]

export function Flow({ steps, label }: { steps: { k: string; t: string }[]; label: string }) {
  return (
    <ol className="flow" aria-label={label}>
      {steps.map((s) => (
        <li key={s.k}>
          <b>{s.k}</b>
          <span>{s.t}</span>
        </li>
      ))}
    </ol>
  )
}
