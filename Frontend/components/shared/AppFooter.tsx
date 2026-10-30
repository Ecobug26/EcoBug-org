import Link from 'next/link'
import Image from 'next/image'
import { radioCanadaBig } from '@/components/utils/utils'

const LINKS = [
  { label: 'Buy', href: '/products' },
  { label: 'Webtool', href: '/webtool' },
  { label: 'Blog', href: '/blog' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'About', href: '/about' },
]

/* ---------- Dot-matrix font ---------- */
const MATRIX = [
  '111111111001111110000001111100001111111100001100000110001111111000',
  '111111111011111111000011111110001111111110001100000110011111111100',
  '110000000011000011000111000111001100000111001100000110111000001110',
  '110000000111000011100110000011001100000011001100000110110000000110',
  '110000000110000001101110000011101100000011001100000110110000000110',
  '111111110110000000001100000001101100000110001100000110110000000000',
  '111111110110000000001100000001101111111110001100000110110000111110',
  '110000000110000000001100000001101111111111001100000110110000111110',
  '110000000110000001101110000011101100000011101100000110110000001110',
  '110000000111000011100110000011001100000001101100000110110000011110',
  '110000000011000011000111000111001100000011101110001110111000111110',
  '111111111011111111000011111110001111111111000111111100011111110110',
]

const DOT_R = 0.54

function DotWordmark() {
  const rows = MATRIX.length
  const cols = MATRIX[0].length
  const dots: { cx: number; cy: number }[] = []

  MATRIX.forEach((row, y) => {
    row.split('').forEach((value, x) => {
      if (value === '1') {
        dots.push({ cx: x + 0.5, cy: y + 0.5 })
      }
    })
  })

  return (
    <svg
      viewBox={`0 0 ${cols} ${rows}`}
      className="block w-full h-auto overflow-visible text-[#2B600C]"
      fill="currentColor"
      preserveAspectRatio="none"
      aria-hidden
    >
      {dots.map((dot, i) => (
        <circle key={i} cx={dot.cx} cy={dot.cy} r={DOT_R} />
      ))}
    </svg>
  )
}

/* ---------- Icons ---------- */
const ICON = 'w-[35px] h-[35px]'
const MAIL_ICON = 'w-[54px] h-[38px]'

function InstagramIcon() {
  return (
    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' className={ICON} aria-hidden>
      <rect x='2.5' y='2.5' width='19' height='19' rx='5' />
      <circle cx='12' cy='12' r='4.5' />
      <circle cx='17.5' cy='6.5' r='1' fill='currentColor' stroke='none' />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg viewBox='0 0 24 24' fill='currentColor' className={ICON} aria-hidden>
      <path d='M4.98 3.5a2.5 2.5 0 1 1-.02 5 2.5 2.5 0 0 1 .02-5zM3 9h4v12H3zM9.5 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.5c0-1.3-.02-3-1.83-3-1.83 0-2.11 1.43-2.11 2.9V21h-4z' />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' className={MAIL_ICON} aria-hidden>
      <rect x='2.5' y='5' width='19' height='14' rx='2' />
      <path d='m3 6.5 9 6.5 9-6.5' />
    </svg>
  )
}

/* ---------- Footer ---------- */
export default function AppFooter() {
  return (
    <footer className='mt-auto w-full bg-[#5DD34E] dark:bg-black overflow-hidden'>
      
      {/* Increased max-w from 1280px to 1600px to reduce side gaps */}
      <div className='mx-auto w-full max-w-[1600px] px-4 md:px-8 pt-6 pb-2'>
        
        {/* Top Links & Icons */}
        <div className='flex flex-col sm:flex-row flex-wrap items-center justify-between gap-x-6 gap-y-4 text-center sm:text-left'>
          <nav aria-label='Footer' className='flex flex-wrap justify-center sm:justify-start gap-x-5 gap-y-2'>
            {LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className={`${radioCanadaBig.className} font-medium text-base lg:text-[20px] leading-5 tracking-[-0.02em] text-[#255509] hover:underline underline-offset-4`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className='flex items-center gap-9 text-black dark:text-white'>
            <a href='https://instagram.com' target='_blank' rel='noreferrer' aria-label='Instagram' className='hover:opacity-70 transition-opacity'>
              <InstagramIcon />
            </a>
            <a href='https://linkedin.com' target='_blank' rel='noreferrer' aria-label='LinkedIn' className='hover:opacity-70 transition-opacity'>
              <LinkedInIcon />
            </a>
            <a href='mailto:connect.ecobug@gmail.com' aria-label='Email us' className='hover:opacity-70 transition-opacity'>
              <MailIcon />
            </a>
          </div>
        </div>

        {/* Leaf-texture band */}
        <div className='mt-6 select-none w-full'>
          <Image src='/images/footer-band-light.png' alt='' aria-hidden width={2480} height={560} className='block w-full h-auto dark:hidden' />
          <Image src='/images/footer-band-dark.png' alt='' aria-hidden width={2480} height={560} className='hidden dark:block w-full h-auto' />
        </div>

        {/* Wordmark */}
        <div className='mt-8 select-none w-full'>
          <DotWordmark />
          <span className='sr-only'>ECOBUG</span>
        </div>

      </div>
    </footer>
  )
}