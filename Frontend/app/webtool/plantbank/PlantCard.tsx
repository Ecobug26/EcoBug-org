'use client'

import React, { useState } from 'react'
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

/** Simple lightbox overlay that enlarges the clicked image. */
function ImageZoom({ imageUrl, alt, onClose }: { imageUrl: string; alt: string; onClose: () => void }) {
  return (
    <div
      onClick={onClose}
      className='fixed inset-0 z-50 bg-black/90 flex items-center justify-center cursor-zoom-out p-4'
      role='dialog'
      aria-modal='true'
      aria-label='Enlarged plant image'
    >
      <div onClick={(e) => e.stopPropagation()} className='relative max-w-full max-h-[90vh] cursor-pointer'>
        <Image
          src={imageUrl}
          alt={alt}
          fill
          sizes='90vw'
          className='object-contain rounded-2xl border-2 border-white/30 shadow-2xl'
          unoptimized
          style={{ maxWidth: '90vw', maxHeight: '80vh', width: 'auto', height: 'auto' }}
        />
      </div>
      <button
        onClick={onClose}
        aria-label='Close'
        className='absolute top-4 right-4 z-10 bg-white/10 backdrop-blur text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-white/20 transition-colors'
      >
        ✕
      </button>
    </div>
  )
}

/**
 * Plant list card — Figma PLANT BANK screen: image block on the left,
 * plant name + PLANT TYPE / FOLIAGE COLOUR / CLIMATIC ZONE rows on the right.
 * Clicking the card navigates to the plant detail screen.
 * Clicking the image enlarges it (zoom).
 */
export const PlantCard: React.FC<PlantCardProps> = ({ plant }) => {
  const router = useRouter()
  const [zoomed, setZoomed] = useState(false)

  const handleCardClick = () => router.push(`/webtool/plantbank/${plant.id}`)
  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setZoomed(true)
  }

  return (
    <>
      <button
        type='button'
        onClick={handleCardClick}
        aria-label={`View ${plant.scientificName} details`}
        className='group w-full h-full text-left bg-chip border border-ink flex overflow-hidden cursor-pointer select-none transition-all duration-150 hover:-translate-y-1 hover:shadow-[0_6px_0_rgba(0,0,0,0.2)]'
      >
        {/* Image block — red background per new UI */}
        <div
          className='relative w-[42%] shrink-0 bg-red-500/90 overflow-hidden'
          onClick={handleImageClick}
        >
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
              className={`${offbit.className} text-xs sm:text-sm font-bold text-primary-hover leading-tight`}>
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

      {zoomed && <ImageZoom imageUrl={plant.imageUrl} alt={plant.scientificName} onClose={() => setZoomed(false)} />}
    </>
  )
}
