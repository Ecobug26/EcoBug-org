import Image from 'next/image'
import { offbit } from '@/components/utils/utils'

const features = [
  {
    title: 'Landscaping Design',
    icon: '/features/icon-landscaping.svg',
    description:
      'Enables users to research, feed site plans or design in-place using tools, curated plant and furniture blocks with automated plant schedules.',
  },
  {
    title: 'Costing and Estimation',
    icon: '/features/icon-costing.svg',
    description:
      'Get accurate bills of quantities and schedules that update with any changes in plans and costing.',
  },
  {
    title: 'Micro-climate analysis',
    icon: '/features/icon-microclimate.svg',
    description:
      'Assess the influence of local climate on landscape designs and understand practicality.',
  },
  {
    title: 'Data Bank',
    icon: '/features/icon-databank.svg',
    description:
      'Avail a repository of landscaping knowledge, right from plant catalogues to strategies.',
  },
  {
    title: '3D Simulation',
    icon: '/features/icon-3dsim.svg',
    description:
      'Run and analyse your model through real-time effects of light, shade and irrigation.',
  },
  {
    title: 'Eco-Sensitivity & Sustainability',
    icon: '/features/icon-eco.svg',
    description:
      'Environment kept as a priority, encouraging sustainable and eco-centric strategies.',
  },
]

/**
 * Features — Figma "Frame 1" (166:2367 / 283:2444): centered OffBit 60
 * heading, then two rows of three 385x274 green cards (r24, pad 40,
 * gap 24) with a 42px line icon (#3C6E47 light / #5FA463 dark).
 */
export default function Feature() {
  return (
    <section className='w-full px-5 py-14 sm:py-16 lg:py-[92px] overflow-x-clip'>
      <div className='mx-auto w-full max-w-[1240px]'>
        <h2
          className={`${offbit.className} font-bold text-[32px] sm:text-[44px] lg:text-[60px] leading-[1.05] tracking-[-0.01em] text-center text-balance text-[#1B2B1E] dark:text-[#EAF2E4]`}
        >
          FEATURES OUR SERVICE PROVIDES
        </h2>

        <div className='mt-8 lg:mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-4 lg:px-[26px]'>
          {features.map((feature) => (
            <div
              key={feature.title}
              className='w-full bg-[#97C974] dark:bg-[#253B25] rounded-3xl p-6 sm:p-8 lg:p-10 flex flex-col gap-5 lg:gap-6 transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_10px_24px_rgba(0,0,0,0.15)]'
            >
              <span className='w-[42px] h-[42px] text-[#3C6E47] dark:text-[#5FA463] shrink-0'>
                <Image
                  src={feature.icon}
                  alt=''
                  aria-hidden
                  width={42}
                  height={42}
                  unoptimized
                  className='w-full h-full'
                />
              </span>

              <div className='flex flex-col gap-2'>
                <h3
                  className={`${offbit.className} font-bold text-[22px] lg:text-[24px] leading-6 tracking-[-0.02em] text-[#1B2B1E] dark:text-[#EAF2E4]`}
                >
                  {feature.title}
                </h3>
                <p className='font-geist-sans text-[16px] lg:text-[20px] leading-6 tracking-[-0.04em] text-[#40543F] dark:text-[#9BAE95]'>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
