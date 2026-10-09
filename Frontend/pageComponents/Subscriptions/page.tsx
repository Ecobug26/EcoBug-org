import SubscriptionCard from '@/components/cards/SubscriptionCard'
import { offbit } from '@/components/utils/utils'

/**
 * Pricing plans section — matches Figma Buy Frame 10 / Frame 9
 * (195:3796 light, 312:10979 dark): PRODUCTS heading (OffBit Bold 100,
 * ls -1, centered), 3 plan cards in a row (gap 40).
 */
const EDUCATION_FEATURES = [
  '1 Month free trial',
  'Single active device',
  'Rs. 49 per month/ Rs. 399 per year',
  'Auto renewal every month or year',
  'Plant Bank Access',
  'Landscape Strategies',
]

const PROFESSIONAL_FEATURES = [
  ...EDUCATION_FEATURES,
  'Upcoming BOQ generation',
]

export default function Subscriptions() {
  return (
    <section
      aria-label='Products and plans'
      className='w-full flex flex-col items-center gap-10 lg:gap-[76px]'
    >
      <h1
        className={`${offbit.className} font-bold text-[40px] sm:text-[56px] md:text-[80px] lg:text-[100px] leading-[1.1] tracking-[-0.01em] text-center text-balance text-[#1B2B1E] dark:text-[#EAF2E4]`}
      >
        PRODUCTS
      </h1>

      <div className='w-full flex flex-col lg:flex-row items-center lg:items-stretch justify-center gap-8 lg:gap-10 flex-wrap px-1'>
        <SubscriptionCard
          title={
            <>
              EDUCATION
              <br />
              PLAN
            </>
          }
          features={EDUCATION_FEATURES}
          link='/checkout'
        />
        <SubscriptionCard
          title={
            <>
              PROFESSIONAL
              <br />
              PLAN
            </>
          }
          features={PROFESSIONAL_FEATURES}
          link='/checkout'
        />
        <SubscriptionCard
          title={
            <>
              STUDIO
              <br />
              PLAN
            </>
          }
          comingSoon
        />
      </div>
    </section>
  )
}

