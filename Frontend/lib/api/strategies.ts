// lib/api/strategies.ts
import { Strategy } from '@/app/webtool/strategy/types'
import {
  fetchStrategiesFromSupabase,
  fetchStrategyByIdFromSupabase,
  getSupabaseClient,
} from '@/lib/supabase/strategies'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

/**
 * Fetch all strategies.
 * Priority: Supabase (env-configured) -> Backend API fallback.
 */
export async function fetchStrategies(): Promise<Strategy[]> {
  // Try Supabase first if env vars are configured
  const supa = getSupabaseClient()
  if (supa) {
    const data = await fetchStrategiesFromSupabase()
    if (data.length > 0) {
      console.log('Fetched strategies from Supabase')
      return data
    }
    console.warn('Supabase fetch returned empty - falling back to backend API')
  } else {
    console.log('Supabase env vars missing - using backend API')
  }

  // Fallback to backend API
  const res = await fetch(`${API_URL}/api/strategies`, {
    headers: { 'Content-Type': 'application/json' },
  })
  if (!res.ok) throw new Error('Failed to fetch strategies')
  return (await res.json()) as Strategy[]
}

/**
 * Fetch a single strategy by ID.
 * Priority: Supabase (env-configured) -> Backend API fallback.
 * Returns undefined for 404 (unknown id); throws on other failures.
 */
export async function fetchStrategyById(id: string): Promise<Strategy | undefined> {
  // Try Supabase first if env vars are configured
  const supa = getSupabaseClient()
  if (supa) {
    const data = await fetchStrategyByIdFromSupabase(id)
    if (data !== undefined) {
      console.log('Fetched strategy from Supabase by ID')
      return data
    }
    console.warn('Supabase single fetch failed - falling back to backend API')
  } else {
    console.log('Supabase env vars missing - using backend API')
  }

  // Fallback to backend API
  const res = await fetch(`${API_URL}/api/strategies/${id}`, {
    headers: { 'Content-Type': 'application/json' },
  })
  if (res.status === 404) return undefined
  if (!res.ok) throw new Error('Failed to fetch strategy')
  return (await res.json()) as Strategy
}

/**
 * Fetch strategies with filters from the backend API.
 * Keeping this as a backend-API-only endpoint since it supports
 * server-side pagination/filtering that Supabase would need
 * additional config for. Not currently used on the frontend.
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
