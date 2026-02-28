// Centralized React Query key factory — ensures consistent cache invalidation

export const queryKeys = {
  // Auth
  auth: {
    session: () => ['auth', 'session'] as const,
    profile: (userId: string) => ['auth', 'profile', userId] as const,
  },

  // Organizations
  organization: {
    current: () => ['organization', 'current'] as const,
    members: (orgId: string) => ['organization', 'members', orgId] as const,
  },

  // Brands
  brands: {
    all: (orgId: string) => ['brands', orgId] as const,
    detail: (brandId: string) => ['brands', 'detail', brandId] as const,
    metrics: (brandId: string, period?: string) =>
      ['brands', 'metrics', brandId, period] as const,
    sentiment: (brandId: string) => ['brands', 'sentiment', brandId] as const,
  },

  // Consumer Insights
  insights: {
    segments: (orgId: string) => ['insights', 'segments', orgId] as const,
    surveys: (orgId: string) => ['insights', 'surveys', orgId] as const,
    survey: (surveyId: string) => ['insights', 'survey', surveyId] as const,
  },

  // Predictions
  predictions: {
    all: (orgId: string) => ['predictions', orgId] as const,
    detail: (predictionId: string) => ['predictions', 'detail', predictionId] as const,
    byCategory: (orgId: string, category: string) =>
      ['predictions', orgId, category] as const,
  },

  // Alerts
  alerts: {
    all: (orgId: string) => ['alerts', orgId] as const,
    unread: (orgId: string) => ['alerts', 'unread', orgId] as const,
  },

  // Reports
  reports: {
    all: (orgId: string) => ['reports', orgId] as const,
    detail: (reportId: string) => ['reports', 'detail', reportId] as const,
  },

  // Dashboard
  dashboard: {
    stats: (orgId: string) => ['dashboard', 'stats', orgId] as const,
  },
} as const
