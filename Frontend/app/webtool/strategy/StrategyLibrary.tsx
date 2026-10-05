'use client'

import React, { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { StrategyCard } from './StrategyCard'
import { pixelifySans } from '@/components/utils/utils'
import { Strategy } from './types'
import {
  SearchBar,
  Chip,
  LoadingState,
  ErrorState,
  EmptyState,
} from '@/components/shared/ui'

interface StrategyLibraryProps {
  strategies: Strategy[]
  loading?: boolean
  error?: Error | null
  /** Optional initial search query (e.g. from the detail page search bar) */
  initialQuery?: string
}

export const StrategyLibrary: React.FC<StrategyLibraryProps> = ({
  strategies,
  loading = false,
  error = null,
  initialQuery = '',
}) => {
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery)
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  // Category chips are derived from the actual data (Supabase rows),
  // so the filter bar always matches what the table contains.
  const categories = useMemo(() => {
    const unique = Array.from(new Set(strategies.map((s) => s.category))).sort(
      (a, b) => a.localeCompare(b)
    )
    return ['All', ...unique]
  }, [strategies])

  useEffect(() => {
    setSearchQuery(initialQuery)
  }, [initialQuery])

  const filteredStrategies = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    return strategies.filter((strategy) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        strategy.category.toLowerCase() === selectedCategory.toLowerCase()

      if (!matchesCategory) return false

      if (!query) return true

      const matchesTitle = strategy.title.toLowerCase().includes(query)
      const matchesCat = strategy.category.toLowerCase().includes(query)
      const matchesKeywords = strategy.keywords.some((kw) =>
        kw.toLowerCase().includes(query)
      )
      const matchesSummary = strategy.summary.toLowerCase().includes(query)

      return matchesTitle || matchesCat || matchesKeywords || matchesSummary
    })
  }, [strategies, searchQuery, selectedCategory])

  // Loading state
  if (loading) {
    return (
      <main className='w-full bg-panel rounded-[32px] p-3 sm:p-4 shadow-[0_10px_30px_rgba(0,0,0,0.15)] h-[580px] max-h-[80vh] flex items-center justify-center'>
        <LoadingState label='Loading strategies...' />
      </main>
    )
  }

  // Error state
  if (error) {
    return (
      <main className='w-full bg-panel rounded-[32px] p-3 sm:p-4 shadow-[0_10px_30px_rgba(0,0,0,0.15)] h-[580px] max-h-[80vh] flex items-center justify-center'>
        <ErrorState
          message={error.message || 'Failed to load strategies. Please try again.'}
          onRetry={() => window.location.reload()}
        />
      </main>
    )
  }

  return (
    <main className='w-full bg-panel rounded-[32px] p-3 sm:p-4 shadow-[0_10px_30px_rgba(0,0,0,0.15)] flex flex-col h-[580px] max-h-[80vh]'>
      {/* Top control bar: title + count, search, category chips */}
      <div className='flex flex-col gap-2 w-full flex-shrink-0'>
        <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 w-full'>
          <div className='flex items-center gap-2'>
            <h2 className={`${pixelifySans.className} text-xl sm:text-2xl font-bold text-ink tracking-wide`}>
              STRATEGY
            </h2>
            <span
              className={`${pixelifySans.className} text-[10px] px-2.5 py-0.5 rounded-full bg-tertiary text-primary-hover font-bold`}
            >
              {strategies.length} items
            </span>
          </div>

          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onClear={() => setSearchQuery('')}
            className='max-w-full sm:max-w-[240px]'
          />
        </div>

        <div className='flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none'>
          <span className={`${pixelifySans.className} text-xs text-ink-muted font-bold mr-1 flex-shrink-0`}>
            Categories:
          </span>
          {categories.map((category) => (
            <Chip
              key={category}
              active={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Chip>
          ))}
        </div>
      </div>

      {/* Grid — scrollable area */}
      <div className='w-full overflow-y-auto flex-1 mt-2 pr-1'>
        <AnimatePresence mode='popLayout'>
          {filteredStrategies.length > 0 ? (
            <motion.div
              key='strategy-grid'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch pb-2'
            >
              {filteredStrategies.map((strategy) => (
                <StrategyCard key={strategy.id} strategy={strategy} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <EmptyState
                title='No Strategies Found'
                message={`No strategy matched your search query "${searchQuery}" in category ${selectedCategory}.`}
                onReset={() => {
                  setSearchQuery('')
                  setSelectedCategory('All')
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}
