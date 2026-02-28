import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. ' +
    'Copy .env.example to .env and fill in your Supabase project credentials.'
  )
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
})

// Helper: subscribe to a table with auto-cleanup
export function subscribeToTable<T extends Record<string, unknown>>(
  table: string,
  callback: (payload: T) => void,
  filter?: string
) {
  const channel = supabase
    .channel(`realtime:${table}`)
    .on(
      // @ts-expect-error — dynamic table name
      'postgres_changes',
      { event: '*', schema: 'public', table, filter },
      callback
    )
    .subscribe()

  return () => {
    supabase.removeChannel(channel)
  }
}
