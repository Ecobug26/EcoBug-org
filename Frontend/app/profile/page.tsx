'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { offbit } from '@/components/utils/utils'

type DialogType = 'username' | 'password' | null

export default function ProfilePage() {
  const router = useRouter()
  const { user, loading, logout, refreshUser } = useAuth()

  const fileInputRef = useRef<HTMLInputElement>(null)

  const [avatar, setAvatar] = useState<string | null>(null)
  const [dialog, setDialog] = useState<DialogType>(null)
  const [newUsername, setNewUsername] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
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
      setMessage('Please choose an image smaller than 2 MB.')
      return
    }

    const reader = new FileReader()

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setAvatar(reader.result)
        setMessage(
          'Avatar preview updated. Saving it permanently requires image storage integration.'
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

  function openDialog(type: Exclude<DialogType, null>) {
    setMessage('')
    setDialog(type)
  }

  async function handleDialogSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault()

    if (dialog === 'username') {
      setMessage(
        'Username editing requires a backend endpoint. No changes have been saved.'
      )
      return
    }

    if (dialog === 'password') {
      setMessage(
        'Password changing requires a backend endpoint. No changes have been saved.'
      )
    }
  }

  if (loading || !user) {
    return (
      <main className="min-h-screen bg-[#383838] flex items-center justify-center p-6">
        <p className={`${offbit.className} text-[#eaf6df]`}>
          LOADING PROFILE...
        </p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#383838] text-[#182315]">
      {/* Profile page header */}
      <header className="h-16 md:h-[76px] bg-[#292929] text-white flex items-center justify-between px-5 md:px-10 border-b border-white/5">
        <Link
          href="/"
          aria-label="Back to EcoBug home"
          className="text-2xl hover:opacity-70 transition-opacity"
        >
          ☰
        </Link>

        <Link
          href="/"
          className={`${offbit.className} text-xl md:text-2xl tracking-wide`}
        >
          ECOBUG
        </Link>

        <div className="w-7" />
      </header>

      <div className="px-4 py-12 md:px-8 md:py-20">
        <section className="max-w-4xl mx-auto bg-[#eaf6df] p-3 md:p-6 shadow-xl">
          {/* Profile card */}
          <div className="bg-[#b1d69a] rounded-2xl px-5 py-9 md:px-12 md:py-12">
            <div className="flex flex-col items-center text-center">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-[#dedede] overflow-hidden flex items-center justify-center hover:ring-4 hover:ring-white/50 transition-all"
                aria-label="Change avatar"
              >
                {avatar ? (
                  // Local preview only; not persisted to a server.
                  <img
                    src={avatar}
                    alt="Avatar preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    className="w-14 h-14 text-[#9a9a9a]"
                    fill="currentColor"
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
                className="text-[11px] underline mt-2 hover:opacity-60"
              >
                Change avatar
              </button>

              <h1
                className={`${offbit.className} text-2xl md:text-3xl mt-2 uppercase break-words max-w-full`}
              >
                {user.fullName || 'YOUR NAME'}
              </h1>

              <p className="text-sm mt-1">
                SUBSCRIPTION: Free Plan
              </p>
            </div>

            <div className="max-w-lg mx-auto mt-8 text-sm md:text-base break-words">
              <p>
                <strong>Email:</strong> {user.email}
              </p>

              <p className="mt-1">
                <button
                  type="button"
                  onClick={() => openDialog('username')}
                  className="underline hover:opacity-60"
                >
                  change username
                </button>
              </p>

              <p className="mt-1">
                <button
                  type="button"
                  onClick={() => openDialog('password')}
                  className="underline hover:opacity-60"
                >
                  change password
                </button>
              </p>
            </div>
          </div>

          {/* Dot-matrix EcoBug wordmark */}
          <div
            aria-label="EcoBug"
            className="mt-4 overflow-hidden select-none"
          >
            <div
              className={`${offbit.className} text-[#24691c] text-6xl sm:text-8xl md:text-[140px] leading-none tracking-[-0.08em] whitespace-nowrap`}
              style={{
                WebkitTextFillColor: 'transparent',
                WebkitTextStroke: '1px #24691c',
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
          <div className="flex flex-wrap justify-center gap-3 mt-5 mb-3">
            <Link
              href="/webtool/plantbank"
              className="rounded-lg border border-[#24691c] px-5 py-2 text-sm hover:bg-[#d7ebc8] transition-colors"
            >
              Plant Vault
            </Link>

            <button
              type="button"
              onClick={() => void refreshUser()}
              className="rounded-lg border border-[#24691c] px-5 py-2 text-sm hover:bg-[#d7ebc8] transition-colors"
            >
              Refresh profile
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg bg-[#24691c] text-white px-5 py-2 text-sm hover:opacity-80 transition-opacity"
            >
              Log out
            </button>
          </div>

          {message && (
            <p
              role="status"
              className="mt-4 mx-auto max-w-lg text-sm text-center"
            >
              {message}
            </p>
          )}
        </section>
      </div>

      {/* Username/password dialogs */}
      {dialog && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setDialog(null)
              setMessage('')
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="profile-dialog-title"
            className="w-full max-w-md rounded-2xl bg-[#eaf6df] p-6 shadow-2xl"
          >
            <h2
              id="profile-dialog-title"
              className={`${offbit.className} text-xl mb-5`}
            >
              {dialog === 'username'
                ? 'CHANGE USERNAME'
                : 'CHANGE PASSWORD'}
            </h2>

            <form
              onSubmit={handleDialogSubmit}
              className="flex flex-col gap-4"
            >
              {dialog === 'username' ? (
                <label className="text-sm flex flex-col gap-2">
                  New username
                  <input
                    value={newUsername}
                    onChange={(event) =>
                      setNewUsername(event.target.value)
                    }
                    className="border border-[#a4c78f] rounded-lg px-3 py-2 bg-white text-black"
                    required
                    minLength={2}
                    maxLength={60}
                  />
                </label>
              ) : (
                <>
                  <label className="text-sm flex flex-col gap-2">
                    Current password
                    <input
                      type="password"
                      autoComplete="current-password"
                      value={currentPassword}
                      onChange={(event) =>
                        setCurrentPassword(event.target.value)
                      }
                      className="border border-[#a4c78f] rounded-lg px-3 py-2 bg-white text-black"
                      required
                    />
                  </label>

                  <label className="text-sm flex flex-col gap-2">
                    New password
                    <input
                      type="password"
                      autoComplete="new-password"
                      value={newPassword}
                      onChange={(event) =>
                        setNewPassword(event.target.value)
                      }
                      className="border border-[#a4c78f] rounded-lg px-3 py-2 bg-white text-black"
                      required
                      minLength={8}
                    />
                  </label>
                </>
              )}

              <p className="text-xs text-black/70">
                This action is not connected to the backend yet.
                Submitting will not change your account.
              </p>

              <div className="flex gap-3 justify-end mt-2">
                <button
                  type="button"
                  onClick={() => {
                    setDialog(null)
                    setMessage('')
                  }}
                  className="rounded-lg border border-[#24691c] px-4 py-2 text-sm"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-[#24691c] text-white px-4 py-2 text-sm"
                >
                  Continue
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </main>
  )
}