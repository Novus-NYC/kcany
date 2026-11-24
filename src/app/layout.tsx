import "./globals.css"
import type { Metadata, Viewport } from "next"
import { Noto_Sans_KR, Noto_Serif_KR, Noto_Sans_SC, Noto_Serif_SC } from "next/font/google"
import Navbar from "@/lib/components/navbar"
import Footer from "@/lib/components/footer"
import RevealObserver from "@/lib/components/reveal-observer"
import SkipLink from "@/lib/components/skip-link"
import { LangProvider } from "@/lib/i18n"
import { site } from "@/data/site"

const display = Noto_Serif_KR({ weight: ["700", "900"], variable: "--font-display", display: "swap", preload: false })
const text = Noto_Sans_KR({ weight: ["400", "500", "700"], variable: "--font-text", display: "swap", preload: false })
// Simplified Chinese faces: swapped in for html:lang(zh) so hanzi use the right glyph forms.
const displaySC = Noto_Serif_SC({ weight: ["700", "900"], variable: "--font-display-sc", display: "swap", preload: false })
const textSC = Noto_Sans_SC({ weight: ["400", "500", "700"], variable: "--font-text-sc", display: "swap", preload: false })

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: `${site.nameKo} | ${site.nameEn}`,
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.nameEn,
    locale: "ko_KR",
    title: `${site.nameKo} | ${site.nameEn}`,
    description: site.description,
    images: [{ url: "/brand/og.png", width: 1200, height: 630, alt: site.nameEn }],
  },
  alternates: { canonical: "/" },
}

export const viewport: Viewport = { themeColor: "#0b1220", width: "device-width", initialScale: 1 }

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: site.nameEn,
  alternateName: [site.nameKo, site.nameHanja],
  url: site.url,
  email: site.email,
  telephone: "+1-718-550-6789",
  address: {
    "@type": "PostalAddress",
    streetAddress: "35-32 Union St., 2FL",
    addressLocality: "Flushing",
    addressRegion: "NY",
    postalCode: "11354",
    addressCountry: "US",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${display.variable} ${text.variable} ${displaySC.variable} ${textSC.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="flex min-h-screen flex-col">
        <LangProvider>
          <SkipLink />
          <Navbar />
          <main id="main" className="flex-1">{children}</main>
          <Footer />
          <RevealObserver />
        </LangProvider>
      </body>
    </html>
  )
}
