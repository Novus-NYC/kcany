"use client"

import Link from "next/link"
import { homeSections, news, pillars } from "@/data/copy"
import { useLang } from "@/lib/i18n"

export default function HomeSections() {
  const { t } = useLang()
  return (
    <>
      <section className="on-hanji py-20 md:py-32" aria-labelledby="work-h">
        <div className="container-page">
          <div className="mb-14 grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
            <h2 id="work-h" className="font-display rv whitespace-pre-line text-[clamp(2.2rem,5.4vw,5rem)] font-black leading-[1.05]">{t(homeSections.workTitle)}</h2>
            <p className="rv muted max-w-xs text-sm md:text-right" style={{ ["--i" as string]: 1 }}>{t(homeSections.workKicker)}</p>
          </div>
          <ul className="rule-list">
            {pillars.map((p, i) => (
              <li key={p.title.en} className="rv group grid gap-4 py-10 md:grid-cols-[1.1fr_1fr] md:items-baseline md:gap-16" style={{ ["--i" as string]: i }}>
                <div className="flex items-baseline gap-5">
                  <span aria-hidden="true" className="font-display w-8 shrink-0 text-lg font-bold text-flag">{i + 1}</span>
                  <div>
                    <h3 className="font-display text-[clamp(1.8rem,3.6vw,3.2rem)] font-black leading-[1.1] transition-transform duration-500 group-hover:translate-x-2">{t(p.title)}</h3>
                    <p className="muted mt-1 text-sm">{t(p.en)}</p>
                  </div>
                </div>
                <p className="max-w-lg text-lg">{t(p.body)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="on-hanji border-t border-[var(--line-hanji)] py-20 md:py-28" aria-labelledby="news-h">
        <div className="container-page">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <h2 id="news-h" className="font-display rv text-[clamp(2rem,4vw,3.2rem)] font-black">{t(homeSections.newsTitle)}</h2>
            <Link href="/news" className="link-line rv font-bold">{t(homeSections.newsAll)}</Link>
          </div>
          <ul className="rule-list">
            {news.slice(0, 3).map((n, i) => (
              <li key={n.title} className="rv grid gap-2 py-7 md:grid-cols-[10rem_1fr] md:gap-10" style={{ ["--i" as string]: i }}>
                <p className="muted text-sm">{t(n.date)}</p>
                <div>
                  <h3 lang="ko" className="font-display text-xl font-bold md:text-[1.9rem] md:leading-snug">{n.title}</h3>
                  <p lang="ko" className="muted mt-2 max-w-2xl">{n.excerpt}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
