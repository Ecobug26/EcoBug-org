'use client'

import Navbar from '@/components/shared/Navbar'
import Feedbacks from '@/pageComponents/Feedbacks/page'
import Footer from '@/components/shared/Footer'
import Lenis from 'lenis'
import Feature from '@/pageComponents/Feature/page'

import { useEffect, useState } from 'react'
import Hero from '@/pageComponents/Hero/page'

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

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
    <>
      <div className='bg-white'>
        {isSidebarOpen && (
          <div className='fixed inset-0 z-40 bg-black/60 backdrop-blur-sm' />
        )}
        <Hero />
        <Navbar setIsSidebarOpen={setIsSidebarOpen} />
        <Feature />
        <Feedbacks />
        <Footer />
      </div>
    </>
  )
}
