import AppNavbar from '@/components/shared/AppNavbar'
import AppFooter from '@/components/shared/AppFooter'
import { offbit } from '@/components/utils/utils'
import { type Post } from '@/data/posts'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

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
    image: dto.imageUrl ?? '/images/main_illu.png',
    excerpt: dto.excerpt ?? '',
    body: Array.isArray(dto.body) ? dto.body : [],
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await fetchPostFromApi(slug)
  
  if (!post) {
    return { title: 'Post not found | EcoBug' }
  }
  
  return { title: `${post.title} | EcoBug`, description: post.excerpt }
}

async function fetchPostFromApi(slug: string): Promise<Post | null> {
  try {
    const res = await fetch(`${API_URL}/api/blogs/${encodeURIComponent(slug)}`, {
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    })
    if (!res.ok) return null
    return mapPost((await res.json()) as BlogPostDTO)
  } catch {
    return null
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await fetchPostFromApi(slug)

  // If the API fails or post doesn't exist, trigger the 404 page
  if (!post) notFound()

  // Fetch "Other articles" from the API
  let others: Post[] = []
  try {
    const res = await fetch(`${API_URL}/api/blogs`, {
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    })
    if (res.ok) {
      const all = (await res.json()) as BlogPostDTO[]
      others = all.map(mapPost).filter((p) => p.slug !== post.slug).slice(0, 3)
    }
  } catch {
    // If API fails, others will just be empty
  }

  return (
    // Removed bg-[#FFF4DF]
    <div className='min-h-screen dark:bg-[#102112]'>
      <AppNavbar />

      <main className='w-full flex flex-col items-center pt-28 md:pt-36 pb-20 px-4 sm:px-8'>
        
        <div className='w-full max-w-[1400px]'>
          
          {/* Back Button */}
          <Link
            href='/blog'
            className='inline-flex items-center gap-2 font-geist-mono text-sm text-[#3C6E47] dark:text-[#5FA463] hover:underline mb-8 transition-opacity hover:opacity-70'
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Blogs
          </Link>

          {/* Text Wrapper */}
          <div className='w-full max-w-[900px] mx-auto'>
            {/* Meta Info */}
            <div className='flex justify-center items-center gap-3 font-geist-mono text-xs md:text-sm text-[#40543F] dark:text-[#9BAE95] mb-4'>
              <span>{post.category}</span>
              <span>·</span>
              <span>{post.read}</span>
            </div>

            {/* Title */}
            <h1 className={`${offbit.className} text-3xl sm:text-5xl md:text-6xl font-bold text-center text-black dark:text-[#EAF2E4] leading-[1.1] mb-10 max-w-4xl mx-auto`}>
              {post.title}
            </h1>
          </div>

          {/* Hero Image */}
          <div className='w-full aspect-[2/1] md:aspect-[21/9] relative rounded-[20px] overflow-hidden mb-16 bg-gray-200 dark:bg-gray-800 shadow-sm'>
            <Image
              src={post.image}
              alt={post.title}
              fill
              className='object-cover'
              sizes='(max-width: 1400px) 100vw, 1400px'
              priority
              unoptimized
            />
          </div>

          {/* Text Wrapper */}
          <div className='w-full max-w-[900px] mx-auto'>
            
            {/* Content Layout */}
            <div className='grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12'>
              
              {/* Left Column (Meta) */}
              <div className='flex flex-col gap-6 font-geist-sans text-sm'>
                <div>
                  <p className='font-bold text-[#3C6E47] dark:text-[#5FA463] mb-1'>Published</p>
                  <p className='text-black dark:text-[#EAF2E4]'>July 1, 2025</p>
                </div>
                <div>
                  <p className='font-bold text-[#3C6E47] dark:text-[#5FA463] mb-1'>Author</p>
                  <p className='text-black dark:text-[#EAF2E4]'>Ali Gartner</p>
                </div>
              </div>

              {/* Right Column (Body) */}
              <div className='md:col-span-3 font-geist-sans text-base md:text-lg text-[#333333] dark:text-[#EAF2E4] leading-relaxed'>
                {post.body && post.body.length > 0 ? (
                  post.body.map((para, i) => (
                    <p key={i} className='mb-6 last:mb-0'>
                      {para}
                    </p>
                  ))
                ) : (
                  <p>No content available.</p>
                )}

                <hr className='border-t border-black/20 dark:border-white/20 mt-12 mb-16' />
              </div>
            </div>

            {/* Other Articles Section */}
            {others.length > 0 && (
              <div className='w-full'>
                <div className='flex justify-between items-end mb-8'>
                  <h2 className={`${offbit.className} text-2xl md:text-4xl font-bold text-black dark:text-[#EAF2E4]`}>
                    Other articles
                  </h2>
                  <Link href='/blog' className='text-sm underline hover:opacity-70 text-black dark:text-[#EAF2E4] mb-1'>
                    View all articles
                  </Link>
                </div>

                {/* 3-Column Grid */}
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
                  {others.map((o) => (
                    <Link key={o.slug} href={`/blog/${o.slug}`} className='group flex flex-col gap-3'>
                      <div className='w-full aspect-[4/3] relative rounded-[16px] overflow-hidden bg-gray-200 dark:bg-gray-800'>
                        <Image
                          src={o.image}
                          alt={o.title}
                          fill
                          className='object-cover transition-transform duration-300 group-hover:scale-105'
                          unoptimized
                        />
                      </div>
                      <h3 className={`${offbit.className} font-bold text-lg text-black dark:text-[#EAF2E4] group-hover:underline leading-snug`}>
                        {o.title}
                      </h3>
                      <div className='flex items-center gap-2 font-geist-mono text-[10px] text-gray-600 dark:text-[#9BAE95]'>
                        <span>{o.category}</span>
                        <span>·</span>
                        <span>{o.read}</span>
                      </div>
                      <p className='text-xs text-gray-700 dark:text-gray-400 line-clamp-3'>
                        {o.excerpt}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </main>

      <AppFooter />
    </div>
  )
}