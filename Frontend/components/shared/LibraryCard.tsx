'use client'

import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { pixelifySans } from '@/components/utils/utils'

export interface LibraryCardData {
  title: string
  category: string
  summary: string
  imageUrl: string
  keywords: string[]
  fallbackTag?: string
}

interface LibraryCardProps extends LibraryCardData {
  /** Route pushed when the card is clicked, e.g. `/webtool/strategy/abc` */
  href: string
}

/**
 * Reusable card component for library-style pages (strategies, plant bank, etc).
 * Renders a folder-style card with 3D tilt hover effect and navigates to `href`.
 * Each entry in the data source becomes one instance of this card.
 * Styled with the Figma design tokens (light/dark aware).
 */
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
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
      }}
      animate={{
        rotateX,
        rotateY,
        y: isHovered ? -4 : 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 25,
      }}
      className='relative w-full h-[240px] cursor-pointer select-none group flex flex-col justify-end'
    >
      {/* Folder tab */}
      <div
        className='absolute top-0 left-0 w-28 h-5 bg-chip rounded-t-lg border-t border-l border-r border-line'
        style={{ clipPath: 'polygon(0 0, 82% 0, 100% 100%, 0 100%)' }}
      />

      {/* Card body */}
      <div className='absolute top-4 inset-0 bg-panel rounded-2xl rounded-tl-none p-3 flex flex-col border border-line shadow-[0_6px_18px_rgba(0,0,0,0.10)] overflow-hidden'>
        <div className='flex items-center gap-2 flex-shrink-0'>
          <div className='w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-chip p-1 border border-primary/20 flex items-center justify-center'>
            <Image
              src={imageUrl}
              alt={title}
              width={40}
              height={40}
              className='w-full h-full object-contain'
              unoptimized
            />
          </div>
          <div className='flex-1 min-w-0'>
            <span
              className={`${pixelifySans.className} inline-block px-2 py-0.5 rounded bg-tertiary/40 text-primary-hover text-[9px] font-bold tracking-tight uppercase truncate max-w-full`}
            >
              {category}
            </span>
          </div>
        </div>

        <div className='flex-1 flex flex-col min-h-0 mt-1'>
          <h3
            className={`${pixelifySans.className} text-[13px] font-bold text-ink leading-tight line-clamp-2`}
            title={title}
          >
            {title}
          </h3>
          <p
            className={`${pixelifySans.className} text-[10px] text-ink-muted leading-snug line-clamp-3 mt-0.5`}
          >
            {summary}
          </p>
        </div>

        <div className='w-full pt-1 border-t border-line flex justify-between items-center text-[9px] text-ink-muted flex-shrink-0'>
          <span
            className={`${pixelifySans.className} text-primary font-semibold truncate max-w-[120px]`}
          >
            {keywords[0] ? `#${keywords[0]}` : fallbackTag}
          </span>
          <span
            aria-hidden
            className={`${pixelifySans.className} group-hover:translate-x-0.5 transition-transform text-ink flex-shrink-0`}
          >
            →
          </span>
        </div>
      </div>
    </motion.div>
  )
}
