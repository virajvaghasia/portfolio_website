import { describe, it, expect } from "vitest"
import type { ReactElement } from "react"
import { parseAnswer, renderInline } from "../transcript"
import { sqlalchemyUpgradeAgent } from "@/content/work/sqlalchemy-upgrade-agent"

/**
 * The transcript renderer is the only logic on this site, and it renders the
 * one block of text taken verbatim from a live service. If it silently stops
 * recognising a construct, the page shows raw Markdown next to a claim that
 * the answer is real — so each construct the captured answer actually uses is
 * pinned here.
 */

/** React elements are plain objects; no DOM is needed to inspect them. */
function isElement(node: unknown): node is ReactElement<{ children?: unknown }> {
  return typeof node === "object" && node !== null && "type" in node
}

function textOf(node: unknown): string {
  if (typeof node === "string") return node
  if (Array.isArray(node)) return node.map(textOf).join("")
  if (isElement(node)) return textOf(node.props.children)
  return ""
}

describe("parseAnswer", () => {
  it("pulls a fenced code block out as its own block, with its language", () => {
    const blocks = parseAnswer(
      "Before.\n\n```python\nwith engine.connect() as conn:\n    result = conn.execute(stmt)\n```\n\nAfter.",
    )
    expect(blocks.map((b) => b.type)).toEqual(["para", "code", "para"])
    const code = blocks[1]
    expect(code.type === "code" && code.lang).toBe("python")
    expect(code.type === "code" && code.content).toBe(
      "with engine.connect() as conn:\n    result = conn.execute(stmt)",
    )
    // Indentation inside the block survives, and no fence leaks into the text.
    expect(blocks.some((b) => b.type === "para" && b.content.includes("```"))).toBe(false)
  })

  it("reads a run of hyphen lines as a list, splitting off the marker", () => {
    const blocks = parseAnswer("Reasons:\n\n- first reason\n- second reason\n- third reason")
    expect(blocks.map((b) => b.type)).toEqual(["para", "list"])
    const list = blocks[1]
    expect(list.type === "list" && list.items).toEqual([
      "first reason",
      "second reason",
      "third reason",
    ])
  })

  it("keeps a paragraph that merely contains a hyphen a paragraph", () => {
    const blocks = parseAnswer("A sentence - with a dash in it.")
    expect(blocks).toEqual([{ type: "para", content: "A sentence - with a dash in it." }])
  })

  it("leaves the captured answer with no raw fence and one code block", () => {
    const blocks = parseAnswer(sqlalchemyUpgradeAgent.transcript!.answer)
    expect(blocks.filter((b) => b.type === "code")).toHaveLength(1)
    expect(blocks.filter((b) => b.type === "list")).toHaveLength(1)
  })
})

describe("renderInline", () => {
  it("turns a backtick span into a <code> element and keeps the text around it", () => {
    const nodes = renderInline("Call `engine.execute()` no more.", "t")
    const code = nodes.find(isElement)
    expect(code?.type).toBe("code")
    expect(textOf(code)).toBe("engine.execute()")
    expect(textOf(nodes)).toBe("Call engine.execute() no more.")
    // No backtick survives into what the reader sees.
    expect(textOf(nodes)).not.toContain("`")
  })

  it("renders a [[n]](#src-n) citation as a plain [n] marker", () => {
    const nodes = renderInline("…as discouraged [[4]](#src-4).", "t")
    expect(textOf(nodes)).toBe("…as discouraged [4].")
    expect(textOf(nodes)).not.toContain("#src-")
  })

  it("handles code spans and citations in the same line, in order", () => {
    const nodes = renderInline("Use `conn.execute()` instead [[5]](#src-5).", "t")
    expect(textOf(nodes)).toBe("Use conn.execute() instead [5].")
    expect(nodes.filter(isElement).map((n) => n.type)).toEqual(["code", "span"])
  })

  it("gives every generated element a key, so React does not warn", () => {
    const nodes = renderInline("`a` and [[1]](#src-1) and `b`", "t")
    for (const node of nodes.filter(isElement)) expect(node.key).toBeTruthy()
  })
})
