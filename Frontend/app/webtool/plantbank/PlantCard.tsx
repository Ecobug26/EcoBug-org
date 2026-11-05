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
      {/* Label: Always green */}
      <span className={`${offbit.className} block text-[11px] font-bold text-[#3C6E47] tracking-wide uppercase leading-none`}>
        {label}
      </span>
      {/* Value: Always black */}
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
      {/* Left Side - Red Placeholder Box */}
      <div className='relative w-1/2 bg-red-500 border-2 border-black overflow-hidden'>
        <Image
          src={plant.imageUrl}
          alt={plant.scientificName}
          fill
          className='object-cover opacity-0 group-hover:opacity-100 transition-opacity'
          unoptimized
        />
      </div>

      {/* Right Side - Text Box (Always light green #C4E6A9, even in dark mode) */}
      <div className='w-1/2 min-w-0 bg-[#C4E6A9] border-2 border-black p-3 flex flex-col justify-between'>
        
        {/* Title Section */}
        <div>
          <h3 className={`${offbit.className} text-[15px] font-bold text-black leading-tight uppercase line-clamp-2`}>
            {plant.scientificName}
          </h3>
          <p className={`${offbit.className} text-[11px] text-black tracking-wide uppercase mt-1 truncate`}>
            {plant.subtitle}
          </p>
        </div>

        {/* Middle Section */}
        <div className='flex flex-col gap-1.5 mt-2'>
          <CardField label='PLANT TYPE' value={plant.plantType} />
          <CardField label='FOLIAGE HABITAT' value={plant.foliageColour} />
        </div>

        {/* Bottom Section */}
        <div className='border-t-2 border-black pt-1.5 mt-auto flex justify-end'>
          <CardField label='CLIMATIC CONDITION' value={plant.climaticZone} align="right" />
        </div>

      </div>
    </div>
  )
}