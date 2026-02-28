import { UsersIcon, PlusIcon } from '@heroicons/react/24/outline'
import PageHeader from '@components/ui/PageHeader'
import EmptyState from '@components/ui/EmptyState'
import Badge from '@components/ui/Badge'

// Placeholder segments — wire up to useQuery + consumerService when ready
const MOCK_SEGMENTS = [
  {
    id: '1',
    name: 'Urban Millennials',
    description: 'City-based 25–40 year olds with smartphone access and disposable income.',
    size_estimate: 12_400_000,
    income_level: 'middle' as const,
    urban_rural: 'urban' as const,
    countries: ['NG', 'KE', 'GH'],
    top_priorities: ['Value for money', 'Brand trust', 'Mobile-first'],
  },
  {
    id: '2',
    name: 'Rural Farmers',
    description: 'Agricultural workers in peri-urban and rural areas across East Africa.',
    size_estimate: 28_000_000,
    income_level: 'low' as const,
    urban_rural: 'rural' as const,
    countries: ['KE', 'TZ', 'UG', 'ET'],
    top_priorities: ['Affordability', 'Durability', 'Local language'],
  },
  {
    id: '3',
    name: 'High-Income Professionals',
    description: 'Corporate employees and entrepreneurs in major African metros.',
    size_estimate: 3_200_000,
    income_level: 'high' as const,
    urban_rural: 'urban' as const,
    countries: ['ZA', 'NG', 'EG'],
    top_priorities: ['Premium quality', 'Convenience', 'Status'],
  },
]

function SegmentCard({ segment }: { segment: typeof MOCK_SEGMENTS[0] }) {
  const incomeColor = {
    low: 'warning' as const,
    middle: 'brand' as const,
    high: 'success' as const,
  }[segment.income_level]

  return (
    <div className="card-hover p-5 space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-white">{segment.name}</h3>
          <p className="text-xs text-white/40 mt-0.5 line-clamp-2">{segment.description}</p>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        <Badge variant={incomeColor}>
          {segment.income_level.charAt(0).toUpperCase() + segment.income_level.slice(1)} income
        </Badge>
        <Badge variant="neutral">{segment.urban_rural}</Badge>
      </div>

      <div>
        <p className="text-lg font-bold text-white">
          {(segment.size_estimate / 1_000_000).toFixed(1)}M
        </p>
        <p className="text-xs text-white/40">Estimated size</p>
      </div>

      <div className="pt-3 border-t border-white/5 space-y-2">
        <p className="text-xs text-white/30 uppercase tracking-wide">Top Priorities</p>
        <div className="flex flex-wrap gap-1">
          {segment.top_priorities.map((p) => (
            <span key={p} className="badge bg-white/5 text-white/50 text-[10px]">{p}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ConsumerInsights() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Consumer Insights"
        subtitle="Understand your target segments across Africa"
        actions={
          <button className="btn-primary">
            <PlusIcon className="h-4 w-4" />
            New Survey
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MOCK_SEGMENTS.map((s) => (
          <SegmentCard key={s.id} segment={s} />
        ))}
      </div>
    </div>
  )
}
