'use client'

import React, { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { StrategyCard } from './StrategyCard'
import { offbit } from '@/components/utils/utils'
import { Strategy } from './types'
import {
  LoadingState,
  ErrorState,
  EmptyState,
} from '@/components/shared/ui'

interface StrategyLibraryProps {
  strategies: Strategy[]
  loading?: boolean
  error?: Error | null
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

  if (loading) {
    return (
      <main className='w-full bg-[#6DBE51] dark:bg-[#204A2A] rounded-[32px] p-3 sm:p-4 shadow-xl h-[580px] max-h-[80vh] flex items-center justify-center'>
        <LoadingState label='Loading strategies...' />
      </main>
    )
  }

  if (error) {
    return (
      <main className='w-full bg-[#6DBE51] dark:bg-[#204A2A] rounded-[32px] p-3 sm:p-4 shadow-xl h-[580px] max-h-[80vh] flex items-center justify-center'>
        <ErrorState
          message={error.message || 'Failed to load strategies. Please try again.'}
          onRetry={() => window.location.reload()}
        />
      </main>
    )
  }

  return (
    <main className='w-full bg-[#6DBE51] dark:bg-[#204A2A] rounded-[32px] p-4 sm:p-6 shadow-xl flex flex-col h-[650px] max-h-[85vh]'>
      
      {/* Top control bar */}
      <div className='flex flex-col gap-4 w-full flex-shrink-0 mb-4'>
        <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4 w-full'>
          
          <div className='flex items-center gap-3'>
            <h2 className={`${offbit.className} text-2xl sm:text-3xl font-bold text-white tracking-wide`}>
              STRATEGY
            </h2>
            <span className={`${offbit.className} text-xs px-3 py-1 rounded-full bg-[#1B2B1E] text-white font-bold`}>
              {filteredStrategies.length} items
            </span>
          </div>

          {/* Search Bar */}
          <div className='relative flex items-center w-full md:max-w-[380px] h-10'>
            <svg className='absolute left-3 w-4 h-4 text-black dark:text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='3' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
            </svg>
            <input
              type='text'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Search'
              className='w-full h-full pl-9 pr-10 rounded-full border-2 border-black dark:border-black bg-[#5CA341] dark:bg-[#2A5C38] text-black dark:text-white text-sm font-bold focus:outline-none placeholder-black/60 dark:placeholder-white/60'
            />
            <svg className='absolute right-3 w-4 h-4 text-black dark:text-white cursor-pointer hover:text-gray-800 dark:hover:text-gray-300' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='3' d='M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z'></path>
            </svg>
          </div>
        </div>

        {/* Category Pills */}
        <div className='flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none'>
          <span className={`${offbit.className} text-sm text-black dark:text-white font-bold uppercase tracking-wide mr-1 flex-shrink-0`}>
            CATEGORIES:
          </span>
          {categories.map((category) => {
            const isSelected = selectedCategory === category
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`${offbit.className} text-xs md:text-sm px-5 py-1.5 rounded-full transition-all cursor-pointer whitespace-nowrap font-bold ${
                  isSelected
                    ? 'bg-[#1B2B1E] text-white dark:bg-[#102112] dark:text-white shadow-sm'
                    : 'bg-[#8DE056] text-black dark:bg-[#9EE066] dark:text-black hover:bg-[#7DCA4C] dark:hover:bg-[#8CD958]'
                }`}
              >
                {category.toUpperCase()}
              </button>
            )
          })}
        </div>
      </div>

      {/* Grid */}
      <div className='w-full overflow-y-auto flex-1 pt-8 pr-2'>
        <AnimatePresence mode='popLayout'>
          {filteredStrategies.length > 0 ? (
            <motion.div
              key='strategy-grid'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch pb-4'
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