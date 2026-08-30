'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import GlobalHamburger from '@/components/shared/GlobalHamburger'
import { pixelifySans } from '@/components/utils/utils'
import { usePlant } from '@/hooks/usePlants'
import { Plant } from '../types'

interface PlantDetailPageProps {
  params: Promise<{ id: string }>
}

function Field({ label, value }: { label: string; value: string | null }) {
  if (!value || value.trim() === '') return null
  return (
    <div className='flex flex-col'>
      <span className='text-[9px] uppercase tracking-wider text-[#5a6b57] font-bold'>
        {label}
      </span>
      <span className='text-xs text-[#2d4428]'>{value}</span>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className='flex flex-col gap-2'>
      <h3 className='text-xs font-bold text-[#3b703e] uppercase tracking-wider border-b border-black/10 pb-1'>
        {title}
      </h3>
      <div className='grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2'>{children}</div>
    </div>
  )
}

function Gallery({ plant }: { plant: Plant }) {
  const images = [
    { src: plant.picture1, label: 'Picture 1' },
    { src: plant.picture2, label: 'Picture 2' },
    { src: plant.wholePlantImage, label: 'Whole plant' },
    { src: plant.closeUpImage, label: 'Close up' },
    { src: plant.flowerImage, label: 'Flower' },
    { src: plant.fruitImage, label: 'Fruit/Seed' },
    { src: plant.leafImage, label: 'Leaf' },
  ].filter((img) => img.src)

  if (images.length === 0) return null

  return (
    <div className='w-full md:w-40 flex md:flex-col gap-2 overflow-x-auto md:overflow-visible flex-shrink-0'>
      {images.map((img) => (
        <div
          key={img.label}
          className='w-24 h-24 md:w-full md:h-28 bg-[#8b9464]/70 rounded-lg flex-shrink-0 overflow-hidden'
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={img.src as string} alt={img.label} className='w-full h-full object-cover' />
        </div>
      ))}
    </div>
  )
}

