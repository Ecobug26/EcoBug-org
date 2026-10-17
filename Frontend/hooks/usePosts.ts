'use client'

import { useEffect, useState, useCallback } from 'react'
import { getSupabaseClient } from '@/lib/supabase/client'
import { Post } from '@/data/posts'

export interface UsePostsReturn {
  posts: Post[]
  loading: boolean
  error: Error | null
  refetch: () => void
}

/**
 * Hook to fetch blog posts directly from Supabase.
 * Falls back to local posts data when Supabase is unavailable.
 */
export function usePosts(): UsePostsReturn {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const supabase = getSupabaseClient()
      if (!supabase) {
        // Fallback to local data
        const { posts: localPosts } = await import('@/data/posts')
        setPosts(localPosts)
        return
      }

      const { data, error: supabaseError } = await supabase
        .from('blog_posts')
        .select('slug, title, category, read_time, image_url, excerpt, body, created_at, updated_at')
        .order('created_at', { ascending: false })

      if (supabaseError) {
        console.error('Error fetching posts from Supabase:', supabaseError)
        const { posts: localPosts } = await import('@/data/posts')
        setPosts(localPosts)
        return
      }

      if (!data || data.length === 0) {
        const { posts: localPosts } = await import('@/data/posts')
        setPosts(localPosts)
        return
      }

      const mapped: Post[] = data.map((row) => ({
        slug: row.slug,
        title: row.title,
        category: row.category,
        read: row.read_time ?? '4 min',
        image: row.image_url ?? '/images/intro.png',
        excerpt: row.excerpt ?? '',
        body: Array.isArray(row.body) ? row.body : [row.body ?? ''],
      }))

      setPosts(mapped)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch posts'))
      try {
        const { posts: localPosts } = await import('@/data/posts')
        setPosts(localPosts)
      } catch {
        setPosts([])
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { posts, loading, error, refetch: fetchData }
}