import type { CaseStudy } from "./types"

export const geochemPipeline: CaseStudy = {
  slug: "geochem-pipeline",
  title: "Geological literature acquisition pipeline",
  summary:
    "A restartable pipeline that acquires, organises and classifies geology journal articles for a critical-minerals research project at USC ISI.",
  stack: ["Python", "SQLite", "Playwright", "Crossref API", "pytest"],
  period: "May 2026 – present",
  links: [],
  headline: {
    claim: "Articles acquired",
    value: "33,169",
    basis: "status='downloaded' rows in the acquisition ledger",
    method:
      "Rows with status 'downloaded' in the acquisition ledger: sqlite3 acquire/_state/ledger.db \"select count(*) from articles where status='downloaded'\". The figure grows as the pipeline runs. It moved by four during the half hour this page was last checked.",
    asOf: "2026-09-20",
  },
  problem: [
    "A research group needed a large, correctly structured corpus of geology papers to classify for byproduct-mineral content, across dozens of journals on different publisher platforms.",
    "The existing approach was one hand-written scraper per journal, the largest around 3,900 lines. Adding a publisher meant writing and testing new code, and every scraper carried its own quiet failure modes.",
  ],
  mechanism: [
    {
      step: "The ledger is the checkpoint",
      detail:
        "A SQLite row per article carries one of seven states: pending, downloaded, failed, oa_miss, parked, skipped. Resuming is re-running the same command: the system reads what it has rather than walking the disk or consulting a run flag, so there is no separate resume path that can be wrong.",
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
      step: "Ask the library which platform carries a journal",
      detail:
        "A DOI resolves to the publisher's canonical host, but a library licenses the same content through whatever platform it has an agreement with, under URLs sharing no domain; inferring the platform from the DOI host is therefore inferring the wrong thing. That nearly cost 2,856 acquirable articles: European Journal of Mineralogy's DOIs point at a host the university proxy does not carry, while the catalogue record says GeoScienceWorld serves the volumes in question. A catalogue phase now reads the library's own record, parses its full-text availability into providers and coverage, follows the resolver link and reads the journal's path segment off the URL it lands on. For that journal the answer is eurjmin, which cannot be guessed. The obvious guess is wrong. Routes are stored per journal and overlaid onto the recipe when it loads, so onboarding a journal edits nothing in the repository.",
    },
    {
      step: "Learn recipes instead of writing scrapers",
      detail:
        "A publisher is a JSON recipe, not a module. A local 7B model proposes one from a single open-access article and four deterministic checks decide whether it ships: schema, then a leak check, then re-derivation, then supplements. The model never decides.",
    },
  ],
  evidence: [
    {
      claim: "Articles acquired",
      value: "33,169",
      method:
        "Count of ledger rows with status 'downloaded', across 10 journals. Eight of them carry 99.95% of the total; the other two have 14 and 3.",
      asOf: "2026-09-20",
    },
    {
      claim: "Publisher platforms driven by a recipe rather than code",
      value: "4",
      method: "File count of acquire/recipes/*.json.",
    },
    {
      claim: "Tests",
      value: "484",
      method:
        "pytest -q --collect-only -m \"not network\" reports 477/484 collected, 7 deselected. The suite is still growing.",
      asOf: "2026-09-20",
    },
    {
      claim: "Articles reachable only once the access route came from the library rather than the DOI",
      value: "2,683",
      method:
        "Ledger rows with status 'downloaded' for European Journal of Mineralogy, whose DOIs resolve to a host the university proxy does not carry. Before the catalogue phase the journal could not be onboarded at all; the figure is still climbing against roughly 2,856 acquirable.",
      asOf: "2026-09-20",
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
