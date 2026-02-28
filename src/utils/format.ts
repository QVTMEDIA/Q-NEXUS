import { format, formatDistanceToNow, parseISO } from 'date-fns'

// ─── Numbers ──────────────────────────────────────────────────────────────────

export function formatNumber(n: number, decimals = 0): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(n)
}

export function formatCompact(n: number): string {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(n)
}

export function formatPercent(n: number, decimals = 1): string {
  return `${n >= 0 ? '+' : ''}${n.toFixed(decimals)}%`
}

export function formatScore(n: number): string {
  return n.toFixed(1)
}

// ─── Currency ─────────────────────────────────────────────────────────────────

export function formatCurrency(
  amount: number,
  currency = 'USD',
  locale = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// ─── Dates ────────────────────────────────────────────────────────────────────

export function formatDate(date: string | Date, pattern = 'MMM d, yyyy'): string {
  const d = typeof date === 'string' ? parseISO(date) : date
  return format(d, pattern)
}

export function formatRelative(date: string | Date): string {
  const d = typeof date === 'string' ? parseISO(date) : date
  return formatDistanceToNow(d, { addSuffix: true })
}

export function formatShortDate(date: string | Date): string {
  return formatDate(date, 'MMM d')
}

// ─── Sentiment ────────────────────────────────────────────────────────────────

export function sentimentLabel(score: number): string {
  if (score >= 50) return 'Very Positive'
  if (score >= 20) return 'Positive'
  if (score >= -20) return 'Neutral'
  if (score >= -50) return 'Negative'
  return 'Very Negative'
}

export function sentimentColor(score: number): string {
  if (score >= 20) return 'text-emerald-400'
  if (score >= -20) return 'text-amber-400'
  return 'text-red-400'
}

// ─── Delta ────────────────────────────────────────────────────────────────────

export function deltaColor(delta: number): string {
  if (delta > 0) return 'text-emerald-400'
  if (delta < 0) return 'text-red-400'
  return 'text-white/40'
}

export function deltaArrow(delta: number): string {
  if (delta > 0) return '↑'
  if (delta < 0) return '↓'
  return '→'
}

// ─── Country names ────────────────────────────────────────────────────────────

const COUNTRY_NAMES: Record<string, string> = {
  NG: 'Nigeria', KE: 'Kenya', GH: 'Ghana', ZA: 'South Africa',
  EG: 'Egypt', ET: 'Ethiopia', TZ: 'Tanzania', UG: 'Uganda',
  RW: 'Rwanda', SN: 'Senegal', CI: "Côte d'Ivoire", CM: 'Cameroon',
  MA: 'Morocco', TN: 'Tunisia', DZ: 'Algeria', OTHER: 'Other',
}

export function countryName(code: string): string {
  return COUNTRY_NAMES[code] ?? code
}

export function countryFlag(code: string): string {
  // Unicode regional indicator letters
  const offset = 127397
  return [...code].map((c) => String.fromCodePoint(c.codePointAt(0)! + offset)).join('')
}
