import type { ReactNode } from "react"
import type { Transcript as TranscriptData } from "@/content/work/types"

/**
 * The captured answer is the literal output of an LLM service, stored
 * verbatim in content. It contains a handful of Markdown constructs
 * (fenced code, inline code, a bullet list, `[[n]](#src-n)` citations).
 * This is a small purpose-built renderer for exactly those constructs —
 * not a general Markdown parser, and no Markdown library is added,
 * per the plan's no-new-dependencies constraint.
 */
export type Block =
  | { type: "code"; lang: string; content: string }
  | { type: "list"; items: string[] }
  | { type: "para"; content: string }

function parseTextChunks(text: string): Block[] {
  return text
    .split(/\n{2,}/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk): Block => {
      const lines = chunk
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
      if (lines.length > 0 && lines.every((line) => line.startsWith("- "))) {
        return { type: "list", items: lines.map((line) => line.slice(2)) }
      }
      return { type: "para", content: lines.join(" ") }
    })
}

export function parseAnswer(markdown: string): Block[] {
  const blocks: Block[] = []
  const codeFence = /```(\w*)\n([\s\S]*?)```/g
  let lastIndex = 0
  let match: RegExpExecArray | null
  while ((match = codeFence.exec(markdown))) {
    if (match.index > lastIndex) {
      blocks.push(...parseTextChunks(markdown.slice(lastIndex, match.index)))
    }
    blocks.push({ type: "code", lang: match[1], content: match[2].replace(/\n$/, "") })
    lastIndex = codeFence.lastIndex
  }
  if (lastIndex < markdown.length) {
    blocks.push(...parseTextChunks(markdown.slice(lastIndex)))
  }
  return blocks
}

/** Inline pass: backtick code spans and `[[n]](#src-n)` citation markers. */
export function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = []
  const inline = /`([^`]+)`|\[\[(\d+)\]\]\(#src-\d+\)/g
  let lastIndex = 0
  let match: RegExpExecArray | null
  let i = 0
  while ((match = inline.exec(text))) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index))
    if (match[1] !== undefined) {
      nodes.push(
        <code key={`${keyPrefix}-code-${i}`} className="ic">
          {match[1]}
        </code>,
      )
    } else if (match[2] !== undefined) {
      nodes.push(
        <span key={`${keyPrefix}-cite-${i}`} className="cite">
          {`[${match[2]}]`}
        </span>,
      )
    }
    lastIndex = inline.lastIndex
    i++
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex))
  return nodes
}

function AnswerBody({ answer }: { answer: string }) {
  const blocks = parseAnswer(answer)
  return (
    <div className="tx-answer">
      {blocks.map((block, idx) => {
        if (block.type === "code") {
          return (
            <pre key={idx} tabIndex={0}>
              <code>{block.content}</code>
            </pre>
          )
        }
        if (block.type === "list") {
          return (
            <ul key={idx}>
              {block.items.map((item, i) => (
                <li key={i}>{renderInline(item, `${idx}-${i}`)}</li>
              ))}
            </ul>
          )
        }
        return <p key={idx}>{renderInline(block.content, `${idx}`)}</p>
      })}
    </div>
  )
}

/** The whole exchange, in the same window the home page shows a slice of. */
export function Transcript({ data, url }: { data: TranscriptData; url?: string }) {
  return (
    <figure className="window tx" aria-label="A full answer from the deployed service">
      <div className="chrome" aria-hidden="true">
        <i /><i /><i />
        {url ? <span className="url">{url.replace(/^https:\/\//, "")}</span> : null}
      </div>
      <div className="win-body">
        {data.notice ? <p className="tx-notice">{data.notice}</p> : null}
        <p className="q">
          <span className="who">Question</span>
          {data.question}
        </p>
        <div className="a">
          <span className="who">Answer</span>
          <AnswerBody answer={data.answer} />
        </div>
        <p className="who tx-src-h">Sources retrieved, in the order the service numbered them</p>
        <ol className="tx-srcs">
          {data.sources.map((s) => (
            <li key={s.n} className={s.cited ? "" : "uncited"}>
              <span className="cite">{s.n}</span>
              <div>
                <code>{s.path}</code> <span className={`ver ${s.version.startsWith("1") ? "old" : ""}`}>{s.version}</span>
                {!s.cited && <span className="tag"> retrieved, not cited</span>}
                <span className="tx-heading">{s.heading}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </figure>
  )
}
