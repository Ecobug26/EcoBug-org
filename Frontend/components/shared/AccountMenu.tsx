'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { offbit } from '@/components/utils/utils'
import ThemeToggle from '@/components/shared/ThemeToggle'
import { useAuth } from '@/context/AuthContext'

function AvatarIcon({ className = '' }: { className?: string }) {
  return (
    <span
      className={`rounded-full bg-white border border-black/10 flex items-center justify-center text-[#3C6E47] ${className}`}
    >
      <svg viewBox='0 0 24 24' fill='currentColor' className='w-[60%] h-[60%]' aria-hidden>
        <path d='M12 12c2.7 0 4.8-2.2 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z' />
      </svg>
    </span>
  )
}

function MenuLink({
  href,
  onClick,
  children,
}: {
  href: string
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <Link
      role='menuitem'
      href={href}
      onClick={onClick}
      className={`block w-full text-center py-2.5 text-[#3C6E47] hover:opacity-70 border-b-2 border-black transition-opacity ${offbit.className} text-lg tracking-wide uppercase`}
    >
      {children}
    </Link>
  )
}

export default function AccountMenu() {
  const router = useRouter()
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return

    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const close = () => setOpen(false)

  const handleLogout = () => {
    logout()
    setOpen(false)
    router.replace('/')
    router.refresh()
  }

  return (
    <div ref={rootRef} className='relative z-50'>
      <button
        ref={buttonRef}
        type='button'
        aria-label={open ? 'Close account menu' : 'Open account menu'}
        aria-haspopup='menu'
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className='cursor-pointer block rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3C6E47]'
      >
        <AvatarIcon className='w-10 h-10 md:w-11 md:h-11' />
      </button>

      {open && (
        <div
          role='menu'
          aria-label='Account'
          className='absolute right-0 top-[calc(100%+12px)] z-50 w-[220px] max-w-[calc(100vw-2rem)] bg-white rounded-[20px] shadow-2xl border border-black/5 p-4 flex flex-col items-center'
        >
          {user ? (
            <>
              <MenuLink href='/profile' onClick={close}>
                Profile
              </MenuLink>
              {/* Plant Vault moved here - only visible when logged in */}
              <MenuLink href='/webtool/plantvault' onClick={close}>
                Plant Vault
              </MenuLink>
            </>
          ) : (
            <>
              <MenuLink href='/auth/login' onClick={close}>
                LOGIN
              </MenuLink>
              <MenuLink href='/auth/signup' onClick={close}>
                SIGN-UP
              </MenuLink>
            </>
          )}

          {user && (
            <button
              role='menuitem'
              onClick={handleLogout}
              className={`block w-full text-center py-2.5 text-[#3C6E47] hover:opacity-70 border-b-2 border-black transition-opacity cursor-pointer ${offbit.className} text-lg tracking-wide uppercase`}
            >
              LOGOUT
            </button>
          )}

          <div className='mt-4 flex flex-col items-center w-full'>
            <ThemeToggle />
          </div>
        </div>
      )}
    </div>
  )
}