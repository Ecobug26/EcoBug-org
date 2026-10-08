'use client'

import Link from 'next/link'
import AppNavbar from '@/components/shared/AppNavbar'
import AppFooter from '@/components/shared/AppFooter'
import { offbit } from '@/components/utils/utils'

/**
 * Webtool landing — Figma "WEBTOOL" screen:
 * big pixel title + stacked white entry cards
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
        w-full bg-panel rounded-2xl px-6 py-5
        shadow-[0_5px_0_rgba(0,0,0,0.18)]
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:-translate-y-1 hover:shadow-[0_8px_0_rgba(0,0,0,0.22)] cursor-pointer transition-all duration-150'}
      `}
    >
      <span className={`${offbit.className} text-ink text-base md:text-lg font-bold tracking-wide`}>
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
    <div className='min-h-screen flex flex-col bg-bg'>
      <AppNavbar />

      <main className='flex-1 flex flex-col items-center pt-28 md:pt-32 pb-16 px-4'>
        <h1
          className={`${offbit.className} text-4xl sm:text-5xl md:text-6xl text-ink tracking-widest uppercase font-bold text-center`}
        >
          WEBTOOL
        </h1>

        <div className='w-full max-w-3xl mt-10 md:mt-14 flex flex-col gap-5'>
          {/* Plant Bank is built next; disabled until then */}
          <ToolCard title='PLANT BANK' disabled />
          <ToolCard title='STRATEGIES' href='/webtool/strategy' />
          {/* BOQ is not in scope yet */}
          <ToolCard title='BOQ' disabled />
        </div>
      </main>

      <AppFooter />
    </div>
  )
}

