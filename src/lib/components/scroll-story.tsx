"use client"

import { Fragment, useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { site } from "@/data/site"
import { chapters, donate, heroLink, org, ui, visuals } from "@/data/copy"
import { useLang, type L } from "@/lib/i18n"

const THEMES = ["paper", "ink", "paper", "ink", "red"] as const

/** "[word]" marks the serif accent word inside a sans headline. */
function Title({ text }: { text: string }) {
  const lines = text.split("\n")
  return (
    <>
      {lines.map((line, li) => (
        <Fragment key={li}>
          {line.split(/(\[[^\]]+\])/).filter(Boolean).map((part, i) =>
            part.startsWith("[") ? <em key={i} className="t-em">{part.slice(1, -1)}</em> : <Fragment key={i}>{part}</Fragment>,
          )}
          {li < lines.length - 1 && <br />}
        </Fragment>
      ))}
    </>
  )
}

function Marquee({ text, reverse, outline }: { text: string; reverse?: boolean; outline?: boolean }) {
  const row = Array.from({ length: 4 }, () => text).join("   ")
  return (
    <div className={`marquee ${reverse ? "marquee-rev" : ""} ${outline ? "marquee-outline" : ""}`} aria-hidden="true">
      <span>{row}&nbsp;</span>
      <span>{row}&nbsp;</span>
    </div>
  )
}

function Visual({ i, t }: { i: number; t: (l: L) => string }) {
  if (i === 1)
    return (
      <div className="vis vis-words" aria-hidden="true">
        <span className="vw vw-a">{t(visuals.words[0])}</span>
        <span className="vw vw-b">{t(visuals.words[1])}</span>
      </div>
    )
  if (i === 2)
    return (
      <div className="vis vis-marquee" aria-hidden="true">
        <Marquee text={t(visuals.marquee1)} />
        <Marquee text={t(visuals.marquee2)} reverse outline />
      </div>
    )
  if (i === 3)
    return (
      <div className="vis vis-shot">
        <Image
          src="/media/moduja.webp"
          alt={t(visuals.modujaAlt)}
          width={1200}
          height={745}
          sizes="(min-width: 768px) 48vw, 90vw"
          className="vis-shot-img"
        />
      </div>
    )
  if (i === 4)
    return (
      <div className="vis vis-root" aria-hidden="true">
        <span>{t(visuals.root)}</span>
      </div>
    )
  return null
}

