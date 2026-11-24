import type { Metadata } from "next"
import NewsView from "@/lib/components/news-view"
import { pageMeta } from "@/data/copy"

export const metadata: Metadata = {
  title: pageMeta["/news"].title.ko,
  description: pageMeta["/news"].description.ko,
  alternates: { canonical: "/news" },
}

export default function News() { return <NewsView /> }
