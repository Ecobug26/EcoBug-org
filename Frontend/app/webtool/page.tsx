'use client'

import Link from 'next/link'
import { pixelifySans } from '@/components/utils/utils'
import GlobalHamburger from '@/components/shared/GlobalHamburger'

interface ToolCardProps {
  title: string
  href?: string
  disabled?: boolean
  badge?: string
}

function ToolCard({ title, href, disabled = false, badge }: ToolCardProps) {
  const inner = (
    <div
      className={`relative w-full bg-[#d9c9a3] rounded-xl px-5 py-5 md:py-6 shadow-[0px_4px_1px_rgba(0,0,0,0.35)] transition-all
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:-translate-y-0.5 hover:shadow-[0px_6px_2px_rgba(0,0,0,0.4)] cursor-pointer'}`}
    >
      <span
        className={`${pixelifySans.className} text-[#2d4428] text-sm md:text-base font-bold`}
      >
        {title}
      </span>
      {badge && (
        <span
          className={`absolute top-2 right-3 ${pixelifySans.className} text-[10px] md:text-xs text-[#5a4a2a] bg-[#c4b48d] px-2 py-0.5 rounded-full uppercase tracking-wide`}
        >
          {badge}
        </span>
      )}
    </div>
  )

  if (disabled || !href) return inner
  return (
    <Link href={href} className='block'>
      {inner}
    </Link>
  )
}

export default function WebTool() {
  return (
    <>
      <GlobalHamburger />
      <div className='min-h-screen bg-[#38763d] flex flex-col'>
        <div className='flex justify-center items-center'>
          <h1
            className={`${pixelifySans.className} text-3xl md:text-5xl mt-10 sm:mt-16 text-[#1d3d1e] tracking-widest uppercase font-bold`}
          >
            WEBTOOL
          </h1>
        </div>

        <div className='flex justify-center px-4 sm:px-8 mt-8 mb-16'>
          <div className='w-full max-w-3xl bg-white rounded-2xl p-4 md:p-6 shadow-xl flex flex-col gap-4'>
            {/* Plant Bank */}
            <ToolCard title='Plant Bank' href='/webtool/plantbank' />
            {/* Strategies */}
            <ToolCard title='Strategies' href='/webtool/strategy' />
            {/* Coming soon */}
            <ToolCard title='Coming soon' disabled />
          </div>
        </div>
      </div>
    </>
  )
}

