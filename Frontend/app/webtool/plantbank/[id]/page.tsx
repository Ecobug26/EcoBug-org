'use client'

import React, { use, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import AppNavbar from '@/components/shared/AppNavbar'
import AppFooter from '@/components/shared/AppFooter'
import { offbit } from '@/components/utils/utils'
import { SearchBar } from '@/components/shared/ui'
import { PlantDisclaimer } from '../PlantBankLibrary'
import { plants } from '../plantsData'
import { PlantAttribute } from '../types'

/**
 * Plant detail — Figma "PLANT BANK" detail screen:
 * green panel with close (X) + search, plant title + subtitle,
 * Common Names row, 3-column attribute grid with MORE pills,
 * growth metrics row, IUCN status pill (bottom-left) and USES box (bottom-right).
 */

interface PlantDetailPageProps {
  params: Promise<{
    id: string
  }>
}

/** Small dark-green "MORE" pill */
function MorePill() {
  return (
    <span className='mt-1 inline-block bg-primary-hover text-panel text-[7px] leading-none font-bold tracking-wide px-2 py-[3px] rounded-full'>
      MORE
    </span>
  )
}

/**
 * One labelled attribute block.
 * - "Family" gets its own style (small green caps label + uppercase value).
 * - Lines containing ":" (e.g. "Colour: Green") are rendered as tiny detail text.
 * - Other lines (e.g. "Terrestrial", "6-12") are rendered as larger, muted values.
 */
function AttributeBlock({ attribute }: { attribute: PlantAttribute }) {
  const isFamily = attribute.heading.toLowerCase() === 'family'
  const hasDetails = attribute.lines.some((line) => line.includes(':'))

  if (isFamily) {
    return (
      <div>
        <h4 className='font-bold text-[13px] tracking-wide uppercase leading-tight text-primary-hover'>
          {attribute.heading}
        </h4>
        {attribute.lines.map((line) => (
          <p key={line} className='text-[15px] uppercase leading-snug text-ink'>
            {line}
          </p>
        ))}
      </div>
    )
  }

  return (
    <div>
      <h4 className='font-medium text-[17px] leading-tight text-ink'>
        {attribute.heading}
      </h4>
      <div className='mt-0.5'>
        {attribute.lines.map((line) => (
          <p
            key={line}
            className={
              hasDetails
                ? 'text-[9px] leading-snug text-ink'
                : 'text-[14px] leading-snug text-ink opacity-70'
            }
          >
            {line}
          </p>
        ))}
      </div>
      {attribute.more && <MorePill />}
    </div>
  )
}

export default function PlantDetailPage({ params }: PlantDetailPageProps) {
  const router = useRouter()
  const { id } = use(params)
  const [search, setSearch] = useState('')

  const plant = plants.find((p) => p.id === id)

  const goBack = () => router.push('/webtool/plantbank')

  const submitSearch = () => {
    const q = search.trim()
    router.push(
      q ? `/webtool/plantbank?q=${encodeURIComponent(q)}` : '/webtool/plantbank'
    )
  }

  return (
    <div className='min-h-screen flex flex-col bg-bg'>
      <AppNavbar />

      <main className='flex-1 flex flex-col items-center pt-28 md:pt-32 pb-16 px-3 sm:px-6'>
        <h1
          className={`${offbit.className} text-4xl sm:text-5xl md:text-6xl text-ink tracking-widest uppercase font-bold text-center`}
        >
          PLANT BANK
        </h1>

        <div className='w-full max-w-5xl mt-8 md:mt-10'>
          {!plant ? (
            <div className='bg-card rounded-[32px] p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.15)] text-center'>
              <p className={`${offbit.className} text-lg font-bold text-ink`}>
                Plant not found
              </p>
              <button
                onClick={goBack}
                className={`${offbit.className} mt-3 text-sm text-primary-hover hover:underline cursor-pointer`}
              >
                ← Back to Plant Bank
              </button>
            </div>
          ) : (
            <div className='bg-[#B3D69A] dark:bg-card rounded-[32px] p-3 sm:p-5 shadow-[0_10px_30px_rgba(0,0,0,0.15)]'>
              {/* Panel header: close + search */}
              <div className='flex items-center justify-between gap-3'>
                <button
                  onClick={goBack}
                  aria-label='Close plant details'
                  className='w-9 h-9 flex items-center justify-center text-ink text-xl hover:bg-panel/40 rounded-full transition-colors cursor-pointer flex-shrink-0'
                >
                  ✕
                </button>

                <SearchBar
                  value={search}
                  onChange={setSearch}
                  onSubmit={submitSearch}
                  onClear={() => {
                    setSearch('')
                    submitSearch()
                  }}
                  className='max-w-[220px]'
                />
              </div>

              <div className='px-1 sm:px-6 pb-3 sm:pb-6'>
                {/* Top: title + attribute grid (left), image collage (right) */}
                <div className='mt-2 flex flex-col lg:flex-row lg:justify-between gap-8'>
                  <div className='min-w-0'>
                    <h2
                      className={`${offbit.className} text-3xl sm:text-4xl md:text-5xl font-bold uppercase text-ink leading-none`}
                    >
                      {plant.scientificName}
                    </h2>
                    <p
                      className={`${offbit.className} text-xl sm:text-2xl uppercase text-ink leading-tight mt-1`}
                    >
                      {plant.subtitle}
                    </p>

                    <p className={`${offbit.className} text-[15px] text-ink mt-5`}>
                      Common Names:
                      <span className='font-bold uppercase ml-2'>
                        {plant.commonNames}
                      </span>
                    </p>

                    {/* 9 blocks in Figma order: Family … Soil Type */}
                    <div className='grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-7 mt-7 sm:max-w-[480px]'>
                      {plant.attributes.slice(0, 9).map((attribute) => (
                        <AttributeBlock
                          key={attribute.heading}
                          attribute={attribute}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Four overlapping photo tiles (centre card on top) — origin.png with varied crops */}
                  <div className='relative w-full max-w-[300px] mx-auto lg:mx-0 lg:mt-1 lg:self-start aspect-[252/196] shrink-0'>
                    <div className='absolute left-0 top-[5%] w-[43%] h-[43%] rounded-[18px] bg-[#d9d9d9] border border-ink overflow-hidden'>
                      <Image
                        src='/images/plant_1_1.png'
                        alt=''
                        fill
                        sizes='150px'
                        className='object-cover object-top'
                        unoptimized
                      />
                    </div>
                    <div className='absolute right-0 top-0 w-[43%] h-[43%] rounded-[18px] bg-[#d9d9d9] border border-ink overflow-hidden'>
                      <Image
                        src='/images/plant_12.png'
                        alt=''
                        fill
                        sizes='150px'
                        className='object-cover object-bottom'
                        unoptimized
                      />
                    </div>
                    <div className='absolute left-[14%] top-[60%] w-[41%] h-[40%] rounded-[18px] bg-[#d9d9d9] border border-ink overflow-hidden'>
                      <Image
                        src='/images/plant_13.png'
                        alt=''
                        fill
                        sizes='150px'
                        className='object-cover object-left'
                        unoptimized
                      />
                    </div>
                    <div className='absolute left-[30%] top-[18%] w-[53%] h-[52%] rounded-[18px] bg-[#d9d9d9] border border-ink overflow-hidden'>
                      <Image
                        src='/images/plant_14.png'
                        alt={plant.scientificName}
                        fill
                        sizes='180px'
                        className='object-cover'
                        unoptimized
                      />
                    </div>
                  </div>
                </div>

                {/* Growth metrics row — content-width columns, not the 3-col grid */}
                <div className='flex flex-wrap gap-x-10 gap-y-4 mt-8'>
                  {plant.attributes.slice(9).map((attribute) => (
                    <AttributeBlock key={attribute.heading} attribute={attribute} />
                  ))}
                </div>

                {/* Bottom row: IUCN (left) + USES (right) */}
                <div className='mt-10 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6'>
                  <div>
                    <h3 className='font-medium text-xl text-ink'>
                      IUCN Conservation Status:
                    </h3>
                    <span
                      className={`${offbit.className} mt-2.5 inline-block bg-warning/85 text-black text-[13px] px-5 py-2 rounded-full`}
                    >
                      {plant.iucnStatus}
                    </span>
                  </div>

                  <div className='w-full lg:w-[38%] lg:min-w-[300px] min-h-[140px] bg-[#b3bd7d] dark:bg-primary/25 border-2 border-ink rounded-[28px] px-6 py-5'>
                    <h3
                      className={`${offbit.className} underline underline-offset-2 font-bold text-[15px] text-ink`}
                    >
                      USES:
                    </h3>
                    <p className='text-[13px] leading-relaxed text-ink mt-2'>
                      {plant.uses}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <PlantDisclaimer className='mt-6' />
      </main>

      <AppFooter />
    </div>
  )
}