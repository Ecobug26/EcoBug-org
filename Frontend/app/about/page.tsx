import AppNavbar from '@/components/shared/AppNavbar'
import AppFooter from '@/components/shared/AppFooter'
import { MonoButton } from '@/components/shared/ui'
import { offbit, offbitDot, sourceSerif } from '@/components/utils/utils'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | EcoBug',
  description:
    'Learn about EcoBug — our mission, our origin, our founding members, and the team behind the landscape consultant software.',
}

const mission: string =
  'EcoBug Landscape Consultant Software finds its humble beginnings in an effort to organize and compile landscape data, designing, maintenance and costing. In an attempt to make the process seamless and time-efficient, the concept for the software was conceived to align with professional needs, real-life applications and financial implications. EcoBug vies to embed sustainability and eco-sensitivity as an underlying yet important quality aiding designers to get the best and environmentally viable solutions.'

type Founder = { role: string; name: string; story: string }

const founders: Founder[] = [
  {
    role: 'Founder',
    name: 'Sarayu Raghavendra',
    story:
      'A landscape enthusiast who believes that ecology governs architecture, not just design. She considers that the potential of a landscape could be harnessed in any project, enhancing sustainability and balance. She oversees the overall functioning and organisation of the start-up, regulates research, technology and financial matters.',
  },
  {
    role: 'Co-Founder',
    name: 'Shriya Preetysuman',
    story:
      "'Where did the fireflies go?' A question that constantly lingers in her head, driving her to think not only about the consequences of building but a way to improve designs for nature. She supervises the research and development department within the scope of online landscape services. She attempts to effectively coalesce on-site requisites with website tools offered.",
  },
  {
    role: 'Co-founder',
    name: 'Niharika Suvarna',
    story:
      'Extensively believing in the intersection and co-existence of technology and architecture, this co-founder garnered a penchant for the former at a young age. She manages the research related to plant data, repository and delegation of tasks, while also directing the technological department.',
  },
  {
    role: 'Chief Technological Officer',
    name: 'Bhavana Kandula',
    story:
      'Understanding that landscape architecture unlocks the potential of balance and colour in building architecture, the CTO aspires to show this very vision of the company to its users and patrons. She manages the technological department, working of website and software development, UI UX and communications.',
  },
]

const foundersRow2: Founder[] = [
  {
    role: 'Chief Operational Officer',
    name: 'Suryakanth Ravikanth',
    story:
      ' A person guided by principles and actions of business and start-ups, he vies to integrate the subject of landscaping into it. With the role of Operating Officer, he oversees hiring, work management, networking and progress of the company.',
  },
  {
    role: 'Chief Financial Officer',
    name: 'Shyamanth Kumar C K',
    story:
      'With a vision to help EcoBug grow sustainably and financially, he ensures monetary consistency and cash-flow tracking. He looks into targets, valuations and projections with appropriate strategies, endeavouring to keep the company afloat.',
  },
  {
    role: 'Chief Marketing Officer',
    name: 'K Siri Prerana',
    story:
      'An environmentalist who believes that nature impacts lives and spaces beyond psychological and physiological ways, she bids to convey our vision and mission to others. She actively engages and ensures outreach, branding and adequate social media presence.',
  },
  {
    role: 'Chief Creative Office',
    name: 'Prisha Banotu',
    story:
      'With a fondness of incorporating greenery into designed spaces, she values embedding real ecological layers into landscaping rather than superficial aesthetics. With this value, she leads the design and creative department, supervising curation of posts, branding and imaging of the start-up and well as meaningful presentations.',
  },
]

/** Figma 244:3294 — "ABOUT US", OffBit Bold 128/128, #1B2B1E / #EAF2E4 */
function AboutHeading() {
  return (
    <div className='w-full max-w-[1280px] mx-auto px-5 pt-[176px] pb-[30px]'>
      <h1
        className={`${offbitDot.className} text-[#1B2B1E] dark:text-[#EAF2E4] text-center text-[64px] leading-none sm:text-[96px] md:text-[128px] tracking-[-0.04em]`}
      >
        ABOUT US
      </h1>
    </div>
  )
}

