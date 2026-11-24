"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"
import { usePathname } from "next/navigation"
import { pageMeta, type L } from "@/data/copy"
export type { L }

export type Lang = "ko" | "zh" | "en"
export const LANGS: { code: Lang; short: string; label: string; htmlLang: string }[] = [
  { code: "ko", short: "한", label: "한국어", htmlLang: "ko" },
  { code: "zh", short: "中", label: "中文", htmlLang: "zh-Hans" },
  { code: "en", short: "EN", label: "English", htmlLang: "en" },
]

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (l: L) => string }
const LangContext = createContext<Ctx>({ lang: "ko", setLang: () => {}, t: (l) => l.ko })
const KEY = "kcany-lang"

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ko")
  const pathname = usePathname()

  // Restore the visitor's choice after hydration (server markup is always Korean).
  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY) as Lang | null
      if (saved === "zh" || saved === "en" || saved === "ko") setLangState(saved)
    } catch { /* storage unavailable */ }
  }, [])

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    try { localStorage.setItem(KEY, l) } catch { /* ignore */ }
  }, [])

  // Keep <html lang>, the tab title and the description in step with the language.
  useEffect(() => {
    document.documentElement.lang = LANGS.find((x) => x.code === lang)!.htmlLang
    const key = pathname === "/" ? "/" : "/" + pathname.split("/")[1]
    const meta = pageMeta[key]
    if (!meta) return
    const apply = () => {
      if (document.title !== meta.title[lang]) document.title = meta.title[lang]
      const d = document.querySelector('meta[name="description"]')
      if (d && d.getAttribute("content") !== meta.description[lang]) d.setAttribute("content", meta.description[lang])
    }
    apply()
    // Next re-renders its own <title> after navigation; re-assert ours when that happens.
    const obs = new MutationObserver(apply)
    obs.observe(document.head, { childList: true, subtree: true, characterData: true })
    return () => obs.disconnect()
  }, [lang, pathname])

  const value = useMemo<Ctx>(() => ({ lang, setLang, t: (l) => l[lang] }), [lang, setLang])
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export const useLang = () => useContext(LangContext)
