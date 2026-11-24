"use client"

import Image from "next/image"
import PageMasthead from "./page-masthead"
import CtaBand from "./cta-band"
import { about, pillars } from "@/data/copy"
import { useLang } from "@/lib/i18n"

export default function AboutView() {
  const { t } = useLang()
  return (
    <>
      <PageMasthead glyph="會" kicker={t(about.kicker)} title={t(about.title)} lead={t(about.lead)} />

      <section className="on-hanji py-20 md:py-28">
        <div className="container-page grid gap-12 md:grid-cols-[1fr_1.3fr] md:gap-20">
          <div className="md:sticky md:top-28 md:self-start">
            <div className="rv-clip w-56 md:w-72"><Image src="/brand/seal.png" alt={t(about.logoAlt)} width={320} height={298} loading="eager" className="w-full" /></div>
            <p className="muted mt-4 text-sm">{t(about.logoCaption)}</p>
          </div>
          <div className="grid gap-6 text-lg">
            {about.paragraphs.map((p, i) => (
              <p key={i} className="rv" style={{ ["--i" as string]: i }}>{t(p)}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="on-ink py-20 md:py-24" aria-labelledby="mission-h">
        <div className="container-page grid gap-10 md:grid-cols-[0.8fr_1.4fr] md:gap-20">
          <h2 id="mission-h" className="font-display rv text-[clamp(2rem,4vw,3rem)] font-black">{t(about.missionTitle)}</h2>
          <ul className="rule-list">
            {about.mission.map((m, i) => (
              <li key={m.en} className="rv font-display py-6 text-2xl font-bold md:text-3xl" style={{ ["--i" as string]: i }}>{t(m)}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="on-hanji py-20 md:py-28" aria-labelledby="do-h">
        <div className="container-page">
          <h2 id="do-h" className="font-display rv mb-10 text-[clamp(2rem,4vw,3rem)] font-black">{t(about.doTitle)}</h2>
          <ul className="rule-list">
            {pillars.map((p, i) => (
              <li key={p.title.en} className="rv grid gap-3 py-9 md:grid-cols-[14rem_1fr] md:gap-12" style={{ ["--i" as string]: i }}>
                <div>
                  <h3 className="font-display text-2xl font-black">{t(p.title)}</h3>
                  <p className="muted mt-1 text-sm">{t(p.en)}</p>
                </div>
                <p className="max-w-2xl">{t(p.body)}</p>
              </li>
            ))}
          </ul>
          <p className="rv font-display mt-14 max-w-3xl text-2xl font-bold md:text-3xl">{t(about.closing)}</p>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
