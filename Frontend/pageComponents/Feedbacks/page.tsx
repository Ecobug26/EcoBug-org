'use client'

import { useRouter } from 'next/navigation'
import { Jost } from 'next/font/google'
import { offbit } from '@/components/utils/utils'
import { MonoButton } from '@/components/shared/ui'

// Geometric sans used for the quote text
const body = Jost({ subsets: ['latin'], weight: ['400', '500'] })

const quotes = [
  '“It’s really nice to have everything in one place.”',
  '“We are really looking forward to having maintenance plans for landscaping, a much needed respite for our long term works.”',
  '“I am expecting ecologically aware and driven strategies for our upcoming projects.”',
]

export default function Feedbacks() {
  const r = useRouter()

  return (
    <section className='w-full bg-[#E8F3E0] dark:bg-[#102112] flex flex-col items-center gap-6 lg:gap-8 py-12 lg:py-14 px-5'>
      <h2
        className={`${offbit.className} font-bold text-[32px] sm:text-[44px] lg:text-[60px] leading-[1.1] tracking-[-0.01em] text-center text-balance text-[#162B18] dark:text-[#EAF2E4]`}
      >
        WHAT OUR CUSTOMERS HAVE TO SAY
      </h2>

      {/* Quote cards: stacked on mobile, one row on desktop */}
      <div className='w-full max-w-[860px] flex flex-col lg:flex-row items-stretch gap-4'>
        {quotes.map((quote) => (
          <div
            key={quote}
            className='w-full lg:flex-1 min-h-[150px] lg:min-h-0 lg:aspect-[260/166] bg-[#98CA75] dark:bg-[#253B25] rounded-[22px] px-5 pt-6 pb-5 transition-transform duration-200 hover:-translate-y-1'
          >
            {/* Hanging quote mark: first line sticks out, wrapped lines align with the text */}
            <p
              className={`${body.className} text-[16px] lg:text-[17px] leading-[1.35] text-[#2D4A2E] dark:text-[#9BAE95]`}
              style={{ paddingLeft: '0.55em', textIndent: '-0.55em' }}
            >
              {quote}
            </p>
          </div>
        ))}
      </div>

      {/* CTA box */}
      <div className='w-full max-w-[800px] bg-[#98CA75] dark:bg-[#253B25] rounded-[22px] flex flex-col items-center text-center gap-6 lg:gap-7 px-6 py-10 lg:pt-10 lg:pb-12'>
        <p
          className={`${offbit.className} font-bold text-[26px] sm:text-[32px] lg:text-[40px] leading-[1.2] tracking-[-0.02em] whitespace-pre-line text-[#162B18] dark:text-[#EAF2E4]`}
        >
          {'Are you ready?\nBe a part of next best thing'}
        </p>

        <MonoButton
          bullet
          onClick={() => r.push('/products')}
          className='text-[13px] lg:text-[16px] leading-none tracking-[0.2px] px-7 lg:px-9 py-4 lg:py-[18px]'
        >
          View our Plans
        </MonoButton>
      </div>
    </section>
  )
}