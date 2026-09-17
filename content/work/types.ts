/**
 * `method` is required, and that is the point of this file.
 *
 * The resume rule is that every number traces to a command that reproduces it.
 * Making `method` non-optional means a figure cannot reach the page without
 * stating how it was measured — enforced by the compiler rather than remembered.
 */
export type Evidence = {
  claim: string
  value: string
  method: string
  asOf?: string
}

export type MechanismStep = { step: string; detail: string }
export type Rejected = { change: string; outcome: string }
export type Transcript = { question: string; answer: string; sources: string[] }
export type Link = { label: string; href: string }

export type CaseStudy = {
  slug: string
  title: string
  summary: string
  stack: string[]
  period: string
  links: Link[]
  headline: Evidence
  problem: string[]
  mechanism: MechanismStep[]
  evidence: Evidence[]
  rejected?: Rejected[]
  transcript?: Transcript
  limits: string[]
}
