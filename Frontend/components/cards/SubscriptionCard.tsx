'use client'

import { useRouter } from 'next/navigation'
import { offbit } from '@/components/utils/utils'
import { PixelButton } from '@/components/shared/ui'

type CardProps = {
  type: string
  description: string
  link: string
}

/** Pricing plan card — token-based (green brand card + pixel BUY button). */
export default function SubscriptionCard({
  type,
  description,
  link,
}: CardProps) {
  const r = useRouter()
  return (
    <div className='bg-primary text-panel w-full max-w-[320px] h-[500px] rounded-2xl p-8 flex flex-col shadow-[0_6px_0_rgba(0,0,0,0.18)]'>
      <div className='mt-10 text-center'>
        <h2 className={`${offbit.className} text-2xl md:text-3xl tracking-widest`}>
          {type}
        </h2>
      </div>

      <div className='mt-14 text-xs md:text-sm leading-relaxed px-2 text-center text-panel/90'>
        {description}
      </div>

      <div className='mt-auto mb-6 flex justify-center'>
        <PixelButton
          onClick={() => {
            r.push(link)
          }}
          className='!text-2xl md:!text-3xl !px-10 !py-2 !rounded-[50px]'
        >
          BUY
        </PixelButton>
      </div>
    </div>
  )
}
