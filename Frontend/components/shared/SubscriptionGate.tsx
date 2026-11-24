'use client'

import { ReactNode, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { offbit } from '@/components/utils/utils'

export default function SubscriptionGate({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/auth/login')
    }
  }, [loading, user, router])

  if (loading || !user) {
    return (
      <main className="min-h-screen bg-[#FDF4E3] flex items-center justify-center">
        <p className={`${offbit.className} text-black text-xl`}>CHECKING ACCESS...</p>
      </main>
    )
  }

  const expiresAt = user.subscriptionExpiresAt ? new Date(user.subscriptionExpiresAt) : null
  const isSubscribed =
    user.role === 'ADMIN' || (expiresAt !== null && expiresAt.getTime() > Date.now())

  if (!isSubscribed) {
    return (
      <main className="min-h-screen bg-[#FDF4E3] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-[32px] shadow-xl p-8 text-center flex flex-col items-center gap-4">
          <h1 className={`${offbit.className} text-2xl font-bold uppercase tracking-widest text-black`}>
            PRO PLAN REQUIRED
          </h1>
          <p className="text-sm text-gray-700">
            Upgrade to the Education / Professional Plan (₹49/month) to unlock Plant Vault and full tool access.
          </p>
          <Link
            href="/checkout"
            className="rounded-full bg-[#1B2B1E] text-white px-8 py-3 text-sm font-bold hover:bg-black transition-colors mt-2"
          >
            Upgrade Now
          </Link>
        </div>
      </main>
    )
  }

  return <>{children}</>
}