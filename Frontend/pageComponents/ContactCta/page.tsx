'use client'

import { offbit } from '@/components/utils/utils'
import { MonoButton } from '@/components/shared/ui'

/**
 * Contact CTA — Figma "Call to action" (166:2403 / 283:2469,
 * mobile 296:5355): OffBit 96 "Contact Us" (mobile 50) + full-width
 * (mobile) / hug (desktop) black "Contact Page" button. Section pad
 * 120/120 desktop, 108/108 mobile, gap 32/30.
 */
export default function ContactCta() {
  return (
    <section className='w-full flex flex-col items-center gap-[30px] lg:gap-8 px-5 pt-[108px] pb-[108px] lg:pt-[120px] lg:pb-[120px]'>
      <h2
        className={`${offbit.className} font-bold text-[50px] lg:text-[96px] leading-none tracking-[-0.03em] text-center text-[#1B2B1E] dark:text-[#EAF2E4]`}
      >
        Contact Us
      </h2>

      <MonoButton
        bullet
        href='mailto:connect.ecobug@gmail.com'
        className='w-full justify-center text-[12.6px] lg:text-[14px] leading-none tracking-normal px-[70px] py-[14.4px] lg:w-auto lg:px-4 lg:py-4'
      >
        Contact Page
      </MonoButton>
    </section>
  )
}
