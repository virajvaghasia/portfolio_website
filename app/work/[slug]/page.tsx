import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { allCaseStudies, getCaseStudy } from "@/content/work"
import { CaseStudyView } from "@/components/case-study/case-study-view"

export function generateStaticParams() {
  return allCaseStudies().map((s) => ({ slug: s.slug }))
}

/**
 * There are exactly as many case studies as `content/work` lists. Without this,
 * an unknown slug was rendered on demand, cached, and served with HTTP 200 —
 * a "not found" page that told a crawler it had found something.
 */
export const dynamicParams = false

// Next 15: params is a Promise.
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params
  const study = getCaseStudy(slug)
  if (!study) return {}
  return { title: `${study.title} — Viraj Vaghasia`, description: study.summary }
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const study = getCaseStudy(slug)
  if (!study) notFound()
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:py-24">
      <CaseStudyView study={study} />
    </main>
  )
}