/**
 * Figma 244:3297/244:3304 — checkerboard story rows, 1280x800 each.
 * Half image panel (#D9D9D9 placeholder), half copy block:
 * Futura SemiBold 20/24 label (#1B2B1E / #EAF2E4) + OffBit Bold 20/21.6
 * body (#40543F / #9BAE95). Rows alternate sides, both stack on mobile.
 */
function StoryRow({
  eyebrow,
  imageFirst,
  imageLabel,
  imageSrc,
}: {
  eyebrow: string
  imageFirst: boolean
  imageLabel: string
  imageSrc?: string
}) {
  const image = (
    <div
      className='relative w-full md:w-1/2 min-h-[320px] md:min-h-[800px] bg-[#D9D9D9] flex items-center justify-center overflow-hidden'
      role='img'
      aria-label={imageLabel}
    >

      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={imageLabel}
          fill
          className='object-cover'
          sizes='(max-width: 768px) 100vw, 50vw'
        />
      ) : (
        <span className={`${offbit.className} text-black/30 text-sm tracking-widest uppercase`}>
          {imageLabel}
        </span>
      )}
    </div>
  )
  const copy = (
    <div className='w-full md:w-1/2 flex items-center justify-center px-5 py-14 md:py-0'>
      <div className='w-full max-w-[499px] flex flex-col gap-4'>
        <p className='font-futura font-semibold text-[20px] leading-[24px] text-[#1B2B1E] dark:text-[#EAF2E4]'>
          {eyebrow}
        </p>
        <p className={`${offbit.className} font-bold text-[20px] leading-[21.6px] tracking-[0.01em] text-[#40543F] dark:text-[#9BAE95]`}>
          {mission}
        </p>
      </div>
    </div>
  )
  return (
    <section className='w-full max-w-[1280px] mx-auto flex flex-col md:flex-row'>
      {imageFirst ? (<>{image}{copy}</>) : (<>{copy}{image}</>)}
    </section>
  )
}

function FounderCard({ founder }: { founder: Founder }) {
  return (
    <article className='flex gap-4'>
      <div
        className='w-[140px] sm:w-[216px] shrink-0 self-stretch min-h-[220px] bg-[#D9D9D9] rounded-3xl flex items-center justify-center text-center p-2'
        role='img'
        aria-label={`Portrait of ${founder.name}`}
      >
        <span className={`${offbit.className} text-black/30 text-xs tracking-widest uppercase`}>
          {founder.name}
        </span>
      </div>
      <div className='flex-1 min-w-0 flex flex-col gap-3.5 py-1'>
        <div className='flex flex-col gap-2'>
          <p className='font-futura font-semibold text-[20px] leading-tight text-[#214B02] dark:text-[#D2FFB0]'>
            {founder.role}
          </p>
          <h3 className={`${offbit.className} text-[28px] leading-[1.1] sm:text-[36px] md:text-[45px] md:leading-[55px] text-[#1B2B1E] dark:text-[#EAF2E4] break-words tracking-[-0.04em] text-ink tracking-widest uppercase font-bold`}>
            {founder.name}
          </h3>
        </div>
        <p className='font-futura text-[16px] md:text-[17px] leading-[20.4px] text-[#40543F] dark:text-[#9BAE95]'>
          {founder.story}
        </p>
      </div>
    </article>
  )
}

/**
 * Figma 284:3572 — founders grid, gap 45, rows of two cards.
 * "ABOUT OUR FOUNDING MEMBERS" OffBit Bold 80/96 sits between the rows.
 * Single column on mobile, exact two-up from md.
 */
