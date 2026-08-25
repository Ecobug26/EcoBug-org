// hooks/useStrategies.ts

import { useEffect, useState, useCallback } from 'react'
import { fetchStrategies, fetchStrategyById } from '@/lib/api/strategies'
import { Strategy } from '@/app/webtool/strategy/types'

/**
 * Hook to fetch and manage all strategies
 * Returns { strategies, loading, error, refetch }
 */
export function useStrategies() {
  const [strategies, setStrategies] = useState<Strategy[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchStrategies()
      setStrategies(data)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch strategies'))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { strategies, loading, error, refetch: fetchData }
}

/**
 * Hook to fetch a single strategy by ID
 * Returns { strategy, loading, error, refetch }
 */
export function useStrategy(id: string) {
  const [strategy, setStrategy] = useState<Strategy | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = useCallback(async () => {
    if (!id) {
      setLoading(false)
      return
    }
    setLoading(true)
    setError(null)
    try {
      const data = await fetchStrategyById(id)
      setStrategy(data || null)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch strategy'))
    } finally {
      setLoading(false)
    }
  }, [id])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { strategy, loading, error, refetch: fetchData }
}