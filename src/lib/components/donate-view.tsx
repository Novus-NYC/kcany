"use client"

import PageMasthead from "./page-masthead"
import { donatePage } from "@/data/copy"
import { site } from "@/data/site"
import { useLang } from "@/lib/i18n"

export default function DonateView() {
  const { t } = useLang()
  return (
    <>
      <PageMasthead glyph="願" kicker={t(donatePage.kicker)} title={t(donatePage.title)} lead={t(donatePage.lead)} />
      <section className="on-hanji py-16 md:py-24">
        <div className="container-page grid gap-16 md:grid-cols-[1.2fr_1fr] md:gap-24">
          <div>
            <h2 className="font-display rv text-3xl font-black md:text-4xl">{t(donatePage.usesTitle)}</h2>
            <ul className="rule-list mt-8">
              {donatePage.uses.map((u, i) => (
                <li key={u.t.en} className="rv grid gap-2 py-7 sm:grid-cols-[10rem_1fr] sm:gap-8" style={{ ["--i" as string]: i }}>
                  <h3 className="font-display text-xl font-black">{t(u.t)}</h3>
                  <p>{t(u.d)}</p>
                </li>
              ))}
            </ul>
          </div>
          <aside className="on-ink rv self-start p-8 md:p-10" style={{ ["--i" as string]: 1 }} aria-labelledby="how-h">
            <h2 id="how-h" className="font-display text-2xl font-black">{t(donatePage.howTitle)}</h2>
            <p className="muted mt-4">{t(donatePage.how)}</p>
            <div className="mt-8 grid gap-3">
              <a href={site.phone.href} className="btn btn-primary">{t(donatePage.call)} {site.phone.label}</a>
              <a href={`mailto:${site.email}?subject=${encodeURIComponent(t(donatePage.mailSubject))}`} className="btn btn-ghost">{t(donatePage.mail)}</a>
            </div>
            <p className="muted mt-6 text-sm">{site.address.full}</p>
          </aside>
        </div>
      </section>
    </>
  )
}
