import type { CaseStudy } from "./types"

export const sqlalchemyUpgradeAgent: CaseStudy = {
  slug: "sqlalchemy-upgrade-agent",
  title: "SQLAlchemy Upgrade Agent",
  summary:
    "A deployed question-answering service over SQLAlchemy 1.4 → 2.0 migration documentation that cites a source page for every claim, and declines when the retrieved pages do not answer.",
  stack: ["Python", "FastAPI", "Qdrant", "BGE-M3", "GitHub Actions", "Modal"],
  period: "Jun 2026 – Sep 2026",
  links: [
    { label: "Live service", href: "https://virajvaghasia--sqlalchemy-upgrade-agent.modal.run" },
    { label: "Source", href: "https://github.com/virajvaghasia/sqlalchemy-upgrade-agent" },
  ],
  headline: {
    claim: "Correct page in the top 5",
    value: "0.49 → 0.64",
    basis: "recall@5, 100-question hand-verified set, ±0.097",
    method:
      "recall@5 over a 100-question hand-verified set, read as paired per-question wins rather than an averaged score, because the confidence band (±0.097) is wider than most of the gains being claimed.",
  },
  problem: [
    "Upgrading a codebase from SQLAlchemy 1.4 to 2.0 means answering hundreds of small, specific questions, and a general-purpose model answers them from a blurred memory of both versions at once.",
    "A wrong migration instruction is worse than no instruction, because someone runs it against a real database. So the useful system is not the one that always answers — it is the one that answers from the documentation and says so when it cannot.",
  ],
  mechanism: [
    {
      step: "Chunk and embed the documentation",
      detail:
        "3,284 passages from the SQLAlchemy 1.4 and 2.0 docs, embedded with BGE-M3. The Qdrant collection name contains the model and the first eight characters of its revision, because vectors from two revisions are not comparable — putting the revision in the name makes a silently mixed collection inexpressible rather than merely discouraged.",
    },
    {
      step: "Collapse cross-version twins",
      detail:
        "874 of the 3,284 chunks are one half of a pair sharing the same heading path and text, and those pairs embed to byte-identical vectors — so search returned both into adjacent slots, spending a prompt seat on a duplicate. Retrieval over-fetches, keeps one copy per key, and prefers the 2.0 half because the product answers upgrade questions.",
    },
    {
      step: "Fuse dense search with BM25",
      detail:
        "Reciprocal Rank Fusion over ranks rather than scores, because cosine similarity sits around 0.3–0.7 while BM25 is unbounded — adding them would let whichever channel shouts louder own the list. Dense gets the stronger vote (k=25 against 90): BM25 is the rescue channel for a developer who types an error message, not a co-equal.",
    },
    {
      step: "Promote one seat with a cross-encoder",
      detail:
        "A full cross-encoder reorder of the top 20 raised recall but broke ten items the hybrid list already had. What ships instead swaps only seat 5 with the best-scoring candidate from ranks 6–10, and only when the score gap clears 0.8.",
    },
    {
      step: "Answer, cite, or decline",
      detail:
        "Five pages go into the prompt at temperature 0. The prompt requires a citation per claim and permits a refusal only when no source is about the subject at all — and requires the refusal to name what was looked for, which forces a check instead of a pattern match.",
    },
  ],
  evidence: [
    {
      claim: "Correct page in the top 5",
      value: "0.49 → 0.64",
      method:
        "recall@5 on 100 hand-verified questions, paired per-question. Three levers measured separately: twin collapse 0.495→0.516, hybrid BM25 0.52→0.63, cross-encoder seat-5 promotion 0.63→0.64.",
      asOf: "2026-09-17",
    },
    {
      claim: "Claims that survive execution against the real library",
      value: "47 of 51",
      method:
        "Every checkable claim in an answer was turned into code and executed against SQLAlchemy 2.0.51, rather than asking a model to grade itself. This figure is from the hosted-model run; the shipped local system is the qwen one.",
    },
    {
      claim: "Evaluation questions, hand-verified",
      value: "100",
      method:
        "Half harvested from real Stack Overflow and GitHub questions rather than written here. Candidate answer chunks were proposed with BM25 — a channel the graded system does not use — so the benchmark is not graded against itself.",
    },
    {
      claim: "Pull requests blocked by the quality gate",
      value: "1",
      method:
        "A GitHub Actions job re-scores the 100 questions on every retrieval-touching PR. A PR removing the reranker was blocked, naming the question it broke (g017).",
    },
    {
      claim: "Tests",
      value: "534",
      method: "`uv run pytest` in the project root.",
    },
  ],
  rejected: [
    {
      change: "Strip Sphinx markup before chunking",
      outcome:
        "Recall fell from 0.64 to 0.58. Reverted, and the index restored.",
    },
    {
      change: "Re-chunk on document boundaries",
      outcome:
        "Cancelled before it was built. The theory was that missed pages had badly split text; the control said otherwise — the pages retrieval did find carried broken chunks at the same ~2% rate. The defect the fix assumed did not exist.",
    },
    {
      change: "Reorder the whole top-20 with the cross-encoder",
      outcome:
        "Raised recall and broke ten items the hybrid list already had. Seat-5 promotion ships instead: one item fixed, none broken.",
    },
  ],
  transcript: {
    question: "Why can I no longer call engine.execute()?",
    answer:
      "In SQLAlchemy 2.0, `engine.execute()` is no longer supported because it was part of the \"connectionless\" and \"implicit\" execution patterns that have been removed [[1]](#src-1). The documentation explicitly lists `result = engine.execute(t.select())` as no longer supported [[1]](#src-1).\n\nThe reasons for this removal are detailed in the migration guide [[2]](#src-2):\n\n- It led to inefficient, non-transactional applications, as the feature was overused and confused new users about the difference between `engine.execute()` and `connection.execute()`.\n- It relied on the \"application level autocommit\" feature, which was also removed as it was considered inefficient and misleading.\n- It did not properly manage connection resources: `Engine.execute` returned a result object with unconsumed cursor results, which kept the DBAPI connection in an open transaction until the result set was fully consumed, meaning the engine did not actually close out the connection resources it claimed to manage.\n\nThe correct way to execute statements in 2.0 is via the `Connection.execute()` method (or `Session.execute()` when using the ORM) [[5]](#src-5). For example:\n\n```python\nwith engine.connect() as conn:\n    result = conn.execute(stmt)\n```\n\nNote that source [[4]](#src-4) is from the 1.4 documentation and describes these patterns as discouraged but still present in 1.x; it does not cover the 2.0 removal itself.",
    // All five passages the service returned, in its order and with its own
    // numbering, because the answer's [n] markers point at these numbers. The
    // third passage was retrieved and put in the prompt but never drawn on; it
    // is shown as uncited rather than dropped, since dropping it once shifted
    // [4] and [5] onto the wrong files.
    sources: [
      {
        n: 1,
        version: "2.0.51",
        path: "doc/build/changelog/migration_20.rst",
        heading:
          'SQLAlchemy 2.0 - Major Migration Guide > 2.0 Migration - Core Connection / Transaction > "Implicit" and "Connectionless" execution, "bound metadata" removed',
        cited: true,
      },
      {
        n: 2,
        version: "2.0.51",
        path: "doc/build/changelog/migration_20.rst",
        heading:
          'SQLAlchemy 2.0 - Major Migration Guide > 2.0 Migration - Core Connection / Transaction > "Implicit" and "Connectionless" execution, "bound metadata" removed',
        cited: true,
      },
      {
        n: 3,
        version: "2.0.51",
        path: "doc/build/changelog/migration_20.rst",
        heading:
          "SQLAlchemy 2.0 - Major Migration Guide > 2.0 Migration - Core Connection / Transaction > execute() method more strict, execution options are more prominent",
        cited: false,
      },
      {
        n: 4,
        version: "1.4.52",
        path: "doc/build/core/connections.rst",
        heading: "Working with Engines and Connections > Connectionless Execution, Implicit Execution",
        cited: true,
      },
      {
        n: 5,
        version: "2.0.51",
        path: "doc/build/errors.rst",
        heading:
          "Error Messages > Legacy Exceptions > This Compiled object is not bound to any Engine or Connection",
        cited: true,
      },
    ],
    notice:
      "This answer was written by deepseek-ai/deepseek-v4-flash-0731, which is not the system the measured figures on this page describe. It was put in place on 2026-09-16, when the previous page model stopped being callable on this API key, and it has never been scored on this project's question set. The measured system of record is the local qwen2.5-coder:7b. Retrieval and the prompt are unchanged, so the five sources listed below are the same ones every measurement used.",
  },
  limits: [
    "End to end it delivers 0.42–0.43 depending on the machine, not 0.64 — a range rather than a number because generation did not reproduce across the two machines it was measured on (0.43 on the Mac, 0.42 in the lab) while retrieval reproduced exactly. Either figure is well below 0.64, which is retrieval's ceiling — the page reaching the prompt — so roughly twenty points are lost in generation, not search.",
    "It fabricates. On nine deliberately unanswerable questions it refused seven and invented answers for two. One produced an Alembic script calling op.create_view and op.drop_view, neither of which exists in that version, sitting next to two calls that do.",
    "An earlier measurement on three unanswerable questions showed zero fabrications. That was the sample size, not the system — three items were never enough to measure a fabrication rate.",
    "It answers only from indexed SQLAlchemy documentation. It is not a general Python assistant and does not read your codebase.",
  ],
}
