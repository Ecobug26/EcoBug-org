// lib/api/strategies.ts

import { Strategy } from '@/app/webtool/strategy/types'
import { dummyStrategies } from '@/app/webtool/strategy/strategiesData'

// const API_URL = process.env.NEXT_PUBLIC_API_URL

/**
 * Fetch all strategies
 * Currently returns local data, structured to easily swap with API
 */
export async function fetchStrategies(): Promise<Strategy[]> {
  // Replace with actual API call when backend is ready
  // const API_URL = process.env.NEXT_PUBLIC_API_URL
  // try {
  //   const token = localStorage.getItem('accessToken')
  //   const response = await fetch(`${API_URL}/api/strategies`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //   if (!response.ok) throw new Error('Failed to fetch strategies')
  //   return response.json()
  // } catch (error) {
  //   console.error('Error fetching strategies:', error)
  //   return dummyStrategies // Fallback to local data
  // }

  // For now, return local data
  return dummyStrategies
}

/**
 * Fetch a single strategy by ID
 */
export async function fetchStrategyById(id: string): Promise<Strategy | undefined> {
  // Replace with actual API call when backend is ready
  // const API_URL = process.env.NEXT_PUBLIC_API_URL
  // try {
  //   const token = localStorage.getItem('accessToken')
  //   const response = await fetch(`${API_URL}/api/strategies/${id}`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //   if (!response.ok) throw new Error('Failed to fetch strategy')
  //   return response.json()
  // } catch (error) {
  //   console.error('Error fetching strategy:', error)
  //   return dummyStrategies.find((s) => s.id === id) // Fallback to local data
  // }

  // For now, find in local data
  return dummyStrategies.find((s) => s.id === id)
}

/**
 * Fetch strategies with filters (for future use)
 */
export async function fetchStrategiesWithFilters(params: {
  category?: string
  search?: string
  page?: number
  limit?: number
}): Promise<{ strategies: Strategy[]; total: number }> {
  // Replace with actual API call when backend is ready
  // const API_URL = process.env.NEXT_PUBLIC_API_URL
  // const queryParams = new URLSearchParams()
  // if (params.category) queryParams.append('category', params.category)
  // if (params.search) queryParams.append('search', params.search)
  // if (params.page) queryParams.append('page', String(params.page))
  // if (params.limit) queryParams.append('limit', String(params.limit))
  // 
  // const token = localStorage.getItem('accessToken')
  // const response = await fetch(`${API_URL}/api/strategies?${queryParams}`, {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // })
  // if (!response.ok) throw new Error('Failed to fetch strategies')
  // return response.json()

  // For now, return all strategies
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