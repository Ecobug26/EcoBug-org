'use client'

import React, { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from 'next/image'
import StaggeredMenu from '@/components/sidebar/StaggeredMenu'
import { pixelifySans } from '@/components/utils/utils'
import { useStrategy } from '@/hooks/useStrategies'

const menuItems = [
  { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
  { label: 'Webtool', ariaLabel: 'Go to webtool', link: '/webtool' },
  { label: 'Blog', ariaLabel: 'Go to blog', link: '/blog' },
  { label: 'About', ariaLabel: 'About us', link: '/about' },
  { label: 'Buy', ariaLabel: 'Buy now', link: '/products' },
]

interface StrategyDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export default function StrategyDetailPage({ params }: StrategyDetailPageProps) {
  const router = useRouter()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)
  
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null)
  const [paramsResolved, setParamsResolved] = useState(false)

  React.useEffect(() => {
    params.then((resolved) => {
      setResolvedParams(resolved)
      setParamsResolved(true)
    })
  }, [params])

  const { strategy, loading, error } = useStrategy(resolvedParams?.id || '')

  const handleHamburgerClick = () => {
    const toggleBtn = sidebarRef.current?.querySelector(
      '.sm-toggle'
    ) as HTMLButtonElement | null
    toggleBtn?.click()
  }

  if (!paramsResolved || loading) {
    return (
      <div className="min-h-screen bg-[#38763d] flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-10 max-w-md text-center">
          <div className="w-12 h-12 rounded-full border-4 border-[#2a4225] border-t-transparent animate-spin mx-auto mb-4" />
          <h2 className={`${pixelifySans.className} text-2xl text-[#2d4428] font-bold`}>
            Loading...
          </h2>
        </div>
      </div>
    )
  }

  if (error || !strategy) {
    return (
      <div className="min-h-screen bg-[#38763d] flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-10 max-w-md text-center">
          <h2 className={`${pixelifySans.className} text-2xl text-[#2d4428] font-bold mb-4`}>
            Strategy Not Found
          </h2>
          <p className={`${pixelifySans.className} text-sm text-[#5a6b57] mb-6`}>
            {error?.message || 'The strategy you\'re looking for doesn\'t exist.'}
          </p>
          <button
            onClick={() => router.push('/webtool/strategy')}
            className={`${pixelifySans.className} bg-[#2a4225] text-white px-6 py-2 rounded-full hover:bg-[#1d3019] transition-colors`}
          >
            ← Back to Strategies
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      {isSidebarOpen && (
        <div className='fixed inset-0 z-40 bg-black/60 backdrop-blur-sm' />
      )}

      <button
        onClick={handleHamburgerClick}
        className='fixed top-6 left-6 z-50 cursor-pointer'
      >
        <Image
          src='/ham-gren.png'
          alt='menu'
          width={40}
          height={40}
          className='w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11'
        />
      </button>

      <div
        ref={sidebarRef}
        className='fixed top-0 left-0 w-screen h-screen z-50 pointer-events-none'
      >
        <StaggeredMenu
          isFixed={false}
          position='left'
          items={menuItems}
          displaySocials={false}
          displayItemNumbering={false}
          menuButtonColor='#ffffff'
          openMenuButtonColor='#000'
          changeMenuColorOnOpen={true}
          colors={['#569b67', '#367b38']}
          logoUrl=''
          accentColor='#367b38'
          onMenuOpen={() => setIsSidebarOpen(true)}
          onMenuClose={() => setIsSidebarOpen(false)}
        />

        <style>{`
          .sm-scope .staggered-menu-header {
            visibility: hidden !important;
            pointer-events: none !important;
          }
        `}</style>
      </div>

      <div className="min-h-screen bg-[#38763d] flex flex-col items-center p-2 sm:p-3 font-sans select-none">
        <header className="w-full max-w-full flex items-center justify-center py-2 px-2 mb-1 relative">
          <h1 className={`${pixelifySans.className} text-3xl sm:text-4xl text-[#1d3d1e] tracking-widest uppercase font-bold text-center`}>
            WEBTOOL
          </h1>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-full bg-white rounded-[32px] p-3 sm:p-4 shadow-xl flex flex-col h-[580px] max-h-[80vh]"
        >
          <div className="flex items-center justify-between w-full flex-shrink-0">
            <button
              onClick={() => router.push('/webtool/strategy')}
              className="text-[#2d4428] hover:text-[#1d3019] transition-colors text-xl font-bold"
            >
              ✕
            </button>

            <div className="bg-[#bdc5a7] p-1.5 rounded-full flex items-center w-[220px] shadow-inner">
              <input
                type="text"
                placeholder="Search..."
                className={`w-full bg-white rounded-full py-1.5 px-4 outline-none text-xs text-[#2d4428] placeholder-[#5a6b57]/70 ${pixelifySans.className}`}
              />
              <button
                aria-label="Search"
                className="bg-[#2a4225] w-8 h-7 rounded-full ml-1 flex items-center justify-center text-white hover:bg-[#1d3019] transition-colors cursor-pointer flex-shrink-0"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="bg-[#f6f6f6] rounded-2xl p-6 sm:p-8 border border-black/5 flex-1 flex flex-col min-h-0 overflow-hidden mt-2">
            <div className="flex items-center justify-between mb-4 flex-shrink-0">
              <h2 className={`${pixelifySans.className} text-xl sm:text-2xl font-bold text-[#2d4428] leading-tight`}>
                {strategy.title}
              </h2>
              <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                <span className={`${pixelifySans.className} text-xs text-[#5a6b57] font-bold uppercase tracking-wider`}>
                  Type
                </span>
                <span className={`${pixelifySans.className} inline-block px-3 py-1 rounded-full bg-[#bdc5a7]/40 text-[#3b703e] text-xs font-bold uppercase tracking-wide`}>
                  {strategy.category}
                </span>
              </div>
            </div>

            <div className="w-full bg-[#e6eee0] rounded-2xl border-2 border-[#bdc5a7] flex items-center justify-center p-4 mb-4 flex-shrink-0" style={{ height: '180px' }}>
              <Image
                src={strategy.imageUrl}
                alt={strategy.title}
                width={160}
                height={160}
                className="w-32 h-32 object-contain"
                unoptimized
              />
            </div>

            <div className="flex-1 overflow-y-auto min-h-0 pr-1">
              <p className={`${pixelifySans.className} text-sm text-[#2d4428] leading-relaxed`}>
                {strategy.fullDescription}
              </p>
            </div>

            <div className="mt-3 flex-shrink-0">
              <h3 className={`${pixelifySans.className} text-xs text-[#5a6b57] font-bold uppercase tracking-wider mb-1.5`}>
                Tags
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {strategy.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className={`${pixelifySans.className} text-[10px] bg-white px-2.5 py-1 rounded-full text-[#2d4428] border border-black/5`}
                  >
                    #{keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  )
}