import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@lib/queryKeys'
import { brandService } from '@services/brandService'
import { useAuthStore } from '@store/authStore'
import type { Brand } from '@types/index'

export function useBrands() {
  const user = useAuthStore((s) => s.user)
  const orgId = user?.organization_id ?? ''

  return useQuery({
    queryKey: queryKeys.brands.all(orgId),
    queryFn: () => brandService.getBrands(orgId),
    enabled: !!orgId,
  })
}

export function useBrandMetrics(brandId: string, period?: string) {
  return useQuery({
    queryKey: queryKeys.brands.metrics(brandId, period),
    queryFn: () => brandService.getBrandMetrics(brandId, period),
    enabled: !!brandId,
    staleTime: 1000 * 60 * 2, // 2 minutes
  })
}

export function useSentimentTrend(brandId: string) {
  return useQuery({
    queryKey: queryKeys.brands.sentiment(brandId),
    queryFn: () => brandService.getSentimentTrend(brandId),
    enabled: !!brandId,
  })
}

export function useCreateBrand() {
  const queryClient = useQueryClient()
  const user = useAuthStore((s) => s.user)

  return useMutation({
    mutationFn: (data: Omit<Brand, 'id' | 'created_at'>) =>
      brandService.createBrand(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.brands.all(user?.organization_id ?? ''),
      })
    },
  })
}
