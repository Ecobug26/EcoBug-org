'use client'

import React, { JSX } from 'react'
import GlobalHamburger from '@/components/shared/GlobalHamburger'
import { pixelifySans } from '@/components/utils/utils'
import { StrategyLibrary } from './StrategyLibrary'
import { useStrategies } from '@/hooks/useStrategies'

export default function StrategyPage(): JSX.Element {
  const { strategies, loading, error } = useStrategies()

  return (
    <>
      <GlobalHamburger />
      <div className={`min-h-screen bg-[#38763d] flex flex-col items-center p-2 sm:p-3 font-sans select-none ${pixelifySans.className}`}>
        <header className="w-full max-w-full flex items-center justify-center py-2 px-2 mb-1 relative">
          <h1 className={`${pixelifySans.className} text-3xl sm:text-4xl text-[#1d3d1e] tracking-widest uppercase font-bold text-center`}>
            WEBTOOL
          </h1>
        </header>
        <div className="w-full max-w-full">
          <StrategyLibrary 
            strategies={strategies}
            loading={loading}
            error={error}
          />
        </div>
      </div>
    </>
  )
}