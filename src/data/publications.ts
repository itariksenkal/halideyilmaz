// Academic publications shown on the homepage. Set to `null` on sites without publications.
// Metrics are copied by hand from Google Scholar; update `asOf` when you refresh them.
import type { Lang } from '@/i18n'

type L<T> = Record<Lang, T>

export interface Publication {
  title: string
  authors: string[]
  /** Index into `authors` of the site owner, rendered in bold */
  me: number
  venue: string
  details: string
  year: number
  doi: string
  citations: number
  summary: L<string>
  tags: L<string[]>
}

export interface Publications {
  scholarUrl: string
  asOf: L<string>
  metrics: { citations: number; hIndex: number; i10: number }
  items: Publication[]
}

export const publications: Publications | null = null
