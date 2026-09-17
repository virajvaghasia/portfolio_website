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
        <code key={`${keyPrefix}-code-${i}`} className="rounded bg-muted px-1 py-0.5 font-mono text-[0.85em]">
          {match[1]}
        </code>,
      )
    } else if (match[2] !== undefined) {
      nodes.push(
        <span key={`${keyPrefix}-cite-${i}`} className="mono-figure text-xs text-muted-foreground">
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
    <div className="mt-1 space-y-3 text-sm leading-relaxed">
      {blocks.map((block, idx) => {
        if (block.type === "code") {
          return (
            <pre
              key={idx}
              className="max-w-full overflow-x-auto rounded-md bg-muted p-3 font-mono text-xs leading-relaxed"
            >
              <code>{block.content}</code>
            </pre>
          )
        }
        if (block.type === "list") {
          return (
            <ul key={idx} className="list-disc space-y-1 pl-5">
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

export function Transcript({ data }: { data: TranscriptData }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4 sm:p-6">
      {data.notice ? (
        <p className="mb-6 rounded-md border border-border bg-muted p-3 text-sm leading-relaxed text-muted-foreground">
          {data.notice}
        </p>
      ) : null}
      <p className="mono-figure text-sm text-muted-foreground">Question</p>
      <p className="mt-1 font-medium">{data.question}</p>
      <p className="mono-figure mt-6 text-sm text-muted-foreground">Answer</p>
      <AnswerBody answer={data.answer} />
      <p className="mono-figure mt-6 text-sm text-muted-foreground">
        Sources retrieved, in the order the service numbered them
      </p>
      <ol className="mt-1 space-y-2">
        {data.sources.map((s) => (
          <li key={s.n} className="text-sm">
            <span className="mono-figure break-words">
              [{s.n}] {s.path}
            </span>{" "}
            <span className="mono-figure text-xs text-muted-foreground">
              {s.version} · {s.cited ? "cited" : "retrieved, not cited"}
            </span>
            <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground break-words">
              {s.heading}
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}
