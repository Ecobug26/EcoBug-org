'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { pixelifySans } from '@/components/utils/utils'

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
    <div className='min-h-screen flex items-center justify-center p-2 md:p-4'>
      <div className='relative w-full max-w-md'>
        {/* Avatar overlapping the card */}
        <div className='absolute -top-8 left-6 z-10'>
          <div className='relative'>
            <div className='w-20 h-20 md:w-24 md:h-24 rounded-full bg-white flex items-center justify-center shadow-md overflow-hidden'>
              {/* Person icon placeholder */}
              <svg
                viewBox='0 0 24 24'
                fill='#1a1a1a'
                className='w-14 h-14 md:w-16 md:h-16 mt-2'
              >
                <path d='M12 12c2.7 0 4.8-2.2 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z' />
              </svg>
            </div>
            {/* Edit indicator */}
            <span className='absolute top-0 right-0 w-3 h-3 bg-[#7ec8d8] rounded-sm' />
          </div>
        </div>

        <div className='bg-[#214330] w-full rounded-xl p-6 pt-12 md:p-8 md:pt-14 shadow-2xl border border-white/20'>
          <h1
            className={`${pixelifySans.className} text-white text-2xl md:text-3xl tracking-[0.05em] mb-6 md:mb-8 text-center md:text-left md:pl-24`}
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
              className='w-full bg-[#d9d9d9] h-10 md:h-12 rounded-lg px-4 text-base md:text-lg text-black/80 outline-none cursor-default'
            />

            {/* Manage subscription placeholder rows */}
            <div className='flex flex-col sm:flex-row gap-4 sm:gap-8'>
              <span
                className={`text-white text-sm md:text-base whitespace-nowrap ${pixelifySans.className}`}
              >
                manage subscription:
              </span>
              <div className='flex flex-col gap-2 flex-1'>
                <span className='text-white/70 text-xs md:text-sm border-b border-dashed border-white/40 pb-1'>
                  --------------------------------
                </span>
                <span className='text-white/70 text-xs md:text-sm border-b border-dashed border-white/40 pb-1'>
                  --------------------------------
                </span>
                <span className='text-white/70 text-xs md:text-sm border-b border-dashed border-white/40 pb-1'>
                  --------------------------------
                </span>
              </div>
            </div>

            {/* Sign out */}
            <div>
              <button
                onClick={handleSignOut}
                className={`bg-[#6aa874] hover:bg-[#6aa874aa] text-white h-9 md:h-11 px-6 rounded-lg text-sm md:text-base transition-colors cursor-pointer ${pixelifySans.className}`}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
