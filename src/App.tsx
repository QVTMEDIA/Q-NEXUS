import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from '@store/authStore'

// Layout
import DashboardLayout from '@components/layouts/DashboardLayout'
import AuthLayout from '@components/layouts/AuthLayout'

// Pages
import Dashboard from '@pages/Dashboard'
import BrandIntelligence from '@pages/BrandIntelligence'
import MarketPredictions from '@pages/MarketPredictions'
import ConsumerInsights from '@pages/ConsumerInsights'
import RealtimeTracking from '@pages/RealtimeTracking'
import Reports from '@pages/Reports'
import Settings from '@pages/Settings'
import Login from '@pages/auth/Login'
import Register from '@pages/auth/Register'
import NotFound from '@pages/NotFound'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuthStore()

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-500 border-t-transparent" />
      </div>
    )
  }

  if (!user) return <Navigate to="/auth/login" replace />

  return <>{children}</>
}

export default function App() {
  return (
    <Routes>
      {/* Auth routes */}
      <Route element={<AuthLayout />}>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
      </Route>

      {/* Protected app routes */}
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/brand-intelligence" element={<BrandIntelligence />} />
        <Route path="/predictions" element={<MarketPredictions />} />
        <Route path="/consumer-insights" element={<ConsumerInsights />} />
        <Route path="/realtime" element={<RealtimeTracking />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
