'use client'

import React, { Suspense, JSX } from 'react'
import { useSearchParams } from 'next/navigation'
import AppNavbar from '@/components/shared/AppNavbar'
import AppFooter from '@/components/shared/AppFooter'
import { offbit } from '@/components/utils/utils'
import { PlantBankLibrary, PlantDisclaimer } from './PlantBankLibrary'
import { plants } from './plantsData'

/**
 * Plant Bank list — Figma WEBTOOL screen: AppNavbar, big "WEBTOOL" pixel title,
 * then the Plant Bank panel (search, item count, plant cards).
 * Wrapped in <Suspense> because it reads the `?q=` search param.
 */
function PlantBankSection() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') ?? ''

  return <PlantBankLibrary plants={plants} initialQuery={initialQuery} />
}

export default function PlantBankPage(): JSX.Element {
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
            <PlantBankSection />
          </Suspense>
        </div>

        <PlantDisclaimer className='mt-6' />
      </main>

      <AppFooter />
    </div>
  )
}
