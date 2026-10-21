'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { offbit } from '@/components/utils/utils'
import { Plant } from './types'

interface PlantCardProps {
  plant: Plant
}

function CardField({ label, value, align = 'left' }: { label: string; value: string, align?: 'left' | 'right' }) {
  return (
    <div className={`flex flex-col ${align === 'right' ? 'items-end text-right' : 'items-start text-left'}`}>
      {/* Green Bold Header */}
      <span className={`${offbit.className} block text-[10px] font-bold text-[#2E6B2E] tracking-wide uppercase leading-none`}>
        {label}
      </span>
      {/* Black Bold Info */}
      <span className='block text-[11px] font-bold text-black leading-none mt-1'>
        {value}
      </span>
    </div>
  )
}

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
        className='group w-full text-left flex gap-2 cursor-pointer select-none transition-all duration-150 hover:-translate-y-1'
      >
        {/* Image Card */}
        <div
          className='relative w-[45%] shrink-0 bg-red-500/90 border-2 border-black overflow-hidden'
          onClick={handleImageClick}
        >
          <Image
            src={plant.imageUrl}
            alt={plant.scientificName}
            fill
            sizes='(max-width: 640px) 45vw, 15vw'
            className='object-cover'
            unoptimized
          />
        </div>

        {/* Text Card (Now Gray as per Figma) */}
        <div className='flex-1 min-w-0 bg-[#D9D9D9] border-2 border-black px-2.5 py-3 flex flex-col justify-start'>
          
          <div className='mb-3'>
            <h3 className={`${offbit.className} text-sm sm:text-base font-bold text-black leading-tight tracking-tight break-words`}>
              {plant.scientificName}
            </h3>
            <p className={`${offbit.className} text-[7px] text-black tracking-wide uppercase mt-1`}>
              {plant.subtitle}
            </p>
          </div>

          <div className='flex flex-col'>
            <div className='flex flex-col gap-2.5'>
              <CardField label='PLANT TYPE' value={plant.plantType} />
              <CardField label='FOLIAGE COLOUR' value={plant.foliageColour} />
            </div>

            <div className='border-t-2 border-black pt-2.5 mt-2.5 flex justify-end'>
              <CardField label='CLIMATIC ZONE' value={plant.climaticZone} align="right" />
            </div>
          </div>

        </div>
      </button>

      {zoomed && <ImageZoom imageUrl={plant.imageUrl} alt={plant.scientificName} onClose={() => setZoomed(false)} />}
    </>
  )
}