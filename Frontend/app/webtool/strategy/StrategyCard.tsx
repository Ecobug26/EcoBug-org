'use client'

import React from 'react'
import { LibraryCard } from '@/components/shared/LibraryCard'
import { Strategy } from './types'

interface StrategyCardProps {
  strategy: Strategy
}

/**
 * Thin wrapper mapping a Strategy entry onto the reusable LibraryCard.
 * Each strategy in the data source (Supabase table or local fallback)
 * automatically becomes one card.
 */
export const StrategyCard: React.FC<StrategyCardProps> = ({ strategy }) => {
  return (
    <LibraryCard
      title={strategy.title}
      category={strategy.category}
      summary={strategy.summary}
      imageUrl={strategy.imageUrl}
      keywords={strategy.keywords}
      fallbackTag='#strategy'
      href={`/webtool/strategy/${strategy.id}`}
    />
  )
}
