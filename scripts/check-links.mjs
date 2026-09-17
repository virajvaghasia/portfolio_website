/**
 * Fail the build on a dead link.
 *
 * On 2026-09-16 this site had four: two demo URLs and two GitHub repositories,
 * all 404. A recruiter clicking any project link got nothing, which reads as
 * invented rather than stale. Vigilance did not catch that for years, so this
 * runs before every build instead.
 *
 * Spec §10.2 asks for `content/` *and* the components, so all three source
 * roots are walked. Walking only `content/` passed by coincidence: nothing
 * hard-codes a URL in a component today, and nothing structural stopped it.
 */
import { readdir, readFile } from "node:fs/promises"
import path from "node:path"

const REPO = path.resolve(import.meta.dirname, "..")
const ROOTS = ["content", "components", "app"].map((d) => path.join(REPO, d))
const URL_RE = /https:\/\/[^\s"'`)<>]+/g
// LinkedIn answers automated requests with 999 rather than 200. That is a live
// page refusing a bot, not a dead link.
const OK = (status) => (status >= 200 && status < 400) || status === 999

async function walk(dir) {
  const out = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) out.push(...(await walk(full)))
    else if (/\.(ts|tsx)$/.test(entry.name) && !full.includes("__tests__")) out.push(full)
  }
  return out
}

const urls = new Map()
const files = []
for (const root of ROOTS) files.push(...(await walk(root)))
for (const file of files) {
  const text = await readFile(file, "utf8")
  for (const raw of text.match(URL_RE) ?? []) {
    const url = raw.replace(/[.,]+$/, "")
    if (!urls.has(url)) urls.set(url, file)
  }
}

if (urls.size === 0) {
  console.error("check-links: found no URLs under content/, components/ or app/ — the scanner is broken")
  process.exit(1)
}

let failed = 0
for (const [url, file] of urls) {
  let status = 0
  try {
    const res = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(25000) })
    status = res.status
  } catch (err) {
    console.error(`  DEAD  ${url}\n        in ${path.relative(REPO, file)} — ${err.message}`)
    failed++
    continue
  }
  if (OK(status)) console.log(`  ok    ${status}  ${url}`)
  else {
    console.error(`  DEAD  ${status}  ${url}\n        in ${path.relative(REPO, file)}`)
    failed++
  }
}

console.log(`\n${urls.size} link(s) checked, ${failed} dead`)
process.exit(failed ? 1 : 0)
