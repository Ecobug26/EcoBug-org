'use client'

import { useRouter } from 'next/navigation'
import { offbit } from '@/components/utils/utils'
import { PixelButton } from '@/components/shared/ui'

/**
 * Home hero — Figma Frame 73: oversized ECOBUG pixel wordmark on the
 * cream background, with the green "OUR PRODUCT" panel and pixel BUY button.
 */
export default function Hero() {
  const r = useRouter()

  return (
    <section className='relative w-full flex flex-col items-center px-4 pt-28 md:pt-36 pb-10 overflow-hidden'>
      {/* Giant pixel wordmark */}
      <h1
        className={`${offbit.className} text-5xl sm:text-7xl md:text-8xl text-ink tracking-[0.15em] uppercase text-center leading-none select-none`}
      >
        ECOBUG
      </h1>
      <p
        className={`${offbit.className} mt-3 text-xs sm:text-sm md:text-base text-ink-muted tracking-[0.25em] uppercase text-center`}
      >
        landscaping, designed sustainably
      </p>

      {/* Product panel */}
      <div className='w-full max-w-4xl mt-12 md:mt-16'>
        <div className='bg-primary rounded-2xl p-8 md:p-12 flex flex-col md:flex-row justify-between items-center gap-8 shadow-[0_8px_0_rgba(0,0,0,0.15)]'>
          {/* Left: copy */}
          <div className='max-w-2xl'>
            <h2
              className={`${offbit.className} text-panel text-2xl md:text-4xl mb-4 tracking-widest uppercase`}
            >
              OUR PRODUCT
            </h2>
            <p className='text-panel/90 text-xs md:text-sm leading-relaxed font-mono'>
              EcoBug, a comprehensive landscaping consultant tool is a one-stop
              destination for all landscaping solutions be it for an architect,
              designer, site engineer or student! From analysis and development
              to maintenance and cost estimation, this software covers the
              integral stages of landscaping, providing an easy-to-use interface
              and assessing feasibility of landscape projects both
              environmentally and economically.
            </p>
          </div>

          {/* Right: BUY */}
          <PixelButton
            onClick={() => r?.push('/products')}
            className='text-2xl md:text-3xl !px-10 !py-4 md:!py-5 shrink-0 scale-90 md:scale-100'
          >
            BUY
          </PixelButton>
        </div>
      </div>
    </section>
  )
}