export default function PlantDetailPage({ params }: PlantDetailPageProps) {
  const router = useRouter()
  const [id, setId] = React.useState<string>('')

  React.useEffect(() => {
    params.then((resolved) => setId(resolved.id))
  }, [params])

  const { plant, loading, error } = usePlant(id)

  if (loading || !id) {
    return (
      <div className='min-h-screen bg-[#38763d] flex flex-col items-center justify-center p-4'>
        <div className='bg-white rounded-3xl p-10 max-w-md text-center'>
          <div className='w-12 h-12 rounded-full border-4 border-[#2a4225] border-t-transparent animate-spin mx-auto mb-4' />
          <h2 className={`${pixelifySans.className} text-2xl text-[#2d4428] font-bold`}>
            Loading...
          </h2>
        </div>
      </div>
    )
  }

  if (error || !plant) {
    return (
      <div className='min-h-screen bg-[#38763d] flex flex-col items-center justify-center p-4'>
        <div className='bg-white rounded-3xl p-10 max-w-md text-center'>
          <h2 className={`${pixelifySans.className} text-2xl text-[#2d4428] font-bold mb-4`}>
            Plant Not Found
          </h2>
          <p className={`${pixelifySans.className} text-sm text-[#5a6b57] mb-6`}>
            {error?.message || "The plant you're looking for doesn't exist."}
          </p>
          <button
            onClick={() => router.push('/webtool/plantbank')}
            className={`${pixelifySans.className} bg-[#2a4225] text-white px-6 py-2 rounded-full hover:bg-[#1d3019] transition-colors cursor-pointer`}
          >
            ← Back to Plant Bank
          </button>
        </div>
      </div>
    )
  }


  return (
    <>
      <GlobalHamburger />
      <div
        className={`min-h-screen bg-[#38763d] flex flex-col items-center p-2 sm:p-3 select-none ${pixelifySans.className}`}
      >
        <header className='w-full max-w-full flex items-center justify-center py-2 px-2 mb-1 relative'>
          <h1
            className={`${pixelifySans.className} text-3xl sm:text-4xl text-[#1d3d1e] tracking-widest uppercase font-bold text-center`}
          >
            WEBTOOL
          </h1>
        </header>

        <main className='w-full max-w-full flex-1 min-h-0 pb-4'>
          <div className='w-full bg-[#414a2b] rounded-2xl p-2 shadow-xl h-[580px] max-h-[80vh] flex flex-col'>
            <div className='flex items-center justify-between flex-shrink-0 px-2 py-1'>
              <button
                onClick={() => router.push('/webtool/plantbank')}
                className='text-[#f2f0e4] hover:text-white transition-colors text-lg cursor-pointer'
              >
                ←
              </button>
              <span className='text-[10px] text-[#f2f0e4]/60'>
                {plant.slNo ? `Sl. No. ${plant.slNo}` : ''}
              </span>
            </div>

            <div className='flex-1 bg-[#dcc9a4] rounded-xl m-1 mt-0 p-3 sm:p-4 flex flex-col md:flex-row gap-4 overflow-hidden'>
              {/* Left: image gallery */}
              <Gallery plant={plant} />

              {/* Right: details */}
              <div className='flex-1 overflow-y-auto min-h-0 pr-1 flex flex-col gap-4'>
                <div className='flex items-start justify-between gap-3'>
                  <h2 className='text-lg sm:text-xl font-bold text-[#2d4428] leading-tight'>
                    {plant.commonName}
                  </h2>
                  {plant.iucnStatus && (
                    <span className='inline-block px-2.5 py-0.5 rounded-full bg-[#77804f]/40 text-[#3b703e] text-[10px] font-bold uppercase tracking-wide flex-shrink-0'>
                      IUCN: {plant.iucnStatus}
                    </span>
                  )}
                </div>

                <Section title='Identity'>
                  <Field label='Family' value={plant.family} />
                  <Field label='Plant type' value={plant.plantType} />
                  <Field label='Plant form' value={plant.plantForm} />
                  <Field label='Item' value={plant.item} />
                </Section>

                <Section title='Habitat'>
                  <Field label='Habitat system' value={plant.habitatSystem} />
                  <Field label='Habitat type' value={plant.habitatType} />
                  <Field label='Natural habitat detail' value={plant.naturalHabitatDetail} />
                </Section>

                <Section title='Foliage & Flowers'>
                  <Field label='Foliage colour' value={plant.foliageColour} />
                  <Field label='Foliage habit' value={plant.foliageHabit} />
                  <Field label='Leaf description' value={plant.leafDescription} />
                  <Field label='Flower/Inflorescence colour' value={plant.flowerColour} />
                  <Field label='Flowering season' value={plant.floweringSeason} />
                  <Field label='Flower characteristic' value={plant.flowerCharacteristic} />
                  <Field label='Fruit' value={plant.fruit} />
                  <Field label='Seed bearing structure' value={plant.seedBearingStructure} />
                  <Field label='Fruit description' value={plant.fruitDescription} />
                </Section>

                <Section title='Climate & Site'>
                  <Field label='Climate condition' value={plant.climateCondition} />
                  <Field label='Agro-climatic zone (India)' value={plant.agroClimaticZone} />
                  <Field label="Koppen's zone 1" value={plant.koppenZone1} />
                  <Field label="Koppen's zone 2" value={plant.koppenZone2} />
                  <Field label='Soil type' value={plant.soilType} />
                </Section>

                <Section title='Growth'>
                  <Field label='Maintenance' value={plant.maintenance} />
                  <Field label='Growth habit' value={plant.growthHabit} />
                  <Field label='Height in 5 yrs' value={plant.height5yr} />
                  <Field label='Height in 10 yrs' value={plant.height10yr} />
                  <Field label='Height in 20 yrs' value={plant.height20yr} />
                  <Field label='Mature height' value={plant.matureHeight} />
                  <Field label='Growth height (m)' value={plant.growthHeightM} />
                  <Field label='Spread in 5 yrs' value={plant.spread5yr} />
                  <Field label='Spread in 10 yrs' value={plant.spread10yr} />
                  <Field label='Spread in 20 yrs' value={plant.spread20yr} />
                  <Field label='Mature canopy spread' value={plant.matureCanopySpread} />
                  <Field label='Canopy spread (m)' value={plant.canopySpreadM} />
                </Section>

                <Section title='Lifespan & Roots'>
                  <Field label='Typical lifespan (years)' value={plant.lifespanYears} />
                  <Field label='Lifespan class' value={plant.lifespanClass} />
                  <Field label='Root system' value={plant.rootSystem} />
                  <Field label='Root depth' value={plant.rootDepth} />
                </Section>

                <Section title='Uses'>
                  <Field label='Purpose / Uses' value={plant.purposes} />
                  <Field label='Additional description' value={plant.additionalDescription} />
                  <Field label='Source' value={plant.source} />
                </Section>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
