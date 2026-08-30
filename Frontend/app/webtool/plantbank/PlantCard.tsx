'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { pixelifySans } from '@/components/utils/utils'
import { Plant } from './types'

interface PlantCardProps {
  plant: Plant
  /** Position in the grid — controls the alternating olive/tan colour */
  index: number
}

/**
 * Simple grid card for the plant bank, alternating olive/tan per mockup.
 */
export const PlantCard: React.FC<PlantCardProps> = ({ plant, index }) => {
  const router = useRouter()
  const isTan = index % 2 === 1

  return (
    <button
      onClick={() => router.push(`/webtool/plantbank/${plant.id}`)}
      title={plant.commonName}
      className={`relative w-full h-28 md:h-36 rounded-lg border border-black/10 cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_14px_rgba(0,0,0,0.35)] overflow-hidden text-left
        ${isTan ? 'bg-[#dcc9a4] hover:bg-[#e4d3b0]' : 'bg-[#77804f] hover:bg-[#818b58]'}`}
    >
      {plant.picture1 && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={plant.picture1}
          alt={plant.commonName}
          className='absolute inset-0 w-full h-full object-cover opacity-90'
        />
      )}
      <span
        className={`absolute bottom-0 left-0 right-0 px-2 py-1 text-[10px] md:text-xs font-bold truncate ${pixelifySans.className}
          ${isTan ? 'text-[#2d4428] bg-[#dcc9a4]/80' : 'text-[#f2f0e4] bg-[#5c663c]/80'}`}
      >
        {plant.commonName}
      </span>
    </button>
  )
}

