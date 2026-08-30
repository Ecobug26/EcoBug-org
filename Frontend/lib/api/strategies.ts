// lib/api/strategies.ts

import { Strategy } from '@/app/webtool/strategy/types'
import { dummyStrategies } from '@/app/webtool/strategy/strategiesData'
import { getSupabaseClient } from '@/lib/supabase/client'

const STRATEGIES_TABLE = 'strategies'

/**
 * Fetch all strategies from Supabase.
 * Falls back to local dummyStrategies when Supabase is not configured,
 * the table is empty, or the query fails — so the UI never breaks.
 */
export async function fetchStrategies(): Promise<Strategy[]> {
  const supabase = getSupabaseClient()
  if (!supabase) return dummyStrategies

  try {
    const { data, error } = await supabase
      .from(STRATEGIES_TABLE)
      .select('id, title, category, summary, image_url, keywords, full_description')
      .order('created_at', { ascending: true })

    if (error) {
      console.error('Error fetching strategies from Supabase:', error)
      return dummyStrategies
    }

    if (!data || data.length === 0) return dummyStrategies

    return data.map((row) => ({
      id: row.id,
      title: row.title,
      category: row.category,
      summary: row.summary,
      imageUrl: row.image_url,
      keywords: row.keywords ?? [],
      fullDescription: row.full_description,
    }))
  } catch (error) {
    console.error('Unexpected error fetching strategies:', error)
    return dummyStrategies
  }
}

/**
 * Fetch a single strategy by ID from Supabase.
 * Falls back to local data when Supabase is unavailable or lookup fails.
 */
export async function fetchStrategyById(id: string): Promise<Strategy | undefined> {
  const supabase = getSupabaseClient()
  if (!supabase) return dummyStrategies.find((s) => s.id === id)

  try {
    const { data, error } = await supabase
      .from(STRATEGIES_TABLE)
      .select('id, title, category, summary, image_url, keywords, full_description')
      .eq('id', id)
      .maybeSingle()

    if (error) {
      console.error('Error fetching strategy from Supabase:', error)
      return dummyStrategies.find((s) => s.id === id)
    }

    if (!data) return dummyStrategies.find((s) => s.id === id)

    return {
      id: data.id,
      title: data.title,
      category: data.category,
      summary: data.summary,
      imageUrl: data.image_url,
      keywords: data.keywords ?? [],
      fullDescription: data.full_description,
    }
  } catch (error) {
    console.error('Unexpected error fetching strategy:', error)
    return dummyStrategies.find((s) => s.id === id)
  }
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