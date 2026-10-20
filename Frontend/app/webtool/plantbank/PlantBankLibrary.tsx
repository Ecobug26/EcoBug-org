'use client'

import React, { useState, useMemo, useEffect, useCallback } from 'react'
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

/** Unique filter options derived from the plant list. */
function useFilterOptions(plants: Plant[]) {
  const types = useMemo(
    () => [...new Set(plants.map((p) => p.plantType).filter(Boolean))],
    [plants]
  )
  const colours = useMemo(
    () => [...new Set(plants.map((p) => p.foliageColour).filter(Boolean))],
    [plants]
  )
  const zones = useMemo(
    () => [...new Set(plants.map((p) => p.climaticZone).filter(Boolean))],
    [plants]
  )
  return { types, colours, zones }
}

/** Pill-style filter chip that toggles a filter value. */
function FilterChip({
  label,
  value,
  active,
  onToggle,
}: {
  label: string
  value: string
  active: boolean
  onToggle: (value: string) => void
}) {
  return (
    <button
      onClick={() => onToggle(value)}
      className={`px-3 py-1 rounded-full text-[10px] font-bold transition-colors ${
        active
          ? 'bg-primary-hover text-panel border border-ink'
          : 'bg-card text-ink border border-ink/30 hover:bg-primary-hover/20'
      }`}
    >
      {label}
    </button>
  )
}

/**
 * Plant Bank panel — Figma WEBTOOL screen: green rounded panel with
 * PLANT BANK title + item count pill, filter sidebar (type / colour / zone),
 * search bar, and a responsive grid of plant cards.
 */
export const PlantBankLibrary: React.FC<PlantBankLibraryProps> = ({
  plants,
  initialQuery = '',
}) => {
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery)
  const [filterType, setFilterType] = useState<string | null>(null)
  const [filterColour, setFilterColour] = useState<string | null>(null)
  const [filterZone, setFilterZone] = useState<string | null>(null)

  const { types, colours, zones } = useFilterOptions(plants)

  useEffect(() => {
    setSearchQuery(initialQuery)
  }, [initialQuery])

  const toggleType = useCallback((val: string) => {
    setFilterType(filterType === val ? null : val)
  }, [filterType])

  const toggleColour = useCallback((val: string) => {
    setFilterColour(filterColour === val ? null : val)
  }, [filterColour])

  const toggleZone = useCallback((val: string) => {
    setFilterZone(filterZone === val ? null : val)
  }, [filterZone])

  const filteredPlants = useMemo(() => {
    let result = plants

    const query = searchQuery.trim().toLowerCase()
    if (query) {
      result = result.filter((plant) =>
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
    }

    if (filterType) {
      result = result.filter((p) => p.plantType === filterType)
    }

    if (filterColour) {
      result = result.filter((p) => p.foliageColour === filterColour)
    }

    if (filterZone) {
      result = result.filter((p) => p.climaticZone === filterZone)
    }

    return result
  }, [plants, searchQuery, filterType, filterColour, filterZone])

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

      {/* Filter sidebar — plant type / foliage colour / climatic zone */}
      <div className='w-full flex-shrink-0 mt-4 sm:mt-6 space-y-3'>
        <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2'>
          <div className='flex-1 min-w-0'>
            <p className={`${offbit.className} text-[10px] font-bold text-ink tracking-wide mb-1.5`}>
              PLANT TYPE
            </p>
            <div className='flex flex-wrap gap-1.5'>
              {types.map((t) => (
                <FilterChip
                  key={t}
                  label={t}
                  value={t}
                  active={filterType === t}
                  onToggle={toggleType}
                />
              ))}
            </div>
          </div>
          <div className='flex-1 min-w-0 sm:mt-0 mt-3'>
            <p className={`${offbit.className} text-[10px] font-bold text-ink tracking-wide mb-1.5`}>
              FOLIAGE COLOUR
            </p>
            <div className='flex flex-wrap gap-1.5'>
              {colours.map((c) => (
                <FilterChip
                  key={c}
                  label={c}
                  value={c}
                  active={filterColour === c}
                  onToggle={toggleColour}
                />
              ))}
            </div>
          </div>
          <div className='flex-1 min-w-0 sm:mt-0 mt-3'>
            <p className={`${offbit.className} text-[10px] font-bold text-ink tracking-wide mb-1.5`}>
              CLIMATIC ZONE
            </p>
            <div className='flex flex-wrap gap-1.5'>
              {zones.map((z) => (
                <FilterChip
                  key={z}
                  label={z}
                  value={z}
                  active={filterZone === z}
                  onToggle={toggleZone}
                />
              ))}
            </div>
          </div>
        </div>
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
