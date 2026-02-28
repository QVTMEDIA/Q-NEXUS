import { cn } from '@utils/cn'
import { deltaArrow, deltaColor } from '@utils/format'
import type { MetricValue } from '@types/index'

interface StatCardProps {
  title: string
  metric: MetricValue
  icon?: React.ReactNode
  className?: string
  isLoading?: boolean
}

export default function StatCard({ title, metric, icon, className, isLoading }: StatCardProps) {
  if (isLoading) {
    return (
      <div className={cn('stat-card', className)}>
        <div className="skeleton h-4 w-24" />
        <div className="skeleton h-8 w-32 mt-1" />
        <div className="skeleton h-3 w-20" />
      </div>
    )
  }

  return (
    <div className={cn('stat-card', className)}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-white/40 uppercase tracking-wide">{title}</span>
        {icon && (
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-white/40">
            {icon}
          </span>
        )}
      </div>

      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-white">{metric.formatted}</span>
        <span className="text-xs text-white/30">{metric.unit}</span>
      </div>

      <div className={cn('flex items-center gap-1 text-xs', deltaColor(metric.delta))}>
        <span>{deltaArrow(metric.delta)}</span>
        <span>
          {Math.abs(metric.delta).toFixed(1)}{metric.unit}{' '}
          <span className="text-white/30">vs last period</span>
        </span>
      </div>
    </div>
  )
}
