"use client"

import { LANGS, useLang } from "@/lib/i18n"
import { ui } from "@/data/copy"

/** Three-way language switch: 한국어 / 中文 / English. */
export default function LangToggle({ className = "" }: { className?: string }) {
  const { lang, setLang, t } = useLang()
  return (
    <div role="group" aria-label={t(ui.language)} className={`lang-toggle ${className}`}>
      {LANGS.map((l) => (
        <button
          key={l.code}
          type="button"
          lang={l.htmlLang}
          aria-label={l.label}
          aria-pressed={lang === l.code}
          onClick={() => setLang(l.code)}
        >
          {l.short}
        </button>
      ))}
    </div>
  )
}
