import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Hero } from "@/components/home/hero"
import { WorkIndex } from "@/components/home/work-index"
import { Record } from "@/components/home/record"

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <WorkIndex />
        <Record />
      </main>
      <SiteFooter />
    </>
  )
}
