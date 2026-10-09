'use client'

import Image from 'next/image'
import Link from 'next/link'
import { offbit } from '@/components/utils/utils'
import { MonoButton } from '@/components/shared/ui'
import { posts } from '@/data/posts'

/**
 * Blog teaser — Figma "Blog section" (166:2378 / 283:2455, mobile 296:5330):
 * OffBit 64 heading, journal items (r29, green, 1px black stroke, stacked
 * with no gap; image 165x100 r20 + Geist Mono meta), then the black
 * "View all articles" button. Section pad top 0 / bottom 50 (mobile 82),
 * gap 40 (mobile 30). Cards link to their full article pages.
 */
export default function Blogs() {
  return (
    <section className='w-full px-5 pb-[82px] lg:pb-[50px]'>
      <div className='mx-auto flex flex-col items-center gap-[30px] lg:gap-10'>
        <h2
          className={`${offbit.className} font-bold text-[32px] lg:text-[64px] leading-[32px] lg:leading-[64px] tracking-[-0.01em] text-center text-[#1B2B1E] dark:text-[#EAF2E4]`}
        >
          READ OUR BLOGS
        </h2>

        <div className='w-full max-w-[620px] flex flex-col gap-6'>
          <div className='flex flex-col'>
            {posts.slice(0, 3).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className='group bg-[#97C974] dark:bg-[#253B25] border border-black rounded-[26.1px] lg:rounded-[29px] px-[14.4px] lg:px-4 transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_10px_24px_rgba(0,0,0,0.15)] hover:z-10 relative'
              >
                <div className='flex flex-col lg:flex-row items-center gap-[14.4px] lg:gap-4 py-[21.6px] lg:py-6'>
                  <Image
                    src={post.image}
                    alt=''
                    aria-hidden
                    width={165}
                    height={100}
                    className='w-[148px] h-[90px] lg:w-[165px] lg:h-[100px] rounded-[18px] lg:rounded-[20px] object-cover shrink-0'
                  />
                  <div className='flex flex-col items-center lg:items-start gap-2 w-full min-w-0 text-center lg:text-left'>
                    <h3
                      className={`${offbit.className} font-bold text-[17px] lg:text-[24px] leading-[17px] lg:leading-6 tracking-[-0.02em] text-[#1B2B1E] dark:text-[#EAF2E4]`}
                    >
                      {post.title}
                    </h3>
                    <div className='flex justify-center lg:justify-start gap-2 font-geist-mono text-[12.6px] lg:text-[14px] leading-[12.6px] lg:leading-[14px] text-[#40543F] dark:text-[#9BAE95]'>
                      <span>{post.category}</span>
                      <span className='text-[#6C6C6C]'>·</span>
                      <span>{post.read}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <MonoButton
            href='/blog'
            className='text-[14px] leading-[14px] px-3 py-3'
          >
            View all articles
          </MonoButton>
        </div>
      </div>
    </section>
  )
}
