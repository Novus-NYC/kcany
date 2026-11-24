"use client"

import Image from "next/image"
import Link from "next/link"
import { site } from "@/data/site"
import { donate, home, nav, org, ui } from "@/data/copy"
import { useLang } from "@/lib/i18n"
import LangToggle from "./lang-toggle"

export default function Footer() {
  const { t } = useLang()
  return (
    <footer className="on-ink border-t border-[var(--line-ink)]">
      <div className="container-page grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1.2fr]">
        <div>
          <Image src="/brand/logo-white.png" alt={`${site.nameKo} ${site.nameEn}`} width={1000} height={175} className="h-10 w-auto" />
          <p className="muted mt-6 max-w-sm">{t(ui.tagline)}</p>
        </div>

        <nav aria-label={t(ui.footNav)}>
          <p className="mb-4 font-bold text-brass">{t(ui.quick)}</p>
          <ul className="grid gap-1">
            {[{ label: home, href: "/" }, ...nav, { label: donate, href: "/donate" }].map((n) => (
              <li key={n.href}><Link href={n.href} className="link-line inline-block py-1">{t(n.label)}</Link></li>
            ))}
            <li><a href={site.moduja.href} target="_blank" rel="noreferrer" className="link-line inline-block py-1">{site.moduja.label} ↗</a></li>
          </ul>
        </nav>

        <address className="not-italic">
          <p className="mb-4 font-bold text-brass">{t(ui.office)}</p>
          <p className="muted">
            <a href={site.mapHref} target="_blank" rel="noreferrer" className="prose-link">{site.address.line1}<br />{site.address.city}, {site.address.state} {site.address.zip}</a>
          </p>
          <p className="mt-4 grid gap-1">
            <a href={site.phone.href} className="prose-link w-fit py-1">TEL {site.phone.label}</a>
            <a href={site.cell.href} className="prose-link w-fit py-1">CELL {site.cell.label}</a>
            <a href={`mailto:${site.email}`} className="prose-link w-fit py-1">{site.email}</a>
          </p>
        </address>
      </div>

      <div className="border-t border-[var(--line-ink)]">
        <div className="container-page flex flex-col gap-4 py-6 text-sm text-mute sm:flex-row sm:items-center sm:justify-between">
          <p>{site.nameEn} © {new Date().getFullYear()}</p>
          <LangToggle />
          <a href={site.novus.href} target="_blank" rel="noreferrer" className="prose-link w-fit py-1 text-hanji">{site.novus.label}</a>
        </div>
      </div>
    </footer>
  )
}
