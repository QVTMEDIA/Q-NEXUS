import { supabase } from '@lib/supabase'
import type { Brand, BrandMetrics, SentimentTrend } from '@types/index'

export const brandService = {
  async getBrands(organizationId: string): Promise<Brand[]> {
    const { data, error } = await supabase
      .from('brands')
      .select('*')
      .eq('organization_id', organizationId)
      .order('name')

    if (error) throw error
    return data as Brand[]
  },

  async getBrand(brandId: string): Promise<Brand> {
    const { data, error } = await supabase
      .from('brands')
      .select('*')
      .eq('id', brandId)
      .single()

    if (error) throw error
    return data as Brand
  },

  async getBrandMetrics(brandId: string, period?: string): Promise<BrandMetrics[]> {
    let query = supabase
      .from('brand_metrics')
      .select('*')
      .eq('brand_id', brandId)
      .order('period', { ascending: false })

    if (period) {
      query = query.eq('period', period)
    }

    const { data, error } = await query.limit(12) // last 12 periods
    if (error) throw error
    return data as BrandMetrics[]
  },

  async getSentimentTrend(brandId: string): Promise<SentimentTrend[]> {
    const { data, error } = await supabase
      .from('brand_metrics')
      .select('period, positive_mentions, negative_mentions, neutral_mentions, sentiment_score')
      .eq('brand_id', brandId)
      .order('period', { ascending: true })
      .limit(30)

    if (error) throw error

    return (data ?? []).map((row) => ({
      date: row.period,
      positive: row.positive_mentions,
      negative: row.negative_mentions,
      neutral: row.neutral_mentions,
      overall: row.sentiment_score,
    }))
  },

  async createBrand(brand: Omit<Brand, 'id' | 'created_at'>): Promise<Brand> {
    const { data, error } = await supabase
      .from('brands')
      .insert(brand)
      .select()
      .single()

    if (error) throw error
    return data as Brand
  },

  async updateBrand(brandId: string, updates: Partial<Brand>): Promise<Brand> {
    const { data, error } = await supabase
      .from('brands')
      .update(updates)
      .eq('id', brandId)
      .select()
      .single()

    if (error) throw error
    return data as Brand
  },

  async deleteBrand(brandId: string): Promise<void> {
    const { error } = await supabase.from('brands').delete().eq('id', brandId)
    if (error) throw error
  },
}
