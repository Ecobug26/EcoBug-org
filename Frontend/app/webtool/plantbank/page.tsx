'use client'

import React, { useMemo, useState } from 'react'
import GlobalHamburger from '@/components/shared/GlobalHamburger'
import { pixelifySans } from '@/components/utils/utils'
import { usePlants } from '@/hooks/usePlants'
import { PlantCard } from './PlantCard'
import { FilterPanel, PlantFilters } from './FilterPanel'
import { Plant } from './types'

export default function PlantBankPage() {
  const { plants, loading, error, refetch } = usePlants()
  const [searchQuery, setSearchQuery] = useState('')
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [filters, setFilters] = useState<PlantFilters>({})

  const filteredPlants = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    return plants.filter((plant) => {
      // Categorical filters: AND between fields, OR within a field
      for (const [field, values] of Object.entries(filters)) {
        if (!values || values.length === 0) continue
        const plantValue = plant[field as keyof Plant]
        if (typeof plantValue !== 'string' || !values.includes(plantValue)) {
          return false
        }
      }

      if (!query) return true
      return (
        plant.commonName.toLowerCase().includes(query) ||
        (plant.family ?? '').toLowerCase().includes(query) ||
        (plant.purposes ?? '').toLowerCase().includes(query) ||
        (plant.plantType ?? '').toLowerCase().includes(query)
      )
    })
  }, [plants, filters, searchQuery])

  return (
    <>
      <GlobalHamburger />
      <div
        className={`min-h-screen bg-[#38763d] flex flex-col items-center p-2 sm:p-3 select-none ${pixelifySans.className}`}
      >
        <header className='w-full max-w-full flex items-center justify-center py-2 px-2 mb-1 relative'>
          <h1
            className={`${pixelifySans.className} text-3xl sm:text-4xl text-[#1d3d1e] tracking-widest uppercase font-bold text-center`}
          >
            WEBTOOL
          </h1>
        </header>

        <main className='w-full max-w-full flex-1 min-h-0'>
          <div className='relative w-full bg-[#414a2b] rounded-2xl p-2 sm:p-3 shadow-xl h-[580px] max-h-[80vh] flex flex-col'>
            {/* Top bar: Filter button + search */}
            <div className='flex items-center justify-between flex-shrink-0 px-1 pb-2'>
              <button
                onClick={() => setFiltersOpen((o) => !o)}
                className={`${pixelifySans.className} flex items-center gap-1.5 text-xs text-[#f2f0e4] bg-[#5c663c] hover:bg-[#6b764a] px-3 py-1.5 rounded-full transition-colors cursor-pointer`}
              >
                <span className='w-3.5 h-3.5 rounded-full bg-[#dcc9a4] inline-block' />
                Filter
              </button>

              <div className='flex items-center bg-white rounded-full h-9 w-48 sm:w-64 md:w-80 shadow-inner px-3'>
                <input
                  type='text'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder='Search plants...'
                  className='flex-1 outline-none text-xs text-[#2d4428] placeholder-[#5a6b57]/70 bg-transparent'
                />
                <button
                  aria-label='Search'
                  className='bg-[#77804f] w-7 h-7 rounded-full flex items-center justify-center text-white hover:bg-[#5c663c] transition-colors cursor-pointer flex-shrink-0'
                >
                  <svg className='w-3.5 h-3.5 fill-current' viewBox='0 0 24 24'>
                    <path d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z' />
                  </svg>
                </button>
              </div>
            </div>

            {/* Filter panel */}
            <FilterPanel
              open={filtersOpen}
              onClose={() => setFiltersOpen(false)}
              plants={plants}
              filters={filters}
              onChange={setFilters}
            />

            {/* Grid */}
            <div className='flex-1 overflow-y-auto min-h-0 pr-1'>
              {loading ? (
                <div className='h-full flex flex-col items-center justify-center gap-3'>
                  <div className='w-10 h-10 rounded-full border-4 border-[#dcc9a4] border-t-transparent animate-spin' />
                  <p className='text-xs text-[#f2f0e4]'>Loading plants...</p>
                </div>
              ) : error ? (
                <div className='h-full flex flex-col items-center justify-center gap-3 text-center'>
                  <div className='text-3xl'>⚠️</div>
                  <p className='text-xs text-[#f2f0e4] max-w-sm'>
                    {error.message || 'Failed to load plants.'}
                  </p>
                  <button
                    onClick={refetch}
                    className='text-xs bg-[#dcc9a4] text-[#2d4428] px-4 py-1.5 rounded-full hover:bg-[#e4d3b0] transition-colors cursor-pointer'
                  >
                    Retry
                  </button>
                </div>
              ) : filteredPlants.length > 0 ? (
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 pb-2'>
                  {filteredPlants.map((plant, i) => (
                    <PlantCard key={plant.id} plant={plant} index={i} />
                  ))}
                </div>
              ) : (
                <div className='h-full flex flex-col items-center justify-center gap-3 text-center'>
                  <div className='text-3xl'>🌱</div>
                  <h3 className='text-sm font-bold text-[#f2f0e4]'>
                    {plants.length === 0 ? 'No plants yet' : 'No plants found'}
                  </h3>
                  <p className='text-[10px] text-[#f2f0e4]/80 max-w-xs'>
                    {plants.length === 0
                      ? 'The plant bank is empty. Plants added to the database will appear here.'
                      : 'No plant matched your search or filters.'}
                  </p>
                  {(searchQuery || Object.keys(filters).length > 0) && (
                    <button
                      onClick={() => {
                        setSearchQuery('')
                        setFilters({})
                      }}
                      className='text-xs bg-[#dcc9a4] text-[#2d4428] px-4 py-1.5 rounded-full hover:bg-[#e4d3b0] transition-colors cursor-pointer'
                    >
                      Reset
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

