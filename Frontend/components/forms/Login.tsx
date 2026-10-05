'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { pixelifySans } from '@/components/utils/utils'

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
    <div className='min-h-screen flex items-center justify-center bg-bg p-2 md:p-4'>
      <div className='bg-panel w-full max-w-md rounded-2xl p-6 md:p-8 shadow-[0_8px_24px_rgba(0,0,0,0.10)] border border-line'>
        <div className='border-b border-line pb-4 mb-6'>
          <span
            className={`${pixelifySans.className} text-ink text-3xl md:text-4xl tracking-[0.05em]`}
          >
            ECOBUG
          </span>
        </div>
        <div className='flex flex-col gap-6'>
          <span
            className={`text-ink text-lg md:text-xl ${pixelifySans.className}`}
          >
            Sign In
          </span>
          <div className='flex flex-col gap-2'>
            <span
              className={`text-ink text-sm md:text-base ${pixelifySans.className}`}
            >
              Email
            </span>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full bg-chip border border-line h-10 md:h-12 rounded-lg px-4 text-base md:text-lg text-ink outline-none focus:ring-4 focus:ring-primary/40 transition-all'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <span
              className={`text-ink text-sm md:text-base ${pixelifySans.className}`}
            >
              Password
            </span>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full bg-chip border border-line h-10 md:h-12 rounded-lg px-4 text-base md:text-lg text-ink outline-none focus:ring-4 focus:ring-primary/40 transition-all'
            />
          </div>
          <div>
            <button
              onClick={handleLogin}
              className={`w-full bg-primary-hover hover:opacity-90 text-panel h-9 md:h-11 rounded-lg text-sm md:text-base transition-opacity cursor-pointer ${pixelifySans.className}`}
            >
              NEXT
            </button>
          </div>
          <div
            className={`text-ink-muted text-sm md:text-base flex gap-2 ${pixelifySans.className}`}
          >
            <span>no account?</span>
            <a
              href='/auth/signup'
              className='text-primary hover:text-primary-hover transition-colors hover:underline'
            >
              Create account
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
