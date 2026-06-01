import { pixelifySans } from '@/components/utils/utils'
import GlobalHamburger from '@/components/shared/GlobalHamburger'
export default function WebTool() {
  const description: string =
    'Access professional tools on this website to iterate landscape designs, run simulations to understand suitability and practicality and avail cost estimations that update itself with any changes in the design. Check it out now!'
  return (
    <>
      <GlobalHamburger />
      <div className='min-h-screen bg-[#367b38]'>
        <div className='flex justify-center items-center'>
  <h1
    className={`${pixelifySans.className} text-3xl md:text-5xl mt-10 sm:mt-16 text-white`}
  >
    WEBTOOL
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
