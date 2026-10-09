import type { Metadata } from 'next'
import AppNavbar from '@/components/shared/AppNavbar'
import AppFooter from '@/components/shared/AppFooter'
import ProductSection from '@/components/product/ProductSection'
import Subscriptions from '@/pageComponents/Subscriptions/page'

export const metadata: Metadata = {
  title: 'Buy | EcoBug',
  description:
    'EcoBug plans — Education, Professional and Studio. A one-stop landscaping consultant tool for architects, designers, engineers and students.',
}

/**
 * Buy page — matches Figma Pt 2 Buy Frame 10 (195:3796 light,
 * 312:10979 dark): PRODUCTS heading + plan cards (gap 76),
 * showcase panel, update disclaimer, bottom pad 176.
 */
export default function Product() {
  return (
    <div className='min-h-screen flex flex-col bg-bg'>
      <AppNavbar />

      <main className='flex-1 flex flex-col items-center gap-10 lg:gap-[76px] px-5 pt-28 md:pt-36 pb-24 lg:pb-[176px]'>
        <Subscriptions />

        <ProductSection />

        <p className='font-geist-sans font-normal text-[16px] leading-[19.2px] tracking-[-0.01em] text-center text-black dark:text-ink max-w-[758px]'>
          During any updates or addition of tools in the plans, prior
          information would be given with regard to cost increase in the plans.
        </p>
      </main>

      <AppFooter />
    </div>
  )
}

