'use client'

import React, { use, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import AppNavbar from '@/components/shared/AppNavbar'
import AppFooter from '@/components/shared/AppFooter'
import { pixelifySans } from '@/components/utils/utils'
import { useStrategy } from '@/hooks/useStrategies'
import {
  SearchBar,
  Chip,
  LoadingState,
  ErrorState,
  Panel,
} from '@/components/shared/ui'

/**
 * Strategy detail — Figma "STRATEGY" screen:
 * panel with close (X) + search, image, title + category chip,
 * full description and tag row.
 */

interface StrategyDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export default function StrategyDetailPage({ params }: StrategyDetailPageProps) {
  const router = useRouter()
  const { id } = use(params)
  const [search, setSearch] = useState('')

  const { strategy, loading, error } = useStrategy(id)

  const goBack = () => router.push('/webtool/strategy')

  const submitSearch = () => {
    const q = search.trim()
    router.push(q ? `/webtool/strategy?q=${encodeURIComponent(q)}` : '/webtool/strategy')
  }

  return (
    <div className='min-h-screen flex flex-col bg-bg'>
      <AppNavbar />

      <main className='flex-1 flex flex-col items-center pt-28 md:pt-32 pb-16 px-3 sm:px-6'>
        <h1
          className={`${pixelifySans.className} text-4xl sm:text-5xl md:text-6xl text-ink tracking-widest uppercase font-bold text-center`}
        >
          STRATEGY
        </h1>

        <div className='w-full max-w-5xl mt-8 md:mt-10'>
          {loading ? (
            <Panel className='p-6 sm:p-8'>
              <LoadingState label='Loading strategy...' />
            </Panel>
          ) : error || !strategy ? (
            <Panel className='p-6 sm:p-8'>
              <ErrorState
                message={error?.message || "The strategy you're looking for doesn't exist."}
              />
              <div className='flex justify-center'>
                <button
                  onClick={goBack}
                  className={`${pixelifySans.className} text-sm text-primary hover:text-primary-hover transition-colors cursor-pointer`}
                >
                  ← Back to Strategies
                </button>
              </div>
            </Panel>
          ) : (
            <Panel className='p-3 sm:p-5'>
              {/* Panel header: close + search */}
              <div className='flex items-center justify-between gap-3'>
                <button
                  onClick={goBack}
                  aria-label='Close strategy details'
                  className='w-9 h-9 flex items-center justify-center text-ink text-xl hover:bg-chip rounded-full transition-colors cursor-pointer flex-shrink-0'
                >
                  ✕
                </button>

                <SearchBar
                  value={search}
                  onChange={setSearch}
                  onSubmit={submitSearch}
                  onClear={() => {
                    setSearch('')
                    submitSearch()
                  }}
                  className='max-w-[220px]'
                />
              </div>

              {/* Content card */}
              <div className='bg-chip rounded-2xl p-5 sm:p-8 border border-line mt-2 flex-1'>
                <div className='flex flex-col md:flex-row gap-6 md:gap-8'>
                  {/* Image */}
                  <div className='w-full md:w-64 h-48 md:h-64 bg-panel border-2 border-line rounded-xl flex items-center justify-center p-4 flex-shrink-0 overflow-hidden'>
                    <Image
                      src={strategy.imageUrl}
                      alt={strategy.title}
                      width={220}
                      height={220}
                      className='max-w-full max-h-full object-contain'
                      unoptimized
                    />
                  </div>

                  {/* Text */}
                  <div className='flex-1 min-w-0 flex flex-col'>
                    <h2
                      className={`${pixelifySans.className} text-xl sm:text-2xl md:text-3xl font-bold text-ink leading-tight`}
                    >
                      {strategy.title}
                    </h2>
                    <Chip className='mt-2 self-start'>{strategy.category}</Chip>

                    <p className='text-sm text-ink leading-relaxed mt-4 whitespace-pre-line'>
                      {strategy.fullDescription}
                    </p>
                  </div>
                </div>

                {/* Tags */}
                <div className='mt-6'>
                  <h3
                    className={`${pixelifySans.className} text-xs text-ink-muted font-bold mb-1.5`}
                  >
                    tags:
                  </h3>
                  <div className='flex flex-wrap gap-1.5'>
                    {strategy.keywords.map((keyword) => (
                      <span
                        key={keyword}
                        className={`${pixelifySans.className} text-[10px] bg-panel px-2.5 py-1 rounded-full text-ink border border-line`}
                      >
                        #{keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Panel>
          )}
        </div>
      </main>

      <AppFooter />
    </div>
  )
}