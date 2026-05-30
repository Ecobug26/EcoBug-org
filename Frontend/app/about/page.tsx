import { pixelifySans } from '@/components/utils/utils'

const description: string =
  'EcoBug Landscape Consultant Software finds its humble beginnings in an effort to organise and compile landscape data, designing, maintenance and costing. In an attempt to make the process seamless and time-efficient, the concept for the software was conceived to align with professional needs, real-life applications and financial implications.  EcoBug vies to embed sustainability and eco-sensitivity as an underlying yet important quality aiding designers to get the best and environmentally viable solutions.'

export default function About() {
  return (
    <>
      <div className='absolute inset-0 bg-black/50' />
      <div
        className='min-h-screen bg-no-repeat bg-cover '
        style={{
          backgroundImage: `url('/leaf.svg')`,
        }}
      >
        <div className='flex items-center justify-center'>
          <h1
            className={`${pixelifySans.className} text-6xl sm:text-8xl text-white mt-16 md:mt-8 z-5`}
          >
            ABOUT
          </h1>
        </div>
        <div className='flex items-center justify-center backdrop-blur-2xl border border-white rounded-3xl p-8 m-10 md:m-14 lg:m-20'>
          <p
            className={`${pixelifySans.className} text-3xl tracking-widest text-white text-justify leading-10`}
          >
            {description}
          </p>
        </div>
      </div>
    </>
  )
}
