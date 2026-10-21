import type { Metadata } from 'next'
import AppNavbar from '@/components/shared/AppNavbar'
import ContactForm from '@/pageComponents/Contact/page'
import { DotWordmark } from '@/components/shared/DotWordmark' // Added import

export const metadata: Metadata = {
  title: 'Contact Us | EcoBug',
  description:
    'Get in touch with the EcoBug team — questions about plans, the webtool, partnerships or support.',
}

/**
 * Contact page — matches Figma Contact Desktop (195:3897):
 * cream page (#FFF4DF), Frame 75 top pad 87, white form card.
 */
export default function Contact() {
  return (
    <div className='min-h-screen flex flex-col bg-[#FFF4DF] dark:bg-[#102112]'>
      <AppNavbar />

      {/* Added justify-between to push the logo to the bottom */}
      <main className='flex-1 flex flex-col justify-between items-center px-4 md:px-6 pt-[120px] lg:pt-[140px] pb-4'>
        
        {/* The Contact Form */}
        <ContactForm />

        {/* Giant ECOBUG Dot-Matrix Logo */}
        <div className='w-full max-w-5xl mt-16 select-none pointer-events-none overflow-hidden leading-none translate-y-2'>
          <DotWordmark />
        </div>

      </main>
    </div>
  )
}