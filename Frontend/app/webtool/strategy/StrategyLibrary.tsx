'use client'

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { StrategyCard } from './StrategyCard'
import { CATEGORIES } from './strategiesData'
import { pixelifySans } from '@/components/utils/utils'
import { Strategy } from './types'

interface StrategyLibraryProps {
  strategies: Strategy[]
  loading?: boolean
  error?: Error | null
}

export const StrategyLibrary: React.FC<StrategyLibraryProps> = ({ 
  strategies, 
  loading = false, 
  error = null 
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

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
      <main className="w-full bg-white rounded-[32px] p-3 sm:p-4 shadow-xl flex flex-col items-center justify-center h-[580px] max-h-[80vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-[#2a4225] border-t-transparent animate-spin" />
          <p className={`${pixelifySans.className} text-sm text-[#5a6b57]`}>
            Loading strategies...
          </p>
        </div>
      </main>
    )
  }

  // Error state
  if (error) {
    return (
      <main className="w-full bg-white rounded-[32px] p-3 sm:p-4 shadow-xl flex flex-col items-center justify-center h-[580px] max-h-[80vh]">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="text-4xl">⚠️</div>
          <h3 className={`${pixelifySans.className} text-lg font-bold text-[#2d4428]`}>
            Something went wrong
          </h3>
          <p className={`${pixelifySans.className} text-sm text-[#5a6b57] max-w-sm`}>
            {error.message || 'Failed to load strategies. Please try again.'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className={`${pixelifySans.className} mt-2 text-xs bg-[#2a4225] text-white px-4 py-1.5 rounded-full hover:bg-[#1d3019] transition-colors cursor-pointer`}
          >
            Retry
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="w-full bg-white rounded-[32px] p-3 sm:p-4 shadow-xl flex flex-col h-[580px] max-h-[80vh]">
      {/* Top Control Bar: Search & Category Pills */}
      <div className="flex flex-col gap-2 w-full flex-shrink-0">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2 w-full">
          <div className="flex items-center gap-2 self-start md:self-auto">
            <h2 className={`${pixelifySans.className} text-xl sm:text-2xl text-[#2d4428] font-bold tracking-tight`}>
              Strategy
            </h2>
            <span className={`${pixelifySans.className} text-xs bg-[#2a4225] text-white font-bold px-3 py-0.5 rounded-full shadow-sm`}>
              {filteredStrategies.length} {filteredStrategies.length === 1 ? 'item' : 'items'}
            </span>
          </div>

          <div className="bg-[#bdc5a7] p-1.5 rounded-full flex items-center w-full md:w-[380px] shadow-inner">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search strategies or keywords..."
              className={`w-full bg-white rounded-full py-1.5 px-4 outline-none text-xs sm:text-sm text-[#2d4428] placeholder-[#5a6b57]/70 ${pixelifySans.className}`}
            />
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="bg-[#2a4225] w-7 h-7 rounded-full ml-1 flex items-center justify-center text-white text-xs hover:bg-[#1d3019] transition-colors cursor-pointer flex-shrink-0"
              >
                ✕
              </button>
            ) : (
              <button
                aria-label="Search"
                className="bg-[#2a4225] w-10 h-7 rounded-full ml-1 flex items-center justify-center text-white hover:bg-[#1d3019] transition-colors cursor-pointer flex-shrink-0"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                </svg>
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className={`${pixelifySans.className} text-xs text-[#5a6b57] font-bold mr-1`}>
            Categories:
          </span>
          {CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`${pixelifySans.className} text-xs px-3.5 py-1 rounded-full transition-all cursor-pointer whitespace-nowrap font-bold ${
                  isSelected
                    ? 'bg-[#2a4225] text-white shadow-sm scale-105'
                    : 'bg-[#f6f6f6] text-[#2d4428] hover:bg-[#e6eee0] border border-black/5'
                }`}
              >
                {category}
              </button>
            )
          })}
        </div>
      </div>

      {/* Grid Container - SCROLLABLE AREA */}
      <div className="w-full overflow-y-auto flex-1 mt-2 pr-1">
        <AnimatePresence mode="popLayout">
          {filteredStrategies.length > 0 ? (
            <motion.div
              key="strategy-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-stretch pb-2"
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
              className="w-full py-16 flex flex-col items-center justify-center text-center gap-3 bg-[#f6f6f6] rounded-2xl border border-dashed border-[#2d4428]/20"
            >
              <div className="w-12 h-12 rounded-full bg-[#bdc5a7]/30 flex items-center justify-center text-[#2d4428] text-xl">
                🔍
              </div>
              <h3 className={`${pixelifySans.className} text-lg font-bold text-[#2d4428]`}>
                No Strategies Found
              </h3>
              <p className={`${pixelifySans.className} text-xs text-[#5a6b57] max-w-sm`}>
                No strategy matched your search query &quot;{searchQuery}&quot; in category {selectedCategory}.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('All')
                }}
                className={`${pixelifySans.className} mt-2 text-xs bg-[#2a4225] text-white px-4 py-1.5 rounded-full hover:bg-[#1d3019] transition-colors cursor-pointer`}
              >
                Reset Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}