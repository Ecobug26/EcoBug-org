'use client'

import React, { use, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import AppNavbar from '@/components/shared/AppNavbar'
import AppFooter from '@/components/shared/AppFooter'
import { offbit } from '@/components/utils/utils'
import { SearchBar, LoadingState } from '@/components/shared/ui'
import { Plant, PlantAttribute } from '../types'

interface PlantDetailPageProps {
  params: Promise<{
    id: string
  }>
}

function MorePill() {
  return (
    <span className='mt-1 inline-block bg-primary-hover text-panel text-[7px] leading-none font-bold tracking-wide px-2 py-[3px] rounded-full'>
      MORE
    </span>
  )
}

function AttributeBlock({ attribute }: { attribute: PlantAttribute }) {
  const isFamily = attribute.heading.toLowerCase() === 'family'
  const hasLines = attribute.lines && attribute.lines.length > 0
  const hasDetails = attribute.lines?.some((line) => line.includes(':')) ?? false

  if (!hasLines) {
    return (
      <div>
        <h4 className='font-bold text-[13px] tracking-wide uppercase leading-tight text-primary-hover'>
          {attribute.heading}
        </h4>
        <p className='text-[14px] leading-snug text-ink opacity-50 italic'>
          Data Not Found
        </p>
      </div>
    )
  }

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
  const [plant, setPlant] = useState<Plant | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!id) return
    let cancelled = false

    async function loadPlant() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/api/plants/${encodeURIComponent(id)}`,
          { headers: { 'Content-Type': 'application/json' } }
        )
        if (res.status === 404) {
          if (!cancelled) setPlant(null)
        } else if (!res.ok) {
          throw new Error('Failed to load plant')
        } else {
          const data = (await res.json()) as Plant
          if (!cancelled) setPlant(data)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error('Failed to load plant'))
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadPlant()
    return () => {
      cancelled = true
    }
  }, [id])

  const goBack = () => router.push('/webtool/plantbank')

  const submitSearch = () => {
    const q = search.trim()
    router.push(
      q ? `/webtool/plantbank?q=${encodeURIComponent(q)}` : '/webtool/plantbank'
    )
  }

  return (
    <div className='min-h-screen flex flex-col dark:bg-[#102112]'>
      <AppNavbar />

      <main className='flex-1 flex flex-col items-center pt-28 md:pt-32 pb-16 px-3 sm:px-6'>
        <h1
          className={`${offbit.className} text-4xl sm:text-5xl md:text-6xl text-ink tracking-widest uppercase font-bold text-center`}
        >
          PLANT BANK
        </h1>

        <div className='w-full max-w-5xl mt-8 md:mt-10'>
          {loading ? (
            <div className='flex justify-center py-10'>
              <LoadingState label='Loading plant...' />
            </div>
          ) : error || !plant ? (
            <div className='bg-card rounded-[32px] p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.15)] text-center'>
              <p className={`${offbit.className} text-lg font-bold text-ink`}>
                {error ? 'Failed to load plant' : 'Plant not found'}
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
              
              {/* Panel header: X on the left, Search on the right */}
              <div className='flex items-center justify-between w-full'>
                <button
                  onClick={goBack}
                  aria-label='Close plant details'
                  className='w-10 h-10 flex items-center justify-center text-black font-bold text-2xl hover:bg-black/10 rounded-full transition-colors cursor-pointer flex-shrink-0 z-10'
                >
                  ✕
                </button>

                <div className='flex-shrink-0'>
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
              </div>

              <div className='px-1 sm:px-6 pb-3 sm:pb-6'>
                <div className='mt-6 flex flex-col lg:flex-row lg:justify-between gap-8'>
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

                    <div className='grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-7 mt-7 sm:max-w-[480px]'>
                      {plant.attributes && plant.attributes.length > 0 ? (
                        plant.attributes.slice(0, 9).map((attribute) => (
                          <AttributeBlock
                            key={attribute.heading}
                            attribute={attribute}
                          />
                        ))
                      ) : (
                        <p className='text-sm text-ink opacity-50 italic col-span-full'>No attributes found</p>
                      )}
                    </div>
                  </div>

                  <div className='relative w-full max-w-[300px] mx-auto lg:mx-0 lg:mt-1 lg:self-start aspect-[252/196] shrink-0'>
                    {plant.images && plant.images.length > 0 ? (
                      <>
                        {plant.images.map((img, idx) => (
                          <div
                            key={img.id || idx}
                            className={`absolute rounded-[18px] bg-[#d9d9d9] border border-ink overflow-hidden ${
                              idx === 0 ? 'left-0 top-[5%] w-[43%] h-[43%]' :
                              idx === 1 ? 'right-0 top-0 w-[43%] h-[43%]' :
                              idx === 2 ? 'left-[14%] top-[60%] w-[41%] h-[40%]' :
                              'left-[30%] top-[18%] w-[53%] h-[52%]'
                            }`}
                          >
                            <Image
                              src={img.imageUrl}
                              alt={plant.scientificName}
                              fill
                              sizes='100%'
                              className='object-cover'
                              unoptimized
                            />
                          </div>
                        ))}
                      </>
                    ) : (
                      <div className='w-full h-[200px] md:h-[300px] rounded-[18px] bg-[#d9d9d9] border border-ink flex items-center justify-center text-xs font-bold text-black/40 mb-4'>
                        No Images Available
                      </div>
                    )}
                  </div>
                </div>

                {plant.attributes && plant.attributes.length > 9 && (
                  <div className='flex flex-wrap gap-x-10 gap-y-4 mt-8'>
                    {plant.attributes.slice(9).map((attribute) => (
                      <AttributeBlock key={attribute.heading} attribute={attribute} />
                    ))}
                  </div>
                )}

                <div className='mt-10 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6'>
                  <div>
                    <h3 className='font-medium text-xl text-ink'>
                      IUCN Conservation Status:
                    </h3>
                    <span
                      className={`${offbit.className} mt-2.5 inline-block bg-warning/85 text-black text-[13px] px-5 py-2 rounded-full`}
                    >
                      {plant.iucnStatus || 'Data Not Found'}
                    </span>
                  </div>

                  {/* USES BOX */}
                  <div className='w-full lg:w-[38%] lg:min-w-[300px] min-h-[140px] bg-[#A3C27D] border-[3px] border-black rounded-[28px] px-6 py-5'>
                    <h3
                      className={`${offbit.className} underline underline-offset-2 font-bold text-[15px] text-black`}
                    >
                      USES:
                    </h3>
                    <p className='text-[13px] leading-relaxed text-black mt-2'>
                      {plant.uses || ''}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Actions (Save Button & Disclaimer) */}
        <div className='w-full max-w-5xl mt-6 flex flex-col md:flex-row items-center justify-start gap-8 px-2'>
          <button className={`${offbit.className} bg-black dark:bg-[#71CB51] text-white dark:text-black text-2xl md:text-3xl font-bold px-10 py-3.5 rounded-full hover:bg-gray-800 dark:hover:bg-[#5ebf3f] transition-colors flex-shrink-0`}>
            SAVE
          </button>

          <p className='text-[10px] md:text-[11px] text-black dark:text-[#EAF2E4] leading-relaxed max-w-md text-center md:text-left'>
            Disclaimer: We do not own the pictures displayed in any of the plant catalogs, they have been outsourced from respective owners, to whom we give complete credits or may have been generated.
          </p>
        </div>

      </main>

      <AppFooter />
    </div>
  )
}