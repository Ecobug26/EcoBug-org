import type { Metadata } from 'next'
import AppNavbar from '@/components/shared/AppNavbar'
import ContactForm from '@/pageComponents/Contact/page'
import { DotWordmark } from '@/components/shared/DotWordmark'

export const metadata: Metadata = {
  title: 'Contact Us | EcoBug',
  description:
    'Get in touch with the EcoBug team — questions about plans, the webtool, partnerships or support.',
}

export default function Contact() {
  return (
    <div className='min-h-screen dark:bg-[#102112] flex flex-col justify-between relative overflow-hidden'>
      <AppNavbar />

      {/* Top Section - Contains the form and takes up available space */}
      <div className='flex-1 flex flex-col items-center w-full px-4 md:px-6 pt-[120px] lg:pt-[140px]'>
        <ContactForm />
      </div>

      {/* Giant ECOBUG Logo - Edge to edge, no bottom padding */}
      <div className='w-full mt-12 m-0 p-0 leading-none'>
        <DotWordmark />
      </div>
    </div>
  )
}