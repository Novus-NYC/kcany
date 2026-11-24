import type { ReactNode } from "react"

/** Dark opening band for inner pages: a big glyph as a graphic anchor, the title, and a lead. */
export default function PageMasthead({ glyph, kicker, title, lead }: { glyph: string; kicker: string; title: string; lead?: ReactNode }) {
  return (
    <section className="on-ink relative overflow-hidden pt-[calc(var(--nav-h)+4rem)] pb-16 md:pb-24">
      <div aria-hidden="true" className="chapter-glyph !top-auto !bottom-[-0.12em] !translate-y-0 max-md:!top-[var(--nav-h)] max-md:!bottom-auto" style={{ fontSize: "clamp(9rem, 26vw, 22rem)", display: "block" }}>{glyph}</div>
      <div className="container-page relative">
        <p className="rv mb-5 font-bold tracking-[0.08em] text-brass">{kicker}</p>
        <h1 className="font-display rv max-w-3xl text-[clamp(2.6rem,6.2vw,5.2rem)] font-black" style={{ ["--i" as string]: 1 }}>{title}</h1>
        {lead ? <p className="rv muted mt-6 max-w-xl text-lg md:text-xl" style={{ ["--i" as string]: 2 }}>{lead}</p> : null}
      </div>
    </section>
  )
}
