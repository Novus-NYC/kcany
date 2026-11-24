"use client"

import { useState } from "react"
import { site } from "@/data/site"
import { contact } from "@/data/copy"
import { useLang } from "@/lib/i18n"

type Errors = Partial<Record<"name" | "reach" | "message", string>>

/** Opens the visitor's mail app with the message prefilled. No server, no data stored. */
export default function ContactForm() {
  const { t } = useLang()
  const [errors, setErrors] = useState<Errors>({})
  const [sent, setSent] = useState(false)
  const fill = (s: string) => s.replace("{email}", site.email)

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const name = String(f.get("name") || "").trim()
    const reach = String(f.get("reach") || "").trim()
    const message = String(f.get("message") || "").trim()
    const next: Errors = {}
    if (!name) next.name = t(contact.errName)
    if (!reach) next.reach = t(contact.errReach)
    if (message.length < 5) next.message = t(contact.errMessage)
    setErrors(next)
    if (Object.keys(next).length) {
      const first = Object.keys(next)[0]
      ;(e.currentTarget.elements.namedItem(first) as HTMLElement | null)?.focus()
      return
    }
    const subject = encodeURIComponent(`${t(contact.subject)} ${name}`)
    const body = encodeURIComponent(`${message}\n\n${t(contact.bodyName)}: ${name}\n${t(contact.bodyReach)}: ${reach}`)
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`
    setSent(true)
  }

  const err = (k: keyof Errors) => (errors[k] ? `${k}-err` : undefined)
  const Req = () => (<><span className="text-flag" aria-hidden="true"> *</span><span className="sr-only"> {t(contact.required)}</span></>)

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-7">
      <div>
        <label htmlFor="name" className="font-bold">{t(contact.name)}<Req /></label>
        <input id="name" name="name" autoComplete="name" required className="field" aria-invalid={!!errors.name} aria-describedby={err("name")} />
        {errors.name && <p id="name-err" role="alert" className="mt-1 text-sm font-bold text-flag">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="reach" className="font-bold">{t(contact.reach)}<Req /></label>
        <input id="reach" name="reach" autoComplete="email" required className="field" aria-invalid={!!errors.reach} aria-describedby={err("reach")} />
        {errors.reach && <p id="reach-err" role="alert" className="mt-1 text-sm font-bold text-flag">{errors.reach}</p>}
      </div>
      <div>
        <label htmlFor="message" className="font-bold">{t(contact.message)}<Req /></label>
        <textarea id="message" name="message" rows={5} required className="field resize-y" aria-invalid={!!errors.message} aria-describedby={err("message")} />
        {errors.message && <p id="message-err" role="alert" className="mt-1 text-sm font-bold text-flag">{errors.message}</p>}
      </div>
      <div>
        <button type="submit" className="btn btn-primary">{t(contact.send)} <span className="arrow" aria-hidden="true">→</span></button>
        <p className="muted mt-4 text-sm" aria-live="polite">{fill(t(sent ? contact.sent : contact.helper))}</p>
      </div>
    </form>
  )
}
