import type { Metadata } from 'next'
import AppNavbar from '@/components/shared/AppNavbar'
import AppFooter from '@/components/shared/AppFooter'
import { pixelifySans } from '@/components/utils/utils'
import { jobs } from '@/data/jobs'
import type { Job } from '@/types/job'

export const metadata: Metadata = {
  title: 'Careers | EcoBug',
  description:
    'Join the EcoBug team — open roles in design, engineering and data science as we build sustainable landscape consultant software.',
}

const APPLY_EMAIL = 'connect.ecobug@gmail.com'

function JobCard({ job }: { job: Job }) {
  return (
    <article className='bg-card rounded-2xl px-6 py-5 md:px-8 md:py-6 shadow-[0_6px_18px_rgba(0,0,0,0.10)] transition-transform hover:-translate-y-0.5'>
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
        <div>
          <h2 className={`${pixelifySans.className} text-lg md:text-xl font-bold text-ink`}>
            {job.title}
          </h2>
          <p className='text-xs md:text-sm text-ink-muted mt-1'>
            {job.type} <span aria-hidden>·</span> {job.location}
          </p>
        </div>

        <a
          href={`mailto:${APPLY_EMAIL}?subject=${encodeURIComponent(
            `Application: ${job.title}`
          )}`}
          className={`${pixelifySans.className} inline-flex items-center justify-center bg-ink text-bg text-xs md:text-sm tracking-widest px-5 py-2 rounded-md self-start sm:self-auto shadow-[0_4px_0_rgba(0,0,0,0.35)] hover:-translate-y-0.5 hover:shadow-[0_6px_0_rgba(0,0,0,0.35)] active:translate-y-0.5 active:shadow-[0_2px_0_rgba(0,0,0,0.35)] transition-all cursor-pointer select-none whitespace-nowrap`}
          aria-label={`View role: ${job.title}`}
        >
          View role
        </a>
      </div>

      <p className='text-xs md:text-sm leading-relaxed text-ink/90 mt-3 max-w-2xl'>
        {job.description}
      </p>
    </article>
  )
}

export default function Careers() {
  return (
    <div className='min-h-screen flex flex-col bg-bg'>
      <AppNavbar />

      <main className='flex-1 flex flex-col items-center pt-28 md:pt-32 pb-16 px-4'>
        <h1 className='text-center'>
          <span className='block font-serif text-4xl sm:text-5xl md:text-6xl text-ink'>
            Careers at
          </span>
          <span
            className={`block ${pixelifySans.className} text-4xl sm:text-5xl md:text-6xl text-ink tracking-widest uppercase font-bold mt-1`}
          >
            EcoBug
          </span>
        </h1>

        <section
          aria-label='Open roles'
          className='w-full max-w-3xl mt-10 flex flex-col gap-4'
        >
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </section>

        <p className='text-xs md:text-sm text-ink-muted mt-8 text-center max-w-md'>
          Don&apos;t see your role? Write to us at{' '}
          <a
            href={`mailto:${APPLY_EMAIL}?subject=${encodeURIComponent('Application: General')}`}
            className='text-primary-hover underline underline-offset-4 hover:opacity-80'
          >
            {APPLY_EMAIL}
          </a>{' '}
          — we are always looking for passionate people.
        </p>
      </main>

      <AppFooter />
    </div>
  )
}
