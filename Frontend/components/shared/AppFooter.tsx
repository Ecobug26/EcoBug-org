import Link from 'next/link'
import Image from 'next/image'
import { radioCanadaBig } from '@/components/utils/utils'

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
        dots.push({
          cx: x + 0.5,
          cy: y + 0.5,
        })
      }
    })
  })

  return (
    <svg
      viewBox={`0 0 ${cols} ${rows}`}
      className="block w-[101.47%] h-auto -ml-[0%] overflow-visible text-[#2B600C]"
      fill="currentColor"
      preserveAspectRatio="none"
      aria-hidden
    >
      {dots.map((dot, i) => (
        <circle
          key={i}
          cx={dot.cx}
          cy={dot.cy}
          r={DOT_R}
        />
      ))}

      <span className="sr-only">ECOBUG</span>
    </svg>
  )
}

/*
 const GLYPHS: Record<string, string[]> = {
  E: [
    '111111111',
    '111111111',
    '110000000',
    '110000000',
    '110000000',
    '111111110',
    '111111110',
    '110000000',
    '110000000',
    '110000000',
    '110000000',
    '111111111',
  ],

  C: [
    '011111100',
    '111111110',
    '110000110',
    '110000111',
    '100000011',
    '100000000',
    '100000000',
    '100000000',
    '100000011',
    '110000111',
    '110000110',
    '111111110',
  ],

  O: [
    '00111110000',
    '01111111000',
    '11100011100',
    '11000001100',
    '11000001110',
    '10000000110',
    '10000000110',
    '10000000110',
    '11000001110',
    '11000001100',
    '11100011100',
    '01111111000',
  ],

  B: [
    '111111000',
    '111111100',
    '100001110',
    '100000110',
    '100000110',
    '100001100',
    '111111100',
    '111111110',
    '100000111',
    '100000011',
    '100000111',
    '111111110',
  ],

  U: [
    '11000001',
    '11000001',
    '11000001',
    '11000001',
    '11000001',
    '11000001',
    '11000001',
    '11000001',
    '11000001',
    '11000001',
    '11100011',
    '01111111',
  ],

  G: [
    '00111111100',
    '01111111110',
    '11100000111',
    '11000000011',
    '11000000011',
    '11000000000',
    '11000011111',
    '11000011111',
    '11000000111',
    '11000001111',
    '11100011111',
    '01111111011',
  ],
}
const GLYPH_W = 7
const GLYPH_H = 12
const GAP = 0
const DOT_R = 0.56

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
        if (row[x] === '1') {
          dots.push({
            cx: xOffset + x + 0.5,
            cy: y + 0.5,
          })
        }
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
      className='block w-full h-auto overflow-visible text-[#2B600C]'
      fill='currentColor'
      aria-hidden
    >
      {WORDMARK.dots.map((d, i) => (
        <circle key={i} cx={d.cx} cy={d.cy} r={DOT_R} />
      ))}
    </svg>
  )
}*/

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
    <footer className='mt-auto overflow-hidden bg-[#5DD34E] dark:bg-black'>
      {/* Figma Footer component: content 1240 (pad 20), links 20px Radio
          Canada Big, leaf band 1240x280, full-width dot wordmark. */}
      <div className='mx-auto w-full max-w-[1280px] px-5 pt-5'>
        <div className='flex flex-wrap items-center justify-between gap-x-6 gap-y-3'>
          <nav aria-label='Footer' className='flex flex-wrap gap-x-5 gap-y-2'>
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

        {/* Leaf-texture band (Figma "footer light/dark 1", 1240x280) */}
        <div className='mt-5 select-none'>
          <Image src='/images/footer-band-light.png' alt='' aria-hidden width={2480} height={560} className='block w-full h-auto dark:hidden' />
          <Image src='/images/footer-band-dark.png' alt='' aria-hidden width={2480} height={560} className='hidden dark:block w-full h-auto' />
        </div>

        {/* Wordmark: Figma gap 32 above, full content width, #2B600C;
            negative % margin crops the bottom dot row in proportion. */}
        <div className='mt-8 -mb-[-1%] select-none'>
          <div className='w-full'>
          <DotWordmark />
          <span className='sr-only'>ECOBUG</span>
        </div>
        </div>
      </div>
    </footer>
  )
}