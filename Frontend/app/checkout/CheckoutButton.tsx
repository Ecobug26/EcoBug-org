'use client'

import { useEffect, useState, useCallback } from 'react'
import { MonoButton } from '@/components/shared/ui'
import { useAuth } from '@/context/AuthContext'

type CheckoutButtonProps = {
  description?: string
}

type Status = {
  kind: 'idle' | 'loading' | 'success' | 'error'
  message?: string
}

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080'
const RAZORPAY_KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? ''

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => {
      open: () => void
      on: (event: string, cb: (response: unknown) => void) => void
    }
  }
}

async function refreshAccessToken(refreshUser: () => Promise<void>): Promise<string | null> {
  if (typeof window === 'undefined') return null
  const refreshToken = localStorage.getItem('refreshToken')
  if (!refreshToken) return null

  try {
    const res = await fetch(`${API_URL}/api/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    })
    if (!res.ok) return null
    const data = await res.json().catch(() => null)
    const newToken = data?.accessToken ?? data?.token ?? null
    if (newToken) {
      localStorage.setItem('accessToken', newToken)
      if (data?.refreshToken) {
        localStorage.setItem('refreshToken', data.refreshToken)
      }
      await refreshUser()
    }
    return newToken
  } catch {
    return null
  }
}

export default function CheckoutButton({ description }: CheckoutButtonProps) {
  const { user, loading: authLoading, refreshUser } = useAuth()
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const [scriptReady, setScriptReady] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const existing = document.querySelector<HTMLScriptElement>(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
    )
    if (existing) {
      setScriptReady(true)
      return
    }

    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    script.onload = () => setScriptReady(true)
    script.onerror = () =>
      setStatus({ kind: 'error', message: 'Could not load Razorpay. Check your connection and retry.' })
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const handlePayment = useCallback(async () => {
    if (!RAZORPAY_KEY_ID) {
      setStatus({ kind: 'error', message: 'Payment key is not configured.' })
      return
    }
    if (typeof window.Razorpay !== 'function') {
      setStatus({ kind: 'error', message: 'Razorpay checkout did not load. Please retry.' })
      return
    }

    let token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
    if (!token || !user) {
      setStatus({ kind: 'error', message: 'Please log in before starting checkout.' })
      return
    }

    setStatus({ kind: 'loading' })

    try {
      let res = await fetch(`${API_URL}/api/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          receipt: `ecobug-${Date.now()}`,
        }),
      })

      if (res.status === 401 || res.status === 403) {
        const refreshed = await refreshAccessToken(refreshUser)
        if (!refreshed) {
          throw new Error('Your session expired. Please log in again to continue.')
        }
        token = refreshed
        res = await fetch(`${API_URL}/api/create-order`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            receipt: `ecobug-${Date.now()}`,
          }),
        })
      }

      const data = await res.json().catch(() => null)

      if (!res.ok || !data?.order_id) {
        throw new Error(data?.error ?? 'Could not start the payment. Please retry.')
      }

      const rzp = new window.Razorpay({
        key: RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: 'EcoBug',
        description: description ?? 'EcoBug subscription',
        order_id: data.order_id,
        prefill: {
          name: user.fullName ?? '',
          email: user.email ?? '',
          contact: '',
        },
        theme: { color: '#97C974' },
        modal: { ondismiss: () => setStatus({ kind: 'idle', message: 'Payment cancelled.' }) },
        handler: async (response: unknown) => {
          const r = response as {
            razorpay_payment_id?: string
            razorpay_order_id?: string
            razorpay_signature?: string
          }
          setStatus({ kind: 'loading', message: 'Verifying payment…' })
          try {
            const activeToken = localStorage.getItem('accessToken') ?? token
            let verifyRes = await fetch(`${API_URL}/api/verify-payment`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${activeToken}`,
              },
              body: JSON.stringify({
                orderId: r.razorpay_order_id,
                paymentId: r.razorpay_payment_id,
                signature: r.razorpay_signature,
              }),
            })

            if (verifyRes.status === 401 || verifyRes.status === 403) {
              const refreshed = await refreshAccessToken(refreshUser)
              if (refreshed) {
                verifyRes = await fetch(`${API_URL}/api/verify-payment`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${refreshed}`,
                  },
                  body: JSON.stringify({
                    orderId: r.razorpay_order_id,
                    paymentId: r.razorpay_payment_id,
                    signature: r.razorpay_signature,
                  }),
                })
              }
            }

            const verifyData = await verifyRes.json().catch(() => null)

            if (verifyRes.ok && verifyData?.verified) {
              setStatus({ kind: 'success', message: 'Payment verified — thank you!' })
            } else {
              setStatus({
                kind: 'error',
                message: verifyData?.error ?? 'Payment verification failed. Please contact support.',
              })
            }
          } catch {
            setStatus({ kind: 'error', message: 'Could not verify payment. Please contact support.' })
          }
        },
      })

      rzp.on('payment.failed', (response: unknown) => {
        const r = response as { error?: { description?: string } }
        setStatus({
          kind: 'error',
          message: r?.error?.description ?? 'Payment failed. Please try again.',
        })
      })

      rzp.open()
    } catch (err) {
      setStatus({
        kind: 'error',
        message: err instanceof Error ? err.message : 'Something went wrong. Please retry.',
      })
    }
  }, [description, user, refreshUser])

  return (
    <div className='flex flex-col items-center gap-3 w-full'>
      <MonoButton
        bullet
        onClick={handlePayment}
        disabled={authLoading || status.kind === 'loading' || status.kind === 'success'}
        ariaLabel='Pay with Razorpay'
        className='px-9 py-[21px] text-[24px] leading-6 tracking-[4.1px] w-full justify-center'
      >
        {status.kind === 'loading' ? 'WORKING…' : 'PAY'}
      </MonoButton>

      {!authLoading && !user && status.kind === 'idle' && (
        <p className='font-geist-mono text-xs text-[#40543F] dark:text-[#9BAE95]'>
          Log in to your EcoBug account to complete checkout.
        </p>
      )}

      {!scriptReady && status.kind !== 'error' && (
        <p className='font-geist-mono text-xs text-[#40543F] dark:text-[#9BAE95]'>
          Loading payment…
        </p>
      )}

      {status.message && (
        <p
          role='status'
          className={`font-geist-sans text-sm text-center ${
            status.kind === 'success'
              ? 'text-[#1B2B1E] dark:text-[#EAF2E4]'
              : status.kind === 'error'
                ? 'text-red-700 dark:text-red-400'
                : 'text-[#40543F] dark:text-[#9BAE95]'
          }`}
        >
          {status.message}
        </p>
      )}
    </div>
  )
}