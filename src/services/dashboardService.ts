import { supabase } from '@lib/supabase'
import type { DashboardStats } from '@types/index'

// Mock stats builder — replace with real DB aggregation queries once schema is seeded
function buildStats(raw: {
  awareness: number
  sentiment: number
  sov: number
  alerts: number
  responses: number
  accuracy: number
}): DashboardStats {
  const delta = (current: number, previous: number) => {
    const d = current - previous
    return {
      delta: d,
      delta_type: (d > 0 ? 'increase' : d < 0 ? 'decrease' : 'neutral') as
        'increase' | 'decrease' | 'neutral',
    }
  }

  return {
    brand_awareness: {
      value: raw.awareness,
      previous: raw.awareness - 3.2,
      ...delta(raw.awareness, raw.awareness - 3.2),
      unit: '%',
      formatted: `${raw.awareness.toFixed(1)}%`,
    },
    sentiment_index: {
      value: raw.sentiment,
      previous: raw.sentiment - 5,
      ...delta(raw.sentiment, raw.sentiment - 5),
      unit: 'pts',
      formatted: raw.sentiment.toFixed(0),
    },
    share_of_voice: {
      value: raw.sov,
      previous: raw.sov - 1.5,
      ...delta(raw.sov, raw.sov - 1.5),
      unit: '%',
      formatted: `${raw.sov.toFixed(1)}%`,
    },
    active_alerts: {
      value: raw.alerts,
      previous: raw.alerts + 2,
      ...delta(raw.alerts, raw.alerts + 2),
      unit: '',
      formatted: String(raw.alerts),
    },
    survey_responses: {
      value: raw.responses,
      previous: raw.responses - 120,
      ...delta(raw.responses, raw.responses - 120),
      unit: '',
      formatted: raw.responses.toLocaleString(),
    },
    prediction_accuracy: {
      value: raw.accuracy,
      previous: raw.accuracy - 0.8,
      ...delta(raw.accuracy, raw.accuracy - 0.8),
      unit: '%',
      formatted: `${raw.accuracy.toFixed(1)}%`,
    },
  }
}

export const dashboardService = {
  async getStats(organizationId: string): Promise<DashboardStats> {
    // Query unread alert count from real table
    const { count: alertCount } = await supabase
      .from('tracking_alerts')
      .select('id', { count: 'exact', head: true })
      .eq('organization_id', organizationId)
      .eq('is_read', false)

    // For metrics that need aggregation views, use placeholder values
    // Replace these with actual DB views / RPC calls as you build out the schema
    return buildStats({
      awareness: 72.4,
      sentiment: 64,
      sov: 28.3,
      alerts: alertCount ?? 0,
      responses: 4821,
      accuracy: 87.2,
    })
  },
}
