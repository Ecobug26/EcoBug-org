import { pixelifySans } from '@/components/utils/utils'
import GlobalHamburger from '@/components/shared/GlobalHamburger'

export default function Blog() {
  const description: string =
    'From exciting news in the field of landscape architecture to research and development of materials, tools and textures, find a dedicated page informing you of things that ought to be seen!'

  return (
    <>
      <GlobalHamburger />

      <div className='min-h-screen bg-[#367B38]'>
        <div className='flex justify-center items-center'>
          <h1
            className={`${pixelifySans.className} text-3xl md:text-5xl mt-10 sm:mt-16 text-white`}
          >
            BLOG
          </h1>
        </div>

        <div className='flex justify-center items-center px-8 mt-10'>
          <p className='text-xs md:text-sm leading-relaxed text-white text-center max-w-3xl'>
            {description}
          </p>
        </div>
      </div>
    </>
  )
}