'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { offbit } from '@/components/utils/utils'
import { DotWordmark } from '@/components/shared/DotWordmark'
import { useToast } from '@/components/shared/Toast'
import ThemeToggle from '@/components/shared/ThemeToggle'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  
  const router = useRouter()
  const { toast } = useToast()

  async function handleSignup(e?: React.FormEvent) {
    if (e) e.preventDefault()

    if (!email || !username || !password || !confirmPassword) {
      toast({ title: 'Missing fields', message: 'Please fill in all fields.', type: 'error' })
      return
    }

    if (password !== confirmPassword) {
      toast({ title: 'Password mismatch', message: 'Passwords do not match.', type: 'error' })
      return
    }

    if (password.length < 8) {
      toast({ title: 'Password too short', message: 'Password must be at least 8 characters.', type: 'error' })
      return
    }

    if (submitting) return
    setSubmitting(true)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName: username, email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        toast({ title: 'Signup failed', message: data.message || 'Unable to create account.', type: 'error' })
        return
      }

      localStorage.setItem('accessToken', data.accessToken)
      localStorage.setItem('refreshToken', data.refreshToken)
      localStorage.setItem('email', email)

      toast({ title: 'Account created', message: 'Welcome to EcoBug!', type: 'success' })
      router.push('/')
    } catch (err) {
      console.error(err)
      toast({ title: 'Unable to connect', message: 'Please check your connection and try again.', type: 'error' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    // Removed bg-[#EAF5C8]
    <div className="min-h-screen dark:bg-[#102112] flex flex-col justify-between relative overflow-hidden">
      
      {/* Top Section */}
      <div className="flex-1 flex flex-col items-center w-full px-4 pt-10">
        
        {/* Back Button */}
        <div className="absolute top-6 left-6 md:top-8 md:left-8 z-50">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-black dark:text-[#EAF2E4] font-bold hover:text-gray-700 dark:hover:text-gray-300 transition-colors group"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span className={`${offbit.className} text-sm md:text-base pt-1`}>BACK</span>
          </button>
        </div>

        {/* Existing Theme Toggle */}
        <div className="absolute top-6 right-6 md:top-8 md:right-8 z-50">
          <ThemeToggle />
        </div>

        {/* Main Card */}
        <main className="w-full max-w-5xl bg-[#B3D69A] dark:bg-[#1C3B26] rounded-[32px] p-6 md:p-10 shadow-sm flex flex-col md:flex-row gap-8 md:gap-12 mt-12">
          
          {/* Left Side - Image Placeholder */}
          <div className="w-full md:w-1/2 min-h-[350px] md:min-h-[500px] bg-[#D9D9D9] rounded-[24px]" />

          {/* Right Side - Form */}
          <div className="w-full md:w-1/2 flex flex-col justify-center py-4">
            <h1 className={`${offbit.className} text-4xl md:text-5xl font-bold text-center mb-8 uppercase text-black dark:text-[#EAF2E4]`}>
              SIGN UP
            </h1>
            
            <form className="flex flex-col gap-4" onSubmit={handleSignup}>
              <input
                type="email"
                placeholder="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#D9D9D9] border-2 border-black dark:border-[#5FA463] rounded-full px-6 py-3 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-black/10 dark:focus:ring-white/20 transition-all text-black placeholder-gray-600"
              />

              <input
                type="text"
                placeholder="username"
                autoComplete="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#D9D9D9] border-2 border-black dark:border-[#5FA463] rounded-full px-6 py-3 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-black/10 dark:focus:ring-white/20 transition-all text-black placeholder-gray-600"
              />
              
              <input
                type="password"
                placeholder="enter password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#D9D9D9] border-2 border-black dark:border-[#5FA463] rounded-full px-6 py-3 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-black/10 dark:focus:ring-white/20 transition-all text-black placeholder-gray-600"
              />

              <input
                type="password"
                placeholder="confirm password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-[#D9D9D9] border-2 border-black dark:border-[#5FA463] rounded-full px-6 py-3 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-black/10 dark:focus:ring-white/20 transition-all text-black placeholder-gray-600"
              />

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-white dark:bg-[#B3D69A] border-2 border-black dark:border-transparent rounded-full py-3 mt-2 text-sm font-extrabold text-black hover:bg-gray-100 dark:hover:bg-[#a0c486] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'SIGNING UP...' : 'SIGN UP'}
              </button>
            </form>

            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 border-t-2 border-dashed border-black/30 dark:border-[#EAF2E4]/30" />
              <span className="text-xs font-bold text-black dark:text-[#EAF2E4] uppercase">or</span>
              <div className="flex-1 border-t-2 border-dashed border-black/30 dark:border-[#EAF2E4]/30" />
            </div>

            <button className="w-full bg-white dark:bg-[#B3D69A] border-2 border-black dark:border-transparent rounded-full py-3 text-sm font-extrabold text-black hover:bg-gray-100 dark:hover:bg-[#a0c486] transition-colors">
              Continue with Google
            </button>

            <p className="text-xs font-bold text-center mt-6 text-black dark:text-[#EAF2E4]">
              Already have an account?{' '}
              <Link href="/auth/login" className="underline hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                Login
              </Link>
            </p>
          </div>
        </main>
      </div>

      {/* Giant ECOBUG Logo - Flush to bottom */}
      <div className="w-full mt-12 m-0 p-0 leading-none">
        <DotWordmark />
      </div>

    </div>
  )
}