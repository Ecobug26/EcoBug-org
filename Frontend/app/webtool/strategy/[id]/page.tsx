'use client'

import React, { use, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Jost } from 'next/font/google'
import AppNavbar from '@/components/shared/AppNavbar'
import AppFooter from '@/components/shared/AppFooter'
import { offbit } from '@/components/utils/utils'
import { useStrategy } from '@/hooks/useStrategies'
import { LoadingState, ErrorState } from '@/components/shared/ui'

// Geometric sans used for the description, category pill and disclaimer
const body = Jost({ subsets: ['latin'], weight: ['400', '500', '600'] })

interface StrategyDetailPageProps {
  params: Promise<{
    id: string
  }>
}

const OUTER_CARD = 'w-full bg-[#8CC563] dark:bg-[#2E4F2C] rounded-[32px]'

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
    // Removed bg-[#E8F3E0]
    <div className='min-h-screen flex flex-col dark:bg-[#102112]'>
      <AppNavbar />

      <main className='flex-1 flex flex-col items-center pt-24 md:pt-28 pb-16 px-4'>
        <h1
          className={`${offbit.className} text-4xl sm:text-5xl md:text-6xl text-black dark:text-[#EAF2E4] tracking-widest uppercase font-bold text-center mb-6 md:mb-8`}
        >
          STRATEGY
        </h1>

        <div className='w-full max-w-6xl'>
          {loading ? (
            <div className={`${OUTER_CARD} p-6 sm:p-8 flex justify-center py-20`}>
              <LoadingState label='Loading strategy...' />
            </div>
          ) : error || !strategy ? (
            <div className={`${OUTER_CARD} p-6 sm:p-8 flex flex-col items-center py-20`}>
              <ErrorState message={error?.message || 'Strategy not found'} />
              <button
                onClick={goBack}
                className={`${offbit.className} mt-4 text-black dark:text-white underline`}
              >
                ← Back to Strategies
              </button>
            </div>
          ) : (
            <>
              {/* Outer card */}
              <div className={`${OUTER_CARD} p-4 sm:p-5 flex flex-col`}>
                {/* Top bar */}
                <div className='flex items-center justify-between w-full mb-3 px-2 sm:px-5'>
                  <button
                    onClick={goBack}
                    aria-label='Close strategy details'
                    className='w-9 h-9 flex items-center justify-center text-black dark:text-white hover:opacity-70 transition-opacity'
                  >
                    <svg
                      className='w-7 h-7'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='3.5'
                      strokeLinecap='square'
                    >
                      <path d='M4 4l16 16M20 4L4 20' />
                    </svg>
                  </button>

                  {/* Search pill */}
                  <div className='flex items-center w-full max-w-[280px] h-9 gap-2 px-3 border-2 border-black rounded-full bg-gradient-to-r from-[#86C65A] to-[#5FA83A] dark:from-[#3A7D44] dark:to-[#2F6638]'>
                    <svg
                      className='w-3.5 h-3.5 flex-shrink-0 text-black dark:text-white'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2.5'
                        d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                      />
                    </svg>
                    <input
                      type='text'
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && submitSearch()}
                      placeholder='Search'
                      className={`${body.className} flex-1 min-w-0 h-full bg-transparent text-black dark:text-white text-xs font-medium focus:outline-none placeholder-black/70 dark:placeholder-white/60`}
                    />
                    <svg
                      className='w-3.5 h-3.5 flex-shrink-0 text-black dark:text-white cursor-pointer'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      aria-hidden='true'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z'
                      />
                    </svg>
                  </div>
                </div>

                {/* Inner card */}
                <div className='w-full bg-[#B5C57D] rounded-[20px] px-5 py-6 md:px-7 md:py-12 flex flex-col lg:flex-row items-center gap-6 md:gap-7'>
                  {/* Image box */}
                  <div className='relative w-full max-w-[320px] lg:max-w-none lg:w-[35%] aspect-[240/245] bg-[#D9D9D9] rounded-[22px] border-2 border-black overflow-hidden flex-shrink-0'>
                    <Image
                      src={strategy.imageUrl}
                      alt={strategy.title}
                      fill
                      className='object-cover'
                      unoptimized
                    />
                  </div>

                  {/* Text content */}
                  <div className='flex flex-col flex-1 min-w-0 w-full'>
                    <h2
                      className={`${offbit.className} text-3xl md:text-4xl lg:text-5xl font-bold uppercase text-black leading-none mb-3`}
                    >
                      {strategy.title}
                    </h2>

                    <span
                      className={`${body.className} self-start bg-[#E0560C] text-black text-[9px] font-semibold px-3 py-1 rounded-full uppercase tracking-wide mb-2`}
                    >
                      {strategy.category}
                    </span>

                    <p
                      className={`${body.className} text-[13px] md:text-[15px] leading-[1.25] text-black`}
                    >
                      {strategy.fullDescription}
                    </p>
                  </div>
                </div>

                {/* Tags */}
                <div className='mt-5 px-2 sm:px-6 flex flex-wrap items-center gap-3'>
                  <span
                    className={`${offbit.className} text-lg text-black dark:text-white font-bold lowercase`}
                  >
                    tags-
                  </span>
                  <div className='flex flex-wrap gap-2.5'>
                    {strategy.keywords.slice(0, 3).map((keyword, idx) => (
                      <span
                        key={idx}
                        className={`${body.className} min-w-9 bg-white text-black text-[10px] font-medium px-3 py-0.5 rounded-full text-center`}
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom actions */}
              <div className='w-full mt-4 flex flex-col sm:flex-row items-center gap-4 sm:gap-14 px-2 sm:px-8'>
                <button
                  className={`${offbit.className} bg-black dark:bg-[#8CC563] text-white dark:text-black text-2xl md:text-3xl px-8 py-2.5 rounded-[20px] hover:bg-gray-800 dark:hover:bg-[#7ab956] transition-colors flex-shrink-0`}
                >
                  SAVE
                </button>

                <p
                  className={`${body.className} text-[9px] md:text-[10px] leading-snug text-black dark:text-white max-w-[340px] text-center sm:text-left`}
                >
                  Disclaimer: We do not own the pictures displayed in any of the plant catalogs,
                  they have been outsourced from respective owners, to whom we give complete
                  credits or may have been generated.
                </p>
              </div>
            </>
          )}
        </div>
      </main>

      <AppFooter />
    </div>
  )
}