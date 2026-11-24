import type { Metadata } from "next"
import ContactView from "@/lib/components/contact-view"
import { pageMeta } from "@/data/copy"

export const metadata: Metadata = {
  title: pageMeta["/contact"].title.ko,
  description: pageMeta["/contact"].description.ko,
  alternates: { canonical: "/contact" },
}

export default function Contact() { return <ContactView /> }
