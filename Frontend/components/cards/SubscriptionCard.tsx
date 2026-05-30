import { useRouter } from 'next/navigation'
import { pixelifySans } from '@/components/utils/utils'

type CardProps = {
  type: string
  description: string
  link: string
}

export default function SubscriptionCard({
  type,
  description,
  link,
}: CardProps) {
  const r = useRouter()
  return (
    <div
      className={`bg-[#1d4226] text-white w-full max-w-[320px] h-[500px] rounded-xl p-8 flex flex-col shadow-[0px_6px_6px_#000] ${pixelifySans.className}`}
    >
      <div className='mt-10 text-center'>
        <h2 className='text-3xl tracking-widest'>{type}</h2>
      </div>
      <div className='mt-16 text-center text-xl tracking-wide px-2 leading-6'>
        {description}
      </div>
      <div className='mt-auto mb-6 flex justify-center'>
        <button
          onClick={() => {
            r.push(link)
          }}
          className='px-10 py-1 rounded-[50px] bg-linear-to-b from-white/20 to-black/40 shadow-[inset_0_2px_4px_rgba(255,255,255,0.2),inset_0_-2px_4px_rgba(0,0,0,0.4)] hover:scale-105 active:scale-95 transition-transform duration-200 cursor-pointer'
        >
          <span className='text-5xl tracking-widest drop-shadow-md'>BUY</span>
        </button>
      </div>
    </div>
  )
}
