import { BellIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useAuthStore } from '@store/authStore'
import { useUnreadAlertsCount } from '@hooks/useAlerts'
import { cn } from '@utils/cn'

export default function Topbar() {
  const { user, signOut } = useAuthStore()
  const { data: unreadCount } = useUnreadAlertsCount()

  return (
    <header className="flex h-16 shrink-0 items-center gap-4 border-b border-white/5 bg-surface-800/60 px-6 backdrop-blur-xl">
      {/* Search */}
      <div className="flex flex-1 items-center gap-3 rounded-xl bg-white/5 px-3 py-2 border border-white/10 max-w-md">
        <MagnifyingGlassIcon className="h-4 w-4 text-white/30 shrink-0" />
        <input
          type="text"
          placeholder="Search brands, insights, reports…"
          className="w-full bg-transparent text-sm text-white/70 placeholder:text-white/30 focus:outline-none"
        />
        <kbd className="hidden rounded bg-white/10 px-1.5 py-0.5 text-xs text-white/30 sm:block">⌘K</kbd>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {/* Notifications */}
        <button className="relative rounded-xl p-2.5 text-white/50 transition-colors hover:bg-white/5 hover:text-white">
          <BellIcon className="h-5 w-5" />
          {(unreadCount ?? 0) > 0 && (
            <span className={cn(
              'absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center',
              'rounded-full bg-red-500 px-1 text-[10px] font-bold text-white'
            )}>
              {unreadCount}
            </span>
          )}
        </button>

        {/* User avatar */}
        <button
          onClick={signOut}
          className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
          title="Sign out"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-500/20 text-brand-300 text-xs font-semibold">
            {user?.full_name?.[0]?.toUpperCase() ?? 'U'}
          </div>
          <span className="hidden sm:block">{user?.full_name?.split(' ')[0]}</span>
        </button>
      </div>
    </header>
  )
}
