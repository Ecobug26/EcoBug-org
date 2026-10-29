'use client'

import { useEffect, useState, useCallback } from 'react'
import { Plant } from './types'

interface UsePlantsReturn {
  plants: Plant[]
  loading: boolean
  error: Error | null
  totalElements: number
  totalPages: number
  currentPage: number
  pageSize: number
  refetch: () => void
  setPage: (page: number) => void
}

interface PaginatedPlantsResponse {
  plants: Plant[]
  totalElements: number
  totalPages: number
  currentPage: number
  pageSize: number
}

/**
 * Hook to fetch plants from the backend API (/api/plants).
 * Supports pagination — fetches pageSize plants per page.
 * No local fallback — surfaces an error when the API is unreachable.
 */
export function usePlants(initialPage = 0, initialPageSize = 24): UsePlantsReturn {
  const [plants, setPlants] = useState<Plant[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [totalElements, setTotalElements] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [pageSize, setPageSize] = useState(initialPageSize)

  const fetchData = useCallback(async (page: number, size: number) => {
    setLoading(true)
    setError(null)
    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'
      const res = await fetch(`${apiBase}/api/plants?page=${page}&size=${size}`, {
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      })
      if (!res.ok) {
        const body = await res.text().catch(() => '')
        throw new Error(`Failed to fetch plants (${res.status})${body ? ': ' + body.slice(0, 200) : ''}`)
      }
      const data: PaginatedPlantsResponse = await res.json()
      setPlants(Array.isArray(data.plants) ? data.plants : [])
      setTotalElements(data.totalElements ?? 0)
      setTotalPages(data.totalPages ?? 0)
      setCurrentPage(data.currentPage ?? 0)
      setPageSize(data.pageSize ?? size)
    } catch (err) {
      console.error('[usePlants] Error loading plants:', err)
      setPlants([])
      setError(err instanceof Error ? err : new Error('Failed to fetch plants'))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData(currentPage, pageSize)
  }, [fetchData, currentPage, pageSize])

  return { plants, loading, error, totalElements, totalPages, currentPage, pageSize, refetch: () => fetchData(currentPage, pageSize), setPage: setCurrentPage }
}