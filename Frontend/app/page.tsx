'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import AppNavbar from '@/components/shared/AppNavbar'
import AppFooter from '@/components/shared/AppFooter'
import Hero from '@/pageComponents/Hero/page'
import Intro from '@/pageComponents/Intro/page'
import Feature from '@/pageComponents/Feature/page'
import Blogs from '@/pageComponents/Blogs/page'
import Feedbacks from '@/pageComponents/Feedbacks/page'
import ContactCta from '@/pageComponents/ContactCta/page'

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.5,
      smoothWheel: true,
    })
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])

  return (
    <div className='min-h-screen flex flex-col bg-[#E9F5E0] dark:bg-[#102112]'>
      <AppNavbar />
      <Hero />
      <Intro />
      <Feature />
      <Blogs />
      <Feedbacks />
      <ContactCta />
      <AppFooter />
    </div>
  )
}

