'use client'

import React, { useState, useMemo, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PlantCard } from './PlantCard'
import { Plant } from './types'
import { offbit } from '@/components/utils/utils'
import { EmptyState } from '@/components/shared/ui'

interface PlantBankLibraryProps {
  plants: Plant[]
  initialQuery?: string
}

const FILTER_OPTIONS = [
  'plant type',
  'habitat system',
  'purpose/uses',
  'foliage colour',
  'foliage habit',
  'flower colour',
  'climatic condition',
  'agro climatic zone',
  'soil type',
]

// 🚨 TEMPORARY MOCK DATA
const mockPlants: Plant[] = [
  {
    id: '1', scientificName: 'ARECA LUTESCANS', subtitle: 'ARECA PALM', commonNames: 'ARECA PALM', imageUrl: '/images/main_illu.png', plantType: 'Palm', foliageColour: 'Green', climaticZone: 'Tropical', attributes: [], iucnStatus: 'LC', uses: 'Ornamental', keywords: ['areca', 'palm'], images: []
  },
  {
    id: '2', scientificName: 'FICUS ELASTICA', subtitle: 'RUBBER PLANT', commonNames: 'RUBBER FIG', imageUrl: '/images/main_illu.png', plantType: 'Tree', foliageColour: 'Dark Green', climaticZone: 'Tropical', attributes: [], iucnStatus: 'LC', uses: 'Indoor', keywords: ['ficus', 'rubber'], images: []
  },
  {
    id: '3', scientificName: 'MONSTERA DELICIOSA', subtitle: 'SWISS CHEESE PLANT', commonNames: 'MONSTERA', imageUrl: '/images/main_illu.png', plantType: 'Climber', foliageColour: 'Green', climaticZone: 'Tropical', attributes: [], iucnStatus: 'LC', uses: 'Indoor', keywords: ['monstera', 'climber'], images: []
  },
  {
    id: '4', scientificName: 'SANSEVIERIA', subtitle: 'SNAKE PLANT', commonNames: 'SNAKE PLANT', imageUrl: '/images/main_illu.png', plantType: 'Succulent', foliageColour: 'Dark Green', climaticZone: 'Arid', attributes: [], iucnStatus: 'LC', uses: 'Ornamental', keywords: ['snake', 'sansevieria'], images: []
  },
  {
    id: '5', scientificName: 'ALOE VERA', subtitle: 'ALOE', commonNames: 'ALOE VERA', imageUrl: '/images/main_illu.png', plantType: 'Succulent', foliageColour: 'Green', climaticZone: 'Arid', attributes: [], iucnStatus: 'LC', uses: 'Medicinal', keywords: ['aloe', 'succulent'], images: []
  },
  {
    id: '6', scientificName: 'PHALAENOPSIS', subtitle: 'MOTH ORCHID', commonNames: 'ORCHID', imageUrl: '/images/main_illu.png', plantType: 'Epiphyte', foliageColour: 'Green', climaticZone: 'Tropical', attributes: [], iucnStatus: 'LC', uses: 'Ornamental', keywords: ['orchid', 'moth'], images: []
  }
]

export const PlantBankLibrary: React.FC<PlantBankLibraryProps> = ({
  plants: apiPlants,
  initialQuery = '',
}) => {
  const plants = apiPlants && apiPlants.length > 0 ? apiPlants : mockPlants
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery)
  
  // Filter Dropdown State
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setSearchQuery(initialQuery)
  }, [initialQuery])

  // Handle click outside to close filter
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggleFilter = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    )
  }

  const filteredPlants = useMemo(() => {
    let result = plants
    const query = searchQuery.trim().toLowerCase()
    if (query) {
      result = result.filter((plant) =>
        [plant.scientificName, plant.subtitle, plant.commonNames, plant.plantType].some((field) => field.toLowerCase().includes(query))
      )
    }
    return result
  }, [plants, searchQuery])

  return (
    <main className='w-full max-w-[1250px] mx-auto bg-[#8CD45F] dark:bg-[#204A2A] rounded-[32px] p-6 shadow-xl flex flex-col h-[650px] max-h-[85vh] relative'>
      
      {/* Top control bar */}
      <div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4 w-full flex-shrink-0 mb-4'>
        
        {/* Title & Count */}
        <div className='flex items-center gap-3'>
          <h2 className={`${offbit.className} text-2xl sm:text-3xl font-bold text-black dark:text-[#EAF2E4] tracking-wide`}>
            PLANT BANK
          </h2>
          <span className={`${offbit.className} text-xs px-3 py-1 rounded-full bg-[#1B2B1E] text-white font-bold`}>
            {filteredPlants.length} items
          </span>
        </div>

        {/* Search Bar */}
        <div className='relative flex items-center w-full md:max-w-[340px] h-10'>
          <svg className='absolute left-3 w-4 h-4 text-black' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='3' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
          </svg>
          <input
            type='text'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder='Search'
            className={`w-full h-full pl-9 pr-10 rounded-full border-2 border-black bg-[#6EBA42] text-black text-sm font-bold focus:outline-none placeholder-black/50 ${offbit.className}`}
          />
          <svg className='absolute right-3 w-4 h-4 text-black cursor-pointer hover:text-gray-800' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='3' d='M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z'></path>
          </svg>
        </div>
      </div>

      {/* Filter Button & Dropdown */}
      <div className='relative mb-6 z-50 w-fit' ref={dropdownRef}>
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className={`${offbit.className} bg-[#3F9B38] hover:bg-[#34822E] text-white text-sm font-bold px-8 py-2 rounded-full transition-colors`}
        >
          FILTER
        </button>

        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              className='absolute top-full left-0 mt-3 w-[280px] bg-white rounded-[20px] shadow-2xl p-6 flex flex-col gap-3 border border-black/5'
            >
              {FILTER_OPTIONS.map((option) => {
                const isActive = activeFilters.includes(option)
                return (
                  <button
                    key={option}
                    onClick={() => toggleFilter(option)}
                    className='flex items-center gap-3 w-full text-left group'
                  >
                    <div className={`w-5 h-5 rounded-md border-2 border-transparent transition-colors flex-shrink-0 ${isActive ? 'bg-black' : 'bg-[#D9D9D9]'}`} />
                    <span className='font-sans text-sm font-semibold text-black group-hover:text-gray-600 transition-colors'>
                      {option}
                    </span>
                  </button>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Grid (3 Columns) */}
      <div className='w-full overflow-y-auto flex-1 pr-3 pb-4 custom-scrollbar'>
        <AnimatePresence mode='popLayout'>
          {filteredPlants.length > 0 ? (
            <motion.div
              key='plant-grid'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch'
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
    <p className={`max-w-md text-center text-[11px] leading-relaxed text-ink dark:text-[#EAF2E4]/70 ${className}`}>
      Disclaimer: We do not own the pictures displayed in any of the plant catalogs, they have been outsourced from respective owners, to whom we give complete credits or may have been generated.
    </p>
  )
}