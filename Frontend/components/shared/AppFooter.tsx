import Link from 'next/link'
import { pixelifySans } from '@/components/utils/utils'

/**
 * Global footer (server component).
 *
 * Light mode: bright green bar, dark-green dots, dark links, black icons.
 * Dark mode:  black bar, green dots, dark-green links, white icons.
 *
 * Responsive: content and wordmark share one centered container that is
 * capped in width, so the wordmark fills the screen on phones/tablets but
 * stops growing on laptops/desktops instead of becoming huge.
 */

const LINKS = [
  { label: 'Buy', href: '/products' },
  { label: 'Webtool', href: '/webtool' },
  { label: 'Blog', href: '/blog' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact Us', href: '#' },
  { label: 'About', href: '/about' },
]

/* ---------- Dot-matrix font: 7 cols x 10 rows, 2-dot strokes ---------- */

const GLYPHS: Record<string, string[]> = {
  E: ['1111111', '1111111', '1100000', '1100000', '1111100', '1111100', '1100000', '1100000', '1111111', '1111111'],
  C: ['1111111', '1111111', '1100011', '1100000', '1100000', '1100000', '1100000', '1100011', '1111111', '1111111'],
  O: ['1111111', '1111111', '1100011', '1100011', '1100011', '1100011', '1100011', '1100011', '1111111', '1111111'],
  B: ['1111110', '1111111', '1100011', '1100011', '1111110', '1111110', '1100011', '1100011', '1111111', '1111110'],
  U: ['1100011', '1100011', '1100011', '1100011', '1100011', '1100011', '1100011', '1100011', '1111111', '1111111'],
  G: ['1111111', '1111111', '1100011', '1100000', '1100000', '1100111', '1100111', '1100011', '1111111', '1111111'],
}

const GLYPH_W = 7
const GLYPH_H = 10
const GAP = 1
const DOT_R = 0.56 // > 0.5 so neighbouring dots overlap, like the Figma

function buildDots(text: string) {
  const letters = text.toUpperCase().split('')
  const cols = letters.length * GLYPH_W + (letters.length - 1) * GAP
  const dots: { cx: number; cy: number }[] = []

  letters.forEach((ch, li) => {
    const glyph = GLYPHS[ch]
    if (!glyph) return
    const xOffset = li * (GLYPH_W + GAP)
    glyph.forEach((row, y) => {
      for (let x = 0; x < row.length; x++) {
        if (row[x] === '1') dots.push({ cx: xOffset + x + 0.5, cy: y + 0.5 })
      }
    })
  })

  return { cols, dots }
}

const WORDMARK = buildDots('ECOBUG')

function DotWordmark() {
  return (
    <svg
      viewBox={`0 0 ${WORDMARK.cols} ${GLYPH_H}`}
      className='block w-full h-auto overflow-visible text-[#285f0a] dark:text-[#3f7d0b]'
      fill='currentColor'
      aria-hidden
    >
      {WORDMARK.dots.map((d, i) => (
        <circle key={i} cx={d.cx} cy={d.cy} r={DOT_R} />
      ))}
    </svg>
  )
}

/* ---------- Icons ---------- */

const ICON = 'w-5 h-5 lg:w-6 lg:h-6'

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
    <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' className={ICON} aria-hidden>
      <rect x='2.5' y='5' width='19' height='14' rx='2' />
      <path d='m3 6.5 9 6.5 9-6.5' />
    </svg>
  )
}

/* ---------- Footer ---------- */

export default function AppFooter() {
  return (
    <footer className='mt-auto overflow-hidden bg-[#58D048] dark:bg-black'>
      {/* One shared container keeps links, icons and wordmark aligned
          and stops the wordmark from growing past ~1100px. */}
      <div className='mx-auto w-full max-w-[1100px] px-4 pt-4 sm:px-6 sm:pt-5 lg:pt-6'>
        <div className='flex flex-wrap items-start justify-between gap-x-6 gap-y-3'>
          <nav aria-label='Footer' className='flex flex-wrap gap-x-4 gap-y-2 sm:gap-x-5 lg:gap-x-7'>
            {LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className={`${pixelifySans.className} text-[11px] sm:text-xs lg:text-sm tracking-wide text-[#183f06] dark:text-[#2f6a0a] hover:underline underline-offset-4`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className='flex items-center gap-4 sm:gap-5 lg:gap-6 text-black dark:text-white'>
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

        {/* Wordmark: gap above is fixed per breakpoint (not vw-based);
            negative % margin crops the bottom dot row in proportion. */}
        <div className='mt-10 sm:mt-14 lg:mt-16 -mb-[-1%] select-none'>
          <div className='w-full lg:w-[75%] lg:mx-auto'>
          <DotWordmark />
          <span className='sr-only'>ECOBUG</span>
        </div>
        </div>
      </div>
    </footer>
  )
}