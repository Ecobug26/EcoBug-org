// hooks/usePlants.ts

import { useEffect, useState, useCallback } from 'react'
import { fetchPlants, fetchPlantById } from '@/lib/api/plants'
import { Plant } from '@/app/webtool/plantbank/types'

/**
 * Hook to fetch and manage all plants
 * Returns { plants, loading, error, refetch }
 */
export function usePlants() {
  const [plants, setPlants] = useState<Plant[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchPlants()
      setPlants(data)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load plants'))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  return { plants, loading, error, refetch: load }
}

/**
 * Hook to fetch a single plant by ID
 */
export function usePlant(id: string) {
  const [plant, setPlant] = useState<Plant | undefined>(undefined)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let cancelled = false
    if (!id) {
      setLoading(false)
      return
    }
    setLoading(true)
    fetchPlantById(id)
      .then((data) => {
        if (!cancelled) setPlant(data)
      })
      .catch((err) => {
        if (!cancelled)
          setError(err instanceof Error ? err : new Error('Failed to load plant'))
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [id])

  return { plant, loading, error }
}
