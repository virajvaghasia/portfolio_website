/**
 * Figures the three design options draw as charts. Every value is copied from
 * content/work/* or from a command whose output is already on the /draft page;
 * nothing here is new. Kept in one place so the three options cannot disagree.
 */

/** recall@5 per lever, from the evidence `method` in sqlalchemy-upgrade-agent.ts. */
export const RECALL_STEPS = [
  { label: "Dense retrieval alone", value: 0.495 },
  { label: "Collapse cross-version twins", value: 0.516 },
  { label: "Fuse with BM25 on rank", value: 0.63 },
  { label: "Cross-encoder promotes seat 5", value: 0.64 },
] as const
export const END_TO_END = 0.42

/** Claims executed against SQLAlchemy 2.0.51. */
export const CLAIMS = { survived: 47, total: 51 }

/** Pre-registered injection run: 90 attempts, bar written before the run. */
export const INJECTION = { attempts: 90, before: 16, after: 10, bar: 5 }

/**
 * `select status, count(*) from articles group by status` on the acquisition
 * ledger, the same snapshot /draft prints. It is newer than the 33,169 in
 * geochem-pipeline.ts (2026-09-20); the ledger grows as the pipeline runs.
 */
export const LEDGER = [
  { status: "downloaded", n: 33647 },
  { status: "pending", n: 10644 },
  { status: "oa_miss", n: 4824 },
  { status: "skipped", n: 1610 },
  { status: "failed", n: 426 },
] as const
export const LEDGER_AS_OF = "2026-09-21"

export const fmt = (n: number) => n.toLocaleString("en-US")

/** A one-word label for each rejected change, read off the first words of its outcome. */
export function verdict(outcome: string) {
  if (outcome.startsWith("Retracted")) return "retracted"
  if (outcome.startsWith("Cancelled")) return "cancelled"
  if (outcome.startsWith("It worked")) return "held back"
  return "reverted"
}
