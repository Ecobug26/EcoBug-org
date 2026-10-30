'use client'

import React, { Suspense, JSX } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import AppNavbar from '@/components/shared/AppNavbar'
import AppFooter from '@/components/shared/AppFooter'
import { offbit } from '@/components/utils/utils'
import { StrategyLibrary } from './StrategyLibrary'
import { useStrategies } from '@/hooks/useStrategies'

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
    // Removed bg-[#FFF4DF]
    <div className='min-h-screen flex flex-col dark:bg-[#102112] relative'>
      <AppNavbar />

      {/* Back Button */}
      <div className='absolute top-24 left-4 md:top-32 md:left-8 z-50'>
        <Link
          href='/webtool'
          className='inline-flex items-center gap-2 text-black dark:text-[#EAF2E4] hover:opacity-70 transition-opacity group'
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="group-hover:-translate-x-1 transition-transform"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span className={`${offbit.className} text-sm md:text-base pt-1`}>BACK</span>
        </Link>
      </div>

      <main className='flex-1 flex flex-col items-center pt-28 md:pt-32 pb-16 px-2 sm:px-4'>
        <h1
          className={`${offbit.className} text-4xl sm:text-5xl md:text-6xl text-black dark:text-[#EAF2E4] tracking-widest uppercase font-bold text-center`}
        >
          WEBTOOL
        </h1>

        <div className='w-full max-w-5xl mt-8 md:mt-10 flex flex-col gap-6'>
          <Suspense fallback={null}>
            <StrategyLibrarySection />
          </Suspense>

          <p className='text-[11px] md:text-[12px] leading-relaxed text-[#40543F] dark:text-[#9BAE95] max-w-2xl mx-auto text-center'>
            Disclaimer: We do not own the pictures displayed in any of the plant catalogs, they have been outsourced from respective owners, to whom we give complete credits or may have been generated.
          </p>
        </div>
      </main>

      <AppFooter />
    </div>
  )
}