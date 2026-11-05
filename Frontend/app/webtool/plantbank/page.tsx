'use client'

import React, { Suspense, JSX } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import AppNavbar from '@/components/shared/AppNavbar'
import AppFooter from '@/components/shared/AppFooter'
import { offbit } from '@/components/utils/utils'
import { PlantBankLibrary, PlantDisclaimer } from './PlantBankLibrary'
import { usePlants } from './usePlants'

function PlantBankSection() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') ?? ''
  const { plants, loading, error } = usePlants()

  if (loading) return <div className='h-full flex items-center justify-center'>Loading plants…</div>
  
  if (error) return <div className='h-full flex items-center justify-center text-ink-muted'>Error loading plants.</div>

  return <PlantBankLibrary plants={plants} initialQuery={initialQuery} />
}

export default function PlantBankPage(): JSX.Element {
  return (
    // Removed bg-[#FFF4DF]
    <div className='min-h-screen flex flex-col dark:bg-[#102112]'>
      <AppNavbar />

      <main className='flex-1 flex flex-col items-center pt-28 md:pt-32 pb-16 px-2 sm:px-4'>
        
        {/* Title Container - Matches the max-width of the grid below it */}
        <div className='w-full max-w-[1250px] relative flex items-center justify-center mb-8'>
          
          {/* Back Button locked to the left edge */}
          <Link
            href='/webtool'
            className='absolute left-0 top-1/2 -translate-y-1/2 flex items-center gap-2 text-black dark:text-[#EAF2E4] hover:opacity-70 transition-opacity group'
          >
            <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='3' strokeLinecap='round' strokeLinejoin='round' className='group-hover:-translate-x-1 transition-transform'>
              <path d='M19 12H5M12 19l-7-7 7-7' />
            </svg>
            <span className={`${offbit.className} text-sm md:text-base pt-1 hidden sm:inline-block`}>BACK</span>
          </Link>

          {/* Centered Title */}
          <h1
            className={`${offbit.className} text-4xl sm:text-5xl md:text-6xl text-black dark:text-[#EAF2E4] tracking-widest uppercase font-bold text-center`}
          >
            WEBTOOL
          </h1>
        </div>

        <div className='w-full max-w-[1250px] mt-4'>
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