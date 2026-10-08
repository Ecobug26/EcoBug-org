import localFont from 'next/font/local'
import { Radio_Canada_Big, Source_Serif_4 } from 'next/font/google'

/**
 * OffBit — the site-wide pixel typeface (Power Type Foundry).
 * Regular (400) / Bold (700) selectable via Tailwind font-normal / font-bold.
 */
export const offbit = localFont({
  src: [
    { path: '../../public/fonts/OffBit-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../../public/fonts/OffBit-Bold.ttf', weight: '700', style: 'normal' },
  ],
})

/**
 * OffBit Dot Bold — dot-matrix variant used for the ECOBUG wordmarks
 * (navbar logo, careers heading), matching the Figma.
 */
export const offbitDot = localFont({
  src: '../../public/fonts/OffBit-DotBold.ttf',
})

/**
 * "Careers at" serif (Figma: Source Serif Pro 400).
 * Source Serif 4 is the official continuation of Source Serif Pro on
 * Google Fonts — same typeface design.
 */
export const sourceSerif = Source_Serif_4({ subsets: ['latin'] })

/** Footer links (Figma: Radio Canada Big Medium 500) */
export const radioCanadaBig = Radio_Canada_Big({ subsets: ['latin'] })

