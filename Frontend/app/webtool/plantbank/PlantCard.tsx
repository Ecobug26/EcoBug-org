// app/webtool/plantbank/PlantCard.tsx
'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { offbit } from '@/components/utils/utils'
import { Plant } from './types'

interface PlantCardProps {
  plant: Plant
}

function CardField({ label, value, align = 'left' }: { label: string; value: string, align?: 'left' | 'right' }) {
  return (
    <div className={`flex flex-col ${align === 'right' ? 'items-end text-right' : 'items-start text-left'} w-full min-w-0`}>
      <span className={`${offbit.className} block text-[11px] font-bold text-[#3C6E47] tracking-wide uppercase leading-none`}>
        {label}
      </span>
      <span className='block text-[13px] font-bold text-black leading-tight mt-1 break-words line-clamp-2'>
        {value}
      </span>
    </div>
  )
}

export const PlantCard: React.FC<PlantCardProps> = ({ plant }) => {
  const router = useRouter()

  const handleCardClick = () => router.push(`/webtool/plantbank/${plant.id}`)

  return (
    <div
      onClick={handleCardClick}
      className='group w-full min-h-[170px] h-auto flex gap-3 cursor-pointer select-none'
    >
      {/* Left Side - Image (Always visible) */}
      <div className='relative w-1/2 bg-[#D9D9D9] border-2 border-black overflow-hidden'>
        <Image
          src={plant.imageUrl}
          alt={plant.scientificName}
          fill
          className='object-cover'
          unoptimized
        />
      </div>

      {/* Right Side - Text Box */}
      <div className='w-1/2 min-w-0 bg-[#C4E6A9] dark:bg-[#253B25] border-2 border-black p-3 flex flex-col justify-between'>
        
        <div>
          <h3 className={`${offbit.className} text-[15px] font-bold text-black dark:text-white leading-tight uppercase line-clamp-2`}>
            {plant.scientificName}
          </h3>
          <p className={`${offbit.className} text-[11px] text-black dark:text-gray-300 tracking-wide uppercase mt-1 truncate`}>
            {plant.subtitle}
          </p>
        </div>

        <div className='flex flex-col gap-1.5 mt-2'>
          <CardField label='PLANT TYPE' value={plant.plantType} />
          <CardField label='FOLIAGE HABITAT' value={plant.foliageColour} />
        </div>

        <div className='border-t-2 border-black dark:border-white/20 pt-1.5 mt-auto flex justify-end'>
          <CardField label='CLIMATIC CONDITION' value={plant.climaticZone} align="right" />
        </div>

      </div>
    </div>
  )
}