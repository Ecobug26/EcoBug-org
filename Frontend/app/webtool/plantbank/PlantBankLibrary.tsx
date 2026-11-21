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

const ITEMS_PER_PAGE = 24

export const PlantBankLibrary: React.FC<PlantBankLibraryProps> = ({
  plants: apiPlants,
  initialQuery = '',
}) => {
  // Use API data directly. If empty, the UI will render the EmptyState.
  const plants = apiPlants || []
  
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setSearchQuery(initialQuery)
  }, [initialQuery])

  const filteredPlants = useMemo(() => {
    let result = plants
    const query = searchQuery.trim().toLowerCase()
    if (query) {
      result = result.filter((plant) => {
        const basicFields = [
          plant.scientificName,
          plant.subtitle,
          plant.commonNames,
          plant.plantType
        ].join(' ')

        const attributeText = (plant.attributes || [])
          .flatMap(attr => [attr.heading, ...(attr.lines || [])])
          .join(' ')

        return `${basicFields} ${attributeText}`.toLowerCase().includes(query)
      })
    }
    return result
  }, [plants, searchQuery])

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

  const totalPages = Math.ceil(filteredPlants.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedPlants = filteredPlants.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  return (
    <main className='w-full max-w-[1250px] mx-auto bg-[#8CD45F] dark:bg-[#204A2A] rounded-[32px] p-6 shadow-xl flex flex-col h-[650px] max-h-[85vh]'>
      
      <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4 w-full flex-shrink-0 mb-4'>
        <div className='flex items-center gap-3'>
          <h2 className={`${offbit.className} text-2xl sm:text-3xl font-bold text-black dark:text-white tracking-wide`}>
            PLANT BANK
          </h2>
          <span className={`${offbit.className} text-xs px-3 py-1 rounded-full bg-[#1B2B1E] text-white font-bold`}>
            {filteredPlants.length} items
          </span>
        </div>

        <div className='relative flex items-center w-full md:max-w-[340px] h-10'>
          <svg className='absolute left-3 w-4 h-4 text-black dark:text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='3' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
          </svg>
          <input
            type='text'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder='Search'
            className={`w-full h-full pl-9 pr-10 rounded-full border-2 border-black bg-[#6EBA42] dark:bg-[#102112] text-black dark:text-white text-sm font-bold focus:outline-none placeholder-black/50 dark:placeholder-white/50 ${offbit.className}`}
          />
          <svg className='absolute right-3 w-4 h-4 text-black dark:text-white cursor-pointer hover:text-gray-800' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='3' d='M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z'></path>
          </svg>
        </div>
      </div>

      <div className='w-full overflow-y-auto flex-1 pr-3 pb-4 custom-scrollbar'>
        <AnimatePresence mode='popLayout'>
          {paginatedPlants.length > 0 ? (
            <motion.div
              key={`plant-grid-${currentPage}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch'
            >
              {paginatedPlants.map((plant) => (
                <PlantCard key={plant.id} plant={plant} />
              ))}
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <EmptyState
                title='No Plants Found'
                message={searchQuery ? `No plant matched your search query "${searchQuery}".` : "No plants available at the moment."}
                onReset={() => setSearchQuery('')}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {totalPages > 1 && (
        <div className='w-full flex justify-center items-center gap-6 mt-4 pt-4 border-t-2 border-black/10 dark:border-white/10 flex-shrink-0'>
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={`${offbit.className} px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${
              currentPage === 1
                ? 'bg-black/10 text-black/30 dark:bg-white/10 dark:text-white/30 cursor-not-allowed'
                : 'bg-[#1B2B1E] text-white hover:bg-[#102112] cursor-pointer'
            }`}
          >
            ← Prev
          </button>
          
          <span className={`${offbit.className} text-sm font-bold text-black dark:text-white`}>
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className={`${offbit.className} px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${
              currentPage === totalPages
                ? 'bg-black/10 text-black/30 dark:bg-white/10 dark:text-white/30 cursor-not-allowed'
                : 'bg-[#1B2B1E] text-white hover:bg-[#102112] cursor-pointer'
            }`}
          >
            Next →
          </button>
        </div>
      )}
    </main>
  )
}

export function PlantDisclaimer({ className = '' }: { className?: string }) {
  return (
    <p className={`max-w-md text-center text-[11px] leading-relaxed text-ink dark:text-[#EAF2E4]/70 ${className}`}>
      Disclaimer: We do not own the pictures displayed in any of the plant catalogs, they have been outsourced from respective owners, to whom we give complete credits or may have been generated.
    </p>
  )
}