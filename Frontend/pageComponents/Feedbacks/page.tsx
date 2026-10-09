'use client'

import { useRouter } from 'next/navigation'
import { offbit } from '@/components/utils/utils'
import { MonoButton } from '@/components/shared/ui'

/**
 * Testimonials + pricing CTA — Figma "Frame 4" (166:2386 / 283:2462,
 * mobile 296:5338): OffBit 64 heading, three static green quote cards
 * (~385x246, r24, pad 40, gap 25), then the 1128-wide CTA container
 * (r24, pad 40/76/40/85, gap 42) with the OffBit 58 two-line headline
 * and black "View our Plans" button.
 */
const quotes = [
  {
    text: '“It’s really nice to have everything in one place.”',
    widthClass: 'lg:w-[382px]',
    heightClass: 'lg:h-[246px]',
  },
  {
    text: '“We are really looking forward to having maintenance plans for landscaping, a much needed respite for our long term works.”',
    widthClass: 'lg:w-[385px]',
    heightClass: 'lg:h-[250px]',
  },
  {
    text: '“I am expecting ecologically aware and driven strategies for our upcoming projects.”',
    widthClass: 'lg:w-[385px]',
    heightClass: 'lg:h-[246px]',
  },
]

export default function Feedbacks() {
  const r = useRouter()

  return (
    <section className='w-full flex flex-col items-center gap-[14px] pt-0 pb-0 lg:py-[55px] px-5'>
      <h2
        className={`${offbit.className} font-bold text-[32px] sm:text-[44px] lg:text-[64px] leading-[1.2] tracking-[-0.01em] text-center text-[#1B2B1E] dark:text-[#EAF2E4]`}
      >
        WHAT OUR CUSTOMERS HAVE TO SAY
      </h2>

      {/* Quote cards: static row on desktop, stacked on mobile */}
      <div className='w-full flex flex-col sm:flex-col lg:flex-row items-center justify-center gap-[23px] lg:gap-[25px] lg:pb-7'>
        {quotes.map((quote) => (
          <div
            key={quote.text}
            className={`w-full max-w-[347px] lg:max-w-none min-h-[221px] ${quote.widthClass} ${quote.heightClass} bg-[#97C974] dark:bg-[#253B25] rounded-[21.6px] lg:rounded-3xl p-6 sm:p-9 lg:p-10 flex items-center transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_10px_24px_rgba(0,0,0,0.15)]`}
          >
            <p className='font-geist-sans text-[19px] sm:text-[22px] lg:text-[28px] leading-[24px] sm:leading-[26.4px] lg:leading-[33.6px] tracking-[-0.04em] text-[#40543F] dark:text-[#9BAE95] text-balance'>
              {quote.text}
            </p>
          </div>
        ))}
      </div>

      {/* Pricing CTA container */}
      <div className='w-full max-w-[1128px] bg-[#97C974] dark:bg-[#253B25] rounded-[21.6px] lg:rounded-3xl flex flex-col items-center text-center gap-[37.8px] lg:gap-[42px] px-6 sm:px-9 pt-[68.4px] pb-[76.5px] lg:px-10 lg:pt-[76px] lg:pb-[85px] overflow-x-clip'>
        <p
          className={`${offbit.className} font-bold text-[30px] lg:text-[58px] leading-[36px] lg:leading-[69.6px] tracking-[-0.04em] whitespace-pre-line text-[#1B2B1E] dark:text-[#EAF2E4]`}
        >
          {'Are you ready?\nBe a part of next best thing'}
        </p>

        <MonoButton
          bullet
          onClick={() => r.push('/products')}
          className='text-[12.6px] lg:text-[24px] leading-none tracking-[0.1px] lg:tracking-[0.2px] px-[32.4px] lg:px-9 py-[18.9px] lg:py-[21px]'
        >
          View our Plans
        </MonoButton>
      </div>
    </section>
  )
}
