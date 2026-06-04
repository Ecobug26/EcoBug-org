import { pixelifySans } from '@/components/utils/utils'
import Marquee from 'react-fast-marquee'
import { useRouter } from 'next/navigation'
import BackgroundDecorations from '@/components/shared/BG_deco/BackgroundDecorations_feedbacks'
export default function Feedbacks() {
  const r = useRouter()
  const quotes = [
    'We are really looking forward to having maintenance plans for landscaping, a much needed respite for our long term works',
    'It’s really nice to have everything in one place',
    'I am expecting ecologically aware and driven strategies for our upcoming projects',
    'I’d love a tool that would ease our work',
  ]

  return (
    <>
      
      <div className='relative min-h-screen scale-90 md:scale-100 flex items-end mb-8'>
        <BackgroundDecorations />
        <div className='max-w-4xl w-full mx-auto bg-white rounded-2xl border border-gray-200 shadow-[0px_2px_6px_#000] p-8 md:p-12 mb-5 overflow-hidden'>
          <div
            className={`text-[#204922] uppercase tracking-widest text-lg sm:text-2xl mb-8 ${pixelifySans.className}`}
          >
            What clients have to say
          </div>
          <div className='flex flex-col gap-12'>
            <div className='overflow-hidden w-full relative'>
              <Marquee speed={100} pauseOnHover>
                <div className='flex ml-6 gap-6 w-max'>
                  {[...quotes, ...quotes].map((quote, index) => (
                    <div
                      key={index}
                      className='bg-[#2f7335] shrink-0 w-[320px] min-h-[200px] rounded-3xl p-6 flex items-start cursor-pointer'
                    >
                      <p
                        className='text-white text-sm md:text-base leading-snug font-mono'
                      >
                        {quote}
                      </p>
                    </div>
                  ))}
                </div>
              </Marquee>
            </div>
            <div className='bg-[#2f7335] rounded-2xl p-10 flex flex-col items-center justify-center text-center gap-5'>
              <p
                className={`text-white text-2xl tracking-widest uppercase ${pixelifySans.className}`}
              >
                Are you ready?
              </p>
              <h2
                className={`text-white text-xl md:text-2xl tracking-widest uppercase ${pixelifySans.className}`}
              >
                Be a part of next best thing
              </h2>
              <button
                className={`mt-2 px-8 py-3 bg-[#111] text-white rounded-lg text-lg hover:bg-black transition-colors cursor-pointer ${pixelifySans.className}`}
                onClick={() => r.push('/products')}
              >
                View Our Price
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
