'use client'

import React, { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { offbit, offbitDot } from '@/components/utils/utils'
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
  { label: 'CONTACT US', href: '/contact' },
]

const MENU_ITEMS = [
  { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
  { label: 'Webtool', ariaLabel: 'Go to webtool', link: '/webtool' },
  { label: 'Blog', ariaLabel: 'Go to blog', link: '/blog' },
  { label: 'Careers', ariaLabel: 'Go to careers', link: '/careers' },
  { label: 'About', ariaLabel: 'About us', link: '/about' },
  { label: 'Buy', ariaLabel: 'Buy now', link: '/products' },
  { label: 'Contact', ariaLabel: 'Contact us', link: '/contact' },
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
      className={`group relative ${offbit.className} whitespace-nowrap font-bold text-base lg:text-[20px] leading-6 tracking-normal text-[#1D422A] dark:text-[#8FCB8A] hover:text-[#255509] dark:hover:text-[#E9F5E0] transition-colors`}
    >
      {label}
      {/* underline grows from a dot on the left, per the original interaction */}
      <span
        className={`absolute left-0 -bottom-0.5 h-[2px] w-full bg-current origin-left transition-transform duration-200 ${
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
      <header className='fixed top-0 inset-x-0 z-40 bg-bg/90 backdrop-blur'>
        {/* Desktop — Figma "Nav items LIGHT/DARK": 76px bar, padL 186,
            cluster gap 47, avatar gap 51 (content sits ~227px from left). */}
        <nav className='hidden lg:flex items-center justify-center w-full h-[76px] pl-6 lg:pl-[186px]'>
          <div className='flex items-center gap-4 lg:gap-[47px]'>
            {LEFT_LINKS.map((l) => (
              <NavLink key={l.label} {...l} active={isActive(l.href)} />
            ))}

            <Link
              href='/'
              aria-label='EcoBug home'
              className={`${offbitDot.className} text-[40px] lg:text-[57px] leading-[1.2] text-[#255509] dark:text-[#E9F5E0] hover:opacity-80 transition-opacity select-none`}
            >
              ECOBUG
            </Link>

            {RIGHT_LINKS.map((l) => (
              <NavLink key={l.label} {...l} active={isActive(l.href)} />
            ))}

            {/* +4px so the avatar gap is 51 (vs the cluster's 47) at lg */}
            <span className='ml-1'>
              <AccountMenu />
            </span>
          </div>
        </nav>

        {/* Mobile */}
        <div className='flex lg:hidden items-center justify-between px-4 h-[60px]'>
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
            className={`${offbitDot.className} absolute left-1/2 -translate-x-1/2 text-[32px] leading-none text-[#255509] dark:text-[#E9F5E0] select-none`}
          >
            ECOBUG
          </Link>

          <AccountMenu />
        </div>
      </header>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className='fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden' />
      )}
      <div
        ref={sidebarRef}
        className='fixed top-0 left-0 w-screen h-screen z-50 pointer-events-none lg:hidden'
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