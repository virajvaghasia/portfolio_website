import type { Evidence } from "@/content/work"

export function EvidenceList({ items }: { items: Evidence[] }) {
  return (
    <dl className="grid gap-8 sm:grid-cols-2">
      {items.map((e) => (
        <div key={e.claim} className="flex flex-col">
          <dt className="order-2 mt-1 text-sm font-medium text-foreground">{e.claim}</dt>
          <dd className="order-1 mono-figure text-3xl font-semibold sm:text-4xl">{e.value}</dd>
          <p className="order-3 mt-2 text-sm leading-relaxed text-muted-foreground">
            {e.method}
            {e.asOf ? <span className="block mt-1 opacity-70">Measured {e.asOf}.</span> : null}
          </p>
        </div>
      ))}
    </dl>
  )
}
