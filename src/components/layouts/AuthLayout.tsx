import { Outlet, Navigate } from 'react-router-dom'
import { useAuthStore } from '@store/authStore'

export default function AuthLayout() {
  const user = useAuthStore((s) => s.user)

  if (user) return <Navigate to="/dashboard" replace />

  return (
    <div className="flex min-h-screen bg-surface-900">
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 bg-gradient-to-br from-brand-900/80 to-surface-900 border-r border-white/5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500">
            <span className="text-sm font-bold text-white">Q</span>
          </div>
          <span className="text-xl font-semibold text-white">Q-Nexus</span>
        </div>

        <div className="space-y-6">
          <p className="text-4xl font-bold text-white leading-tight">
            Consumer Intelligence
            <span className="text-gradient block">for Africa</span>
          </p>
          <p className="text-white/50 text-lg leading-relaxed max-w-md">
            Real-time brand tracking, AI-powered market predictions,
            and deep consumer insights across 16 African markets.
          </p>

          {/* Trust signals */}
          <div className="flex gap-6 pt-4">
            {[
              { label: 'Markets', value: '16+' },
              { label: 'Brands tracked', value: '2,400+' },
              { label: 'Data points / day', value: '18M+' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-bold text-white">{s.value}</div>
                <div className="text-sm text-white/40">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-white/20 text-sm">© 2024 Q-Nexus. All rights reserved.</p>
      </div>

      {/* Right panel — form */}
      <div className="flex flex-1 flex-col items-center justify-center p-8">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500">
              <span className="text-sm font-bold text-white">Q</span>
            </div>
            <span className="text-xl font-semibold text-white">Q-Nexus</span>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
