'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { offbit } from '@/components/utils/utils'
import { useAuth } from '@/context/AuthContext'
import { DotWordmark } from '@/components/shared/DotWordmark'
import { useToast } from '@/components/shared/Toast'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function Login() {
  const router = useRouter()
  const { refreshUser } = useAuth()
  const { toast } = useToast()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleLogin(e?: React.FormEvent) {
    if (e) e.preventDefault()

    if (!email.trim() || !password) {
      toast({
        title: 'Missing fields',
        message: 'Please fill in all fields.',
        type: 'error',
      })
      return
    }

    if (submitting) return

    if (!API_URL) {
      toast({
        title: 'Configuration error',
        message: 'API URL is not configured.',
        type: 'error',
      })
      console.error('NEXT_PUBLIC_API_URL is missing')
      return
    }

    setSubmitting(true)

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      })

      const responseText = await response.text()
      let data: {
        accessToken?: string
        refreshToken?: string
        message?: string
      }

      try {
        data = JSON.parse(responseText)
      } catch {
        throw new Error(
          response.ok
            ? 'The server returned an invalid response.'
            : `Login failed (${response.status}).`
        )
      }

      if (!response.ok) {
        throw new Error(data.message || `Login failed (${response.status}).`)
      }

      if (!data.accessToken || !data.refreshToken) {
        throw new Error('The server did not return both authentication tokens.')
      }

      localStorage.setItem('accessToken', data.accessToken)
      localStorage.setItem('refreshToken', data.refreshToken)
      localStorage.setItem('email', email.trim())

      await refreshUser()

      toast({
        title: 'Login successful',
        message: 'Welcome back!',
        type: 'success',
      })

      router.replace('/')
      router.refresh()
    } catch (error) {
      console.error('Login error:', error)
      
      toast({
        title: 'Login failed',
        message:
          error instanceof Error
            ? error.message
            : 'Unable to log in. Please try again.',
        type: 'error',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FDF4E3] flex flex-col justify-between items-center py-10 px-4 relative">
      
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        aria-label="Go back"
        className="absolute top-6 left-6 md:top-8 md:left-8 flex items-center gap-2 text-black font-bold hover:text-gray-600 transition-colors z-50 group"
      >
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="group-hover:-translate-x-1 transition-transform"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        <span className={`${offbit.className} text-sm md:text-base pt-1`}>BACK</span>
      </button>

      {/* Main White Card */}
      <main className="w-full max-w-5xl bg-white rounded-[32px] p-6 md:p-10 shadow-xl flex flex-col md:flex-row gap-8 md:gap-12 mt-12">
        
        {/* Left Side - Image Placeholder */}
        <div className="w-full md:w-1/2 min-h-[350px] md:min-h-[500px] bg-[#D9D9D9] rounded-[24px]" />

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center py-4">
          <h1 className={`${offbit.className} text-4xl md:text-5xl font-bold text-center mb-8 uppercase text-black`}>
            LOGIN
          </h1>
          
          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="username / email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#EAEAEA] border-2 border-black rounded-full px-6 py-3 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-gray-300 transition-all text-black placeholder-gray-600"
            />
            
            <input
              type="password"
              placeholder="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#EAEAEA] border-2 border-black rounded-full px-6 py-3 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-gray-300 transition-all text-black placeholder-gray-600"
            />
            
            <div className="text-center mt-1">
              <Link
                href="/auth/forgot-password"
                className="text-[11px] font-bold underline text-black hover:text-gray-600 transition-colors uppercase"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-transparent border-2 border-black rounded-full py-3 mt-2 text-sm font-extrabold text-black hover:bg-black hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'SIGNING IN...' : 'LOGIN'}
            </button>
          </form>

          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 border-t-2 border-dashed border-gray-400" />
            <span className="text-xs font-bold text-gray-500 uppercase">or</span>
            <div className="flex-1 border-t-2 border-dashed border-gray-400" />
          </div>

          <button className="w-full bg-transparent border-2 border-black rounded-full py-3 text-sm font-extrabold text-black hover:bg-black hover:text-white transition-colors">
            Continue with Google
          </button>

          <p className="text-xs font-bold text-center mt-6 text-black">
            Need an account?{' '}
            <Link href="/auth/signup" className="underline hover:text-gray-600 transition-colors">
              Sign Up
            </Link>
          </p>
        </div>

      </main>

      {/* Giant ECOBUG Logo at the bottom */}
      <div className="w-full max-w-4xl flex justify-center mt-12 mb-4 select-none pointer-events-none">
        <DotWordmark />
      </div>

    </div>
  )
}