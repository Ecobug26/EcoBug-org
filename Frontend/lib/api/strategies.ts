// lib/api/strategies.ts

import { Strategy } from '@/app/webtool/strategy/types'
import { dummyStrategies } from '@/app/webtool/strategy/strategiesData'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

/**
 * Fetch all strategies from the backend API.
 * Falls back to local dummyStrategies when the backend is unavailable.
 */
export async function fetchStrategies(): Promise<Strategy[]> {
  try {
    const res = await fetch(`${API_URL}/api/strategies`, {
      headers: { 'Content-Type': 'application/json' },
    })
    if (!res.ok) throw new Error('Failed to fetch strategies')
    const data: Strategy[] = await res.json()
    return data
  } catch (error) {
    console.error('Error fetching strategies from backend:', error)
    return dummyStrategies
  }
}

/**
 * Fetch a single strategy by ID from the backend API.
 * Falls back to local data when the backend is unavailable.
 */
export async function fetchStrategyById(id: string): Promise<Strategy | undefined> {
  try {
    const res = await fetch(`${API_URL}/api/strategies/${id}`, {
      headers: { 'Content-Type': 'application/json' },
    })
    if (!res.ok) throw new Error('Strategy not found')
    const data: Strategy = await res.json()
    return data
  } catch (error) {
    console.error('Error fetching strategy from backend:', error)
    return dummyStrategies.find((s) => s.id === id)
  }
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
  try {
    const queryParams = new URLSearchParams()
    if (params.category) queryParams.append('category', params.category)
    if (params.search) queryParams.append('search', params.search)
    if (params.page) queryParams.append('page', String(params.page))
    if (params.limit) queryParams.append('limit', String(params.limit))

    const res = await fetch(`${API_URL}/api/strategies?${queryParams}`, {
      headers: { 'Content-Type': 'application/json' },
    })
    if (!res.ok) throw new Error('Failed to fetch strategies')
    const data: Strategy[] = await res.json()
    return {
      strategies: data,
      total: data.length,
    }
  } catch (error) {
    console.error('Error fetching strategies with filters:', error)
    let filtered = dummyStrategies
    if (params.category) {
      filtered = filtered.filter((s) => s.category === params.category)
    }
    if (params.search) {
      const query = params.search.toLowerCase()
      filtered = filtered.filter(
        (s) =>
          s.title.toLowerCase().includes(query) ||
          s.category.toLowerCase().includes(query) ||
          s.keywords.some((kw) => kw.toLowerCase().includes(query))
      )
    }
    return {
      strategies: filtered,
      total: filtered.length,
    }
  }
}