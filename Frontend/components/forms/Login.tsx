'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { offbit } from '@/components/utils/utils'
import { useAuth } from '@/context/AuthContext'
import { useToast } from '@/components/shared/Toast'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export default function Login() {
  const router = useRouter()
  const { refreshUser } = useAuth()
  const { toast } = useToast()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleLogin() {
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
      const response = await fetch(
        `${API_URL}/api/auth/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        }
      )

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
        throw new Error(
          data.message || `Login failed (${response.status}).`
        )
      }

      if (!data.accessToken || !data.refreshToken) {
        throw new Error(
          'The server did not return both authentication tokens.'
        )
      }

      localStorage.setItem('accessToken', data.accessToken)
      localStorage.setItem('refreshToken', data.refreshToken)
      localStorage.setItem('email', email.trim())

      // Load the authenticated user into shared application state.
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
    <div className="min-h-screen flex items-center justify-center bg-bg p-2 md:p-4">
      <div className="bg-panel w-full max-w-md rounded-2xl p-6 md:p-8 shadow-[0_8px_24px_rgba(0,0,0,0.10)] border border-line">
        <div className="border-b border-line pb-4 mb-6">
          <span
            className={`${offbit.className} text-ink text-3xl md:text-4xl tracking-[0.05em]`}
          >
            ECOBUG
          </span>
        </div>

        <div className="flex flex-col gap-6">
          <span
            className={`${offbit.className} text-ink text-lg md:text-xl`}
          >
            Sign In
          </span>

          <form
            className="flex flex-col gap-6"
            onSubmit={(event) => {
              event.preventDefault()
              void handleLogin()
            }}
          >
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className={`${offbit.className} text-ink text-sm md:text-base`}
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full bg-chip border border-line h-10 md:h-12 rounded-lg px-4 text-base md:text-lg text-ink outline-none focus:ring-4 focus:ring-primary/40 transition-all"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className={`${offbit.className} text-ink text-sm md:text-base`}
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full bg-chip border border-line h-10 md:h-12 rounded-lg px-4 text-base md:text-lg text-ink outline-none focus:ring-4 focus:ring-primary/40 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className={`${offbit.className} w-full bg-primary-hover hover:opacity-90 disabled:opacity-60 text-panel h-10 md:h-11 rounded-lg text-sm md:text-base transition-opacity cursor-pointer disabled:cursor-not-allowed`}
            >
              {submitting ? 'SIGNING IN...' : 'NEXT'}
            </button>
          </form>

          <div
            className={`${offbit.className} text-ink-muted text-sm md:text-base flex gap-2`}
          >
            <span>no account?</span>
            <a
              href="/auth/signup"
              className="text-primary hover:text-primary-hover transition-colors hover:underline"
            >
              Create account
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}