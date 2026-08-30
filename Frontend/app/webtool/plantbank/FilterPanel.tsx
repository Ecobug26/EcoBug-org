'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { pixelifySans } from '@/components/utils/utils'
import { Plant, PLANT_FILTER_FIELDS } from './types'

export type PlantFilters = Partial<Record<keyof Plant, string[]>>

interface FilterPanelProps {
  open: boolean
  onClose: () => void
  plants: Plant[]
  filters: PlantFilters
  onChange: (filters: PlantFilters) => void
}

/**
 * Slide-in filter panel listing all categorical fields with their
 * distinct values found in the data. AND between fields, OR within.
 */
export const FilterPanel: React.FC<FilterPanelProps> = ({
  open,
  onClose,
  plants,
  filters,
  onChange,
}) => {
  function toggleValue(field: keyof Plant, value: string) {
    const current = filters[field] ?? []
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value]
    const updated = { ...filters }
    if (next.length === 0) delete updated[field]
    else updated[field] = next
    onChange(updated)
  }

  function clearAll() {
    onChange({})
  }

  const activeCount = Object.values(filters).reduce(
    (n, vals) => n + (vals?.length ?? 0),
    0
  )

  return (
    <motion.div
      initial={false}
      animate={{ x: open ? 0 : '-100%' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className='absolute inset-y-2 left-2 z-20 w-64 md:w-72 bg-[#8b9464]/95 backdrop-blur-sm rounded-xl shadow-2xl border border-black/10 flex flex-col overflow-hidden'
    >
      <div className='flex items-center justify-between px-4 py-3 border-b border-black/10 flex-shrink-0'>
        <span className={`${pixelifySans.className} text-sm font-bold text-[#f2f0e4]`}>
          Filter {activeCount > 0 && `(${activeCount})`}
        </span>
        <div className='flex items-center gap-2'>
          {activeCount > 0 && (
            <button
              onClick={clearAll}
              className={`${pixelifySans.className} text-[10px] text-[#f2f0e4]/80 hover:text-white underline cursor-pointer`}
            >
              clear
            </button>
          )}
          <button
            onClick={onClose}
            aria-label='Close filters'
            className='text-[#f2f0e4] hover:text-white transition-colors cursor-pointer text-lg leading-none'
          >
            ✕
          </button>
        </div>
      </div>

      <div className='flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-4'>
        {PLANT_FILTER_FIELDS.map(({ key, label }) => {
          const values = Array.from(
            new Set(
              plants
                .map((p) => p[key])
                .filter((v): v is string => typeof v === 'string' && v.trim() !== '')
            )
          ).sort()
          if (values.length === 0) return null

          return (
            <div key={String(key)}>
              <h4
                className={`${pixelifySans.className} text-[11px] font-bold text-[#2d4428] uppercase tracking-wide mb-1.5`}
              >
                {label}
              </h4>
              <div className='flex flex-wrap gap-1.5'>
                {values.map((value) => {
                  const selected = filters[key]?.includes(value) ?? false
                  return (
                    <button
                      key={value}
                      onClick={() => toggleValue(key, value)}
                      className={`${pixelifySans.className} text-[10px] px-2 py-0.5 rounded-full border transition-colors cursor-pointer
                        ${
                          selected
                            ? 'bg-[#2d4428] text-[#f2f0e4] border-[#2d4428]'
                            : 'bg-[#f2f0e4]/70 text-[#2d4428] border-black/10 hover:bg-[#f2f0e4]'
                        }`}
                    >
                      {value}
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}
