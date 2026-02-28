import { useEffect } from 'react'
import { useUIStore, type ToastNotification } from '@store/uiStore'
import { cn } from '@utils/cn'
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid'

const ICONS = {
  success: CheckCircleIcon,
  error: ExclamationCircleIcon,
  warning: ExclamationCircleIcon,
  info: InformationCircleIcon,
}

const COLORS = {
  success: 'text-emerald-400 bg-emerald-400/10',
  error: 'text-red-400 bg-red-400/10',
  warning: 'text-amber-400 bg-amber-400/10',
  info: 'text-brand-400 bg-brand-400/10',
}

function Toast({ notification }: { notification: ToastNotification }) {
  const removeNotification = useUIStore((s) => s.removeNotification)
  const Icon = ICONS[notification.type]
  const duration = notification.duration ?? 5000

  useEffect(() => {
    const timer = setTimeout(() => removeNotification(notification.id), duration)
    return () => clearTimeout(timer)
  }, [notification.id, duration, removeNotification])

  return (
    <div className="card flex items-start gap-3 p-4 shadow-card w-80 animate-slide-up">
      <div className={cn('rounded-lg p-1.5 shrink-0', COLORS[notification.type])}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white">{notification.title}</p>
        {notification.message && (
          <p className="mt-0.5 text-xs text-white/50">{notification.message}</p>
        )}
      </div>
      <button
        onClick={() => removeNotification(notification.id)}
        className="shrink-0 rounded-lg p-1 text-white/30 hover:text-white/60 transition-colors"
      >
        <XMarkIcon className="h-4 w-4" />
      </button>
    </div>
  )
}

export default function ToastContainer() {
  const notifications = useUIStore((s) => s.notifications)

  if (notifications.length === 0) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
      {notifications.map((n) => (
        <Toast key={n.id} notification={n} />
      ))}
    </div>
  )
}