function Founders() {
  return (
    <section className='w-full max-w-[1280px] mx-auto px-5 md:px-[37px] py-12 md:py-16 flex flex-col gap-[45px]'>
      <h2 className={`${offbitDot.className} w-full max-w-[657px] mx-auto text-[40px] leading-[1.2] sm:text-[60px] md:text-[80px] md:leading-[96px] text-[#1B2B1E] dark:text-[#EAF2E4] text-center tracking-[-0.04em]`}>
        About our
        <br />
        founding members
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-[45px]'>
        {founders.map((f) => (
          <FounderCard key={f.name} founder={f} />
        ))}
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-[45px]'>
        {foundersRow2.map((f) => (
          <FounderCard key={f.name} founder={f} />
        ))}
      </div>
    </section>
  )
}
/**
 * Figma 244:3376 — "Meet the team" table, pad 78/20.
 * Header OffBit Bold 56, labels Geist Mono 14, rows OffBit 20 / Futura 20 /
 * Source Serif 20, rows in #40543F / #9BAE95.
 */
function TeamTable() {
  const rows = [
    {
      name: 'Ginne Sai Thanooj Reddy',
      title: 'Tech Lead',
      email: 'thanoojginne@gmail.com',
      key: 'thanooj',
    },
    {
      name: 'Bollam Rahul Patel',
      title: 'Backend Developer',
      email: 'rahulbollam@gmail.com',
      key: 'rahul',
    },
    {
      name: 'Zeeshan Hyder Kurup',
      title: 'Frontend Intern',
      email: 'zeeshankurup@gmail.com',
      key: 'zeeshan',
    },
    {
      name: 'Advaith',
      title: 'UI/UX Designer',
      email: 'Advaithsz@gmail.com',
      key: 'advaith',
    },]
  return (
    <section className='w-full max-w-[1280px] mx-auto px-5 py-[78px]'>
      <h2 className={`${offbitDot.className} text-[40px] leading-none sm:text-[48px] md:text-[56px] text-[#1B2B1E] dark:text-[#EAF2E4] mb-8 tracking-[-0.04em]`}>
        Meet the team
      </h2>
      <div className='w-full overflow-x-auto'>
        <div className='min-w-[640px] flex flex-col gap-2.5'>
          <div className='grid grid-cols-3 gap-4 font-geist-mono text-[14px] leading-[14px] text-[#1B2B1E] dark:text-[#EAF2E4]'>
            <span>Name</span>
            <span>Title</span>
            <span>Contact</span>
          </div>
          {rows.map((r) => (
            <div key={r.key} className='grid grid-cols-3 gap-4 items-baseline'>
              <span className={`${offbit.className} font-bold text-[20px] leading-[20px] text-[#40543F] dark:text-[#9BAE95]`}>
                {r.name}
              </span>
              <span className='font-futura text-[20px] leading-[23px] text-[#40543F] dark:text-[#9BAE95]'>
                {r.title}
              </span>
              <span className={`${sourceSerif.className} text-[20px] leading-[23px] text-[#40543F] dark:text-[#9BAE95] break-all`}>
                {r.email}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/** Figma 244:3389 — "Contact Us" OffBit Bold 96 + black MonoButton w/ bullet. */
function AboutCta() {
  return (
    <section className='w-full max-w-[1280px] mx-auto px-5 py-[120px] flex flex-col items-center gap-8'>
      <h2 className={`${offbitDot.className} text-[48px] leading-none sm:text-[72px] md:text-[96px] text-[#000000] dark:text-[#EAF2E4] text-center tracking-[-0.04em]`}>
        Contact Us
      </h2>
      <MonoButton
        href='/contact'
        bullet
        className='font-geist-mono font-medium text-[14px] leading-[14px] px-6 py-4'
        ariaLabel='Go to the Contact page'
      >
        Contact Page
      </MonoButton>
    </section>
  )
}

export default function About() {
  return (
    <div className='min-h-screen flex flex-col bg-[#E9F5E0] dark:bg-[#102112]'>
      <AppNavbar />
      <main className={`${sourceSerif.variable} flex-1 flex flex-col`}>
        <AboutHeading />
        <StoryRow
          eyebrow='Our origin'
          imageFirst={true}
          imageLabel='Variegated monstera leaves'
          imageSrc='/Frontend/public/images/origin.png'
        />
        <Founders />
        <TeamTable />
        <AboutCta />
      </main>
      <AppFooter />
    </div>
  )
}