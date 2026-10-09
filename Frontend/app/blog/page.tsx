import AppNavbar from '@/components/shared/AppNavbar'
import AppFooter from '@/components/shared/AppFooter'
import { offbit } from '@/components/utils/utils'
import { posts } from '@/data/posts'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog | EcoBug',
  description:
    'Notes on landscape design, plant selection, climate and biodiversity from the EcoBug team.',
}

export default function Blog() {
  return (
    <div className='min-h-screen flex flex-col bg-[#E9F5E0] dark:bg-[#102112]'>
      <AppNavbar />

      <main className='flex-1 flex flex-col items-center pt-28 md:pt-32 pb-16 px-5'>
        <h1
          className={`${offbit.className} text-4xl sm:text-5xl md:text-6xl text-[#1B2B1E] dark:text-[#EAF2E4] tracking-widest uppercase font-bold text-center`}
        >
          Blog
        </h1>
        <p className='mt-4 max-w-2xl text-center text-sm md:text-base leading-relaxed text-[#40543F] dark:text-[#9BAE95]'>
          Notes on landscape design, plant selection, climate and biodiversity
          from the EcoBug team.
        </p>

        <div className='w-full max-w-[620px] mt-10 flex flex-col'>
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className='group bg-[#97C974] dark:bg-[#253B25] border border-black rounded-[26.1px] lg:rounded-[29px] px-[14.4px] lg:px-4 transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_10px_24px_rgba(0,0,0,0.15)] hover:z-10 relative'
            >
              <div className='flex flex-col lg:flex-row items-center gap-[14.4px] lg:gap-4 py-[21.6px] lg:py-6'>
                <Image
                  src={post.image}
                  alt={post.title}
                  width={165}
                  height={100}
                  className='w-[148px] h-[90px] lg:w-[165px] lg:h-[100px] rounded-[18px] lg:rounded-[20px] object-cover shrink-0'
                />
                <div className='flex flex-col items-center lg:items-start gap-2 w-full min-w-0 text-center lg:text-left'>
                  <h2
                    className={`${offbit.className} font-bold text-[17px] lg:text-[24px] leading-[17px] lg:leading-6 tracking-[-0.02em] text-[#1B2B1E] dark:text-[#EAF2E4]`}
                  >
                    {post.title}
                  </h2>
                  <p className='text-[13px] lg:text-sm leading-relaxed text-[#40543F] dark:text-[#9BAE95] line-clamp-2'>
                    {post.excerpt}
                  </p>
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
      </main>

      <AppFooter />
    </div>
  )
}