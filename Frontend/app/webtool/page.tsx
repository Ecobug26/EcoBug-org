'use client'

import Link from 'next/link'
import AppNavbar from '@/components/shared/AppNavbar'
import AppFooter from '@/components/shared/AppFooter'
import { offbit } from '@/components/utils/utils'

/**
 * Webtool landing — Figma "WEBTOOL" screen:
 * big pixel title + stacked entry cards
 * (Plant Bank / Strategies / BOQ).
 */
interface ToolCardProps {
  title: string
  href?: string
  disabled?: boolean
}

function ToolCard({ title, href, disabled = false }: ToolCardProps) {
  const inner = (
    <div
      className={`
        w-full rounded-3xl px-6 py-6 sm:px-8 sm:py-8
        bg-[#97C974] dark:bg-[#253B25] 
        transition-transform duration-200
        ${disabled 
          ? 'opacity-50 cursor-not-allowed' 
          : 'hover:-translate-y-1 hover:shadow-[0_10px_24px_rgba(0,0,0,0.15)] cursor-pointer'
        }
      `}
    >
      <span className={`${offbit.className} text-[#1B2B1E] dark:text-[#EAF2E4] text-lg md:text-xl font-bold tracking-wide`}>
        {title}
      </span>
    </div>
  )

  if (disabled || !href) return inner
  return (
    <Link href={href} className='block' aria-label={title}>
      {inner}
    </Link>
  )
}

export default function WebTool() {
  return (
    <div className='min-h-screen flex flex-col bg-[#E9F5E0] dark:bg-[#102112]'>
      <AppNavbar />

      <main className='flex-1 flex flex-col items-center pt-28 md:pt-32 pb-16 px-4'>
        <h1
          className={`${offbit.className} text-4xl sm:text-5xl md:text-6xl text-[#1B2B1E] dark:text-[#EAF2E4] tracking-widest uppercase font-bold text-center`}
        >
          WEBTOOL
        </h1>

        <div className='w-full max-w-3xl mt-10 md:mt-14 flex flex-col gap-5'>
          <ToolCard title='PLANT BANK' href='/webtool/plantbank' />
          <ToolCard title='STRATEGIES' href='/webtool/strategy' />
          {/* BOQ is not in scope yet */}
          <ToolCard title='BOQ' disabled />
        </div>
      </main>

      <AppFooter />
    </div>
  )
}