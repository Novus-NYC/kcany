"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { site } from "@/data/site"
import { donate, home, nav, org, ui } from "@/data/copy"
import { useLang } from "@/lib/i18n"
import LangToggle from "./lang-toggle"

export default function Navbar() {
  const pathname = usePathname()
  const { t } = useLang()
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24 && !document.documentElement.dataset.hdr)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("hdr", onScroll)
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("hdr", onScroll) }
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    if (open) closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (!open) return
      if (e.key === "Escape") { setOpen(false); toggleRef.current?.focus() }
      if (e.key === "Tab" && panelRef.current) {
        const f = panelRef.current.querySelectorAll<HTMLElement>("a,button")
        const first = f[0], last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    document.addEventListener("keydown", onKey)
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = "" }
  }, [open])

  const isCurrent = (href: string) => pathname === href || pathname.startsWith(href + "/")
  const menu = [{ label: home, sub: { ko: "Home", zh: "Home", en: "홈" }, href: "/" }, ...nav, { label: donate, sub: { ko: "Donate", zh: "Donate", en: "후원" }, href: "/donate" }]

  return (
    <>
      <header className="site-header" data-solid={solid || pathname !== "/"}>
        <div className="container-page flex h-full items-center justify-between gap-6">
          <Link href="/" aria-label={`${t(org.name)}, ${t(ui.homeLabel)}`} className="block shrink-0">
            <Image src="/brand/logo-white.png" alt="" width={1000} height={175} priority className="logo-light h-8 w-auto md:h-9" />
            <Image src="/brand/logo.png" alt="" width={1000} height={175} priority className="logo-dark h-8 w-auto md:h-9" />
          </Link>

          <nav aria-label={t(ui.mainNav)} className="hidden items-center gap-8 md:flex">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className="nav-link" aria-current={isCurrent(n.href) ? "page" : undefined}>
                {t(n.label)}
              </Link>
            ))}
            <LangToggle />
            <Link href="/donate" className="btn btn-primary !min-h-0 !py-2 !px-4 !text-[0.95rem]" aria-current={isCurrent("/donate") ? "page" : undefined}>
              {t(donate)}
            </Link>
          </nav>

          <div className="flex items-center gap-3 md:hidden">
            <LangToggle />
            <button
              ref={toggleRef}
              type="button"
              className="flex h-11 items-center gap-2 px-1 font-bold"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(true)}
            >
              <span aria-hidden="true" className="grid gap-[5px]"><i className="block h-[2px] w-6 bg-current" /><i className="block h-[2px] w-6 bg-current" /></span>
              <span className="sr-only">{t(ui.menu)}</span>
            </button>
          </div>
        </div>
      </header>

      <div id="mobile-menu" ref={panelRef} className="menu-panel md:hidden" data-open={open} role="dialog" aria-modal="true" aria-label={t(ui.menu)} inert={!open}>
        <div className="flex items-center justify-between">
          <Image src="/brand/logo-white.png" alt="" width={1000} height={175} className="h-8 w-auto" />
          <button ref={closeRef} type="button" className="flex h-11 items-center gap-2 px-1 font-bold" onClick={() => { setOpen(false); toggleRef.current?.focus() }}>
            {t(ui.close)} <span aria-hidden="true" className="text-2xl leading-none">×</span>
          </button>
        </div>
        <ul className="mt-10 grid">
          {menu.map((n) => (
            <li key={n.href} className="border-t border-[var(--line-ink)] last:border-b">
              <Link href={n.href} className="font-display flex items-baseline justify-between py-5 text-[1.9rem] font-black no-underline" aria-current={isCurrent(n.href) || (n.href === "/" && pathname === "/") ? "page" : undefined}>
                {t(n.label)}
                <span className="text-sm font-medium text-mute">{t(n.sub)}</span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-auto text-mute">
          {site.address.full}<br />
          <a href={site.phone.href} className="prose-link text-hanji">{site.phone.label}</a>
        </p>
      </div>
    </>
  )
}
