'use client'

import { useRouter } from 'next/navigation'
import { offbit } from '@/components/utils/utils'
import { MonoButton } from '@/components/shared/ui'

/**
 * OUR PRODUCT intro — Figma "Intro section" (166:2358 / 283:2434,
 * mobile 296:5310): centered OffBit 80 title + Futura 28 description
 * (gap 16) + black BUY button (gap 32); section pad 68/140 desktop,
 * 61/44 mobile.
 */
const description =
  'EcoBug, a comprehensive landscaping consultant tool is a one-stop destination for all landscaping solutions be it for an architect, designer, site engineer or student! From analysis and development to maintenance and cost estimation, this software covers the integral stages of landscaping, providing an easy-to-use interface and assessing feasibility of landscape projects both environmentally and economically.'

export default function Intro() {
  const r = useRouter()

  return (
    <section className='w-full flex flex-col items-center px-5 pt-[61.2px] pb-11 lg:pt-[68px] lg:pb-[140px]'>
      <div className='w-full max-w-[1030px] flex flex-col items-center gap-8 text-center'>
        <div className='flex flex-col items-center gap-4 py-[9px]'>
          <h2
            className={`${offbit.className} font-bold text-[40px] lg:text-[80px] leading-none tracking-[-0.01em] text-[#1B2B1E] dark:text-[#EAF2E4]`}
          >
            OUR PRODUCT
          </h2>
          <p className='font-geist-sans text-[16px] lg:text-[28px] leading-[19.2px] lg:leading-[33.6px] tracking-[-0.01em] text-[#40543F] dark:text-[#9BAE95]'>
            {description}
          </p>
        </div>

        <MonoButton
          bullet
          onClick={() => r.push('/products')}
          className='text-[21.6px] lg:text-[24px] leading-none tracking-[3.7px] lg:tracking-[4.1px] px-[32.4px] lg:px-9 py-[18.9px] lg:py-[21px]'
        >
          BUY
        </MonoButton>
      </div>
    </section>
  )
}
