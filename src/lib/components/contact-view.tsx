"use client"

import PageMasthead from "./page-masthead"
import ContactForm from "./contact-form"
import { contact } from "@/data/copy"
import { site } from "@/data/site"
import { useLang } from "@/lib/i18n"

export default function ContactView() {
  const { t } = useLang()
  const row = "grid gap-1 border-t border-[var(--line-hanji)] py-5 sm:grid-cols-[6rem_1fr]"
  return (
    <>
      <PageMasthead glyph="話" kicker={t(contact.kicker)} title={t(contact.title)} lead={t(contact.lead)} />
      <section className="on-hanji py-16 md:py-24">
        <div className="container-page grid gap-16 md:grid-cols-[1fr_1.1fr] md:gap-24">
          <div className="rv">
            <h2 className="font-display mb-8 text-3xl font-black">{t(contact.office)}</h2>
            <dl className="grid">
              <div className={row}>
                <dt className="muted font-bold">{t(contact.address)}</dt>
                <dd>
                  {site.address.line1}<br />{site.address.city}, {site.address.state} {site.address.zip}<br />
                  <a href={site.mapHref} target="_blank" rel="noreferrer" className="prose-link mt-2 inline-block font-bold">{t(contact.directions)}</a>
                </dd>
              </div>
              <div className={row}>
                <dt className="muted font-bold">{t(contact.phone)}</dt>
                <dd><a href={site.phone.href} className="prose-link text-xl font-bold">{site.phone.label}</a></dd>
              </div>
              <div className={row}>
                <dt className="muted font-bold">{t(contact.mobile)}</dt>
                <dd><a href={site.cell.href} className="prose-link text-xl font-bold">{site.cell.label}</a></dd>
              </div>
              <div className={`${row} border-b`}>
                <dt className="muted font-bold">{t(contact.email)}</dt>
                <dd><a href={`mailto:${site.email}`} className="prose-link text-xl font-bold">{site.email}</a></dd>
              </div>
            </dl>
          </div>
          <div className="rv" style={{ ["--i" as string]: 1 }}>
            <h2 className="font-display mb-8 text-3xl font-black">{t(contact.formTitle)}</h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  )
}
