'use client'

import React, { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PlantCard } from './PlantCard'
import { Plant } from './types'
import { offbit } from '@/components/utils/utils'
import { SearchBar, EmptyState } from '@/components/shared/ui'

interface PlantBankLibraryProps {
  plants: Plant[]
  /** Optional initial search query (e.g. from the detail page search bar) */
  initialQuery?: string
}

/**
 * Plant Bank panel — Figma WEBTOOL screen: green rounded panel with
 * PLANT BANK title + item count pill, search bar, and a responsive
 * grid of plant cards (scrollable like the Strategy library).
 */
export const PlantBankLibrary: React.FC<PlantBankLibraryProps> = ({
  plants,
  initialQuery = '',
}) => {
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery)

  useEffect(() => {
    setSearchQuery(initialQuery)
  }, [initialQuery])

  const filteredPlants = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) return plants

    return plants.filter((plant) =>
      [
        plant.scientificName,
        plant.subtitle,
        plant.commonNames,
        plant.plantType,
        plant.foliageColour,
        plant.climaticZone,
        ...plant.keywords,
      ].some((field) => field.toLowerCase().includes(query))
    )
  }, [plants, searchQuery])

  return (
    <main className='w-full bg-card rounded-[32px] p-3 sm:p-4 shadow-[0_10px_30px_rgba(0,0,0,0.15)] flex flex-col h-[580px] max-h-[80vh]'>
      {/* Top control bar: title + count, search */}
      <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 w-full flex-shrink-0'>
        <div className='flex items-center gap-2'>
          <h2 className={`${offbit.className} text-xl sm:text-2xl font-bold text-ink tracking-wide`}>
            PLANT BANK
          </h2>
          <span
            className={`${offbit.className} text-[10px] px-2.5 py-0.5 rounded-full bg-primary-hover text-panel font-bold`}
          >
            {filteredPlants.length} {filteredPlants.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onClear={() => setSearchQuery('')}
          className='max-w-full sm:max-w-[240px]'
        />
      </div>

      {/* Grid — scrollable area */}
      <div className='w-full overflow-y-auto flex-1 mt-4 pr-1'>
        <AnimatePresence mode='popLayout'>
          {filteredPlants.length > 0 ? (
            <motion.div
              key='plant-grid'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch pb-2'
            >
              {filteredPlants.map((plant) => (
                <PlantCard key={plant.id} plant={plant} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <EmptyState
                title='No Plants Found'
                message={`No plant matched your search query "${searchQuery}".`}
                onReset={() => setSearchQuery('')}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}

/** Figma disclaimer shown under the Plant Bank list panel and detail screen. */
export function PlantDisclaimer({ className = '' }: { className?: string }) {
  return (
    <p className={`max-w-md text-center text-[11px] leading-relaxed text-ink ${className}`}>
      Disclaimer: We do not own the pictures displayed in any of the plant catalogs, they have
      been outsourced from respective owners, to whom we give complete credits or may have been
      generated.
    </p>
  )
}
