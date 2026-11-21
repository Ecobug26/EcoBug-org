'use client'

import React, { use, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import AppNavbar from '@/components/shared/AppNavbar'
import AppFooter from '@/components/shared/AppFooter'
import { offbit } from '@/components/utils/utils'
import { SearchBar, LoadingState } from '@/components/shared/ui'
import { Plant, PlantAttribute } from '../types'

interface PlantDetailPageProps {
  params: Promise<{ id: string }>
}

const SAVED_KEY = 'plantbank:saved'

function readSavedIds(): string[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(SAVED_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.map((v) => String(v))
  } catch {
    return []
  }
}

function writeSavedIds(ids: string[]): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(SAVED_KEY, JSON.stringify(ids))
  } catch {}
}

function MorePill() {
  return (
    <span className='mt-1 inline-flex w-fit bg-[#1E3822] text-white text-[8px] leading-none font-bold tracking-widest px-2 py-0.5 rounded-full uppercase'>
      MORE
    </span>
  )
}

function AttributeBlock({ attribute }: { attribute: PlantAttribute }) {
  const lines = attribute.lines ?? []
  // Explicitly hide the MORE pill for 'Plant Form'
  const showMorePill = attribute.more && attribute.heading.toLowerCase() !== 'plant form'

  return (
    <div className='min-w-0 flex flex-col items-start'>
      <h4 className='font-extrabold text-[15px] sm:text-[16px] text-[#1E3822] dark:text-[#EAF2E4] leading-tight mb-0.5'>
        {attribute.heading}
      </h4>
      <div className='space-y-0 w-full'>
        {lines.length === 0 ? (
          <p className='text-[13px] leading-tight text-[#1E3822]/60 dark:text-[#EAF2E4]/60 italic'>Data Not Found</p>
        ) : (
          lines.map((line, i) => {
            const idx = line.indexOf(':')
            const hasLabel = idx > 0 && idx < line.length - 1
            const label = hasLabel ? line.slice(0, idx).trim() : null
            const value = hasLabel ? line.slice(idx + 1).trim() : line
            return hasLabel ? (
              <p key={`${line}-${i}`} className='text-[13px] sm:text-[14px] leading-tight text-[#1E3822] dark:text-[#EAF2E4]'>
                <span className='font-bold'>{label}:</span> <span className="font-semibold">{value}</span>
              </p>
            ) : (
              <p key={`${line}-${i}`} className='text-[13px] sm:text-[14px] font-semibold leading-tight text-[#1E3822] dark:text-[#EAF2E4]'>
                {value}
              </p>
            )
          })
        )}
      </div>
      {showMorePill && <MorePill />}
    </div>
  )
}

