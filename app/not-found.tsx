import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "Page not found · Viraj Vaghasia" }

export default function NotFound() {
  return (
    <main id="main" className="nf wrap">
      <p className="lab">404</p>
      <h1>Page not found</h1>
      <p>There is nothing at this address. Both case studies and everything else on this site are linked from the home page.</p>
      <p className="ctas">
        <Link className="btn" href="/">
          ← Back home
        </Link>
      </p>
    </main>
  )
}
