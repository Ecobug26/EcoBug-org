'use client'

import AppNavbar from '@/components/shared/AppNavbar'
import AppFooter from '@/components/shared/AppFooter'
import { offbit } from '@/components/utils/utils'
import { usePosts } from '@/hooks/usePosts'
import { MonoButton } from '@/components/shared/ui'
import Image from 'next/image'
import Link from 'next/link'

interface BlogPost {
  slug: string
  image: string
  title: string
  category: string
  read: string
  excerpt: string
}

export default function BlogList() {
  const { posts, loading, error } = usePosts()
  
  if (loading) {
    return (
      <div className='min-h-screen dark:bg-[#102112]'>
        <AppNavbar />
        <div className='pt-40 pb-20 flex justify-center items-center'>
          <p className='text-[#40543F] dark:text-[#9BAE95]'>Loading posts…</p>
        </div>
        <AppFooter />
      </div>
    )
  }

  if (error) {
    return (
      <div className='min-h-screen dark:bg-[#102112]'>
        <AppNavbar />
        <div className='pt-40 pb-20 flex justify-center items-center'>
          <p className='text-[#40543F] dark:text-[#9BAE95]'>Error loading posts.</p>
        </div>
        <AppFooter />
      </div>
    )
  }

  return (
    <div className='min-h-screen dark:bg-[#102112]'>
      <AppNavbar />

      <div className='w-full flex flex-col items-center pt-32 md:pt-40 pb-24 px-5'>
        
        <h1
          className={`${offbit.className} text-4xl sm:text-5xl md:text-6xl text-black dark:text-[#EAF2E4] tracking-widest uppercase font-bold text-center`}
        >
          Blogs
        </h1>

        {/* 2-Column Vertical Grid */}
        <div className='w-full max-w-[1200px] mt-16 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16'>
          {posts && posts.length > 0 ? (
            (posts as BlogPost[]).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className='group flex flex-col gap-4'
              >
                {/* Image */}
                <div className='w-full aspect-[16/10] relative rounded-[20px] overflow-hidden border border-black/10 dark:border-white/10 bg-gray-200 dark:bg-gray-800'>
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className='object-cover transition-transform duration-300 group-hover:scale-105'
                    unoptimized
                  />
                </div>

                {/* Text Content */}
                <div className='flex flex-col gap-2'>
                  <h2
                    className={`${offbit.className} font-bold text-xl md:text-2xl text-black dark:text-[#EAF2E4] group-hover:underline underline-offset-4 leading-snug`}
                  >
                    {post.title}
                  </h2>
                  
                  <div className='flex items-center gap-2 font-geist-mono text-xs md:text-sm text-gray-600 dark:text-[#9BAE95]'>
                    <span>{post.category}</span>
                    <span>·</span>
                    <span>{post.read}</span>
                  </div>

                  <p className='text-sm md:text-base text-gray-700 dark:text-gray-400 leading-relaxed mt-2'>
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <div className='col-span-full py-10 text-center text-gray-500'>
              No posts available at the moment.
            </div>
          )}
        </div>

        {/* Contact CTA Section */}
        <div className='mt-24 flex flex-col items-center gap-6'>
          <h2 className={`${offbit.className} text-4xl md:text-5xl font-bold text-black dark:text-[#EAF2E4]`}>
            Contact Us
          </h2>
          <MonoButton 
            href='/contact'
            bullet
            className='px-6 py-3 text-sm md:text-base'
          >
            Contact Now
          </MonoButton>
        </div>

      </div>

      <AppFooter />
    </div>
  )
}