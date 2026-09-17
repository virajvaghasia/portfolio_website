import type { Transcript as TranscriptData } from "@/content/work/types"

export function Transcript({ data }: { data: TranscriptData }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4 sm:p-6">
      <p className="mono-figure text-sm text-muted-foreground">Question</p>
      <p className="mt-1 font-medium">{data.question}</p>
      <p className="mono-figure mt-6 text-sm text-muted-foreground">Answer</p>
      <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed">{data.answer}</p>
      <p className="mono-figure mt-6 text-sm text-muted-foreground">Sources cited</p>
      <ul className="mt-1 space-y-1">
        {data.sources.map((s) => (
          <li key={s} className="mono-figure text-sm break-words">{s}</li>
        ))}
      </ul>
    </div>
  )
}
