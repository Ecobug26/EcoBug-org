import AppNavbar from '@/components/shared/AppNavbar'
import AppFooter from '@/components/shared/AppFooter'
import { offbit } from '@/components/utils/utils'
import { Panel } from '@/components/shared/ui'

const description: string =
  'EcoBug Landscape Consultant Software finds its humble beginnings in an effort to organise and compile landscape data, designing, maintenance and costing. In an attempt to make the process seamless and time-efficient, the concept for the software was conceived to align with professional needs, real-life applications and financial implications.  EcoBug vies to embed sustainability and eco-sensitivity as an underlying yet important quality aiding designers to get the best and environmentally viable solutions.'

export default function About() {
  return (
    <div className='min-h-screen flex flex-col bg-bg'>
      <AppNavbar />

      <main className='flex-1 flex flex-col items-center pt-28 md:pt-32 pb-16 px-4'>
        <h1
          className={`${offbit.className} text-4xl sm:text-5xl md:text-6xl text-ink tracking-widest uppercase font-bold text-center`}
        >
          ABOUT
        </h1>

        <Panel className='w-full max-w-3xl mt-10 p-8 md:p-12'>
          <p className='text-sm md:text-base leading-relaxed text-ink text-justify'>
            {description}
          </p>
        </Panel>
      </main>

      <AppFooter />
    </div>
  )
}
