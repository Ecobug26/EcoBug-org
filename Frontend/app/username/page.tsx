'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { offbit } from '@/components/utils/utils'
import { Panel } from '@/components/shared/ui'

/** Account page — token-based card (avatar, email, placeholder rows, sign out). */
export default function UsernamePage() {
  const router = useRouter()
  const [email, setEmail] = useState('')

  useEffect(() => {
    setEmail(localStorage.getItem('email') || '')
  }, [])

  function handleSignOut() {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('email')
    router.push('/')
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-bg p-2 md:p-4'>
      <div className='relative w-full max-w-md'>
        {/* Avatar overlapping the card */}
        <div className='absolute -top-8 left-6 z-10'>
          <div className='relative'>
            <div className='w-20 h-20 md:w-24 md:h-24 rounded-full bg-panel border border-line flex items-center justify-center shadow-md overflow-hidden'>
              <svg viewBox='0 0 24 24' fill='currentColor' className='w-14 h-14 md:w-16 md:h-16 mt-2 text-ink-muted'>
                <path d='M12 12c2.7 0 4.8-2.2 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z' />
              </svg>
            </div>
            <span className='absolute top-0 right-0 w-3 h-3 bg-warning rounded-sm' />
          </div>
        </div>

        <Panel className='w-full p-6 pt-12 md:p-8 md:pt-14'>
          <h1
            className={`${offbit.className} text-ink text-2xl md:text-3xl tracking-[0.05em] mb-6 md:mb-8 text-center md:text-left md:pl-24`}
          >
            user name
          </h1>

          <div className='flex flex-col gap-6'>
            {/* Email */}
            <input
              type='email'
              value={email}
              readOnly
              placeholder='Email'
              className='w-full bg-chip border border-line h-10 md:h-12 rounded-lg px-4 text-base md:text-lg text-ink outline-none cursor-default'
            />

            {/* Manage subscription placeholder rows */}
            <div className='flex flex-col sm:flex-row gap-4 sm:gap-8'>
              <span
                className={`text-ink text-sm md:text-base whitespace-nowrap ${offbit.className}`}
              >
                manage subscription:
              </span>
              <div className='flex flex-col gap-2 flex-1'>
                <span className='text-ink-muted text-xs md:text-sm border-b border-dashed border-line pb-1'>
                  --------------------------------
                </span>
                <span className='text-ink-muted text-xs md:text-sm border-b border-dashed border-line pb-1'>
                  --------------------------------
                </span>
                <span className='text-ink-muted text-xs md:text-sm border-b border-dashed border-line pb-1'>
                  --------------------------------
                </span>
              </div>
            </div>

            {/* Sign out */}
            <div>
              <button
                onClick={handleSignOut}
                className={`${offbit.className} bg-primary-hover hover:opacity-90 text-panel h-9 md:h-11 px-6 rounded-lg text-sm md:text-base transition-opacity cursor-pointer`}
              >
                Sign Out
              </button>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  )
}
