import { useState } from 'react'
import { PlusIcon, ChartBarIcon } from '@heroicons/react/24/outline'
import PageHeader from '@components/ui/PageHeader'
import Badge from '@components/ui/Badge'
import EmptyState from '@components/ui/EmptyState'
import { useBrands } from '@hooks/useBrands'
import { formatRelative } from '@utils/format'
import type { Brand } from '@types/index'

const CATEGORY_LABELS: Record<string, string> = {
  fmcg: 'FMCG', fintech: 'Fintech', telecom: 'Telecom',
  retail: 'Retail', healthcare: 'Healthcare', agriculture: 'Agriculture',
  energy: 'Energy', media: 'Media', logistics: 'Logistics', other: 'Other',
}

function BrandCard({ brand }: { brand: Brand }) {
  return (
    <div className="card-hover p-5 cursor-pointer">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/15 text-brand-300 font-bold text-sm">
            {brand.name[0]}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">{brand.name}</h3>
            <p className="text-xs text-white/40">{CATEGORY_LABELS[brand.category] ?? brand.category}</p>
          </div>
        </div>
        {brand.is_competitor && (
          <Badge variant="warning">Competitor</Badge>
        )}
      </div>

      <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/5">
        {[
          { label: 'Awareness', value: '–' },
          { label: 'Sentiment', value: '–' },
          { label: 'Mentions', value: '–' },
        ].map((m) => (
          <div key={m.label}>
            <p className="text-lg font-bold text-white">{m.value}</p>
            <p className="text-xs text-white/40">{m.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap gap-1">
        {brand.markets.slice(0, 3).map((m) => (
          <span key={m} className="badge bg-white/5 text-white/40 text-[10px]">{m}</span>
        ))}
        {brand.markets.length > 3 && (
          <span className="badge bg-white/5 text-white/40 text-[10px]">+{brand.markets.length - 3}</span>
        )}
      </div>
    </div>
  )
}

export default function BrandIntelligence() {
  const [filter, setFilter] = useState<'all' | 'owned' | 'competitors'>('all')
  const { data: brands, isLoading } = useBrands()

  const filtered = brands?.filter((b) => {
    if (filter === 'owned') return !b.is_competitor
    if (filter === 'competitors') return b.is_competitor
    return true
  }) ?? []

  return (
    <div className="space-y-6">
      <PageHeader
        title="Brand Intelligence"
        subtitle="Monitor brand health, sentiment, and share of voice"
        actions={
          <button className="btn-primary">
            <PlusIcon className="h-4 w-4" />
            Add Brand
          </button>
        }
      />

      {/* Filters */}
      <div className="flex gap-1 rounded-xl bg-white/5 p-1 w-fit">
        {(['all', 'owned', 'competitors'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-lg px-4 py-1.5 text-sm font-medium capitalize transition-all ${
              filter === f
                ? 'bg-brand-500 text-white shadow'
                : 'text-white/50 hover:text-white'
            }`}
          >
            {f === 'all' ? 'All Brands' : f === 'owned' ? 'My Brands' : 'Competitors'}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="card p-5 space-y-3">
              <div className="skeleton h-10 w-10 rounded-xl" />
              <div className="skeleton h-4 w-32" />
              <div className="skeleton h-3 w-20" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={<ChartBarIcon className="h-8 w-8" />}
          title="No brands yet"
          description="Add your first brand to start tracking intelligence and sentiment."
          action={
            <button className="btn-primary">
              <PlusIcon className="h-4 w-4" />
              Add Brand
            </button>
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((brand) => (
            <BrandCard key={brand.id} brand={brand} />
          ))}
        </div>
      )}
    </div>
  )
}
