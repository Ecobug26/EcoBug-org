'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import localFont from 'next/font/local'

const pixelifySans = localFont({
  src: '../../public/fonts/pixelifySans.ttf',
})


export default function Login() {   
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleLogin() {
    if (!email || !password) {
  alert('Please fill in all fields.')
  return
}
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      alert(data.message || 'Login failed')
      return
    }

    // Store tokens
    localStorage.setItem('accessToken', data.accessToken)
    localStorage.setItem('refreshToken', data.refreshToken)
    localStorage.setItem('email', email)

    router.push('/')
  } catch (error) {
    console.error(error)
    alert('Unable to connect to server.')
  }
}

  return (
    <div className='min-h-screen flex items-center justify-center p-2 md:p-4'>
      <div className='bg-[#214330] w-full max-w-md rounded-xl p-6 md:p-8 shadow-2xl border border-white/20'>
        <div className='border-b border-white/30 pb-4 mb-6'>
          <span
            className={`${pixelifySans.className} text-white text-3xl md:text-4xl tracking-[0.05em]`}
          >
            ECOBUG
          </span>
        </div>
        <div className='flex flex-col gap-6'>
          <span
            className={`text-white text-lg md:text-xl ${pixelifySans.className}`}
          >
            Sign In
          </span>
          <div className='flex flex-col gap-2'>
            <span
              className={`text-white text-sm md:text-base ${pixelifySans.className}`}
            >
              Email
            </span>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full bg-[#d9d9d9] h-10 md:h-12 rounded-lg px-4 text-base md:text-lg outline-none focus:ring-4 focus:ring-[#7ec28d]/50 transition-all shadow-[0px_4px_1px_#000]'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <span
              className={`text-white text-sm md:text-base ${pixelifySans.className}`}
            >
              Password
            </span>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full bg-[#d9d9d9] h-10 md:h-12 rounded-lg px-4 text-base md:text-lg outline-none focus:ring-4 focus:ring-[#7ec28d]/50 transition-all shadow-[0px_4px_1px_#000]'
            />
          </div>
          <div>
            <button
              onClick={handleLogin}
              className={`w-full bg-[#6aa874] hover:bg-[#6aa874aa] text-white h-9 md:h-11 rounded-lg text-sm md:text-base transition-colors cursor-pointer ${pixelifySans.className}`}
            >
              NEXT
            </button>
          </div>
          <div
            className={`text-white text-sm md:text-base flex gap-2 ${pixelifySans.className}`}
          >
            <span>no account?</span>
            <a
              href='/auth/signup'
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
