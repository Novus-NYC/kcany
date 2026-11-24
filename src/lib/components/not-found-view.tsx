"use client"

import Link from "next/link"
import PageMasthead from "./page-masthead"
import { notFound, ui } from "@/data/copy"
import { useLang } from "@/lib/i18n"

export default function NotFoundView() {
  const { t } = useLang()
  return (
    <>
      <PageMasthead glyph="404" kicker="404" title={t(notFound.title)} lead={t(notFound.lead)} />
      <section className="on-hanji py-16">
        <div className="container-page flex flex-wrap gap-4">
          <Link href="/" className="btn btn-primary">{t(notFound.home)} <span className="arrow" aria-hidden="true">→</span></Link>
          <Link href="/about" className="btn btn-ghost">{t(ui.about)}</Link>
        </div>
      </section>
    </>
  )
}