export default function ScrollStory() {
  const { t } = useLang()
  const trackRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const panelRefs = useRef<(HTMLElement | null)[]>([])
  const [current, setCurrent] = useState(0)
  const [scene, setScene] = useState(false)

  useEffect(() => {
    const panels = panelRefs.current.filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const el = e.target as HTMLElement
          el.dataset.active = e.isIntersecting ? "true" : "false"
          if (e.isIntersecting) setCurrent(Number(el.dataset.index))
        })
      },
      { threshold: 0.5 },
    )
    panels.forEach((p) => io.observe(p))
    if (panels[0]) panels[0].dataset.active = "true"
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const track = trackRef.current
    const canvas = canvasRef.current
    if (!track || !canvas) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let destroyed = false
    let handle: { destroy: () => void } | null = null
    ;(async () => {
      try {
        const { createScene } = await import("@/lib/scene/scene")
        const displayFont = getComputedStyle(document.documentElement).getPropertyValue("--font-display").trim() || "serif"
        const h = await createScene({
          canvas, track, displayFont,
          onProgress: (c) => track.style.setProperty("--cur", c.toFixed(3)),
        })
        if (destroyed) { h.destroy(); return }
        handle = h
        document.documentElement.classList.add("scene-on")
        setScene(true)
      } catch {
        document.documentElement.classList.remove("scene-on")
      }
    })()
    return () => {
      destroyed = true
      handle?.destroy()
      document.documentElement.classList.remove("scene-on")
      delete document.documentElement.dataset.hdr
      window.dispatchEvent(new Event("hdr"))
    }
  }, [])

  // The header follows the surface under it while the story is on screen.
  useEffect(() => {
    const track = trackRef.current
    if (!track || !scene) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) document.documentElement.dataset.hdr = THEMES[current]
        else delete document.documentElement.dataset.hdr
        window.dispatchEvent(new Event("hdr"))
      },
      { rootMargin: "-70px 0px 0px 0px" },
    )
    io.observe(track)
    if (document.documentElement.dataset.hdr) document.documentElement.dataset.hdr = THEMES[current]
    window.dispatchEvent(new Event("hdr"))
    return () => io.disconnect()
  }, [current, scene])

  const goTo = (i: number) => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    panelRefs.current[i]?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" })
  }

  return (
    <section ref={trackRef} className="story" aria-label={t(ui.story)} data-theme={THEMES[current]}>
      <div className="story-layer" aria-hidden="true">
        <div className="story-stage"><canvas ref={canvasRef} className="story-canvas" /></div>
      </div>

      <div className="story-layer story-layer-hud">
        <div className="story-stage story-hud">
          <nav className="chapter-rail" aria-label={t(ui.chapterNav)}>
            <span className="rail-count" aria-hidden="true">{current + 1} / {chapters.length}</span>
            {chapters.map((c, i) => (
              <button key={c.id} type="button" className="rail-tick" aria-label={`${i + 1}: ${t(c.tag)}`} aria-current={current === i} onClick={() => goTo(i)}>
                <span />
              </button>
            ))}
          </nav>
        </div>
      </div>

      {chapters.map((c, i) => {
        const Heading = i === 0 ? "h1" : "h2"
        return (
          <article
            key={c.id}
            id={c.id}
            ref={(el) => { panelRefs.current[i] = el }}
            data-index={i}
            data-active={i === 0 ? "true" : "false"}
            data-theme={THEMES[i]}
            className={i === 0 ? "chapter hero" : "chapter"}
          >
            <div className="chapter-glyph" aria-hidden="true">{c.glyph}</div>
            <Visual i={i} t={t} />
            {i === 0 && (
              <>
                <p className="hero-hanja" aria-hidden="true">{site.nameHanja}</p>
                <p className="hero-meta rv" style={{ ["--i" as string]: 5 }}>{t(org.place)}<br />{site.address.line1}</p>
              </>
            )}
            <div className="container-page chapter-inner">
              <div className="chapter-copy">
                <p className="chapter-tag rv" style={{ ["--i" as string]: 0 }}>{t(c.tag)}</p>
                {i === 0 && (
                  <p className="hero-name rv" style={{ ["--i" as string]: 1 }}>
                    {t(org.name)}<small>{t(org.nameSub)}</small>
                  </p>
                )}
                <Heading className="chapter-title rv" style={{ ["--i" as string]: 2 }}><Title text={t(c.title)} /></Heading>
                <p className="chapter-body rv" style={{ ["--i" as string]: 3 }}>{t(c.body)}</p>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 rv" style={{ ["--i" as string]: 4 }}>
                  {i === 0 ? (
                    <>
                      <Link href="/donate" className="btn btn-primary">{t(donate)} <span className="arrow" aria-hidden="true">→</span></Link>
                      <Link href="/about" className="link-line font-bold">{t(heroLink)}</Link>
                    </>
                  ) : c.cta ? (
                    c.cta.href.startsWith("http") ? (
                      <a href={c.cta.href} target="_blank" rel="noreferrer" className="btn btn-ghost">{t(c.cta.label)} <span className="arrow" aria-hidden="true">↗</span></a>
                    ) : (
                      <Link href={c.cta.href} className={i === chapters.length - 1 ? "btn btn-primary" : "btn btn-ghost"}>{t(c.cta.label)} <span className="arrow" aria-hidden="true">→</span></Link>
                    )
                  ) : null}
                </div>
              </div>
            </div>
          </article>
        )
      })}
    </section>
  )
}
