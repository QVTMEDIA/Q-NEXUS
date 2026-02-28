import { useEffect } from 'react'
import { useAuthStore } from '@store/authStore'

export function useAuth() {
  const { user, isLoading, error, initialize, signIn, signUp, signOut, clearError } =
    useAuthStore()

  useEffect(() => {
    initialize()
  }, [initialize])

  return { user, isLoading, error, signIn, signUp, signOut, clearError }
}
