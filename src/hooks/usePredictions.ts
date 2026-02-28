import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@lib/queryKeys'
import { predictionService } from '@services/predictionService'
import { useAuthStore } from '@store/authStore'
import type { PredictionCategory } from '@types/index'

export function usePredictions(category?: PredictionCategory) {
  const user = useAuthStore((s) => s.user)
  const orgId = user?.organization_id ?? ''

  return useQuery({
    queryKey: category
      ? queryKeys.predictions.byCategory(orgId, category)
      : queryKeys.predictions.all(orgId),
    queryFn: () => predictionService.getPredictions(orgId, category),
    enabled: !!orgId,
    staleTime: 1000 * 60 * 10, // 10 minutes — predictions don't change often
  })
}

export function usePrediction(predictionId: string) {
  return useQuery({
    queryKey: queryKeys.predictions.detail(predictionId),
    queryFn: () => predictionService.getPrediction(predictionId),
    enabled: !!predictionId,
  })
}
