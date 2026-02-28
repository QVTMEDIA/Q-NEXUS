// ─── User & Auth ─────────────────────────────────────────────────────────────

export interface User {
  id: string
  email: string
  full_name: string
  avatar_url?: string
  role: UserRole
  organization_id: string
  created_at: string
}

export type UserRole = 'owner' | 'admin' | 'analyst' | 'viewer'

// ─── Organization ────────────────────────────────────────────────────────────

export interface Organization {
  id: string
  name: string
  slug: string
  logo_url?: string
  plan: 'free' | 'starter' | 'professional' | 'enterprise'
  country: AfricanCountry
  industry: string
  created_at: string
}

export type AfricanCountry =
  | 'NG' | 'KE' | 'GH' | 'ZA' | 'EG' | 'ET' | 'TZ' | 'UG'
  | 'RW' | 'SN' | 'CI' | 'CM' | 'MA' | 'TN' | 'DZ' | 'OTHER'

// ─── Brand Intelligence ───────────────────────────────────────────────────────

export interface Brand {
  id: string
  organization_id: string
  name: string
  logo_url?: string
  category: BrandCategory
  markets: AfricanCountry[]
  is_competitor: boolean
  created_at: string
}

export type BrandCategory =
  | 'fmcg' | 'fintech' | 'telecom' | 'retail' | 'healthcare'
  | 'agriculture' | 'energy' | 'media' | 'logistics' | 'other'

export interface BrandMetrics {
  brand_id: string
  period: string
  awareness_score: number        // 0–100
  sentiment_score: number        // -100 to +100
  share_of_voice: number         // percentage
  nps_score: number              // -100 to +100
  engagement_rate: number        // percentage
  mentions_count: number
  positive_mentions: number
  negative_mentions: number
  neutral_mentions: number
}

export interface SentimentTrend {
  date: string
  positive: number
  negative: number
  neutral: number
  overall: number
}

// ─── Consumer Insights ────────────────────────────────────────────────────────

export interface ConsumerSegment {
  id: string
  name: string
  description: string
  size_estimate: number
  age_range: [number, number]
  income_level: 'low' | 'middle' | 'high'
  urban_rural: 'urban' | 'peri-urban' | 'rural'
  countries: AfricanCountry[]
  top_priorities: string[]
  preferred_channels: string[]
}

export interface ConsumerSurvey {
  id: string
  organization_id: string
  title: string
  status: 'draft' | 'active' | 'completed' | 'archived'
  target_segment?: string
  countries: AfricanCountry[]
  responses_count: number
  target_responses: number
  created_at: string
  completed_at?: string
}

// ─── Market Predictions ───────────────────────────────────────────────────────

export interface Prediction {
  id: string
  organization_id: string
  title: string
  category: PredictionCategory
  market: AfricanCountry | 'ALL'
  confidence: number             // 0–100
  predicted_value: number
  current_value: number
  delta_percentage: number
  horizon: '7d' | '30d' | '90d' | '1y'
  generated_at: string
  valid_until: string
  factors: PredictionFactor[]
}

export type PredictionCategory =
  | 'market_share' | 'consumer_demand' | 'price_sensitivity'
  | 'brand_growth' | 'competitor_threat' | 'seasonal_trend'

export interface PredictionFactor {
  name: string
  impact: 'positive' | 'negative' | 'neutral'
  weight: number                 // 0–1
  description: string
}

// ─── Real-time Tracking ───────────────────────────────────────────────────────

export interface TrackingAlert {
  id: string
  organization_id: string
  brand_id?: string
  type: AlertType
  severity: 'info' | 'warning' | 'critical'
  title: string
  description: string
  is_read: boolean
  created_at: string
}

export type AlertType =
  | 'sentiment_drop' | 'viral_mention' | 'competitor_activity'
  | 'market_shift' | 'crisis_signal' | 'opportunity_detected'

export interface RealtimeEvent {
  id: string
  type: string
  source: 'twitter' | 'facebook' | 'instagram' | 'news' | 'radio' | 'tv' | 'survey'
  content: string
  sentiment: 'positive' | 'negative' | 'neutral'
  brand_mentions: string[]
  country: AfricanCountry
  region?: string
  timestamp: string
}

// ─── Reports ─────────────────────────────────────────────────────────────────

export interface Report {
  id: string
  organization_id: string
  title: string
  type: ReportType
  status: 'generating' | 'ready' | 'failed'
  file_url?: string
  created_by: string
  created_at: string
  period_start: string
  period_end: string
}

export type ReportType =
  | 'brand_health' | 'market_overview' | 'competitor_analysis'
  | 'consumer_deep_dive' | 'trend_forecast' | 'custom'

// ─── Dashboard ────────────────────────────────────────────────────────────────

export interface DashboardStats {
  brand_awareness: MetricValue
  sentiment_index: MetricValue
  share_of_voice: MetricValue
  active_alerts: MetricValue
  survey_responses: MetricValue
  prediction_accuracy: MetricValue
}

export interface MetricValue {
  value: number
  previous: number
  delta: number
  delta_type: 'increase' | 'decrease' | 'neutral'
  unit: string
  formatted: string
}

// ─── API Responses ────────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T
  error: null
}

export interface ApiError {
  data: null
  error: {
    message: string
    code: string
    details?: unknown
  }
}

export type ApiResult<T> = ApiResponse<T> | ApiError

// ─── Pagination ───────────────────────────────────────────────────────────────

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  per_page: number
  has_more: boolean
}

export interface PaginationParams {
  page?: number
  per_page?: number
  sort_by?: string
  sort_order?: 'asc' | 'desc'
}
