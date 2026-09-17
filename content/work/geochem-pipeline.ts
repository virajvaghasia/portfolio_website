import type { CaseStudy } from "./types"

export const geochemPipeline: CaseStudy = {
  slug: "geochem-pipeline",
  title: "Geological literature acquisition pipeline",
  summary:
    "A restartable pipeline that acquires, organises and classifies geology journal articles for a DARPA CRITICALMAAS project at USC ISI.",
  stack: ["Python", "SQLite", "Playwright", "Crossref API", "pytest"],
  period: "May 2026 – present",
  links: [],
  headline: {
    claim: "Articles acquired",
    value: "30,096",
    method:
      "Rows with status 'downloaded' in the acquisition ledger: sqlite3 acquire/_state/ledger.db \"select count(*) from articles where status='downloaded'\". The figure grows as the pipeline runs.",
    asOf: "2026-09-17",
  },
  problem: [
    "A research group needed a large, correctly structured corpus of geology papers to classify for byproduct-mineral content, across dozens of journals on different publisher platforms.",
    "The existing approach was one hand-written scraper per journal — the largest around 3,900 lines. Adding a publisher meant writing and testing new code, and every scraper carried its own quiet failure modes.",
  ],
  mechanism: [
    {
      step: "The ledger is the checkpoint",
      detail:
        "A SQLite row per article carries one of seven states — pending, downloaded, failed, oa_miss, parked, skipped. Resuming is re-running the same command: the system reads what it has rather than walking the disk or consulting a run flag, so there is no separate resume path that can be wrong.",
    },
    {
      step: "Open access first, credentials second",
      detail:
        "An unauthenticated tier resolves free PDFs through Unpaywall and lands roughly a fifth of the corpus with no login at all. Only what remains goes to the browser tier, which drives Playwright through the university library proxy on a live SSO session.",
    },
    {
      step: "Validate before saving",
      detail:
        "Every downloaded byte-stream is checked for the %PDF header before its size, deliberately: a short HTML challenge page is 'not a PDF', and calling it 'too small' would point the diagnosis at a truncated download instead of the block that really happened. Saving a paywall page as if it were an article was the most common failure of the scrapers this replaced.",
    },
    {
      step: "Classify the failure, then react to it",
      detail:
        "A login redirect, a bot challenge and a rate-limit block are three different events. The first parks the article for a human; the second is solvable, so it waits and retries; the third means the institutional IP is at risk, so the batch halts after three consecutive blocks with an escalating 3-to-30-minute backoff. Retrying through the third is how you lose library access for everyone on the network.",
    },
    {
      step: "Learn recipes instead of writing scrapers",
      detail:
        "A publisher is a JSON recipe, not a module. A local 7B model proposes one from a single open-access article and four deterministic checks decide whether it ships — schema, then a leak check, then re-derivation, then supplements. The model never decides.",
    },
  ],
  evidence: [
    {
      claim: "Articles acquired",
      value: "30,096",
      method:
        "Count of ledger rows with status 'downloaded'. Six journals carry 99.9% of this; three more have single-digit counts.",
      asOf: "2026-09-17",
    },
    {
      claim: "Publisher platforms driven by a recipe rather than code",
      value: "4",
      method: "File count of acquire/recipes/*.json.",
    },
    {
      claim: "Tests",
      value: "295",
      method:
        "pytest -q --collect-only -m \"not network\" reports 288/295 collected, 7 deselected. The suite is still growing.",
      asOf: "2026-09-17",
    },
    {
      claim: "Gold open-access papers recovered by one parsing fix",
      value: "~899",
      method:
        "Unpaywall frequently reports is_oa true with url_for_pdf null. Treating that as 'not open access' had been skipping these; returning the landing URL and letting the fetch path derive the PDF recovered them.",
    },
  ],
  rejected: [],
  limits: [
    "The classifier this corpus feeds is the lab's work, not mine. I built the acquisition pipeline and ran and scored the classifier's evaluation.",
    "The reference set it was evaluated against was labelled by a domain expert, not by me.",
    "Nobody has verified the production classification output, so the pipeline surfaces candidates for expert review rather than identifying relevant papers.",
    "The source is a private lab repository, so there is no code to link here.",
  ],
}
