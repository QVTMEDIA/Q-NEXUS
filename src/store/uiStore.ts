import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UIState {
  sidebarOpen: boolean
  sidebarCollapsed: boolean
  activeOrganizationId: string | null
  activeBrandId: string | null
  theme: 'dark' | 'light'
  notifications: ToastNotification[]
}

interface UIActions {
  toggleSidebar: () => void
  setSidebarCollapsed: (collapsed: boolean) => void
  setActiveOrganization: (id: string) => void
  setActiveBrand: (id: string | null) => void
  addNotification: (notification: Omit<ToastNotification, 'id'>) => void
  removeNotification: (id: string) => void
  clearNotifications: () => void
}

export interface ToastNotification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message?: string
  duration?: number
}

export const useUIStore = create<UIState & UIActions>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      sidebarCollapsed: false,
      activeOrganizationId: null,
      activeBrandId: null,
      theme: 'dark',
      notifications: [],

      toggleSidebar: () =>
        set((s) => ({ sidebarOpen: !s.sidebarOpen })),

      setSidebarCollapsed: (collapsed) =>
        set({ sidebarCollapsed: collapsed }),

      setActiveOrganization: (id) =>
        set({ activeOrganizationId: id }),

      setActiveBrand: (id) =>
        set({ activeBrandId: id }),

      addNotification: (notification) =>
        set((s) => ({
          notifications: [
            ...s.notifications,
            { ...notification, id: crypto.randomUUID() },
          ],
        })),

      removeNotification: (id) =>
        set((s) => ({
          notifications: s.notifications.filter((n) => n.id !== id),
        })),

      clearNotifications: () => set({ notifications: [] }),
    }),
    {
      name: 'q-nexus-ui',
      partialize: (s) => ({
        sidebarCollapsed: s.sidebarCollapsed,
        activeOrganizationId: s.activeOrganizationId,
        theme: s.theme,
      }),
    }
  )
)
