'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { offbit } from '@/components/utils/utils'
import ThemeToggle from '@/components/shared/ThemeToggle'
import { useAuth } from '@/context/AuthContext'

/**
 * Account menu (Figma spec):
 * - navbar shows ONLY the account icon; clicking it toggles a popup
 * - logged out  → LOGIN · SIGN-UP · dark-mode toggle
 * - logged in   → Profile · Plant Vault · LOGOUT · dark-mode toggle
 * Auth state comes from AuthContext (real state — no fake auth here).
 */

function AvatarIcon({ className = '' }: { className?: string }) {
  return (
    <span
      className={`rounded-full bg-panel border border-line flex items-center justify-center text-primary-hover ${className}`}
    >
      <svg viewBox='0 0 24 24' fill='currentColor' className='w-[62%] h-[62%]' aria-hidden>
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
      className={`block w-full text-center py-1.5 text-primary hover:text-primary-hover border-b border-line transition-colors ${offbit.className} text-sm tracking-wide`}
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

  // Close on outside click + Escape
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
    close()
    router.push('/')
  }

  return (
    <div ref={rootRef} className='relative'>
      <button
        ref={buttonRef}
        type='button'
        aria-label={open ? 'Close account menu' : 'Open account menu'}
        aria-haspopup='menu'
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className='cursor-pointer block rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary'
      >
        <AvatarIcon className='w-8 h-8 md:w-[42px] md:h-[42px]' />
      </button>

      {open && (
        <div
          role='menu'
          aria-label='Account'
          className='absolute right-0 top-[calc(100%+10px)] z-50 w-44 max-w-[calc(100vw-2rem)] bg-panel border border-line rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.18)] p-3 flex flex-col items-center'
        >
          <AvatarIcon className='w-11 h-11 mb-2' />

          {user ? (
            <>
              <MenuLink href='/username' onClick={close}>
                Profile
              </MenuLink>
              <MenuLink href='/webtool/plantbank' onClick={close}>
                Plant Vault
              </MenuLink>
              <button
                role='menuitem'
                onClick={handleLogout}
                className={`block w-full text-center py-1.5 text-primary hover:text-primary-hover border-b border-line transition-colors cursor-pointer ${offbit.className} text-sm tracking-wide`}
              >
                LOGOUT
              </button>
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

          <div className='mt-3'>
            <ThemeToggle />
          </div>
          <span
            className={`${offbit.className} mt-1.5 text-[9px] tracking-widest text-primary uppercase`}
          >
            Toggle: Dark Mode
          </span>
        </div>
      )}
    </div>
  )
}