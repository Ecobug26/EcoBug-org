'use client'

import { useEffect, useState, useCallback } from 'react'
import { Post } from '@/data/posts'

export interface UsePostsReturn {
  posts: Post[]
  loading: boolean
  error: Error | null
  refetch: () => void
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

/** Backend BlogPostDTO (camelCase JSON) → shape used by the UI. */
interface BlogPostDTO {
  slug: string
  title: string
  category: string | null
  readTime: string | null
  imageUrl: string | null
  excerpt: string | null
  body: string[] | null
}

function mapPost(dto: BlogPostDTO): Post {
  return {
    slug: dto.slug,
    title: dto.title,
    category: dto.category ?? '',
    read: dto.readTime ?? '4 min',
    image: dto.imageUrl ?? '/images/intro.png',
    excerpt: dto.excerpt ?? '',
    body: Array.isArray(dto.body) ? dto.body : [],
  }
}

/**
 * Hook to fetch blog posts from the backend API (/api/blogs).
 * No local fallback — surfaces an error when the API is unreachable.
 */
export function usePosts(): UsePostsReturn {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${API_URL}/api/blogs`, {
        headers: { 'Content-Type': 'application/json' },
      })
      if (!res.ok) throw new Error('Failed to fetch posts')
      const data = (await res.json()) as BlogPostDTO[]
      setPosts(Array.isArray(data) ? data.map(mapPost) : [])
    } catch (err) {
      setPosts([])
      setError(err instanceof Error ? err : new Error('Failed to fetch posts'))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { posts, loading, error, refetch: fetchData }
}