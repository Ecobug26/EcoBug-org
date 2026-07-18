'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import StaggeredMenu from '@/components/sidebar/StaggeredMenu'

const menuItems = [
  { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
  { label: 'Webtool', ariaLabel: 'Go to webtool', link: '/webtool' },
  { label: 'Blog', ariaLabel: 'Go to blog', link: '/blog' },
  { label: 'About', ariaLabel: 'About us', link: '/about' },
  { label: 'Buy', ariaLabel: 'Buy now', link: '/products' },
]

export default function PageHamburger() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)

  const handleHamburgerClick = () => {
    const toggleBtn = sidebarRef.current?.querySelector(
      '.sm-toggle'
    ) as HTMLButtonElement | null

    toggleBtn?.click()
  }

  return (
    <>
      {isSidebarOpen && (
        <div className='fixed inset-0 z-40 bg-black/60 backdrop-blur-sm' />
      )}

      <button
        onClick={handleHamburgerClick}
        className='fixed top-6 left-6 z-50 cursor-pointer'
      >
        <Image
          src='/ham-gren.png'
          alt='menu'
          width={40}
          height={40}
          className='w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11'
        />
      </button>

      <div
        ref={sidebarRef}
        className='fixed top-0 left-0 w-screen h-screen z-50 pointer-events-none'
      >
        <StaggeredMenu
          isFixed={false}
          position='left'
          items={menuItems}
          displaySocials={false}
          displayItemNumbering={false}
          menuButtonColor='#ffffff'
          openMenuButtonColor='#000'
          changeMenuColorOnOpen={true}
          colors={['#569b67', '#367b38']}
          logoUrl=''
          accentColor='#367b38'
          onMenuOpen={() => setIsSidebarOpen(true)}
          onMenuClose={() => setIsSidebarOpen(false)}
        />

        <style>{`
          .sm-scope .staggered-menu-header {
            visibility: hidden !important;
            pointer-events: none !important;
          }
        `}</style>
      </div>
    </>
  )
}