import type { CaseStudy } from "./types"

// Task 2 fills this. Empty is deliberate: this task must end with a suite that
// passes, so the registry ships before the content does.
const STUDIES: CaseStudy[] = []

export function allCaseStudies(): CaseStudy[] {
  return STUDIES
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return STUDIES.find((s) => s.slug === slug)
}

export type { CaseStudy, Evidence } from "./types"
