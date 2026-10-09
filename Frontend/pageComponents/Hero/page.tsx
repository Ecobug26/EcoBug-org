/**
 * Home hero slot — the Figma "Intro + Features section" reserves an empty
 * visual area at the top of the page (empty 742px frame on desktop /
 * 799px on mobile in Page 2) above the OUR PRODUCT block. Renders the
 * spacer with a screen-reader-only h1 for accessibility/SEO.
 */
export default function Hero() {
  return (
    <section
      className='w-full min-h-[480px] sm:min-h-[640px] lg:min-h-[742px] mb-[30px] lg:mb-0'
      aria-label='EcoBug'
    >
      <h1 className='sr-only'>EcoBug — landscaping, designed sustainably</h1>
    </section>
  )
}
