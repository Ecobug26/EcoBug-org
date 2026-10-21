'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { offbit } from '@/components/utils/utils'
import { DotWordmark } from '@/components/shared/DotWordmark'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  
  const router = useRouter()

  async function handleSignup(e?: React.FormEvent) {
    if (e) e.preventDefault()

    if (!email || !username || !password || !confirmPassword) {
      alert('Please fill in all fields.')
      return
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match.')
      return
    }

    if (password.length < 8) {
      alert('Password must be at least 8 characters.')
      return
    }

    if (submitting) return
    setSubmitting(true)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            fullName: username, // Sending the explicit username
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
              className="w-full bg-[#EAEAEA] border-2 border-black rounded-full px-6 py-3 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-gray-300 transition-all text-black placeholder-gray-600"
            />

            <input
              type="text"
              placeholder="username"
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#EAEAEA] border-2 border-black rounded-full px-6 py-3 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-gray-300 transition-all text-black placeholder-gray-600"
            />
            
            <input
              type="password"
              placeholder="enter password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#EAEAEA] border-2 border-black rounded-full px-6 py-3 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-gray-300 transition-all text-black placeholder-gray-600"
            />

            <input
              type="password"
              placeholder="confirm password"
              autoComplete="new-password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-[#EAEAEA] border-2 border-black rounded-full px-6 py-3 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-gray-300 transition-all text-black placeholder-gray-600"
            />

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-transparent border-2 border-black rounded-full py-3 mt-2 text-sm font-extrabold text-black hover:bg-black hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'SIGNING UP...' : 'SIGN UP'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 border-t-2 border-dashed border-gray-400" />
            <span className="text-xs font-bold text-gray-500 uppercase">or</span>
            <div className="flex-1 border-t-2 border-dashed border-gray-400" />
          </div>

          <button className="w-full bg-transparent border-2 border-black rounded-full py-3 text-sm font-extrabold text-black hover:bg-black hover:text-white transition-colors">
            Continue with Google
          </button>

          <p className="text-xs font-bold text-center mt-6 text-black">
            Already have an account?{' '}
            <Link href="/auth/login" className="underline hover:text-gray-600 transition-colors">
              Login
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