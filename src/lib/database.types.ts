// Auto-generated Supabase types — regenerate with:
// npx supabase gen types typescript --project-id <your-project-id> > src/lib/database.types.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      organizations: {
        Row: {
          id: string
          name: string
          slug: string
          logo_url: string | null
          plan: 'free' | 'starter' | 'professional' | 'enterprise'
          country: string
          industry: string
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['organizations']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['organizations']['Insert']>
      }
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string
          avatar_url: string | null
          role: 'owner' | 'admin' | 'analyst' | 'viewer'
          organization_id: string
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>
      }
      brands: {
        Row: {
          id: string
          organization_id: string
          name: string
          logo_url: string | null
          category: string
          markets: string[]
          is_competitor: boolean
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['brands']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['brands']['Insert']>
      }
      brand_metrics: {
        Row: {
          id: string
          brand_id: string
          period: string
          awareness_score: number
          sentiment_score: number
          share_of_voice: number
          nps_score: number
          engagement_rate: number
          mentions_count: number
          positive_mentions: number
          negative_mentions: number
          neutral_mentions: number
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['brand_metrics']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['brand_metrics']['Insert']>
      }
      predictions: {
        Row: {
          id: string
          organization_id: string
          title: string
          category: string
          market: string
          confidence: number
          predicted_value: number
          current_value: number
          delta_percentage: number
          horizon: string
          factors: Json
          generated_at: string
          valid_until: string
        }
        Insert: Omit<Database['public']['Tables']['predictions']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['predictions']['Insert']>
      }
      tracking_alerts: {
        Row: {
          id: string
          organization_id: string
          brand_id: string | null
          type: string
          severity: 'info' | 'warning' | 'critical'
          title: string
          description: string
          is_read: boolean
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['tracking_alerts']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['tracking_alerts']['Insert']>
      }
      reports: {
        Row: {
          id: string
          organization_id: string
          title: string
          type: string
          status: 'generating' | 'ready' | 'failed'
          file_url: string | null
          created_by: string
          period_start: string
          period_end: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['reports']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['reports']['Insert']>
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}
