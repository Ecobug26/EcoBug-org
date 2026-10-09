/**
 * Home hero slot — the Figma "Intro + Features section" reserves a visual
 * area at the top of the page (742px on desktop / 640px sm / 480px mobile)
 * above the OUR PRODUCT block. Filled with the main illustration (1366x768),
 * scaled proportionally to the full content width at every screen size.
 */
import Image from 'next/image'

export default function Hero() {
  return (
    <section
      className='w-full pt-32 mb-[30px] lg:mb-0'
      aria-label='EcoBug'
    >
      <h1 className='sr-only'>EcoBug — landscaping, designed sustainably</h1>
      <Image
        src='/images/main_illu.png'
        alt='EcoBug landscaping illustration'
        width={1366}
        height={768}
        priority
        //sizes='100vw'
        className='block w-full h-full'
      />
    </section>
  )
}
