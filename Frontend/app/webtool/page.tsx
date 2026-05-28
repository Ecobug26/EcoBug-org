import { pixelifySans } from '@/components/utils/utils'

export default function WebTool() {
  const description: string =
    'Access professional tools on this website to iterate landscape designs, run simulations to understand suitability and practicality and avail cost estimations that update itself with any changes in the design. Check it out now!'
  return (
    <>
      <div className='min-h-screen bg-[#367b38]'>
        <div className='flex justify-center items-center'>
          <h1
            className={`${pixelifySans.className} text-4xl sm:text-6xl md:text-8xl mt-10 sm:mt-16 text-[#1d4226]`}
          >
            WEBTOOL
          </h1>
        </div>
        <div className='flex justify-center items-center px-4'>
          <p
            className={`${pixelifySans.className} text-white text-lg sm:text-2xl md:text-3xl mt-20 text-center`}
          >
            {description}
          </p>
        </div>
      </div>
    </>
  )
}
