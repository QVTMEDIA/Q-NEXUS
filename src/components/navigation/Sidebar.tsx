import { NavLink } from 'react-router-dom'
import {
  HomeIcon,
  ChartBarIcon,
  SparklesIcon,
  UsersIcon,
  SignalIcon,
  DocumentChartBarIcon,
  Cog6ToothIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline'
import { cn } from '@utils/cn'
import { useUIStore } from '@store/uiStore'
import { useUnreadAlertsCount } from '@hooks/useAlerts'

const NAV_ITEMS = [
  { to: '/dashboard',          icon: HomeIcon,              label: 'Dashboard' },
  { to: '/brand-intelligence', icon: ChartBarIcon,          label: 'Brand Intelligence' },
  { to: '/predictions',        icon: SparklesIcon,          label: 'AI Predictions' },
  { to: '/consumer-insights',  icon: UsersIcon,             label: 'Consumer Insights' },
  { to: '/realtime',           icon: SignalIcon,            label: 'Real-time' },
  { to: '/reports',            icon: DocumentChartBarIcon,  label: 'Reports' },
]

export default function Sidebar() {
  const { sidebarCollapsed, setSidebarCollapsed } = useUIStore()
  const { data: unreadCount } = useUnreadAlertsCount()

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 flex h-full flex-col border-r border-white/5 bg-surface-800/80 backdrop-blur-xl transition-all duration-300',
        sidebarCollapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-white/5 px-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-500 shadow-glow-brand">
          <span className="text-xs font-bold text-white">Q</span>
        </div>
        {!sidebarCollapsed && (
          <span className="text-sm font-semibold text-white">Q-Nexus</span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
        {!sidebarCollapsed && (
          <p className="section-header mb-3 px-2">Platform</p>
        )}

        {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150',
                isActive
                  ? 'bg-brand-500/15 text-brand-300 shadow-glow-brand/30'
                  : 'text-white/50 hover:bg-white/5 hover:text-white/80',
                sidebarCollapsed && 'justify-center'
              )
            }
            title={sidebarCollapsed ? label : undefined}
          >
            {({ isActive }) => (
              <>
                <Icon className={cn('h-5 w-5 shrink-0', isActive && 'text-brand-400')} />
                {!sidebarCollapsed && <span>{label}</span>}
                {/* Alert badge on Real-time */}
                {to === '/realtime' && (unreadCount ?? 0) > 0 && !sidebarCollapsed && (
                  <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-xs font-bold text-white">
                    {unreadCount}
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Settings + collapse */}
      <div className="border-t border-white/5 p-3 space-y-0.5">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            cn(
              'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150',
              isActive
                ? 'bg-brand-500/15 text-brand-300'
                : 'text-white/50 hover:bg-white/5 hover:text-white/80',
              sidebarCollapsed && 'justify-center'
            )
          }
          title={sidebarCollapsed ? 'Settings' : undefined}
        >
          <Cog6ToothIcon className="h-5 w-5 shrink-0" />
          {!sidebarCollapsed && <span>Settings</span>}
        </NavLink>

        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/30 transition-all hover:bg-white/5 hover:text-white/60"
          title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {sidebarCollapsed ? (
            <ChevronRightIcon className="h-5 w-5" />
          ) : (
            <>
              <ChevronLeftIcon className="h-5 w-5" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  )
}
