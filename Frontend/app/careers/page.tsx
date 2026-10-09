import type { Metadata } from 'next'
import AppNavbar from '@/components/shared/AppNavbar'
import AppFooter from '@/components/shared/AppFooter'
import { offbit, offbitDot, sourceSerif } from '@/components/utils/utils'
import { jobs } from '@/data/jobs'
import type { Job } from '@/types/job'

export const metadata: Metadata = {
  title: 'Careers | EcoBug',
  description:
    'Join the EcoBug team — open roles in design, engineering and data science as we build sustainable landscape consultant software.',
}

/**
 * Careers page — matches Figma ECOBUG1 frames 168:2731 (light),
 * 195:3613 (dark) and 312:9632 (mobile 428w).
 * Desktop: intro pad 140/120/20, header 1030w (serif 80 + dot ECOBUG 128,
 * gap -8), listings 820w gap 16, cards r16 pad40 (616 text col + 100x38
 * button, gap 24). Mobile: pad top 75, header 64/96, card row is an 80px
 * title column + 122 gap + button, with the description (15/18) below.
 */
const APPLY_EMAIL = 'connect.ecobug@gmail.com'

function JobCard({ job }: { job: Job }) {
  return (
    <article className='w-full rounded-2xl p-6 sm:p-10 bg-[#97C974] dark:bg-[#253B25] flex flex-col gap-4 sm:grid sm:grid-cols-[1fr_100px] sm:gap-x-6 lg:grid-cols-[616px_100px] sm:gap-y-6 transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_10px_24px_rgba(0,0,0,0.15)] overflow-x-clip'>
      {/* Role + details (Figma "Role + Details": gap 8) */}
      <div className='flex flex-col gap-2 min-w-0'>
        <h2
          className={`${offbit.className} font-bold text-[20px] leading-[20px] tracking-[-0.02em] text-[#1B2B1E] dark:text-[#EAF2E4]`}
        >
          {job.title}
        </h2>

        {/* Meta data: type · location (Futura PT 14 + Geist Mono separator) */}
        <div className='flex gap-2 flex-wrap font-geist-sans text-[14px] leading-[14px] text-[#577F29] dark:text-[#A8C686]'>
          <span>{job.type}</span>
          <span className='font-geist-mono text-[#6C6C6C]'>·</span>
          <span>{job.location}</span>
        </div>
      </div>

      {/* Button secondary: 100x38 black, Geist Mono 500/14 */}
      <a
        href={`mailto:${APPLY_EMAIL}?subject=${encodeURIComponent(
          `Application: ${job.title}`
        )}`}
        aria-label={`View role: ${job.title}`}
        className='justify-self-start w-[100px] h-[38px] inline-flex items-center justify-center bg-black text-white font-geist-mono font-medium text-[14px] leading-[14px] select-none cursor-pointer transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_5px_0_rgba(0,0,0,0.35)] active:translate-y-0.5 active:shadow-[0_2px_0_rgba(0,0,0,0.35)] hover:opacity-95'
      >
        View role
      </a>

      <p className='sm:col-span-2 lg:col-span-1 font-geist-sans text-[15px] leading-[18px] lg:text-[20px] lg:leading-[24px] tracking-[-0.04em] text-[#40543F] dark:text-[#9BAE95]'>
        {job.description}
      </p>
    </article>
  )
}

export default function Careers() {
  return (
    <div className='min-h-screen flex flex-col bg-[#E9F5E0] dark:bg-[#102112]'>
      <AppNavbar />

      <main className='flex-1 flex flex-col items-center gap-10 px-5 pt-[75px] pb-[120px] lg:pt-[140px]'>
        {/* Header text: serif over dot wordmark, Figma gap -8 */}
        <header className='flex flex-col items-center text-center w-full max-w-[1030px]'>
          <span
            className={`${sourceSerif.className} text-[64px] lg:text-[80px] leading-none tracking-[-0.04em] text-black dark:text-[#EAF2E4]`}
          >
            Careers at
          </span>
          <span
            className={`${offbitDot.className} -mt-2 text-[96px] lg:text-[128px] leading-[1.27] tracking-[-0.01em] uppercase text-black dark:text-[#EAF2E4] select-none`}
          >
            EcoBug
          </span>
        </header>

        {/* Job listings: 820w, gap 16 */}
        <section
          aria-label='Open roles'
          className='w-full max-w-[820px] flex flex-col gap-4'
        >
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </section>
      </main>

      <AppFooter />
    </div>
  )
}

