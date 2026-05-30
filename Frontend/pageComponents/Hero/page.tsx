import { pixelifySans } from '@/components/utils/utils'
import { useRouter } from 'next/navigation'

export default function Hero() {
  const r = useRouter()

  return (
    <div className='min-h-screen w-full flex flex-col justify-end p-4 md:p-10'>
      <div className='bg-[#2f7a3b] rounded-2xl flex flex-col md:flex-row justify-between items-center p-8 md:p-12 mb-10 w-full max-w-7xl mx-auto'>
        {/* Left Side: Text Content */}
        <div className='max-w-3xl'>
          <h1
            className={`${pixelifySans.className} text-white text-3xl md:text-5xl mb-4 tracking-widest uppercase`}
          >
            OUR PRODUCT
          </h1>
          <p className='text-white/90 text-xs md:text-sm leading-relaxed font-mono'>
            Pink ponies and purple giraffes roamed the field. Cotton candy grew
            from the ground as a chocolate river meandered off to the side. What
            looked like stones in the pasture were actually rock candy.
            Everything in her dream seemed to be perfect except for the fact
            that she had no mouth.
          </p>
        </div>

        {/* Right Side: Button */}
        <button
          className={`
            mt-6 md:mt-0 shrink-0 ${pixelifySans.className} text-white text-3xl md:text-4xl tracking-widest bg-[#1a3822] px-10 py-4 md:py-5 rounded-2xl border-b-[6px] border-[#0d1c11] active:border-b-0 active:translate-y-[6px] transition-all duration-100 ease-in-out cursor-pointer scale-75 md:scale-100`}
          onClick={() => r?.push('/products')}
        >
          BUY
        </button>
      </div>
    </div>
  )
}
