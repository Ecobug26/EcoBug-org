// lib/api/strategies.ts

import { Strategy } from '@/app/webtool/strategy/types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

/**
 * Fetch all strategies from the backend API.
 * Throws when the backend is unavailable (no local fallback).
 */
export async function fetchStrategies(): Promise<Strategy[]> {
  const res = await fetch(`${API_URL}/api/strategies`, {
    headers: { 'Content-Type': 'application/json' },
  })
  if (!res.ok) throw new Error('Failed to fetch strategies')
  return (await res.json()) as Strategy[]
}

/**
 * Fetch a single strategy by ID from the backend API.
 * Returns undefined for 404 (unknown id); throws on other failures.
 */
export async function fetchStrategyById(id: string): Promise<Strategy | undefined> {
  const res = await fetch(`${API_URL}/api/strategies/${id}`, {
    headers: { 'Content-Type': 'application/json' },
  })
  if (res.status === 404) return undefined
  if (!res.ok) throw new Error('Failed to fetch strategy')
  return (await res.json()) as Strategy
}

/**
 * Fetch strategies with filters from the backend API.
 * The backend supports the `category` query param; remaining params are
 * applied by callers (StrategyLibrary filters client-side).
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
    headers: { 'Content-Type': 'application/json' },
  })
  if (!res.ok) throw new Error('Failed to fetch strategies')
  const data = (await res.json()) as Strategy[]
  return {
    strategies: data,
    total: data.length,
  }
}