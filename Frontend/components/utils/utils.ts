import localFont from 'next/font/local'
import { Doto } from 'next/font/google'

export const pixelifySans = localFont({
  src: '../../public/fonts/pixelifySans.ttf',
})

/**
 * Doto — dot-matrix display font used for the giant footer wordmark
 * (matches the Figma footer where letters are drawn from round dots).
 * Variable axes: wght + ROND (roundness); controlled via
 * font-variation-settings where it is used.
 */
export const doto = Doto({
  subsets: ['latin'],
  axes: ['ROND'],
})
