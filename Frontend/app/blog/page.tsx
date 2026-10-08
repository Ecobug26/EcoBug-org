import AppNavbar from '@/components/shared/AppNavbar'
import AppFooter from '@/components/shared/AppFooter'
import { offbit } from '@/components/utils/utils'
import { Panel, Chip } from '@/components/shared/ui'

export default function Blog() {
  const description: string =
    'From exciting news in the field of landscape architecture to research and development of materials, tools and textures, find a dedicated page informing you of things that ought to be seen!'

  return (
    <div className='min-h-screen flex flex-col bg-bg'>
      <AppNavbar />

      <main className='flex-1 flex flex-col items-center pt-28 md:pt-32 pb-16 px-4'>
        <div className='flex items-center gap-3'>
          <h1
            className={`${offbit.className} text-4xl sm:text-5xl md:text-6xl text-ink tracking-widest uppercase font-bold text-center`}
          >
            BLOG
          </h1>
          <Chip className='mt-2'>coming soon</Chip>
        </div>

        <Panel className='w-full max-w-3xl mt-10 p-8 md:p-12'>
          <p className='text-sm md:text-base leading-relaxed text-ink text-center'>
            {description}
          </p>
        </Panel>
      </main>

      <AppFooter />
    </div>
  )
}