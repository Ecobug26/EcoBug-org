
'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { offbit } from '@/components/utils/utils'

export default function ProfilePage() {
  const router = useRouter()
  const { user, loading, logout } = useAuth()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [avatar, setAvatar] = useState<string | null>(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/auth/login')
    }
  }, [loading, user, router])

  function handleAvatarChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setMessage('Please select an image file.')
      return
    }

    if (file.size > 2 * 1024 * 1024) {
      setMessage('Choose an image smaller than 2 MB.')
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setAvatar(reader.result)
        setMessage(
          'Preview updated. Permanent avatar saving is not connected yet.'
        )
      }
    }
    reader.readAsDataURL(file)
    event.target.value = ''
  }

  function handleLogout() {
    logout()
    router.replace('/')
    router.refresh()
  }

  if (loading || !user) {
    return (
      <main className="min-h-[60vh] flex items-center justify-center">
        <p className={`${offbit.className} text-ink`}>
          LOADING PROFILE...
        </p>
      </main>
    )
  }

  return (
    <main className="w-full bg-bg text-ink px-4 py-8 md:px-8 md:py-14">
      <section className="max-w-4xl mx-auto bg-panel border border-line rounded-2xl p-3 sm:p-5 md:p-7">
        {/* Profile card */}
        <div className="rounded-2xl bg-[#b1d69a] text-[#182315] px-5 py-8 sm:px-8 md:px-12 md:py-10">
          <div className="flex flex-col items-center text-center">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              aria-label="Choose profile avatar"
              className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-[#dedede] overflow-hidden flex items-center justify-center hover:ring-4 hover:ring-white/50 transition"
            >
              {avatar ? (
                <img
                  src={avatar}
                  alt="Profile avatar preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-14 h-14 text-[#999]"
                  aria-hidden="true"
                >
                  <path d="M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm0 2c-4.5 0-8 2.3-8 5v2h16v-2c0-2.7-3.5-5-8-5Z" />
                </svg>
              )}
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-xs underline mt-2 hover:opacity-60"
            >
              Change avatar
            </button>

            <h1
              className={`${offbit.className} text-2xl sm:text-3xl mt-3 uppercase break-words`}
            >
              {user.fullName || 'YOUR NAME'}
            </h1>

            <p className="text-sm mt-1">
              SUBSCRIPTION: Free Plan
            </p>
          </div>

          <div className="max-w-lg mx-auto mt-8 text-sm sm:text-base break-words">
            <p>
              <strong>Email:</strong> {user.email}
            </p>

            <p className="mt-2">
              <Link
                href="/profile/change-username"
                className="underline hover:opacity-60"
              >
                change username
              </Link>
            </p>

            <p className="mt-1">
              <Link
                href="/profile/change-password"
                className="underline hover:opacity-60"
              >
                change password
              </Link>
            </p>
          </div>
        </div>

        {/* Dot-matrix wordmark */}
        <div className="mt-4 overflow-hidden" aria-label="EcoBug">
          <div
            aria-hidden="true"
            className={`${offbit.className} text-[#24691c] text-6xl sm:text-8xl md:text-[140px] leading-none tracking-[-0.08em] whitespace-nowrap`}
            style={{
              color: 'transparent',
              backgroundImage:
                'radial-gradient(circle, #24691c 48%, transparent 52%)',
              backgroundSize: '9px 9px',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
            }}
          >
            ECOBUG
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap justify-center gap-3 mt-5">
          <Link
            href="/webtool/plantbank"
            className="rounded-lg border border-line bg-chip px-5 py-2.5 text-sm hover:opacity-80 transition"
          >
            Plant Vault
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg bg-primary-hover text-panel px-5 py-2.5 text-sm hover:opacity-80 transition"
          >
            Log out
          </button>
        </div>

        {message && (
          <p role="status" className="text-sm text-center mt-4">
            {message}
          </p>
        )}
      </section>
    </main>
  )
}