import { DocumentChartBarIcon, PlusIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import PageHeader from '@components/ui/PageHeader'
import Badge from '@components/ui/Badge'
import EmptyState from '@components/ui/EmptyState'
import { formatDate, formatRelative } from '@utils/format'
import type { ReportType } from '@types/index'

const REPORT_TYPE_LABELS: Record<ReportType, string> = {
  brand_health: 'Brand Health',
  market_overview: 'Market Overview',
  competitor_analysis: 'Competitor Analysis',
  consumer_deep_dive: 'Consumer Deep Dive',
  trend_forecast: 'Trend Forecast',
  custom: 'Custom',
}

// Placeholder data
const MOCK_REPORTS = [
  {
    id: '1', title: 'Q4 2024 Brand Health Report', type: 'brand_health' as ReportType,
    status: 'ready' as const, period_start: '2024-10-01', period_end: '2024-12-31',
    created_at: '2025-01-05T10:00:00Z',
  },
  {
    id: '2', title: 'Nigeria Market Overview — Jan 2025', type: 'market_overview' as ReportType,
    status: 'ready' as const, period_start: '2025-01-01', period_end: '2025-01-31',
    created_at: '2025-02-01T08:00:00Z',
  },
  {
    id: '3', title: 'Competitor Analysis — Fintech Sector', type: 'competitor_analysis' as ReportType,
    status: 'generating' as const, period_start: '2025-01-01', period_end: '2025-02-28',
    created_at: '2025-02-28T07:00:00Z',
  },
]

export default function Reports() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports"
        subtitle="Generate and download intelligence reports"
        actions={
          <button className="btn-primary">
            <PlusIcon className="h-4 w-4" />
            New Report
          </button>
        }
      />

      {MOCK_REPORTS.length === 0 ? (
        <EmptyState
          icon={<DocumentChartBarIcon className="h-8 w-8" />}
          title="No reports yet"
          description="Generate your first report to get a comprehensive view of your brand performance."
          action={<button className="btn-primary"><PlusIcon className="h-4 w-4" /> Generate Report</button>}
        />
      ) : (
        <div className="space-y-3">
          {MOCK_REPORTS.map((report) => (
            <div key={report.id} className="card p-5 flex items-center gap-4 hover:border-white/10 transition-colors">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500/10">
                <DocumentChartBarIcon className="h-5 w-5 text-brand-400" />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-white">{report.title}</h3>
                <p className="text-xs text-white/40 mt-0.5">
                  {REPORT_TYPE_LABELS[report.type]} ·{' '}
                  {formatDate(report.period_start, 'MMM d')} –{' '}
                  {formatDate(report.period_end, 'MMM d, yyyy')}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Badge variant={report.status === 'ready' ? 'success' : 'warning'}>
                  {report.status === 'generating' ? 'Generating…' : 'Ready'}
                </Badge>
                <span className="text-xs text-white/30 hidden sm:block">
                  {formatRelative(report.created_at)}
                </span>
                {report.status === 'ready' && (
                  <button className="btn-ghost py-1.5 px-3 text-xs">
                    <ArrowDownTrayIcon className="h-4 w-4" />
                    Download
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
