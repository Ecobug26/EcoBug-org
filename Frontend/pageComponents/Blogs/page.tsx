'use client'

import Image from 'next/image'
import Link from 'next/link'
import { offbit } from '@/components/utils/utils'
import { MonoButton } from '@/components/shared/ui'
import { usePosts } from '@/hooks/usePosts'

// Fallback data to show UI if backend is offline
const mockPosts = [
  {
    slug: '1',
    image: '/images/main_illu.png',
    title: 'How to build a Nuclear Bomb at home',
    category: 'Landscaping',
    read: '4 min',
  },
  {
    slug: '2',
    image: '/images/main_illu.png',
    title: 'Help us bring down Benjamin Netanyahu',
    category: 'Architecture',
    read: '4 min',
  },
  {
    slug: '3',
    image: '/images/main_illu.png',
    title: 'Doing Leet-Code is Israeli Propaganda',
    category: 'Chemical-Warfare',
    read: '4 min',
  },
]

export default function Blogs() {
  const { posts } = usePosts()

  const displayPosts = posts && posts.length > 0 ? posts.slice(0, 3) : mockPosts

  return (
    <section className='w-full bg-[#E8F3E0] dark:bg-[#102112] px-5 pb-[82px] lg:pb-[50px]'>
      <div className='mx-auto flex flex-col items-center gap-[30px] lg:gap-10'>
        <h2
          className={`${offbit.className} font-bold text-[32px] lg:text-[64px] leading-[32px] lg:leading-[64px] tracking-[-0.01em] text-center text-[#162B18] dark:text-[#EAF2E4]`}
        >
          READ OUR BLOGS
        </h2>

        <div className='w-full max-w-[620px] flex flex-col gap-5'>
          {/* Cards touch each other; -mt-px lets neighbouring borders overlap into one line */}
          <div className='flex flex-col'>
            {displayPosts.map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className={`group relative block bg-[#98CA75] dark:bg-[#253B25] border border-black dark:border-transparent rounded-[30px] p-4 transition-transform duration-200 hover:-translate-y-1 hover:z-10 hover:shadow-[0_10px_24px_rgba(0,0,0,0.15)] ${
                  i > 0 ? '-mt-px' : ''
                }`}
              >
                <div className='flex flex-row items-start gap-3 sm:gap-4'>
                  <Image
                    src={post.image}
                    alt=''
                    aria-hidden
                    width={165}
                    height={100}
                    className='w-[111px] h-[67px] sm:w-[165px] sm:h-[100px] rounded-[18px] sm:rounded-[22px] object-cover shrink-0'
                  />

                  <div className='flex flex-col gap-1.5 flex-1 min-w-0 text-left'>
                    <h3
                      className={`${offbit.className} font-bold text-[16px] sm:text-[24px] leading-[1.2] tracking-[-0.01em] text-[#162B18] dark:text-[#EAF2E4] line-clamp-2`}
                    >
                      {post.title}
                    </h3>
                    <div className='flex items-center gap-2 font-geist-mono text-[11px] sm:text-[14px] leading-[1.2] text-[#4B5B47] dark:text-[#9BAE95]'>
                      <span>{post.category}</span>
                      <span>·</span>
                      <span>{post.read}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className='flex justify-center'>
            <MonoButton href='/blog' className='text-[14px] leading-[14px] px-3 py-3'>
              View all articles
            </MonoButton>
          </div>
        </div>
      </div>
    </section>
  )
}