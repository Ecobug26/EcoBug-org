'use client'

import { pixelifySans } from '@/components/utils/utils'
import Marquee from 'react-fast-marquee'
import { useRouter } from 'next/navigation'
import { PixelButton } from '@/components/shared/ui'

/** Client quotes + CTA section, restyled with the design tokens. */
export default function Feedbacks() {
  const r = useRouter()
  const quotes = [
    'We are really looking forward to having maintenance plans for landscaping, a much needed respite for our long term works',
    'It’s really nice to have everything in one place',
    'I am expecting ecologically aware and driven strategies for our upcoming projects',
    'I’d love a tool that would ease our work',
  ]

  return (
    <section className='relative w-full px-4 py-14'>
      <div className='max-w-4xl w-full mx-auto bg-panel rounded-3xl border border-line shadow-[0_8px_24px_rgba(0,0,0,0.08)] p-8 md:p-12 overflow-hidden'>
        <div
          className={`${pixelifySans.className} text-ink uppercase tracking-widest text-lg sm:text-2xl mb-8`}
        >
          What clients have to say
        </div>

        <div className='flex flex-col gap-12'>
          <div className='overflow-hidden w-full relative'>
            <Marquee speed={100} pauseOnHover>
              <div className='flex ml-6 gap-6 w-max'>
                {[...quotes, ...quotes].map((quote, index) => (
                  <div
                    key={index}
                    className='bg-primary shrink-0 w-[320px] min-h-[200px] rounded-3xl p-6 flex items-start cursor-pointer'
                  >
                    <p className='text-panel text-sm md:text-base leading-snug font-mono'>
                      {quote}
                    </p>
                  </div>
                ))}
              </div>
            </Marquee>
          </div>

          <div className='bg-card rounded-2xl p-10 flex flex-col items-center justify-center text-center gap-5 border border-line'>
            <p
              className={`${pixelifySans.className} text-ink text-2xl tracking-widest uppercase`}
            >
              Are you ready?
            </p>
            <h2
              className={`${pixelifySans.className} text-ink text-xl md:text-2xl tracking-widest uppercase`}
            >
              Be a part of next best thing
            </h2>
            <PixelButton onClick={() => r.push('/products')}>
              View Our Price
            </PixelButton>
          </div>
        </div>
      </div>
    </section>
  )
}
