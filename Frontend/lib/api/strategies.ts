// lib/api/strategies.ts
import { Strategy } from '@/app/webtool/strategy/types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

/**
 * Fetch strategies with pagination.
 * Priority: Supabase (env-configured) -> Backend API fallback.
 * Returns { strategies, total } where total is the count of all strategies.
 */
export async function fetchStrategies(params?: {
  page?: number
  limit?: number
}): Promise<{ strategies: Strategy[]; total: number }> {
  const page = params?.page ?? 1
  const limit = params?.limit ?? 20
  const offset = (page - 1) * limit

  // Try Supabase first if env vars are configured
  const supaUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supaKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (supaUrl && supaKey) {
    try {
      const { createClient } = await import('@supabase/supabase-js')
      const supa = createClient(supaUrl, supaKey)

      // Get total count
      const { count, error: countErr } = await supa
        .from('strategies')
        .select('*', { head: true, count: 'exact' })

      if (countErr) {
        console.warn('Supabase count error:', countErr)
      }

      // Fetch paginated page
      const { data: strategies, error: stratErr } = await supa
        .from('strategies')
        .select('*')
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1)

      if (stratErr || !strategies || strategies.length === 0) {
        console.warn('Supabase fetch empty or error - falling back to backend API')
      } else {
        // Map snake_case to camelCase
        return {
          strategies: strategies.map((s: any) => ({
            id: String(s.id),
            title: s.title,
            category: s.category,
            summary: s.summary,
            imageUrl: s.image_url,
            fullDescription: s.full_description,
            keywords: s.keywords || [],
          })),
          total: count ?? strategies.length,
        }
      }
    } catch (err) {
      console.error('Supabase fetch error, falling back to backend:', err)
    }
  } else {
    console.log('Supabase env vars missing - using backend API')
  }

  // Fallback to backend API
  const queryParams = new URLSearchParams()
  queryParams.append('page', String(page))
  queryParams.append('limit', String(limit))
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

/**
 * Fetch a single strategy by ID.
 * Priority: Supabase (env-configured) -> Backend API fallback.
 * Returns undefined for 404 (unknown id); throws on other failures.
 */
export async function fetchStrategyById(id: string): Promise<Strategy | undefined> {
  const supaUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supaKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (supaUrl && supaKey) {
    try {
      const { createClient } = await import('@supabase/supabase-js')
      const supa = createClient(supaUrl, supaKey)

      const { data: strategy, error: stratErr } = await supa
        .from('strategies')
        .select('*')
        .eq('id', Number(id))
        .single()

      if (stratErr || !strategy) {
        console.warn('Supabase single fetch failed - falling back to backend API')
      } else {
        // Map snake_case to camelCase
        return {
          id: String(strategy.id),
          title: strategy.title,
          category: strategy.category,
          summary: strategy.summary,
          imageUrl: strategy.image_url,
          fullDescription: strategy.full_description,
          keywords: strategy.keywords || [],
        }
      }
    } catch (err) {
      console.error('Supabase single fetch error, falling back to backend:', err)
    }
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
