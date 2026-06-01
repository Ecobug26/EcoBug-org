'use client'

import SubscriptionCard from '@/components/cards/SubscriptionCard'
import { pixelifySans } from '@/components/utils/utils'

export default function Subscriptions() {
  return (
    <div className='min-h-screen flex flex-col justify-between items-stretch'>
      <div
        className={`flex mt-80 text-[#004400] text-6xl justify-center items-center ${pixelifySans.className}`}
      >
        <h1>PRODUCTS</h1>
      </div>
      <div className='flex items-end justify-center flex-wrap gap-8 bg-white p-6'>
        <SubscriptionCard
          type='Education  Plan'
          description='if you are looking for a more personal approach choose custom.'
          link='/checkout'
        />
        <SubscriptionCard
          type='Professional Plan'
          description='if you are looking for a more personal approach choose custom.'
          link='/checkout'
        />
        <SubscriptionCard
          type='Studio Plan'
          description='if you are looking for a more personal approach choose custom.'
          link='/checkout'
        />
      </div>
    </div>
  )
}
