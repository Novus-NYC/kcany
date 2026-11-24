import type { MetadataRoute } from "next"
import { site } from "@/data/site"
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/about", "/news", "/contact", "/donate"].map((p) => ({ url: `${site.url}${p}` }))
}
