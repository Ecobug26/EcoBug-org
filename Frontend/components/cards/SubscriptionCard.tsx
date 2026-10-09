'use client'

import type { ReactNode } from 'react'
import { offbit } from '@/components/utils/utils'
import { MonoButton } from '@/components/shared/ui'

type CardProps = {
  title: ReactNode
  features?: string[]
  comingSoon?: boolean
  link?: string
}

/**
 * Pricing plan card — matches Figma Buy Frame 10 (195:3796 light,
 * 312:10979 dark): 350x394 card, r24, pad 40, gap 24.
 * Light: #97C974 card, #1B2B1E title, #40543F body.
 * Dark:  #253B25 card, #EAF2E4 title, #9BAE95 body.
 * Button: black "Button primary" with white bullet (MonoButton).
 */
export default function SubscriptionCard({
  title,
  features = [],
  comingSoon = false,
  link = '/checkout',
}: CardProps) {
  return (
    <div className='w-full max-w-[320px] sm:max-w-[350px] min-h-[394px] rounded-3xl p-6 sm:p-10 flex flex-col items-center gap-6 bg-[#97C974] dark:bg-[#253B25] transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_10px_24px_rgba(0,0,0,0.15)]'>
      <h2
        className={`${offbit.className} font-bold text-[40px] leading-[48px] tracking-[-0.01em] text-center text-[#1B2B1E] dark:text-[#EAF2E4]`}
      >
        {title}
      </h2>

      {comingSoon ? (
        <p className='font-geist-sans font-normal text-[36px] leading-[43px] tracking-[-0.01em] text-center text-[#40543F] dark:text-[#9BAE95]'>
          COMING SOON
        </p>
      ) : (
        <>
          <p className='font-geist-sans font-normal text-[16px] leading-[19.2px] tracking-[-0.01em] text-center text-[#40543F] dark:text-[#9BAE95]'>
            {features.join(' // ')}
          </p>

          <div className='mt-auto pt-2'>
            <MonoButton
              bullet
              href={link}
              ariaLabel='Buy plan'
              className='px-9 py-[21px] text-[24px] leading-6 tracking-[4.1px]'
            >
              BUY
            </MonoButton>
          </div>
        </>
      )}
    </div>
  )
}

