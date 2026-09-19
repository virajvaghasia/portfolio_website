/**
 * The two case-study schematics, drawn on one explicit grid so they agree.
 *
 * Four rows, 32px tall, 24px of clear space between them, with a 4px inset
 * top and bottom so the 1px strokes are not clipped by the viewBox edge.
 * Every y-coordinate comes from ROW — no hand-placed values, which is how an
 * earlier hand-placed version let the last two boxes overlap by 4px.
 */
const NODE_H = 32
const ROW = [4, 60, 116, 172] as const
export const SCHEMATIC_VIEW_H = ROW[3] + NODE_H + 4 // 208
const MID = 200
const SIDE_L = 80
const SIDE_R = 320

function bottomOf(row: number) {
  return ROW[row] + NODE_H
}

function Node({
  row,
  x,
  w,
  label,
  accent,
}: {
  row: number
  x: number
  w: number
  label: string
  accent?: boolean
}) {
  const y = ROW[row]
  return (
    <g className={accent ? "text-foreground" : "text-muted-foreground"}>
      <rect x={x} y={y} width={w} height={NODE_H} className="fill-none stroke-current" strokeWidth={accent ? 1.5 : 1} />
      <text
        x={x + w / 2}
        y={y + 20}
        textAnchor="middle"
        className="mono-figure fill-current text-[11px]"
      >
        {label}
      </text>
    </g>
  )
}

function Flow({ d, arrow }: { d: string; arrow?: [number, number] }) {
  return (
    <g className="stroke-current text-border" strokeWidth={1} fill="none">
      <path d={d} />
      {arrow ? <polyline points={`${arrow[0] - 4},${arrow[1] - 5} ${arrow[0]},${arrow[1]} ${arrow[0] + 4},${arrow[1] - 5}`} /> : null}
    </g>
  )
}

function Drop({ from, arrow }: { from: number; arrow?: boolean }) {
  const y1 = bottomOf(from)
  const y2 = ROW[from + 1]
  return <Flow d={`M${MID} ${y1} V${y2}`} arrow={arrow ? [MID, y2] : undefined} />
}

function Split({ from }: { from: number }) {
  const y1 = bottomOf(from)
  const y2 = ROW[from + 1]
  const mid = y1 + (y2 - y1) / 2
  return <Flow d={`M${MID} ${y1} V${mid} H${SIDE_L} V${y2} M${MID} ${mid} H${SIDE_R} V${y2}`} />
}

function Merge({ from, arrow }: { from: number; arrow?: boolean }) {
  const y1 = bottomOf(from)
  const y2 = ROW[from + 1]
  const mid = y1 + (y2 - y1) / 2
  return (
    <Flow
      d={`M${SIDE_L} ${y1} V${mid} H${SIDE_R} V${y1} M${MID} ${mid} V${y2}`}
      arrow={arrow ? [MID, y2] : undefined}
    />
  )
}

export function RetrievalSchematic() {
  return (
    <svg
      viewBox={`0 0 400 ${SCHEMATIC_VIEW_H}`}
      className="h-full w-full"
      role="img"
      aria-label="A question fans out to dense BGE-M3 search and sparse BM25 search; the two rank lists are fused with reciprocal rank fusion, and the top five pages either produce an answer with numbered citations or a refusal."
    >
      <Node row={0} x={120} w={160} label="question" />
      <Split from={0} />
      <Node row={1} x={8} w={144} label="dense · BGE-M3" />
      <Node row={1} x={248} w={144} label="sparse · BM25" />
      <Merge from={1} />
      <Node row={2} x={120} w={160} label="RRF fuse → top 5" />
      <Drop from={2} arrow />
      <Node row={3} x={100} w={200} label="cite [n] or decline" accent />
    </svg>
  )
}

export function PipelineSchematic() {
  return (
    <svg
      viewBox={`0 0 400 ${SCHEMATIC_VIEW_H}`}
      className="h-full w-full"
      role="img"
      aria-label="A journal list feeds a SQLite ledger, which routes each article through an open-access tier or a library-proxy browser tier, validates the PDF header, then stores it in the corpus."
    >
      <Node row={0} x={120} w={160} label="journal list" />
      <Drop from={0} />
      <Node row={1} x={120} w={160} label="ledger · sqlite" accent />
      <Split from={1} />
      <Node row={2} x={8} w={144} label="open access" />
      <Node row={2} x={248} w={144} label="proxy · browser" />
      <Merge from={2} arrow />
      <Node row={3} x={100} w={200} label="%PDF check → corpus" />
    </svg>
  )
}

export function schematicFor(slug: string) {
  if (slug === "sqlalchemy-upgrade-agent") return <RetrievalSchematic />
  if (slug === "geochem-pipeline") return <PipelineSchematic />
  return null
}

export function captionFor(slug: string) {
  if (slug === "sqlalchemy-upgrade-agent") return "Retrieval path"
  if (slug === "geochem-pipeline") return "Acquisition path"
  return null
}
