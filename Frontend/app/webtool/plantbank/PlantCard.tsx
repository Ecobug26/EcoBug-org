'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { offbit } from '@/components/utils/utils'
import { Plant } from './types'

interface PlantCardProps {
  plant: Plant
}

/** Small label/value row used inside the plant list card. */
function CardField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className={`${offbit.className} block text-[9px] font-bold text-ink tracking-wide`}>
        {label}
      </span>
      <span className='block text-[10px] leading-tight text-ink-muted'>{value}</span>
    </div>
  )
}

/**
 * Plant list card — Figma PLANT BANK screen: image block on the left,
 * plant name + PLANT TYPE / FOLIAGE COLOUR / CLIMATIC ZONE rows on the right.
 * Clicking navigates to the plant detail screen.
 */
export const PlantCard: React.FC<PlantCardProps> = ({ plant }) => {
  const router = useRouter()
  const handleClick = () => router.push(`/webtool/plantbank/${plant.id}`)

  return (
    <button
      type='button'
      onClick={handleClick}
      aria-label={`View ${plant.scientificName} details`}
      className='group w-full h-full text-left bg-chip border border-ink flex overflow-hidden cursor-pointer select-none transition-all duration-150 hover:-translate-y-1 hover:shadow-[0_6px_0_rgba(0,0,0,0.2)]'
    >
      {/* Image block (Figma shows a placeholder rectangle here) */}
      <div className='relative w-[42%] shrink-0 bg-tertiary/50 overflow-hidden'>
        <Image
          src={plant.imageUrl}
          alt={plant.scientificName}
          fill
          sizes='(max-width: 640px) 42vw, 15vw'
          className='object-cover'
          unoptimized
        />
      </div>

      {/* Text */}
      <div className='flex-1 min-w-0 p-2.5 sm:p-3 flex flex-col gap-1.5'>
        <div>
          <h3
            className={`${offbit.className} text-xs sm:text-sm font-bold text-primary-hover leading-tight`}
          >
            {plant.scientificName}
          </h3>
          <p className={`${offbit.className} text-[9px] text-ink tracking-wide`}>
            {plant.subtitle}
          </p>
        </div>

        <div className='flex flex-col gap-1.5'>
          <CardField label='PLANT TYPE' value={plant.plantType} />
          <CardField label='FOLIAGE COLOUR' value={plant.foliageColour} />
        </div>

        <div className='border-t border-ink/40 pt-1.5 mt-auto'>
          <CardField label='CLIMATIC ZONE' value={plant.climaticZone} />
        </div>
      </div>
    </button>
  )
}
