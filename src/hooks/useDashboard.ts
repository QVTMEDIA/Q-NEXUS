import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@lib/queryKeys'
import { dashboardService } from '@services/dashboardService'
import { useAuthStore } from '@store/authStore'

export function useDashboardStats() {
  const user = useAuthStore((s) => s.user)
  const orgId = user?.organization_id ?? ''

  return useQuery({
    queryKey: queryKeys.dashboard.stats(orgId),
    queryFn: () => dashboardService.getStats(orgId),
    enabled: !!orgId,
    staleTime: 1000 * 60 * 5,
  })
}
