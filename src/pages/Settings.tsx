import { useAuthStore } from '@store/authStore'
import PageHeader from '@components/ui/PageHeader'

export default function Settings() {
  const { user } = useAuthStore()

  return (
    <div className="space-y-6 max-w-2xl">
      <PageHeader title="Settings" subtitle="Manage your account and organization" />

      {/* Profile */}
      <div className="card p-6 space-y-4">
        <h2 className="text-sm font-semibold text-white">Profile</h2>
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-500/20 text-brand-300 text-xl font-bold">
            {user?.full_name?.[0]?.toUpperCase() ?? 'U'}
          </div>
          <div>
            <p className="font-medium text-white">{user?.full_name ?? '—'}</p>
            <p className="text-sm text-white/40">{user?.email}</p>
            <span className="mt-1 inline-flex badge bg-brand-500/10 text-brand-300 capitalize">
              {user?.role ?? 'viewer'}
            </span>
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="card p-6 space-y-4">
        <h2 className="text-sm font-semibold text-white">Preferences</h2>
        <div className="space-y-3">
          {[
            { label: 'Email notifications', description: 'Receive alert digests via email' },
            { label: 'Real-time alerts', description: 'Push alerts for critical signals' },
            { label: 'Weekly digest', description: 'Summary report every Monday' },
          ].map((pref) => (
            <div key={pref.label} className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm text-white">{pref.label}</p>
                <p className="text-xs text-white/40">{pref.description}</p>
              </div>
              <button className="relative h-5 w-9 rounded-full bg-brand-500 transition-colors focus:outline-none">
                <span className="absolute right-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Danger zone */}
      <div className="card p-6 space-y-4 border-red-500/20">
        <h2 className="text-sm font-semibold text-red-400">Danger Zone</h2>
        <p className="text-sm text-white/50">
          Deleting your account is permanent and cannot be undone.
        </p>
        <button className="btn-secondary text-red-400 border-red-500/30 hover:bg-red-500/10">
          Delete account
        </button>
      </div>
    </div>
  )
}
