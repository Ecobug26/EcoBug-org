import AppNavbar from '@/components/shared/AppNavbar'
import AppFooter from '@/components/shared/AppFooter'
import { MonoButton } from '@/components/shared/ui'
import { offbit } from '@/components/utils/utils'
import { getPost, posts } from '@/data/posts'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return { title: 'Article not found | EcoBug' }
  return { title: `${post.title} | EcoBug`, description: post.excerpt }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const others = posts.filter((p) => p.slug !== post.slug).slice(0, 2)

  return (
    <div className='min-h-screen flex flex-col bg-[#E9F5E0] dark:bg-[#102112]'>
      <AppNavbar />

      <main className='flex-1 flex flex-col items-center pt-28 md:pt-32 pb-16 px-5'>
        <article className='w-full max-w-3xl flex flex-col'>
          <Link
            href='/blog'
            className='font-geist-mono text-sm text-[#40543F] dark:text-[#9BAE95] hover:underline w-fit'
          >
            ← All articles
          </Link>
          <h1
            className={`${offbit.className} font-bold text-3xl sm:text-4xl md:text-5xl leading-tight tracking-[-0.02em] text-[#1B2B1E] dark:text-[#EAF2E4] mt-4`}
          >
            {post.title}
          </h1>
          <div className='flex gap-2 mt-3 font-geist-mono text-sm text-[#40543F] dark:text-[#9BAE95]'>
            <span>{post.category}</span>
            <span className='text-[#6C6C6C]'>·</span>
            <span>{post.read}</span>
          </div>

          <div className='relative w-full aspect-[16/9] mt-8 rounded-[20px] overflow-hidden border border-black'>
            <Image
              src={post.image}
              alt={post.title}
              fill
              className='object-cover'
              sizes='(max-width: 768px) 100vw, 768px'
              priority
            />
          </div>

          <div className='mt-8 flex flex-col gap-5'>
            {post.body.map((para, i) => (
              <p
                key={i}
                className='text-base md:text-lg leading-relaxed text-[#1B2B1E] dark:text-[#EAF2E4]'
              >
                {para}
              </p>
            ))}
          </div>
        </article>

        {others.length > 0 && (
          <div className='w-full max-w-3xl mt-14 flex flex-col gap-4'>
            <h2
              className={`${offbit.className} font-bold text-xl md:text-2xl text-[#1B2B1E] dark:text-[#EAF2E4]`}
            >
              Keep reading
            </h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/blog/${o.slug}`}
                  className='bg-[#97C974] dark:bg-[#253B25] border border-black rounded-[20px] p-4 transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_10px_24px_rgba(0,0,0,0.15)]'
                >
                  <h3
                    className={`${offbit.className} font-bold text-lg leading-snug text-[#1B2B1E] dark:text-[#EAF2E4]`}
                  >
                    {o.title}
                  </h3>
                  <p className='mt-1 font-geist-mono text-xs text-[#40543F] dark:text-[#9BAE95]'>
                    {o.category} · {o.read}
                  </p>
                </Link>
              ))}
            </div>
            <MonoButton href='/blog' className='text-[14px] leading-[14px] px-3 py-3 self-start'>
              View all articles
            </MonoButton>
          </div>
        )}
      </main>

      <AppFooter />
    </div>
  )
}
