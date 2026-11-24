// lib/api/strategies.ts
import { Strategy } from '@/app/webtool/strategy/types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

function getAuthHeaders(): HeadersInit {
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

/**
 * Fetch strategies with pagination from the subscription-gated backend API.
 */
export async function fetchStrategies(params?: {
  page?: number
  limit?: number
}): Promise<{ strategies: Strategy[]; hasMore: boolean }> {
  const page = params?.page ?? 1
  const limit = params?.limit ?? 12

  const queryParams = new URLSearchParams()
  queryParams.append('page', String(page))
  queryParams.append('limit', String(limit))

  const res = await fetch(`${API_URL}/api/strategies?${queryParams}`, {
    headers: getAuthHeaders(),
  })

  if (res.status === 401 || res.status === 402 || res.status === 403) {
    throw new Error('Active Pro subscription required to view strategies')
  }
  if (!res.ok) throw new Error('Failed to fetch strategies')

  const data = (await res.json()) as {
    strategies: Strategy[]
    hasMore: boolean
    total: number
    page: number
    limit: number
  }

  return {
    strategies: data.strategies,
    hasMore: data.hasMore,
  }
}

/**
 * Fetch a single strategy by ID from the subscription-gated backend API.
 */
export async function fetchStrategyById(id: string): Promise<Strategy | undefined> {
  const res = await fetch(`${API_URL}/api/strategies/${id}`, {
    headers: getAuthHeaders(),
  })

  if (res.status === 404) return undefined
  if (res.status === 401 || res.status === 402 || res.status === 403) {
    throw new Error('Active Pro subscription required to view this strategy')
  }
  if (!res.ok) throw new Error('Failed to fetch strategy')

  return (await res.json()) as Strategy
}

/**
 * Fetch strategies with filters from the backend API.
 */
export async function fetchStrategiesWithFilters(params: {
  category?: string
  search?: string
  page?: number
  limit?: number
}): Promise<{ strategies: Strategy[]; total: number }> {
  const queryParams = new URLSearchParams()
  if (params.category) queryParams.append('category', params.category)
  if (params.search) queryParams.append('search', params.search)
  if (params.page) queryParams.append('page', String(params.page))
  if (params.limit) queryParams.append('limit', String(params.limit))

  const res = await fetch(`${API_URL}/api/strategies?${queryParams}`, {
    headers: getAuthHeaders(),
  })
  if (!res.ok) throw new Error('Failed to fetch strategies')

  const data = (await res.json()) as {
    strategies: Strategy[]
    total: number
    page: number
    limit: number
    hasMore: boolean
  }

  return {
    strategies: data.strategies,
    total: data.total,
  }
}