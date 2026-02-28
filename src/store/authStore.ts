import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'
import { supabase } from '@lib/supabase'
import type { User } from '@types/index'

interface AuthState {
  user: User | null
  isLoading: boolean
  error: string | null
}

interface AuthActions {
  initialize: () => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, fullName: string) => Promise<void>
  signOut: () => Promise<void>
  clearError: () => void
}

export const useAuthStore = create<AuthState & AuthActions>()(
  subscribeWithSelector((set) => ({
    user: null,
    isLoading: true,
    error: null,

    initialize: async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()

        if (session?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single()

          set({ user: profile as User, isLoading: false })
        } else {
          set({ user: null, isLoading: false })
        }

        // Listen for auth state changes
        supabase.auth.onAuthStateChange(async (event, session) => {
          if (event === 'SIGNED_IN' && session?.user) {
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single()

            set({ user: profile as User })
          } else if (event === 'SIGNED_OUT') {
            set({ user: null })
          }
        })
      } catch {
        set({ isLoading: false })
      }
    },

    signIn: async (email, password) => {
      set({ isLoading: true, error: null })
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) set({ error: error.message, isLoading: false })
      else set({ isLoading: false })
    },

    signUp: async (email, password, fullName) => {
      set({ isLoading: true, error: null })
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } },
      })
      if (error) set({ error: error.message, isLoading: false })
      else set({ isLoading: false })
    },

    signOut: async () => {
      await supabase.auth.signOut()
      set({ user: null })
    },

    clearError: () => set({ error: null }),
  }))
)
