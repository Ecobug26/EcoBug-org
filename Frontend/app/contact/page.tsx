import type { Metadata } from 'next'
import AppNavbar from '@/components/shared/AppNavbar'
import AppFooter from '@/components/shared/AppFooter'
import ContactForm from '@/pageComponents/Contact/page'

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
    <div className='min-h-screen flex flex-col bg-[#FFF4DF] dark:bg-cream'>
      <AppNavbar />

      <main className='flex-1 flex flex-col items-center px-4 md:px-6 pt-[120px] lg:pt-[163px] pb-16 lg:pb-[120px]'>
        <ContactForm />
      </main>

      <AppFooter />
    </div>
  )
}
