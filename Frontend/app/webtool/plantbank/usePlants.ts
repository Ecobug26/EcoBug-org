'use client'

import { useEffect, useState, useCallback } from 'react'
import { Plant } from './types'

interface UsePlantsReturn {
  plants: Plant[]
  loading: boolean
  error: Error | null
  refetch: () => void
}

/**
 * Hook to fetch plants from the backend API (/api/plants).
 * No local fallback — surfaces an error when the API is unreachable.
 */
export function usePlants(): UsePlantsReturn {
  const [plants, setPlants] = useState<Plant[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'
      const res = await fetch(`${apiBase}/api/plants`, {
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      })
      if (!res.ok) {
        const body = await res.text().catch(() => '')
        throw new Error(`Failed to fetch plants (${res.status})${body ? ': ' + body.slice(0, 200) : ''}`)
      }
      const data: Plant[] = await res.json()
      setPlants(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('[usePlants] Error loading plants:', err)
      setPlants([])
      setError(err instanceof Error ? err : new Error('Failed to fetch plants'))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { plants, loading, error, refetch: fetchData }
}