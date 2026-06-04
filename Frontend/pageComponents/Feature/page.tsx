import Image from 'next/image'
import { pixelifySans } from '@/components/utils/utils'
import BackgroundDecorations from '@/components/shared/BackgroundDecorations'
const features = [
  {
    title: 'Landscaping Design',
    icon: '/featuresimg_3.png',
    description:
      'Enables users to research, feed site plans or design in-place using tools, curated plant and furniture blocks with automated plant schedules.',
  },
  {
    title: 'Costing and Estimation',
    icon: '/featuresimg_4.png',
    description:
      'Get accurate bills of quantities and schedules that update with any changes in plans and costing.',
  },
  {
    title: 'Micro-climate analysis',
    icon: '/featuresimg_5.png',
    description:
      'Assess the influence of local climate on landscape designs and understand practicality.',
  },
  {
    title: 'Data Bank',
    icon: '/featuresimg_6.png',//3
    description:
      'Avail a repository of landscaping knowledge, right from plant catalogues to strategies.',
  },
  {
    title: '3D Simulation',
    icon: '/featuresimg_2.png',//2
    description:
      'Run and analyse your model through real-time effects of light, shade and irrigation.',
  },
  {
    title: 'Eco-Sensitivity & Sustainability',
    icon: '/featuresimg_1.png',//1
    description:
      'Environment kept as a priority, encouraging sustainable and eco-centric strategies.',
  },
]

export default function Feature() {
  return (
    <section className=" relative px-4 md:px-10 py-10 bg-white">
      
      <div className="bg-[#367B38] rounded-2xl p-6 md:p-10">
        <h2
          className={`${pixelifySans.className}
          text-white
          text-2xl
          md:text-4xl
          mb-10
          tracking-widest`}
        >
          Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 gap-x-10">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col items-center text-center"
            >
              <Image
                src={feature.icon}
                alt={feature.title}
                width={120}
                height={120}
                className="mb-6 object-contain"
              />

              <h3
                className={`${pixelifySans.className}
                text-white
                text-lg
                tracking-wider
                mb-4`}
              >
                {feature.title}
              </h3>

              <p className="text-white/90 text-xs md:text-sm leading-relaxed max-w-[240px]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}