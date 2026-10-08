'use client'

import React, { Suspense, JSX } from 'react'
import { useSearchParams } from 'next/navigation'
import AppNavbar from '@/components/shared/AppNavbar'
import AppFooter from '@/components/shared/AppFooter'
import { offbit } from '@/components/utils/utils'
import { StrategyLibrary } from './StrategyLibrary'
import { useStrategies } from '@/hooks/useStrategies'

/**
 * Strategy List — Figma screen: AppNavbar, big "WEBTOOL" pixel title,
 * then the StrategyLibrary panel (search, dynamic category chips, cards).
 * Wrapped in <Suspense> because it reads the `?q=` search param.
 */
function StrategyLibrarySection() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') ?? ''
  const { strategies, loading, error } = useStrategies()

  return (
    <StrategyLibrary
      strategies={strategies}
      loading={loading}
      error={error}
      initialQuery={initialQuery}
    />
  )
}

export default function StrategyPage(): JSX.Element {
  return (
    <div className='min-h-screen flex flex-col bg-bg'>
      <AppNavbar />

      <main className='flex-1 flex flex-col items-center pt-28 md:pt-32 pb-16 px-2 sm:px-4'>
        <h1
          className={`${offbit.className} text-4xl sm:text-5xl md:text-6xl text-ink tracking-widest uppercase font-bold text-center`}
        >
          WEBTOOL
        </h1>

        <div className='w-full max-w-5xl mt-8 md:mt-10'>
          <Suspense fallback={null}>
            <StrategyLibrarySection />
          </Suspense>
        </div>
      </main>

      <AppFooter />
    </div>
  )
}