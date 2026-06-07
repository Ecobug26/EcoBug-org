'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

import localFont from 'next/font/local'

const pixelifySans = localFont({
  src: '../../public/fonts/pixelifySans.ttf',
})


export default function Login() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleLogin() {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    alert(error.message)
    return
  }

  router.push('/')
}

  return (
    
    <div className='min-h-screen flex items-center justify-center p-2 md:p-4'>
      <div className='bg-[#214330] w-full max-w-250 scale-80 rounded-2xl p-8 md:p-12 shadow-2xl border border-white/20'>
        <div className='border-b border-white/30 pb-6 mb-8'>
          <span
            className={`${pixelifySans.className} text-white text-6xl md:text-9xl tracking-[-0.002em]`}
          >
            ECOBUG
          </span>
        </div>
        <div className='flex flex-col gap-8'>
          <div className='mb-8'>
            <span
              className={`text-white text-3xl md:text-4xl ${pixelifySans.className}`}
            >
              Sign In
            </span>
          </div>
          <div className='flex flex-col gap-8'>
            <div className='flex flex-col gap-3'>
              <span
                className={`text-white text-2xl md:text-3xl ${pixelifySans.className}`}
              >
                Email
              </span>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full bg-[#d9d9d9] h-16 md:h-20 rounded-xl px-6 text-2xl outline-none focus:ring-4 focus:ring-[#7ec28d]/50 transition-all shadow-[0px_6px_1px_#000]'
                placeholder='Enter your email'
              />
            </div>
            <div className='flex flex-col gap-3'>
              <span
              className={`text-white text-2xl md:text-3xl ${pixelifySans.className}`}
              >
              Password
              </span>
              <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full bg-[#d9d9d9] h-16 md:h-20 rounded-xl px-6 text-2xl outline-none focus:ring-4 focus:ring-[#7ec28d]/50 transition-all shadow-[0px_6px_1px_#000]'
                placeholder='Enter your password'
              />
            </div>
            <div>
              <button
                onClick={handleLogin}
                className={`w-full bg-[#4eb26d] hover:bg-[#4eb26d88] text-white h-16 md:h-20 rounded-xl text-2xl md:text-4xl transition-colors cursor-pointer mt-2 ${pixelifySans.className}`}
              >
                Login
              </button>
            </div>
          </div>
          <div
            className={`mt-4 text-white text-xl md:text-3xl flex gap-3 ${pixelifySans.className}`}
          >
            <span>no account?</span>
            <a
              href='#'
              className='hover:text-[#7ec28d] transition-colors hover:underline'
            >
              Create account
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
