import type { Metadata } from "next"
import AboutView from "@/lib/components/about-view"
import { pageMeta } from "@/data/copy"

export const metadata: Metadata = {
  title: pageMeta["/about"].title.ko,
  description: pageMeta["/about"].description.ko,
  alternates: { canonical: "/about" },
}

export default function About() { return <AboutView /> }
