/**
 * Single source of truth for every business fact on the site.
 * Facts come from the scraped kcany.com pages (home, about, news category).
 * Items marked `confirm` are unclear in the source and flagged for the client.
 */

export const site = {
  nameKo: "뉴욕 조선족 동포회",
  nameKoShort: "뉴욕조선족동포회",
  nameEn: "The Korean-Chinese Association of New York",
  nameEnShort: "KCANY",
  nameHanja: "紐約朝鮮族同胞會",
  url: "https://www.kcany.com",
  description:
    "뉴욕 플러싱에 있는 비영리 단체. 뉴욕에 사는 조선족 동포의 권익 보호와 화합, 문화 교류, 차세대 교육을 위해 일합니다.",
  descriptionEn:
    "A nonprofit in Flushing, New York, working for the rights, unity and cultural life of Korean-Chinese (Joseonjok) New Yorkers.",
  address: {
    line1: "35-32 Union St., 2FL",
    city: "Flushing",
    state: "NY",
    zip: "11354",
    full: "35-32 Union St., 2FL, Flushing, NY 11354",
  },
  phone: { label: "(718) 550-6789", href: "tel:+17185506789" },
  cell: { label: "(347) 896-8888", href: "tel:+13478968888" },
  email: "info@kcany.com",
  // Directions link built from the verified street address (no pinned coordinates).
  mapHref:
    "https://www.google.com/maps/search/?api=1&query=35-32+Union+St+Flushing+NY+11354",
  moduja: { label: "Moduja.com", href: "https://www.moduja.com/" },
  // Source site had empty Facebook/Instagram/YouTube placeholders. Not published.
  social: [] as { label: string; href: string }[],
  novus: { label: "Made by Novus", href: "https://novusnyc.org" },
} as const
