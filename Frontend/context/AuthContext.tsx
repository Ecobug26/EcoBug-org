'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from 'react'
import { getCurrentUser } from '@/lib/api'

export type User = {
  id: string
  fullName: string
  email: string
  role: string
}

type AuthContextType = {
  user: User | null
  loading: boolean
  refreshUser: () => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({
  children,
}: {
  children: ReactNode
}) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const logout = useCallback(() => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('email')
    setUser(null)
  }, [])

  const refreshUser = useCallback(async () => {
    if (typeof window === 'undefined') {
      setUser(null)
      setLoading(false)
      return
    }

    const token = localStorage.getItem('accessToken')

    if (!token) {
      setUser(null)
      setLoading(false)
      return
    }

    try {
      const currentUser = await getCurrentUser()
      setUser(currentUser ?? null)
    } catch (error) {
      console.error('Unable to load user:', error)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void refreshUser()
  }, [refreshUser])

  return (
    <AuthContext.Provider
      value={{ user, loading, refreshUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }

  return context
}