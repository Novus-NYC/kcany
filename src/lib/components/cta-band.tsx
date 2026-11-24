"use client"

import Link from "next/link"
import { site } from "@/data/site"
import { cta, donate } from "@/data/copy"
import { useLang } from "@/lib/i18n"

export default function CtaBand({ news = false }: { news?: boolean }) {
  const { t } = useLang()
  return (
    <section className="on-flag relative overflow-hidden">
      <p aria-hidden="true" className="font-display pointer-events-none absolute -right-[0.05em] top-1/2 -translate-y-1/2 select-none text-[clamp(10rem,30vw,26rem)] font-black leading-none text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.22)]">同胞</p>
      <div className="container-page relative grid gap-8 py-16 md:grid-cols-[1.4fr_1fr] md:items-end md:py-20">
        <div>
          <h2 className="font-display rv text-[clamp(2.1rem,4.6vw,3.8rem)] font-black">{t(news ? cta.newsTitle : cta.title)}</h2>
          <p className="rv mt-4 max-w-lg text-lg text-white/90" style={{ ["--i" as string]: 1 }}>{t(cta.body)}</p>
        </div>
        <div className="rv flex flex-wrap items-center gap-x-6 gap-y-4" style={{ ["--i" as string]: 2 }}>
          <Link href="/donate" className="btn btn-primary">{t(donate)} <span className="arrow" aria-hidden="true">→</span></Link>
          <a href={site.phone.href} className="link-line font-bold">{site.phone.label}</a>
        </div>
      </div>
    </section>
  )
}
