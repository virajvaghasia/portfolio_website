import { describe, it, expect } from "vitest"
import { allCaseStudies } from "../index"

describe("case study content invariants", () => {
  it("gives every evidence entry a non-empty method", () => {
    for (const study of allCaseStudies()) {
      for (const e of study.evidence) {
        expect(e.method.trim(), `${study.slug} / "${e.claim}" has no method`).not.toBe("")
      }
    }
  })

  it("gives every case study the five required blocks", () => {
    for (const study of allCaseStudies()) {
      expect(study.title.trim(), `${study.slug} title`).not.toBe("")
      expect(study.summary.trim(), `${study.slug} summary`).not.toBe("")
      expect(study.problem.length, `${study.slug} problem`).toBeGreaterThan(0)
      expect(study.mechanism.length, `${study.slug} mechanism`).toBeGreaterThan(0)
      expect(study.evidence.length, `${study.slug} evidence`).toBeGreaterThan(0)
      expect(study.limits.length, `${study.slug} limits`).toBeGreaterThan(0)
    }
  })

  it("uses unique, url-safe slugs", () => {
    const slugs = allCaseStudies().map((s) => s.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
    for (const s of slugs) expect(s).toMatch(/^[a-z0-9-]+$/)
  })

  it("gives every link an absolute https href and a label", () => {
    for (const study of allCaseStudies()) {
      for (const l of study.links) {
        expect(l.label.trim(), `${study.slug} link label`).not.toBe("")
        expect(l.href, `${study.slug} link href`).toMatch(/^https:\/\//)
      }
    }
  })

  it("has both case studies", () => {
    expect(allCaseStudies().length).toBe(2)
  })

  it("never states a figure without a method, even in the headline", () => {
    for (const study of allCaseStudies()) {
      expect(study.headline.method.trim(), `${study.slug} headline`).not.toBe("")
      expect(study.headline.value.trim(), `${study.slug} headline value`).not.toBe("")
    }
  })

  /**
   * A captured transcript was once stored with the one uncited source removed,
   * which shifted the answer's [4] and [5] markers onto the wrong files. The
   * sources are the service's own numbered list, complete, or the citations on
   * the page are wrong.
   */
  it("resolves every citation marker in a transcript to a source the service returned", () => {
    for (const study of allCaseStudies()) {
      const t = study.transcript
      if (!t) continue
      const numbers = t.sources.map((s) => s.n)
      expect(numbers.length, `${study.slug} transcript has no sources`).toBeGreaterThan(0)
      expect(new Set(numbers).size, `${study.slug} duplicate source numbers`).toBe(numbers.length)
      expect(numbers, `${study.slug} sources are not in the service's order`).toEqual(
        numbers.slice().sort((a, b) => a - b),
      )
      expect(numbers[0], `${study.slug} sources do not start at 1`).toBe(1)
      expect(numbers.at(-1), `${study.slug} source numbers have a gap`).toBe(numbers.length)
      for (const m of t.answer.matchAll(/\[\[(\d+)\]\]/g)) {
        expect(numbers, `${study.slug} answer cites [${m[1]}], which is not in sources`).toContain(
          Number(m[1]),
        )
      }
      for (const src of t.sources) {
        expect(src.path.trim(), `${study.slug} source ${src.n} path`).not.toBe("")
        expect(src.version.trim(), `${study.slug} source ${src.n} version`).not.toBe("")
      }
    }
  })

  it("keeps the geochem study link-free while its repository is private", () => {
    const geo = allCaseStudies().find((s) => s.slug === "geochem-pipeline")
    expect(geo, "geochem-pipeline must exist").toBeDefined()
    expect(geo!.links).toHaveLength(0)
  })
})
