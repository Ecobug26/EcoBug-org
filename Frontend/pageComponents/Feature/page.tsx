import { pixelifySans } from '@/components/utils/utils'

const features = [
  {
    title: 'Landscaping Design',
    description:
      'Enables users to research, feed site plans or design in-place using tools, curated plant and furniture blocks with automated plant schedules.',
  },
  {
    title: 'Costing and Estimation',
    description:
      'Get accurate bills of quantities and schedules that update with any changes in plans and costing.',
  },
  {
    title: 'Microclimate analysis',
    description:
      'Assess the influence of local climate on landscape designs and understand practicality.',
  },
  {
    title: 'Data Bank',
    description:
      'Avail a repository of landscaping knowledge, right from plant catalogues to strategies.',
  },
  {
    title: '3D Simulation',
    description:
      'Run and analyse your model through real-time effects of light, shade and irrigation.',
  },
  {
    title: 'Eco-Sensitivity and sustainability',
    description:
      'Environment kept as a priority, encouraging sustainable and eco-centric strategies.',
  },
]

export default function Feature() {
  return (
    <div className='bg-[#2f7a3b] text-white font-mono'>
      <section className='flex justify-center py-10 px-6'>
        <div className='w-full max-w-5xl'>
          <div className='flex flex-col md:flex-row items-start gap-10'>
            <img
              src='/plant.png'
              alt='Decorative plant'
              className='w-48 mx-auto md:mx-0 shrink-0 md:sticky md:top-10'
            />

            <div className='w-full'>
              <h2
                className={`${pixelifySans.className} text-3xl md:text-4xl mb-10 tracking-widest uppercase`}
              >
                Features
              </h2>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-0'>
                {features.map((feature, i) => (
                  <div
                    key={feature.title}
                    className='flex flex-col gap-3 p-8 border-white/20 border-b md:odd:border-r'
                    style={{
                      borderTop:
                        i >= 2 ? undefined : '1px solid rgba(255,255,255,0.2)',
                      borderTopWidth: i < 2 ? '1px' : undefined,
                    }}
                  >
                    <h3
                      className={`${pixelifySans.className} text-xl tracking-widest uppercase`}
                    >
                      {feature.title}
                    </h3>
                    <p className='text-sm leading-relaxed opacity-80'>
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
