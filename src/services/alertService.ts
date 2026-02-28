import { supabase } from '@lib/supabase'
import type { TrackingAlert } from '@types/index'

export const alertService = {
  async getAlerts(organizationId: string): Promise<TrackingAlert[]> {
    const { data, error } = await supabase
      .from('tracking_alerts')
      .select('*')
      .eq('organization_id', organizationId)
      .order('created_at', { ascending: false })
      .limit(50)

    if (error) throw error
    return data as TrackingAlert[]
  },

  async getUnreadCount(organizationId: string): Promise<number> {
    const { count, error } = await supabase
      .from('tracking_alerts')
      .select('id', { count: 'exact', head: true })
      .eq('organization_id', organizationId)
      .eq('is_read', false)

    if (error) throw error
    return count ?? 0
  },

  async markAsRead(alertId: string): Promise<void> {
    const { error } = await supabase
      .from('tracking_alerts')
      .update({ is_read: true })
      .eq('id', alertId)

    if (error) throw error
  },

  async markAllAsRead(organizationId: string): Promise<void> {
    const { error } = await supabase
      .from('tracking_alerts')
      .update({ is_read: true })
      .eq('organization_id', organizationId)
      .eq('is_read', false)

    if (error) throw error
  },
}
