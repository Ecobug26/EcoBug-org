'use client'

import React, { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PlantCard } from './PlantCard'
import { Plant } from './types'
import { offbit } from '@/components/utils/utils'
import { EmptyState } from '@/components/shared/ui'

interface PlantBankLibraryProps {
  plants: Plant[]
  initialQuery?: string
}

export const PlantBankLibrary: React.FC<PlantBankLibraryProps> = ({
  plants,
  initialQuery = '',
}) => {
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery)

  useEffect(() => {
    setSearchQuery(initialQuery)
  }, [initialQuery])

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
          ...plant.keywords
        ].some((field) => field.toLowerCase().includes(query))
      )
    }
    return result
  }, [plants, searchQuery])

  return (
    <main className='w-full bg-[#F9F9F9] rounded-[32px] p-4 sm:p-6 shadow-xl flex flex-col h-[580px] max-h-[80vh]'>
      
      {/* Top control bar */}
      <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full flex-shrink-0 mb-4'>
        <div className='flex items-center gap-3'>
          <h2 className={`${offbit.className} text-2xl sm:text-3xl font-bold text-black tracking-wide`}>
            PLANT BANK
          </h2>
          <span className={`${offbit.className} text-xs px-3 py-1 rounded-full bg-[#1B2B1E] text-white font-bold`}>
            {filteredPlants.length} {filteredPlants.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        {/* Search Bar */}
        <div className='relative flex items-center w-full sm:max-w-[280px] h-9'>
          <svg className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='3' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
          </svg>
          <input
            type='text'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder='Search'
            className='w-full h-full pl-9 pr-9 rounded-full border-[3px] border-black bg-[#4CAF50] text-black text-xs font-bold focus:outline-none placeholder-black/70'
          />
          <svg className='absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black cursor-pointer hover:text-gray-700' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='3' d='M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z'></path>
          </svg>
        </div>
      </div>

      {/* Grid — scrollable area */}
      <div className='w-full overflow-y-auto flex-1 pt-2 pr-2'>
        <AnimatePresence mode='popLayout'>
          {filteredPlants.length > 0 ? (
            <motion.div
              key='plant-grid'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch pb-4'
            >
              {filteredPlants.map((plant) => (
                <PlantCard key={plant.id} plant={plant} />
              ))}
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
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

export function PlantDisclaimer({ className = '' }: { className?: string }) {
  return (
    <p className={`max-w-md text-center text-[11px] leading-relaxed text-ink ${className}`}>
      Disclaimer: We do not own the pictures displayed in any of the plant catalogs, they have been outsourced from respective owners, to whom we give complete credits or may have been generated.
    </p>
  )
}