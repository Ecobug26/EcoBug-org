'use client'

import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { offbit } from '@/components/utils/utils'

export interface LibraryCardData {
  title: string
  category: string
  summary: string
  imageUrl: string
  keywords: string[]
  fallbackTag?: string
}

interface LibraryCardProps extends LibraryCardData {
  href: string
}

export const LibraryCard: React.FC<LibraryCardProps> = ({
  title,
  category,
  summary,
  imageUrl,
  keywords,
  fallbackTag = '#strategy',
  href,
}) => {
  const router = useRouter()
  const cardRef = useRef<HTMLDivElement>(null)
  
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const px = (x - centerX) / centerX
    const py = (y - centerY) / centerY
    const maxTilt = 8
    
    setRotateY(px * maxTilt)
    setRotateX(-py * maxTilt)
  }

  const handleClick = () => {
    router.push(href)
  }

  return (
    <motion.div
      ref={cardRef}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setRotateX(0)
        setRotateY(0)
      }}
      role='button'
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') handleClick()
      }}
      style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
      animate={{ rotateX, rotateY, y: isHovered ? -4 : 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className='relative w-full h-[340px] pt-6 cursor-pointer select-none group hover:z-50'
    >
      {/* Folder Tab (Pure White) */}
      <div className='absolute top-0 left-0 w-auto min-w-[120px] h-[30px] bg-white text-black px-4 flex items-center justify-center rounded-t-lg z-0 shadow-sm'>
        <span className={`${offbit.className} text-[10px] font-bold tracking-wider uppercase`}>
          {category}
        </span>
      </div>

      {/* Card Body (Light Green in both modes) */}
      <div className='absolute top-[28px] inset-0 bg-[#D1E8A6] dark:bg-[#D1E8A6] rounded-tr-xl rounded-b-xl rounded-bl-xl p-4 flex flex-col z-10 shadow-sm transition-shadow duration-200 group-hover:shadow-md'>
        
        {/* Image Box */}
        <div className='relative w-full h-[140px] bg-white rounded-lg mb-4 overflow-hidden'>
          <Image
            src={imageUrl}
            alt={title}
            fill
            className='object-cover'
            unoptimized
          />
        </div>

        {/* Text Content */}
        <div className='flex flex-col flex-1'>
          <h3 className={`${offbit.className} text-base font-bold text-black leading-tight mb-2 uppercase line-clamp-2`}>
            {title}
          </h3>
          <p className='font-geist-sans text-[11px] text-[#333333] leading-snug line-clamp-3'>
            {summary}
          </p>
        </div>

        {/* Footer */}
        <div className='mt-auto pt-3 border-t border-black/10 flex justify-between items-center'>
          <span className='font-geist-mono text-[11px] text-black font-bold'>
            {keywords[0] ? `#${keywords[0]}` : fallbackTag}
          </span>
          <span className='text-black group-hover:translate-x-1 transition-transform'>
            →
          </span>
        </div>
      </div>
    </motion.div>
  )
}