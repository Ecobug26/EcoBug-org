import type { Metadata } from 'next'
import AppNavbar from '@/components/shared/AppNavbar'
import AppFooter from '@/components/shared/AppFooter'
import { offbit } from '@/components/utils/utils'
import CheckoutButton from './CheckoutButton'

export const metadata: Metadata = {
  title: 'Checkout | EcoBug',
  description:
    'Subscribe to an EcoBug plan with Razorpay — secure checkout for the Education and Professional plans.',
}

/**
 * Checkout page — reached from the plan cards' BUY buttons (link=/checkout).
 * Server component holds the page metadata; the pay flow lives in the
 * client-only CheckoutButton (Razorpay modal needs window + script access).
 */
export default function CheckoutPage() {
  return (
    <div className='min-h-screen flex flex-col bg-[#E9F5E0] dark:bg-[#102112]'>
      <AppNavbar />

      <main className='flex-1 flex flex-col items-center justify-center pt-28 md:pt-32 pb-16 px-5'>
        <div className='w-full max-w-md bg-[#97C974] dark:bg-[#253B25] border border-black rounded-3xl p-6 sm:p-10 flex flex-col items-center gap-6'>
          <h1
            className={`${offbit.className} font-bold text-[40px] leading-[48px] tracking-[-0.01em] text-center text-[#1B2B1E] dark:text-[#EAF2E4]`}
          >
            CHECKOUT
          </h1>

          <p className='font-geist-sans font-normal text-[16px] leading-[19.2px] tracking-[-0.01em] text-center text-[#40543F] dark:text-[#9BAE95]'>
            EDUCATION / PROFESSIONAL PLAN — Rs. 49 per month
          </p>

          <CheckoutButton amount={4900} description='EcoBug plan — Rs. 49/month' />
        </div>
      </main>

      <AppFooter />
    </div>
  )
}