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
  /**
   * The one-line version of `method`, for places that show the figure without
   * room for the full sentence — the home page index above all. It must be a
   * true abbreviation of `method`, never a softer or rounder claim, because a
   * figure that travels without its basis is the thing this file exists to
   * prevent.
   */
  basis?: string
  asOf?: string
}

export type MechanismStep = { step: string; detail: string }
export type Rejected = { change: string; outcome: string }
/**
 * One retrieved passage, exactly as the service reported it.
 *
 * `n` is the service's own source number, and the answer text refers to it as
 * `[n]` — so the sources are stored numbered and complete rather than filtered.
 * Dropping the uncited passage once shifted every marker after it and made the
 * page cite the wrong file. `cited: false` means retrieved and put in the
 * prompt but not drawn on, which is worth showing rather than hiding.
 */
export type TranscriptSource = {
  n: number
  path: string
  version: string
  heading: string
  cited: boolean
}

export type Transcript = {
  question: string
  answer: string
  sources: TranscriptSource[]
  /**
   * What the reader needs in order to read the answer correctly — above all,
   * when the model that wrote it is not the model the measured figures on the
   * same page describe.
   */
  notice?: string
}
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
