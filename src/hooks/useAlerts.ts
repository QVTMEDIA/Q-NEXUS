import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { queryKeys } from '@lib/queryKeys'
import { alertService } from '@services/alertService'
import { subscribeToTable } from '@lib/supabase'
import { useAuthStore } from '@store/authStore'

export function useAlerts() {
  const user = useAuthStore((s) => s.user)
  const orgId = user?.organization_id ?? ''
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: queryKeys.alerts.all(orgId),
    queryFn: () => alertService.getAlerts(orgId),
    enabled: !!orgId,
  })

  // Subscribe to real-time alert inserts
  useEffect(() => {
    if (!orgId) return
    const unsubscribe = subscribeToTable(
      'tracking_alerts',
      () => {
        queryClient.invalidateQueries({ queryKey: queryKeys.alerts.all(orgId) })
      },
      `organization_id=eq.${orgId}`
    )
    return unsubscribe
  }, [orgId, queryClient])

  return query
}

export function useUnreadAlertsCount() {
  const user = useAuthStore((s) => s.user)
  const orgId = user?.organization_id ?? ''

  return useQuery({
    queryKey: queryKeys.alerts.unread(orgId),
    queryFn: () => alertService.getUnreadCount(orgId),
    enabled: !!orgId,
    refetchInterval: 30_000, // Poll every 30s as a fallback
  })
}

export function useMarkAlertRead() {
  const queryClient = useQueryClient()
  const user = useAuthStore((s) => s.user)
  const orgId = user?.organization_id ?? ''

  return useMutation({
    mutationFn: (alertId: string) => alertService.markAsRead(alertId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.alerts.all(orgId) })
      queryClient.invalidateQueries({ queryKey: queryKeys.alerts.unread(orgId) })
    },
  })
}
