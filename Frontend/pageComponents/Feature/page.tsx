import React from 'react'
import { Jost } from 'next/font/google'
import { offbit } from '@/components/utils/utils'

// Geometric sans used for the card descriptions
const body = Jost({ subsets: ['latin'], weight: ['400', '500'] })

type IconKind = 'split' | 'globe' | 'arrow'

const features: { title: string; icon: IconKind; description: string }[] = [
  {
    title: 'Landscaping Design',
    icon: 'split',
    description:
      'Enables users to research, feed site plans or design in-place using tools, curated plant and furniture blocks with automated plant schedules.',
  },
  {
    title: 'Costing and Estimation',
    icon: 'globe',
    description:
      'Get accurate bills of quantities and schedules that update with any changes in plans and costing.',
  },
  {
    title: 'Micro-climate analysis',
    icon: 'arrow',
    description:
      'Assess the influence of local climate on landscape designs and understand practicality.',
  },
  {
    title: 'Data Bank',
    icon: 'split',
    description:
      'Avail a repository of landscaping knowledge, right from plant catalogues to strategies.',
  },
  {
    title: '3D Simulation',
    icon: 'globe',
    description:
      'Run and analyse your model through real-time effects of light, shade and irrigation.',
  },
  {
    title: 'Eco-Sensitivity & Sustainability',
    icon: 'arrow',
    description:
      'Environment kept as a priority, encouraging sustainable and eco-centric strategies.',
  },
]

function FeatureIcon({ kind }: { kind: IconKind }) {
  return (
    <svg
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.3'
      strokeLinecap='round'
      strokeLinejoin='round'
      className='w-full h-full'
      aria-hidden='true'
    >
      <circle cx='12' cy='12' r='11' />
      {kind === 'split' && (
        <>
          <path d='M11 1v22' />
          <path d='M11 12h12' />
        </>
      )}
      {kind === 'globe' && (
        <>
          <ellipse cx='12' cy='12' rx='4.8' ry='11' />
          <path d='M1 12h22' />
          <path d='M3 6.5c5.5 2 12.5 2 18 0' />
          <path d='M3 17.5c5.5-2 12.5-2 18 0' />
        </>
      )}
      {kind === 'arrow' && (
        <>
          <path d='M8 16L16 8' />
          <path d='M9 8h7v7' />
        </>
      )}
    </svg>
  )
}

export default function Feature() {
  return (
    <section className='w-full bg-[#E8F3E0] dark:bg-[#102112] px-4 sm:px-6 py-12 sm:py-14 lg:py-16 overflow-x-clip'>
      <div className='mx-auto w-full max-w-[1360px]'>
        <h2
          className={`${offbit.className} font-bold text-[32px] sm:text-[44px] lg:text-[60px] leading-[1.05] tracking-[-0.01em] text-center text-balance text-[#162B18] dark:text-[#EAF2E4]`}
        >
          FEATURES OUR SERVICE PROVIDES
        </h2>

        <div className='mt-8 lg:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5'>
          {features.map((feature) => (
            <div
              key={feature.title}
              className='w-full bg-[#98CA75] dark:bg-[#253B25] rounded-[28px] p-6 sm:p-7 lg:p-8 flex flex-col transition-transform duration-200 hover:-translate-y-1 lg:aspect-[260/184]'
            >
              <span className='w-7 h-7 lg:w-8 lg:h-8 shrink-0 text-[#2F6B35] dark:text-[#5FA463]'>
                <FeatureIcon kind={feature.icon} />
              </span>

              <div className='mt-5 lg:mt-6 flex flex-col gap-2'>
                <h3
                  className={`${offbit.className} font-bold text-[20px] lg:text-[24px] leading-[1.15] tracking-[-0.01em] text-[#111C12] dark:text-[#EAF2E4]`}
                >
                  {feature.title}
                </h3>
                <p
                  className={`${body.className} text-[14px] lg:text-[16px] leading-[1.35] text-[#3E5A3A] dark:text-[#9BAE95]`}
                >
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