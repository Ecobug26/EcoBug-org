// hooks/useStrategies.ts

import { useEffect, useState, useCallback } from 'react'
import { fetchStrategies, fetchStrategyById } from '@/lib/api/strategies'
import { Strategy } from '@/app/webtool/strategy/types'

export interface UseStrategiesReturn {
  strategies: Strategy[]
  loading: boolean
  error: Error | null
  refetch: (page?: number) => Promise<void>
  page: number
  pageSize: number
  hasMore: boolean
  setPage: (page: number) => void
}

/**
 * Hook to fetch and manage strategies with pagination
 * Returns { strategies, loading, error, refetch, page, pageSize, hasMore, setPage }
 */
export function useStrategies(initialPage = 1, pageSize = 12): UseStrategiesReturn {
  const [strategies, setStrategies] = useState<Strategy[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [page, setPageState] = useState(initialPage)
  const [pageSizeState] = useState(pageSize)
  const [hasMore, setHasMore] = useState(true)

  const fetchData = useCallback(async (pageNum = page) => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchStrategies({ page: pageNum, limit: pageSizeState })
      setStrategies(data.strategies)
      setHasMore(data.hasMore)
      setPageState(pageNum)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch strategies'))
    } finally {
      setLoading(false)
    }
  }, [page, pageSizeState])

  useEffect(() => {
    fetchData(page)
  }, [fetchData, page])

  return {
    strategies,
    loading,
    error,
    refetch: fetchData,
    page,
    pageSize: pageSizeState,
    hasMore,
    setPage: setPageState,
  }
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