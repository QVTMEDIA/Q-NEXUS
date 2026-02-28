import { Outlet } from 'react-router-dom'
import Sidebar from '@components/navigation/Sidebar'
import Topbar from '@components/navigation/Topbar'
import ToastContainer from '@components/ui/ToastContainer'
import { useUIStore } from '@store/uiStore'
import { cn } from '@utils/cn'

export default function DashboardLayout() {
  const { sidebarCollapsed } = useUIStore()

  return (
    <div className="flex h-screen overflow-hidden bg-surface-900">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div
        className={cn(
          'flex flex-1 flex-col overflow-hidden transition-all duration-300',
          sidebarCollapsed ? 'ml-16' : 'ml-64'
        )}
      >
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-7xl animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Global toast notifications */}
      <ToastContainer />
    </div>
  )
}
