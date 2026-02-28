import {
  ChartBarIcon,
  SparklesIcon,
  SignalIcon,
  UsersIcon,
  DocumentChartBarIcon,
  StarIcon,
} from '@heroicons/react/24/outline'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import StatCard from '@components/ui/StatCard'
import PageHeader from '@components/ui/PageHeader'
import { useDashboardStats } from '@hooks/useDashboard'
import { formatShortDate } from '@utils/format'
import { subDays, format } from 'date-fns'

// Placeholder chart data — replace with real queries
const sentimentData = Array.from({ length: 30 }, (_, i) => ({
  date: format(subDays(new Date(), 29 - i), 'MMM d'),
  positive: Math.round(55 + Math.random() * 20),
  negative: Math.round(15 + Math.random() * 15),
  neutral: Math.round(20 + Math.random() * 10),
}))

const STAT_ICONS = [
  <ChartBarIcon className="h-4 w-4" />,
  <StarIcon className="h-4 w-4" />,
  <SignalIcon className="h-4 w-4" />,
  <SparklesIcon className="h-4 w-4" />,
  <UsersIcon className="h-4 w-4" />,
  <DocumentChartBarIcon className="h-4 w-4" />,
]

const STAT_KEYS = [
  'brand_awareness',
  'sentiment_index',
  'share_of_voice',
  'active_alerts',
  'survey_responses',
  'prediction_accuracy',
] as const

const STAT_LABELS: Record<string, string> = {
  brand_awareness: 'Brand Awareness',
  sentiment_index: 'Sentiment Index',
  share_of_voice: 'Share of Voice',
  active_alerts: 'Active Alerts',
  survey_responses: 'Survey Responses',
  prediction_accuracy: 'AI Accuracy',
}

export default function Dashboard() {
  const { data: stats, isLoading } = useDashboardStats()

  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        subtitle={`Overview as of ${formatShortDate(new Date())}`}
      />

      {/* KPI grid */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        {STAT_KEYS.map((key, i) => (
          <StatCard
            key={key}
            title={STAT_LABELS[key]}
            metric={stats?.[key] ?? {
              value: 0, previous: 0, delta: 0,
              delta_type: 'neutral', unit: '', formatted: '–',
            }}
            icon={STAT_ICONS[i]}
            isLoading={isLoading}
            className={key === 'active_alerts' ? 'col-span-1' : ''}
          />
        ))}
      </div>

      {/* Sentiment trend chart */}
      <div className="card p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-white">Sentiment Trend</h2>
            <p className="text-xs text-white/40 mt-0.5">Last 30 days across all tracked brands</p>
          </div>
          <div className="flex gap-4 text-xs text-white/40">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500" /> Positive
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-red-500" /> Negative
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-white/20" /> Neutral
            </span>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={sentimentData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="positive" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="negative" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis
              dataKey="date"
              tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              interval={6}
            />
            <YAxis
              tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                background: '#1a1a2e',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                color: 'white',
                fontSize: 12,
              }}
            />
            <Area type="monotone" dataKey="positive" stroke="#10b981" fill="url(#positive)" strokeWidth={2} />
            <Area type="monotone" dataKey="negative" stroke="#ef4444" fill="url(#negative)" strokeWidth={2} />
            <Area type="monotone" dataKey="neutral" stroke="rgba(255,255,255,0.2)" fill="none" strokeWidth={1.5} strokeDasharray="4 4" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Top markets */}
        <div className="card p-6">
          <h2 className="text-base font-semibold text-white mb-5">Top Markets</h2>
          <div className="space-y-4">
            {[
              { country: 'Nigeria', code: 'NG', sov: 34.2, trend: 2.1 },
              { country: 'Kenya', code: 'KE', sov: 22.8, trend: -0.5 },
              { country: 'South Africa', code: 'ZA', sov: 18.5, trend: 1.3 },
              { country: 'Ghana', code: 'GH', sov: 12.1, trend: 0.8 },
              { country: 'Egypt', code: 'EG', sov: 8.7, trend: -1.2 },
            ].map((m) => (
              <div key={m.code} className="flex items-center gap-3">
                <span className="w-4 text-base">{countryFlag(m.code)}</span>
                <span className="flex-1 text-sm text-white/70">{m.country}</span>
                <div className="w-32 h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-brand-500/70"
                    style={{ width: `${m.sov * 2.5}%` }}
                  />
                </div>
                <span className="w-10 text-right text-sm font-medium text-white">{m.sov}%</span>
                <span className={`w-10 text-right text-xs ${m.trend > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {m.trend > 0 ? '+' : ''}{m.trend}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent alerts */}
        <div className="card p-6">
          <h2 className="text-base font-semibold text-white mb-5">Recent Alerts</h2>
          <div className="space-y-3">
            {[
              { type: 'Sentiment Drop', brand: 'BrandX', severity: 'critical', time: '2m ago' },
              { type: 'Viral Mention', brand: 'BrandY', severity: 'info', time: '15m ago' },
              { type: 'Competitor Activity', brand: 'Market', severity: 'warning', time: '1h ago' },
              { type: 'Opportunity', brand: 'Segment A', severity: 'info', time: '2h ago' },
            ].map((a, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl p-3 bg-white/3 hover:bg-white/5 transition-colors">
                <div className={`h-2 w-2 rounded-full shrink-0 ${
                  a.severity === 'critical' ? 'bg-red-500 shadow-[0_0_8px] shadow-red-500/60' :
                  a.severity === 'warning' ? 'bg-amber-500' : 'bg-brand-500'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white/80">{a.type}</p>
                  <p className="text-xs text-white/40">{a.brand}</p>
                </div>
                <span className="text-xs text-white/30 shrink-0">{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function countryFlag(code: string) {
  const offset = 127397
  return [...code].map((c) => String.fromCodePoint(c.codePointAt(0)! + offset)).join('')
}
