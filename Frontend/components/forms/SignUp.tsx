'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { offbit } from '@/components/utils/utils'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  async function handleSignup() {
    // Full name derived from email (UI only collects email + password)
    const fullName = email.split('@')[0] || ''
    if (!email || !password) {
    alert('Please fill in all fields.')
    return
  }

  if (password.length < 8) {
    alert('Password must be at least 8 characters.')
    return
  }
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          email,
          password,
        }),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      alert(data.message || 'Signup failed')
      return
    }

    localStorage.setItem('accessToken', data.accessToken)
    localStorage.setItem('refreshToken', data.refreshToken)
    localStorage.setItem('email', email)

    router.push('/')
  } catch (err) {
    console.error(err)
    alert('Unable to connect to server')
  }
}

  return (
    <div className='min-h-screen flex items-center justify-center bg-bg p-2 md:p-4'>
      <div className='bg-panel w-full max-w-md rounded-2xl p-6 md:p-8 shadow-[0_8px_24px_rgba(0,0,0,0.10)] border border-line'>
        <div className='border-b border-line pb-4 mb-6'>
          <span
            className={`${offbit.className} text-ink text-3xl md:text-4xl tracking-[0.05em]`}
          >
            ECOBUG
          </span>
        </div>
        <div className='flex flex-col gap-6'>
          <span
            className={`text-ink text-lg md:text-xl ${offbit.className}`}
          >
            Sign Up
          </span>
          <div className='flex flex-col gap-2'>
            <span
              className={`text-ink text-sm md:text-base ${offbit.className}`}
            >
              Enter Email
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
              className={`text-ink text-sm md:text-base ${offbit.className}`}
            >
              Enter Password
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
              onClick={handleSignup}
              className={`w-full bg-primary-hover hover:opacity-90 text-panel h-9 md:h-11 rounded-lg text-sm md:text-base transition-opacity cursor-pointer ${offbit.className}`}
            >
              NEXT
            </button>
          </div>
          <div
            className={`text-ink-muted text-sm md:text-base flex flex-wrap gap-2 ${offbit.className}`}
          >
            <span>already have an account?</span>
            <a
              href='/auth/login'
              className='text-primary hover:text-primary-hover transition-colors hover:underline'
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
