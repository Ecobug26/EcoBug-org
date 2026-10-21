'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { offbit } from '@/components/utils/utils'
import { DotWordmark } from '@/components/shared/DotWordmark' // Added import

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

  function handleAvatarChange(event: React.ChangeEvent<HTMLInputElement>) {
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
        setMessage('Preview updated. Permanent avatar saving is not connected yet.')
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
      <main className="min-h-screen bg-[#FDF4E3] flex items-center justify-center">
        <p className={`${offbit.className} text-black text-xl`}>
          LOADING PROFILE...
        </p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#FDF4E3] flex flex-col justify-between items-center pt-16 pb-0 px-4">
      
      {/* White Card Container */}
      <section className="w-full max-w-2xl bg-white rounded-[32px] shadow-xl p-8 md:p-12 flex flex-col items-center mb-16">
        
        {/* Avatar */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          aria-label="Choose profile avatar"
          className="relative w-32 h-32 rounded-full bg-[#D9D9D9] overflow-hidden flex items-center justify-center hover:ring-4 hover:ring-gray-200 transition mb-2"
        >
          {avatar ? (
            <Image
              src={avatar}
              alt="Profile avatar preview"
              width={128}
              height={128}
              className="w-full h-full object-cover"
              unoptimized
            />
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-16 h-16 text-[#999]"
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
          className="text-[11px] underline text-gray-500 mb-4 hover:text-black transition-colors"
        >
          Change avatar
        </button>

        {/* User Info */}
        <h1 className={`${offbit.className} text-3xl md:text-4xl font-bold uppercase tracking-widest mb-1 text-black text-center break-words w-full`}>
          {user.fullName || 'LOREM IPSUM'}
        </h1>

        <p className="text-[10px] uppercase tracking-widest text-black mb-6">
          Subscription: Studio Plan
        </p>

        {/* Details */}
        <div className="w-full max-w-sm flex flex-col items-start gap-1 text-sm text-black">
          <p className="mb-1">
            <span className="font-bold">Email:</span> {user.email}
          </p>

          <Link
            href="/profile/change-username"
            className="underline text-gray-600 hover:text-black transition-colors"
          >
            change username
          </Link>

          <Link
            href="/profile/change-password"
            className="underline text-gray-600 hover:text-black transition-colors"
          >
            change password
          </Link>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap justify-center gap-4 mt-10 w-full">
          <Link
            href="/webtool/plantbank"
            className="rounded-full border-2 border-black px-8 py-2 text-sm font-bold hover:bg-black hover:text-white transition-colors"
          >
            Plant Vault
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="rounded-full bg-[#1B2B1E] text-white px-8 py-2 text-sm font-bold hover:bg-black transition-colors"
          >
            Log out
          </button>
        </div>

        {message && (
          <p role="status" className="text-xs text-center mt-6 text-gray-600 bg-gray-100 py-2 px-4 rounded-md">
            {message}
          </p>
        )}
      </section>

      {/* Giant Dot-Matrix ECOBUG Wordmark (Using the new component) */}
      <div className="w-full max-w-5xl select-none pointer-events-none overflow-hidden leading-none translate-y-2">
        <DotWordmark />
      </div>

    </main>
  )
}