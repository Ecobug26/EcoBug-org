'use client'

import Image from 'next/image'
import { useState, useEffect, useRef, SetStateAction } from 'react'
import { pixelifySans } from '../utils/utils'
import { useRouter } from 'next/navigation'
import StaggeredMenu from '../sidebar/StaggeredMenu'

type BtnProps = {
  text: string
  link: string
}

const links = {
  home: '/',
  buy: '/products',
  webtool: '/webtool',
  blog: '/blog',
  aboutus: '/about',
}

const navItems = [
  { text: 'HOME', link: links.home },
  { text: 'BUY', link: links.buy },
  { text: 'WEBTOOL', link: links.webtool },
  { text: 'BLOG', link: links.blog },
  { text: 'ABOUT', link: links.aboutus },
]

const menuItems = [
  { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
  { label: 'Webtool', ariaLabel: 'Go to webtool', link: '/webtool' },
  { label: 'Blog', ariaLabel: 'Go to blog', link: '/blog' },
  { label: 'About', ariaLabel: 'About us', link: '/about' },
  { label: 'Buy', ariaLabel: 'Buy now', link: '/products' },
]

function Btn({ text, link }: BtnProps) {
  const r = useRouter()

  return (
    <button
      className={`
        group relative px-1 py-1
        ${pixelifySans.className}
        text-[16px] sm:text-xl md:text-3xl text-[#1d4226c8]
        transition-all duration-300 ease-out
        hover:text-[#1d4226] hover:-translate-y-1
        active:translate-y-0 active:scale-95
        cursor-pointer whitespace-nowrap
      `}
      onClick={() => r.push(link)}
    >
      {text}
      <span className='absolute left-0 -bottom-1 w-full h-1 bg-[#2f7335] rounded-full origin-right scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100 group-hover:origin-left' />
    </button>
  )
}

function UserDialog() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  return (
    <div ref={dialogRef} className='relative flex items-center'>
      <button className='cursor-pointer' onClick={() => setOpen((p) => !p)}>
        <Image
          src='/user.png'
          alt='user'
          width={36}
          height={36}
          className='w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11'
        />
      </button>

      {open && (
        <div className='absolute top-full right-0 mt-2 w-36 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden z-50'>
          <button
            onClick={() => {
              router.push('/auth/login')
              setOpen(false)
            }}
            className={`w-full cursor-pointer text-left px-4 py-3 text-sm text-[#1d4226] hover:bg-[#f0f7f0] transition-colors ${pixelifySans.className}`}
          >
            Login
          </button>
          <div className='h-px bg-gray-100' />
          <button
            onClick={() => {
              router.push('/auth/signup')
              setOpen(false)
            }}
            className={`w-full cursor-pointer text-left px-4 py-3 text-sm text-[#1d4226] hover:bg-[#f0f7f0] transition-colors ${pixelifySans.className}`}
          >
            Sign Up
          </button>
        </div>
      )}
    </div>
  )
}

function SubSection({ onHamburgerClick }: { onHamburgerClick: () => void }) {
  const [scrollY, setScrollY] = useState(0)
  const [maxScroll, setMaxScroll] = useState(1)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const updateSize = () => {
      setMaxScroll(window.innerHeight)
      setWidth(window.innerWidth)
    }
    const handleScroll = () => setScrollY(window.scrollY)

    updateSize()
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', updateSize)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', updateSize)
    }
  }, [])

  const archIntensity = Math.max(0, 1.35 - scrollY / (maxScroll * 0.5))

  return (
    <div>
      <div className='flex justify-between mx-1 md:mx-12'>
        <button className='cursor-pointer' onClick={onHamburgerClick}>
          <Image
            src='/hamburger.png'
            alt='menu'
            width={36}
            height={36}
            className='w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11'
          />
        </button>

        <h1
          className={`text-center text-5xl md:text-8xl text-[#1d4226] ${pixelifySans.className}`}
        >
          ECOBUG
        </h1>

        <UserDialog />
      </div>

      <div className='flex flex-nowrap justify-center items-end gap-2 sm:gap-6 lg:gap-40 mt-4 md:mt-10 px-2'>
        {navItems.map((item, index) => {
          const distanceFromCenter = index - (navItems.length - 1) / 2
          const baseOffset = distanceFromCenter ** 2 * 12
          const scale = Math.min(width / 1200, 1)
          const currentY = baseOffset * archIntensity * scale

          return (
            <div
              key={item.text}
              style={{
                transform: `translateY(${currentY}px)`,
                transition: 'transform 0.2s ease-out' ,
                willChange: 'transform',
              }}
            >
              <Btn text={item.text} link={item.link} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

type NavProps = {
  setIsSidebarOpen: React.Dispatch<SetStateAction<boolean>>
}

export default function Navbar({ setIsSidebarOpen }: NavProps) {
  const sidebarRef = useRef<HTMLDivElement>(null)

  const handleHamburgerClick = () => {
    const toggleBtn = sidebarRef.current?.querySelector(
      '.sm-toggle',
    ) as HTMLButtonElement | null
    toggleBtn?.click()
  }

  return (
    <>
      <nav className='text-black bg-white fixed top-0 left-0 right-0 z-20 p-4'>
        <SubSection onHamburgerClick={handleHamburgerClick} />
      </nav>

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
        <style>{`.sm-scope .staggered-menu-header { visibility: hidden !important; pointer-events: none !important; }`}</style>
      </div>
    </>
  )
}
