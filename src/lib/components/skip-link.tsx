"use client"

import { ui } from "@/data/copy"
import { useLang } from "@/lib/i18n"

export default function SkipLink() {
  const { t } = useLang()
  return <a href="#main" className="skip-link">{t(ui.skip)}</a>
}
