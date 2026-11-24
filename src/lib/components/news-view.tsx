"use client"

import PageMasthead from "./page-masthead"
import CtaBand from "./cta-band"
import { news, newsPage } from "@/data/copy"
import { site } from "@/data/site"
import { useLang } from "@/lib/i18n"

export default function NewsView() {
  const { t } = useLang()
  return (
    <>
      <PageMasthead glyph="報" kicker={t(newsPage.kicker)} title={t(newsPage.title)} lead={t(newsPage.lead)} />
      <section className="on-hanji py-16 md:py-24" aria-label={t(newsPage.aria)}>
        <div className="container-page">
          <p className="muted mb-6 text-sm">{t(newsPage.note)}</p>
          <ol className="rule-list">
            {news.map((n, i) => (
              <li key={n.title} className="rv grid gap-3 py-9 md:grid-cols-[10rem_1fr_6rem] md:gap-10" style={{ ["--i" as string]: i % 3 }}>
                <p className="muted text-sm">{t(n.date)}</p>
                <article lang="ko">
                  <h2 className="font-display text-xl font-bold md:text-[1.7rem]">{n.title}</h2>
                  <p className="muted mt-3 max-w-2xl">{n.excerpt}</p>
                </article>
                <p className="muted text-sm md:text-right">{t(n.views)} {t(newsPage.views)}</p>
              </li>
            ))}
          </ol>
          <p className="rv mt-12 max-w-xl">
            {t(newsPage.moreBefore)}
            <a href={site.moduja.href} target="_blank" rel="noreferrer" className="prose-link font-bold">Moduja.com</a>
            {t(newsPage.moreAfter)}
          </p>
        </div>
      </section>
      <CtaBand news />
    </>
  )
}
