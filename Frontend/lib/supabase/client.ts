// lib/supabase/client.ts

import { createClient, SupabaseClient } from '@supabase/supabase-js'

let client: SupabaseClient | null = null

/**
 * Returns a singleton Supabase client for frontend (anon key) access.
 * Returns null when env vars are not configured, so callers can fall back
 * to local data gracefully.
 */
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
