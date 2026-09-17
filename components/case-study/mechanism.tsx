import type { MechanismStep } from "@/content/work/types"

export function Mechanism({ steps }: { steps: MechanismStep[] }) {
  return (
    <ol className="space-y-6">
      {steps.map((s, i) => (
        <li key={s.step} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3">
          <span className="mono-figure pt-0.5 text-sm text-muted-foreground">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <h3 className="font-medium">{s.step}</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.detail}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}
