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
  const [shadowX, setShadowX] = useState(0)
  const [shadowY, setShadowY] = useState(6)
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

    const maxTilt = 10
    setRotateY(px * maxTilt)
    setRotateX(-py * maxTilt)
    setShadowX(-px * 10)
    setShadowY(-py * 10 + 8)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setRotateX(0)
    setRotateY(0)
    setShadowX(0)
    setShadowY(6)
  }

  const handleClick = () => {
    router.push(href)
  }

  return (
    <motion.div
      ref={cardRef}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
      }}
      animate={{
        rotateX,
        rotateY,
        scale: isHovered ? 1.03 : 1,
        y: isHovered ? -5 : 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 25,
      }}
      className="relative w-full h-[240px] cursor-pointer select-none group flex flex-col justify-end"
    >
      <div
        className="absolute inset-0 rounded-2xl bg-black/20 transition-all duration-200 pointer-events-none"
        style={{
          transform: `translate3d(${shadowX}px, ${shadowY}px, -20px)`,
          filter: isHovered ? 'blur(12px)' : 'blur(5px)',
          opacity: isHovered ? 0.3 : 0.12,
        }}
      />

      <div
        className="absolute top-0 left-0 w-28 h-5 bg-[#f6f6f6] rounded-t-lg transition-colors group-hover:bg-[#fbfbfb] border-t border-l border-r border-black/5"
        style={{ clipPath: 'polygon(0 0, 82% 0, 100% 100%, 0 100%)' }}
      />

      <div className="absolute top-4 inset-0 bg-[#f6f6f6] rounded-2xl rounded-tl-none p-3 flex flex-col transition-colors group-hover:bg-[#fbfbfb] border border-black/5 shadow-[0_4px_12px_rgba(0,0,0,0.06)] overflow-hidden">
        
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-[#e6eee0] p-1 border border-[#3b703e]/20 flex items-center justify-center">
            <Image
              src={imageUrl}
              alt={title}
              width={40}
              height={40}
              className="w-full h-full object-contain"
              unoptimized
            />
          </div>
          <div className="flex-1 min-w-0">
            <span
              className={`${pixelifySans.className} inline-block px-2 py-0.5 rounded bg-[#bdc5a7]/30 text-[9px] text-[#3b703e] font-bold tracking-tight uppercase truncate`}
            >
              {category}
            </span>
          </div>
        </div>

        <div className="flex-1 flex flex-col min-h-0 mt-1">
          <h3
            className={`${pixelifySans.className} text-[11px] font-bold text-[#2d4428] leading-tight group-hover:text-[#1d3d1e] transition-colors line-clamp-2`}
            title={title}
          >
            {title}
          </h3>
          <p
            className={`${pixelifySans.className} text-[9px] text-[#5a6b57] leading-snug line-clamp-3 mt-0.5`}
          >
            {summary}
          </p>
        </div>

        <div className="w-full pt-1 border-t border-black/5 flex justify-between items-center text-[8px] text-[#5a6b57] flex-shrink-0">
          <span className={`${pixelifySans.className} text-[#3b703e] font-semibold truncate max-w-[100px]`}>
            {keywords[0] ? `#${keywords[0]}` : fallbackTag}
          </span>
          <span className={`${pixelifySans.className} group-hover:translate-x-0.5 transition-transform text-[#2d4428] flex-shrink-0`}>
            →
          </span>
        </div>
      </div>
    </motion.div>
  )
}
