'use client'

import { useEffect, useState, useCallback } from 'react'
import { MonoButton } from '@/components/shared/ui'

type CheckoutButtonProps = {
  /** Amount in paise (Razorpay minimum: 100) */
  amount: number
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

/**
 * Standard Checkout button: creates an order on the backend, opens the
 * Razorpay modal, then verifies the returned signature server-side.
 * KEY_SECRET never reaches this file — only the public NEXT_PUBLIC key id.
 */
export default function CheckoutButton({ amount, description }: CheckoutButtonProps) {
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const [scriptReady, setScriptReady] = useState(false)

  // Load checkout.js once, on this page only.
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

    setStatus({ kind: 'loading' })

    try {
      // 1) Create order on the backend.
      const res = await fetch(`${API_URL}/api/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          currency: 'INR',
          receipt: `ecobug-${Date.now()}`,
        }),
      })

      const data = await res.json().catch(() => null)

      if (!res.ok || !data?.order_id) {
        throw new Error(data?.error ?? 'Could not start the payment. Please retry.')
      }

      // 2) Open the Razorpay modal with the freshly created order_id.
      const rzp = new window.Razorpay({
        key: RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: 'EcoBug',
        description: description ?? 'EcoBug subscription',
        order_id: data.order_id,
        prefill: { name: '', email: '', contact: '' },
        theme: { color: '#97C974' },
        modal: { ondismiss: () => setStatus({ kind: 'idle' }) },
      })

      // 3) On success: verify the signature on the backend.
      rzp.on('payment.success', async (response: unknown) => {
        const r = response as {
          razorpay_payment_id?: string
          razorpay_order_id?: string
          razorpay_signature?: string
        }
        setStatus({ kind: 'loading', message: 'Verifying payment…' })
        try {
          const verifyRes = await fetch(`${API_URL}/api/verify-payment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              orderId: r.razorpay_order_id,
              paymentId: r.razorpay_payment_id,
              signature: r.razorpay_signature,
            }),
          })
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
  }, [amount, description])

  return (
    <div className='flex flex-col items-center gap-3 w-full'>
      <MonoButton
        bullet
        onClick={handlePayment}
        disabled={status.kind === 'loading' || status.kind === 'success'}
        ariaLabel='Pay with Razorpay'
        className='px-9 py-[21px] text-[24px] leading-6 tracking-[4.1px] w-full justify-center'
      >
        {status.kind === 'loading' ? 'WORKING…' : 'PAY'}
      </MonoButton>

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
