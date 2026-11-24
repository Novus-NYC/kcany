import type { Metadata } from "next"
import DonateView from "@/lib/components/donate-view"
import { pageMeta } from "@/data/copy"

export const metadata: Metadata = {
  title: pageMeta["/donate"].title.ko,
  description: pageMeta["/donate"].description.ko,
  alternates: { canonical: "/donate" },
}

export default function Donate() { return <DonateView /> }
