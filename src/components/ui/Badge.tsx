import { cn } from '@utils/cn'

type BadgeVariant = 'success' | 'warning' | 'danger' | 'brand' | 'neutral'

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

const VARIANTS: Record<BadgeVariant, string> = {
  success: 'badge-success',
  warning: 'badge-warning',
  danger:  'badge-danger',
  brand:   'badge-brand',
  neutral: 'badge bg-white/5 text-white/50 ring-1 ring-white/10',
}

export default function Badge({ variant = 'neutral', children, className }: BadgeProps) {
  return (
    <span className={cn(VARIANTS[variant], className)}>
      {children}
    </span>
  )
}
