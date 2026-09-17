import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Hero } from "@/components/home/hero"
import { WorkIndex } from "@/components/home/work-index"
import { Timeline } from "@/components/home/timeline"

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl space-y-16 px-4 pb-24">
        <Hero />
        <WorkIndex />
        <Timeline />
        <SiteFooter />
      </main>
    </>
  )
}
