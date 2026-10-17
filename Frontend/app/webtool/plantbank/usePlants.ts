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
 * Falls back to local plantsData when the backend is unavailable.
 */
export function usePlants(): UsePlantsReturn {
  const [plants, setPlants] = useState<Plant[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/api/plants`, {
        headers: { 'Content-Type': 'application/json' },
      })
      if (!res.ok) throw new Error('Failed to fetch plants')
      const data: Plant[] = await res.json()
      setPlants(data)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch plants'))
      // Fallback to local data
      import('./plantsData').then(({ plants: localPlants }) => {
        setPlants(localPlants)
      })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { plants, loading, error, refetch: fetchData }
}