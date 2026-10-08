import Image from 'next/image'
import { offbit } from '@/components/utils/utils'
import { SectionTitle } from '@/components/shared/ui'

const features = [
  {
    title: 'Landscaping Design',
    icon: '/featuresImg_3.png',
    description:
      'Enables users to research, feed site plans or design in-place using tools, curated plant and furniture blocks with automated plant schedules.',
  },
  {
    title: 'Costing and Estimation',
    icon: '/featuresImg_4.png',
    description:
      'Get accurate bills of quantities and schedules that update with any changes in plans and costing.',
  },
  {
    title: 'Micro-climate analysis',
    icon: '/featuresImg_5.png',
    description:
      'Assess the influence of local climate on landscape designs and understand practicality.',
  },
  {
    title: 'Data Bank',
    icon: '/featuresImg_6.png',
    description:
      'Avail a repository of landscaping knowledge, right from plant catalogues to strategies.',
  },
  {
    title: '3D Simulation',
    icon: '/featuresImg_2.png',
    description:
      'Run and analyse your model through real-time effects of light, shade and irrigation.',
  },
  {
    title: 'Eco-Sensitivity & Sustainability',
    icon: '/featuresImg_1.png',
    description:
      'Environment kept as a priority, encouraging sustainable and eco-centric strategies.',
  },
]

/** Features section — Figma: white panel card with the 6-feature grid. */
export default function Feature() {
  return (
    <section className='relative px-4 md:px-10 py-14'>
      <div className='max-w-6xl mx-auto bg-panel rounded-3xl p-6 md:p-12 border border-line shadow-[0_8px_24px_rgba(0,0,0,0.08)]'>
        <SectionTitle className='mb-10'>Features</SectionTitle>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-y-12 gap-x-10'>
          {features.map((feature) => (
            <div
              key={feature.title}
              className='flex flex-col items-center text-center'
            >
              <div className='mb-6 w-24 h-24 rounded-2xl bg-chip border border-line flex items-center justify-center p-3'>
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={80}
                  height={80}
                  className='object-contain'
                />
              </div>

              <h3
                className={`${offbit.className} text-ink text-lg tracking-wider mb-3`}
              >
                {feature.title}
              </h3>

              <p className='text-ink-muted text-xs md:text-sm leading-relaxed max-w-[240px]'>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}