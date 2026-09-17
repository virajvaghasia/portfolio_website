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
})