function PlantGallery({ plant }: { plant: Plant }) {
  const images = (plant.images ?? []).filter((img) => img?.imageUrl).slice(0, 3)
  const displayImages = [...images]
  while (displayImages.length < 3) {
    displayImages.push({ id: `placeholder-${displayImages.length}`, imageUrl: '/images/main_illu.png' })
  }

  return (
    <div className='relative w-[280px] sm:w-[320px] h-[180px] sm:h-[200px] shrink-0 mx-auto lg:mx-0'>
      <div className='absolute top-0 right-0 w-[140px] sm:w-[160px] h-[100px] sm:h-[110px] bg-[#D9D9D9] rounded-[16px] border-[1.5px] border-black overflow-hidden z-10'>
        <Image src={displayImages[0].imageUrl} alt={plant.scientificName} fill className='object-cover' unoptimized />
      </div>
      <div className='absolute top-[40px] left-0 w-[140px] sm:w-[160px] h-[100px] sm:h-[110px] bg-[#D9D9D9] rounded-[16px] border-[1.5px] border-black overflow-hidden z-20'>
        <Image src={displayImages[1].imageUrl} alt={plant.scientificName} fill className='object-cover' unoptimized />
      </div>
      <div className='absolute bottom-0 right-[20px] sm:right-[30px] w-[140px] sm:w-[160px] h-[100px] sm:h-[110px] bg-[#D9D9D9] rounded-[16px] border-[1.5px] border-black overflow-hidden z-30'>
        <Image src={displayImages[2].imageUrl} alt={plant.scientificName} fill className='object-cover' unoptimized />
      </div>
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
  const [saved, setSaved] = useState(false)

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
          // REMOVED fallback mock data. Now strictly relies on the API.
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

  useEffect(() => {
    if (!plant) return
    const plantId = String(plant.id)
    setSaved(readSavedIds().includes(plantId))
  }, [plant])

  const goBack = () => router.push('/webtool/plantbank')

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') router.push('/webtool/plantbank')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [router])

  const submitSearch = () => {
    const q = search.trim()
    router.push(
      q ? `/webtool/plantbank?q=${encodeURIComponent(q)}` : '/webtool/plantbank'
    )
  }

  const toggleSave = () => {
    if (!plant) return
    const plantId = String(plant.id)
    const list = readSavedIds()
    const next = list.includes(plantId)
      ? list.filter((i) => i !== plantId)
      : [...list, plantId]
    writeSavedIds(next)
    setSaved(next.includes(plantId))
  }

  const attributes = useMemo(() => plant?.attributes ?? [], [plant])

  return (
    <div className='min-h-screen flex flex-col bg-[#F4F8F0] dark:bg-[#102112]'>
      <AppNavbar />

      <main className='flex-1 flex flex-col items-center pt-20 md:pt-24 pb-10 px-3 sm:px-6'>
        <h1
          className={`${offbit.className} text-4xl sm:text-5xl md:text-6xl text-[#1E3822] dark:text-[#EAF2E4] tracking-widest uppercase font-bold text-center`}
        >
          PLANT BANK
        </h1>

        <div className='w-full max-w-5xl mt-4'>
          {loading ? (
            <div className='flex justify-center py-10'>
              <LoadingState label='Loading plant...' />
            </div>
          ) : error || !plant ? (
            <div className='bg-[#C4E6A9] dark:bg-[#253B25] rounded-[32px] p-5 sm:p-6 shadow-lg text-center'>
              <p className={`${offbit.className} text-lg font-bold text-[#1E3822] dark:text-white`}>
                {error ? 'Failed to load plant' : 'Plant not found'}
              </p>
              <button
                type='button'
                onClick={goBack}
                className={`${offbit.className} mt-2 text-sm text-[#1E3822] dark:text-[#EAF2E4] hover:underline cursor-pointer`}
              >
                ← Back to Plant Bank
              </button>
            </div>
          ) : (
            <div className='bg-[#C4E6A9] dark:bg-[#253B25] rounded-[32px] p-3 sm:p-5 shadow-[0_10px_30px_rgba(0,0,0,0.1)] relative'>
              
              <div className='flex items-center justify-between gap-3 w-full mb-3'>
                <button
                  type='button'
                  onClick={goBack}
                  aria-label='Close plant details'
                  className='w-10 h-10 flex items-center justify-center text-[#1E3822] dark:text-[#EAF2E4] font-bold text-2xl hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors cursor-pointer flex-shrink-0'
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
                    className='w-[150px] sm:w-[240px]'
                  />
                </div>
              </div>

              <div className='flex flex-col-reverse lg:flex-row lg:justify-between lg:items-start gap-4 lg:gap-6'>
                <div className='flex-1 min-w-0'>
                  <h2 className={`${offbit.className} text-3xl sm:text-4xl md:text-[42px] font-bold uppercase text-[#1E3822] dark:text-[#EAF2E4] leading-[1.1] mb-0.5`}>
                    {plant.scientificName}
                  </h2>
                  <p className={`${offbit.className} text-xl sm:text-[22px] uppercase text-[#1E3822] dark:text-[#EAF2E4] leading-tight opacity-90`}>
                    {plant.subtitle}
                  </p>
                  
                  <p className='text-[13px] sm:text-[14px] text-[#1E3822] dark:text-[#EAF2E4] mt-2 font-bold'>
                    Common Names: <span className="font-normal uppercase ml-1">{plant.commonNames}</span>
                  </p>
                </div>

                <PlantGallery plant={plant} />
              </div>

              <div className='grid grid-cols-2 md:grid-cols-3 gap-x-3 lg:gap-x-6 gap-y-4 mt-6 sm:mt-8 w-full lg:w-[85%]'>
                {attributes.length > 0 ? (
                  attributes.map((attribute, i) => (
                    <AttributeBlock
                      key={`${attribute.heading}-${i}`}
                      attribute={attribute}
                    />
                  ))
                ) : (
                  <p className='text-sm text-[#1E3822] dark:text-[#EAF2E4] opacity-50 italic col-span-full'>
                    No specific attributes found.
                  </p>
                )}
              </div>

              <div className='mt-6 sm:mt-8 flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6'>
                <div className="flex-shrink-0 mb-1 md:mb-0">
                  <h3 className='font-bold text-[15px] sm:text-[16px] text-[#1E3822] dark:text-[#EAF2E4] mb-1.5'>
                    IUCN Conservation Status:
                  </h3>
                  <span className={`${offbit.className} inline-block bg-[#F5A663] text-black text-[12px] font-bold px-4 py-1 rounded-full`}>
                    {plant.iucnStatus || 'Data Not Found'}
                  </span>
                </div>

                <div className='w-full md:w-[45%] min-h-[100px] bg-[#A3C27D] dark:bg-[#1c3520] border-[1.5px] border-black dark:border-[#71CB51] rounded-[16px] px-4 py-3'>
                  <h3 className={`${offbit.className} underline underline-offset-4 decoration-2 font-bold text-[13px] text-[#1E3822] dark:text-[#EAF2E4] uppercase`}>
                    USES:
                  </h3>
                  <p className='text-[13px] leading-snug text-[#1E3822] dark:text-[#EAF2E4] mt-1'>
                    {plant.uses || 'Data Not Found'}
                  </p>
                </div>
              </div>

            </div>
          )}
        </div>

        <div className='w-full max-w-5xl mt-4 flex flex-col md:flex-row items-center justify-start gap-4 md:gap-6 px-2'>
          <button
            type='button'
            onClick={toggleSave}
            disabled={!plant}
            aria-pressed={saved}
            className={`${offbit.className} bg-black dark:bg-[#71CB51] text-white dark:text-black text-xl md:text-2xl font-bold px-8 py-2.5 rounded-full hover:bg-gray-800 dark:hover:bg-[#5ebf3f] transition-colors flex-shrink-0 disabled:opacity-40 disabled:cursor-not-allowed`}
          >
            {saved ? 'SAVED' : 'SAVE'}
          </button>

          <p className='text-[10px] md:text-[11px] text-[#1E3822] dark:text-[#EAF2E4]/70 leading-relaxed max-w-md text-center md:text-left'>
            Disclaimer: We do not own the pictures displayed in any of the plant catalogs, they have been outsourced from respective owners, to whom we give complete credits or may have been generated.
          </p>
        </div>
      </main>

      <AppFooter />
    </div>
  )
}