import { supabase } from '@lib/supabase'
import type { Prediction, PredictionCategory } from '@types/index'

export const predictionService = {
  async getPredictions(
    organizationId: string,
    category?: PredictionCategory
  ): Promise<Prediction[]> {
    let query = supabase
      .from('predictions')
      .select('*')
      .eq('organization_id', organizationId)
      .order('generated_at', { ascending: false })

    if (category) {
      query = query.eq('category', category)
    }

    const { data, error } = await query
    if (error) throw error
    return data as Prediction[]
  },

  async getPrediction(predictionId: string): Promise<Prediction> {
    const { data, error } = await supabase
      .from('predictions')
      .select('*')
      .eq('id', predictionId)
      .single()

    if (error) throw error
    return data as Prediction
  },
}
