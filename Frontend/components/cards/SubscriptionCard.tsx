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
          {/* Changed this from a single <p> to a mapped list of <p> tags */}
          <div className='flex flex-col gap-1 w-full'>
            {features.map((feature, index) => (
              <p 
                key={index}
                className='font-geist-sans font-normal text-[16px] leading-[1.2] tracking-[-0.01em] text-center text-[#40543F] dark:text-[#9BAE95]'
              >
                {feature}
              </p>
            ))}
          </div>

          <div className='mt-auto pt-6'>
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