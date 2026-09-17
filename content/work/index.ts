import type { CaseStudy } from "./types"
import { sqlalchemyUpgradeAgent } from "./sqlalchemy-upgrade-agent"
import { geochemPipeline } from "./geochem-pipeline"

const STUDIES: CaseStudy[] = [sqlalchemyUpgradeAgent, geochemPipeline]

export function allCaseStudies(): CaseStudy[] {
  return STUDIES
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return STUDIES.find((s) => s.slug === slug)
}

export type { CaseStudy, Evidence, Transcript, TranscriptSource } from "./types"
