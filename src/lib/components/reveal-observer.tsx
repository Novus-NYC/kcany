"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

/** Adds `.in` to any `.rv` / `.rv-clip` element as it enters the viewport. Chapter copy is handled by ScrollStory. */
export default function RevealObserver() {
  const pathname = usePathname()
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".rv, .rv-clip")).filter((el) => !el.closest(".chapter"))
    if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("in")); return }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target) } }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    )
    els.forEach((e) => io.observe(e))
    return () => io.disconnect()
  }, [pathname])
  return null
}
