'use client'

import React, { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { pixelifySans } from '@/components/utils/utils'
import AccountMenu from '@/components/shared/AccountMenu'
import StaggeredMenu from '@/components/sidebar/StaggeredMenu'

/**
 * Fixed global navbar per the Figma layout:
 * desktop  → BUY · WEBTOOL · BLOG · [ECOBUG] · CAREERS · ABOUT · CONTACT US · [account]
 * mobile   → hamburger + centered ECOBUG + account icon (StaggeredMenu drawer)
 * The account icon opens the AccountMenu popup (login/sign-up or
 * profile/plant-vault/logout + dark-mode toggle, per auth state).
 */

const LEFT_LINKS = [
  { label: 'BUY', href: '/products' },
  { label: 'WEBTOOL', href: '/webtool' },
  { label: 'BLOG', href: '/blog' },
]

const RIGHT_LINKS = [
  { label: 'CAREERS', href: '/careers' },
  { label: 'ABOUT', href: '/about' },
  { label: 'CONTACT US', href: '#' },
]

const MENU_ITEMS = [
  { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
  { label: 'Webtool', ariaLabel: 'Go to webtool', link: '/webtool' },
  { label: 'Blog', ariaLabel: 'Go to blog', link: '/blog' },
  { label: 'Careers', ariaLabel: 'Go to careers', link: '/careers' },
  { label: 'About', ariaLabel: 'About us', link: '/about' },
  { label: 'Buy', ariaLabel: 'Buy now', link: '/products' },
]

function NavLink({
  href,
  label,
  active,
}: {
  href: string
  label: string
  active: boolean
}) {
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={`group relative ${pixelifySans.className} text-xs md:text-sm tracking-widest text-ink hover:text-primary-hover transition-colors ${
        active ? 'text-primary-hover' : ''
      }`}
    >
      {label}
      <span
        className={`absolute left-0 -bottom-0.5 h-[2px] w-full bg-primary-hover origin-left transition-transform duration-200 ${
          active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
        }`}
      />
    </Link>
  )
}

export default function AppNavbar() {
  const pathname = usePathname()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)

  const handleHamburgerClick = () => {
    const toggleBtn = sidebarRef.current?.querySelector(
      '.sm-toggle'
    ) as HTMLButtonElement | null
    toggleBtn?.click()
  }

  const isActive = (href: string) => href !== '#' && pathname.startsWith(href)

  return (
    <>
      <header className='fixed top-0 inset-x-0 z-40 bg-bg/90 backdrop-blur border-b border-line'>
        {/* Desktop */}
        <nav className='hidden md:flex items-center justify-between px-8 lg:px-14 h-16 w-full'>
          <div className='flex items-center gap-7 lg:gap-10'>
            {LEFT_LINKS.map((l) => (
              <NavLink key={l.label} {...l} active={isActive(l.href)} />
            ))}
          </div>

          <Link
            href='/'
            aria-label='EcoBug home'
            className={`${pixelifySans.className} text-lg tracking-[0.2em] text-ink border border-line rounded px-3 py-0.5 bg-panel`}
          >
            ECOBUG
          </Link>

          <div className='flex items-center gap-7 lg:gap-10'>
            {RIGHT_LINKS.map((l) => (
              <NavLink key={l.label} {...l} active={isActive(l.href)} />
            ))}
            <AccountMenu />
          </div>
        </nav>

        {/* Mobile */}
        <div className='flex md:hidden items-center justify-between px-4 h-14'>
          <button
            onClick={handleHamburgerClick}
            aria-label='Open menu'
            className='cursor-pointer p-1'
          >
            <Image src='/ham-gren.png' alt='menu' width={32} height={32} />
          </button>

          <Link
            href='/'
            aria-label='EcoBug home'
            className={`${pixelifySans.className} absolute left-1/2 -translate-x-1/2 text-lg tracking-[0.2em] text-ink`}
          >
            ECOBUG
          </Link>

          <AccountMenu />
        </div>
      </header>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className='fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden' />
      )}
      <div
        ref={sidebarRef}
        className='fixed top-0 left-0 w-screen h-screen z-50 pointer-events-none md:hidden'
      >
        <StaggeredMenu
          isFixed={false}
          position='left'
          items={MENU_ITEMS}
          displaySocials={false}
          displayItemNumbering={false}
          menuButtonColor='#ffffff'
          openMenuButtonColor='#000'
          changeMenuColorOnOpen={true}
          colors={['#569b67', '#367b38']}
          logoUrl=''
          accentColor='#367b38'
          onMenuOpen={() => setDrawerOpen(true)}
          onMenuClose={() => setDrawerOpen(false)}
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