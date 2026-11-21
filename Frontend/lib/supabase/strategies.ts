/** @supabase/supabase-js */
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { Strategy } from '@/app/webtool/strategy/types'

let client: SupabaseClient | null = null

/** Initialize Supabase client from env vars; returns null if missing. */
export function getSupabaseClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !anonKey) {
    console.warn('Supabase env vars missing — falling back to local data.')
    return null
  }

  if (!client) {
    client = createClient(url, anonKey)
  }
  return client
}

/** Fetch all strategies from Supabase, with keywords grouped by strategy id. */
export async function fetchStrategiesFromSupabase(): Promise<Strategy[]> {
  const supa = getSupabaseClient()
  if (!supa) return []

  // 1) Pull all strategies, ordered newest first
  const { data: strategies, error: stratErr } = await supa
    .from('strategies')
    .select('*')
    .order('created_at', { ascending: false })

  if (stratErr) {
    console.error('Supabase strategies fetch error:', stratErr)
    return []
  }

  if (!strategies || strategies.length === 0) return []

  // 2) Pull all keywords in one batch (strategy_id → keyword list)
  const strategyIds = strategies.map((s: any) => s.id)
  const { data: keywords, error: kwErr } = await supa
    .from('strategy_keywords')
    .select('strategy_id, keyword')
    .in('strategy_id', strategyIds)

  if (kwErr) {
    console.error('Supabase strategy_keywords fetch error:', kwErr)
    return strategies.map((s: any) => mapSupabaseStrategy(s, []))
  }

  // 3) Group keywords by strategy_id
  const keywordsById = new Map<number, string[]>()
  if (keywords) {
    for (const kw of keywords) {
      const sid = kw.strategy_id
      if (!keywordsById.has(sid)) keywordsById.set(sid, [])
      keywordsById.get(sid)!.push(kw.keyword)
    }
  }

  // 4) Map snake_case → camelCase + attach keywords
  return strategies.map((s: any) => mapSupabaseStrategy(s, keywordsById.get(s.id) || []))
}

/** Fetch a single strategy from Supabase by its id (primary key). */
export async function fetchStrategyByIdFromSupabase(id: string): Promise<Strategy | undefined> {
  const supa = getSupabaseClient()
  if (!supa) return undefined

  // 1) Fetch the strategy row
  const { data: strategy, error: stratErr } = await supa
    .from('strategies')
    .select('*')
    .eq('id', Number(id))
    .single()

  if (stratErr || !strategy) {
    console.error('Supabase strategy single fetch error:', stratErr)
    return undefined
  }

  // 2) Fetch its keywords
  const { data: keywords, error: kwErr } = await supa
    .from('strategy_keywords')
    .select('keyword')
    .eq('strategy_id', Number(id))

  if (kwErr) {
    console.error('Supabase strategy_keywords single fetch error:', kwErr)
    return mapSupabaseStrategy(strategy, [])
  }

  // Extract just the keyword strings
  const kwStrings = (keywords as { keyword: string }[] || []).map((k: any) => k.keyword)

  return mapSupabaseStrategy(strategy, kwStrings)
}

/**
 * Map a raw Supabase strategy row (snake_case) to the frontend Strategy interface (camelCase).
 */
function mapSupabaseStrategy(s: any, keywords: string[]): Strategy {
  return {
    id: String(s.id),
    title: s.title,
    category: s.category,
    summary: s.summary,
    imageUrl: s.image_url,
    fullDescription: s.full_description,
    keywords,
  }
}