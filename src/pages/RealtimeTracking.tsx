import { SignalIcon } from '@heroicons/react/24/outline'
import PageHeader from '@components/ui/PageHeader'
import Badge from '@components/ui/Badge'
import EmptyState from '@components/ui/EmptyState'
import { useAlerts, useMarkAlertRead } from '@hooks/useAlerts'
import { formatRelative } from '@utils/format'
import type { TrackingAlert } from '@types/index'
import { cn } from '@utils/cn'

const SEVERITY_STYLES = {
  critical: {
    dot: 'bg-red-500 shadow-[0_0_8px] shadow-red-500/60',
    badge: 'danger' as const,
    border: 'border-red-500/20',
  },
  warning: {
    dot: 'bg-amber-500',
    badge: 'warning' as const,
    border: 'border-amber-500/20',
  },
  info: {
    dot: 'bg-brand-500',
    badge: 'brand' as const,
    border: 'border-transparent',
  },
}

function AlertRow({ alert }: { alert: TrackingAlert }) {
  const { mutate: markRead } = useMarkAlertRead()
  const styles = SEVERITY_STYLES[alert.severity]

  return (
    <div
      className={cn(
        'card p-4 flex items-start gap-4 transition-all duration-200 cursor-pointer',
        'hover:border-white/10',
        !alert.is_read && `border ${styles.border}`,
        !alert.is_read && 'bg-white/3'
      )}
      onClick={() => !alert.is_read && markRead(alert.id)}
    >
      <div className="mt-1 shrink-0">
        <span className={cn('block h-2.5 w-2.5 rounded-full', styles.dot)} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <p className="text-sm font-medium text-white">{alert.title}</p>
          {!alert.is_read && (
            <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
          )}
        </div>
        <p className="text-xs text-white/50 line-clamp-2">{alert.description}</p>
        <p className="text-xs text-white/30 mt-2">{formatRelative(alert.created_at)}</p>
      </div>

      <Badge variant={styles.badge}>{alert.severity}</Badge>
    </div>
  )
}

export default function RealtimeTracking() {
  const { data: alerts, isLoading } = useAlerts()

  return (
    <div className="space-y-6">
      <PageHeader
        title="Real-time Tracking"
        subtitle="Live alerts and signals from across African markets"
      />

      {/* Live indicator */}
      <div className="flex items-center gap-2 text-sm text-white/50">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        Live — updates in real-time via Supabase Realtime
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="card p-4 flex items-start gap-4">
              <div className="skeleton h-2.5 w-2.5 rounded-full mt-1" />
              <div className="flex-1 space-y-2">
                <div className="skeleton h-4 w-48" />
                <div className="skeleton h-3 w-64" />
              </div>
            </div>
          ))}
        </div>
      ) : !alerts?.length ? (
        <EmptyState
          icon={<SignalIcon className="h-8 w-8" />}
          title="No alerts"
          description="Alerts will appear here as Q-AI detects signals across your tracked brands and markets."
        />
      ) : (
        <div className="space-y-2">
          {alerts.map((alert) => (
            <AlertRow key={alert.id} alert={alert} />
          ))}
        </div>
      )}
    </div>
  )
}
