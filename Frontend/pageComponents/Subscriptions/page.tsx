'use client'

import SubscriptionCard from '@/components/cards/SubscriptionCard'
import { SectionTitle } from '@/components/shared/ui'

/** Pricing plans section — token-based, no background clutter. */
export default function Subscriptions() {
  return (
    <section className='w-full flex flex-col items-center gap-10'>
      <SectionTitle>Products</SectionTitle>

      <div className='flex items-stretch justify-center flex-wrap gap-8'>
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
    </section>
  )
}
