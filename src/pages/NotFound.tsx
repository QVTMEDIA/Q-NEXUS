import { Link } from 'react-router-dom'
import { HomeIcon } from '@heroicons/react/24/outline'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface-900 text-center px-6">
      <p className="text-7xl font-bold text-brand-500/30">404</p>
      <h1 className="mt-4 text-2xl font-bold text-white">Page not found</h1>
      <p className="mt-2 text-white/40 max-w-sm">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/dashboard" className="btn-primary mt-8">
        <HomeIcon className="h-4 w-4" />
        Back to Dashboard
      </Link>
    </div>
  )
}
