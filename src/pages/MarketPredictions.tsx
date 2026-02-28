import { SparklesIcon } from '@heroicons/react/24/outline'
import PageHeader from '@components/ui/PageHeader'
import Badge from '@components/ui/Badge'
import EmptyState from '@components/ui/EmptyState'
import { usePredictions } from '@hooks/usePredictions'
import type { Prediction } from '@types/index'
import { formatDate, formatRelative } from '@utils/format'

function ConfidenceBar({ value }: { value: number }) {
  const color = value >= 80 ? 'bg-emerald-500' : value >= 60 ? 'bg-amber-500' : 'bg-red-500'
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
      </div>
      <span className="text-xs text-white/50 w-8 text-right">{value}%</span>
    </div>
  )
}

function PredictionCard({ prediction }: { prediction: Prediction }) {
  const isPositive = prediction.delta_percentage > 0

  return (
    <div className="card-hover p-5">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-white line-clamp-2">{prediction.title}</h3>
          <p className="text-xs text-white/40 mt-1 capitalize">
            {prediction.category.replace(/_/g, ' ')} · {prediction.market}
          </p>
        </div>
        <Badge variant={prediction.horizon === '7d' ? 'warning' : prediction.horizon === '1y' ? 'brand' : 'neutral'}>
          {prediction.horizon}
        </Badge>
      </div>

      <div className="flex items-baseline gap-3 mb-4">
        <span className="text-2xl font-bold text-white">{prediction.predicted_value.toFixed(1)}</span>
        <span className={`text-sm font-medium ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
          {isPositive ? '↑' : '↓'} {Math.abs(prediction.delta_percentage).toFixed(1)}%
        </span>
      </div>

      <div className="space-y-2">
        <p className="text-xs text-white/40 uppercase tracking-wide">Confidence</p>
        <ConfidenceBar value={prediction.confidence} />
      </div>

      <div className="mt-4 pt-4 border-t border-white/5">
        <p className="text-[11px] text-white/30">
          Valid until {formatDate(prediction.valid_until, 'MMM d, yyyy')} ·{' '}
          Generated {formatRelative(prediction.generated_at)}
        </p>
      </div>
    </div>
  )
}

export default function MarketPredictions() {
  const { data: predictions, isLoading } = usePredictions()

  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Market Predictions"
        subtitle="Machine-learning forecasts across African consumer markets"
      />

      {/* Callout */}
      <div className="rounded-2xl bg-gradient-to-r from-brand-900/60 to-brand-800/30 border border-brand-500/20 p-5 flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-500/20">
          <SparklesIcon className="h-5 w-5 text-brand-300" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Powered by Q-AI Engine</p>
          <p className="text-sm text-white/50 mt-0.5">
            Predictions are generated using multi-source data including social signals,
            purchase data, macroeconomic indicators, and seasonal patterns specific to African markets.
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="card p-5 space-y-3 animate-pulse">
              <div className="skeleton h-4 w-40" />
              <div className="skeleton h-3 w-24" />
              <div className="skeleton h-8 w-20" />
              <div className="skeleton h-2 w-full rounded-full" />
            </div>
          ))}
        </div>
      ) : !predictions?.length ? (
        <EmptyState
          icon={<SparklesIcon className="h-8 w-8" />}
          title="No predictions yet"
          description="Predictions are generated automatically as data flows in from your tracked brands and markets."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {predictions.map((p) => (
            <PredictionCard key={p.id} prediction={p} />
          ))}
        </div>
      )}
    </div>
  )
}
