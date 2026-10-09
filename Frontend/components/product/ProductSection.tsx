'use client'

import { useState } from 'react'
import Image from 'next/image'
import { offbit } from '@/components/utils/utils'
import { products } from '@/data/products'
import { Product } from '@/types/product'

const SHOWCASE_IMAGES = [
  '/featuresImg_1.png',
  '/featuresImg_2.png',
  '/featuresImg_3.png',
]

/**
 * Product showcase — matches Figma Buy "Container 4" (195:3818):
 * 1170x366 panel (r25, pad 40, gap 43), 378x282 image left,
 * OffBit Bold 20px description + three 114x84 thumbnails (gap 54) right.
 * Thumbnails switch the active product.
 */
export default function ProductSection() {
  const [active, setActive] = useState<Product>(products[0])
  const activeIndex = Math.max(
    0,
    products.findIndex((p) => p.id === active.id)
  )

  return (
    <div className='w-full max-w-[1170px] rounded-[25px] bg-[#97C974] dark:bg-[#253B25] p-5 sm:p-6 md:p-10 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-[43px] overflow-x-clip'>
      <div className='w-full max-w-[378px] shrink-0 overflow-hidden bg-[#D9D9D9] rounded-xl lg:rounded-none'>
        <Image
          key={active.id}
          src={SHOWCASE_IMAGES[activeIndex % SHOWCASE_IMAGES.length]}
          alt={active.title}
          width={756}
          height={564}
          className='block w-full h-auto object-cover aspect-[378/282]'
        />
      </div>

      <div className='flex flex-col items-center gap-6 w-full max-w-[659px]'>
        <p
          className={`${offbit.className} font-bold text-[18px] md:text-[20px] leading-6 tracking-[-0.01em] text-center text-[#40543F] dark:text-[#9BAE95]`}
        >
          {active.description}
        </p>

        <div
          className='flex items-center justify-center gap-3 sm:gap-6 md:gap-[54px] flex-wrap'
          role='tablist'
          aria-label='Choose product'
        >
          {products.map((p, i) => (
            <button
              key={p.id}
              type='button'
              role='tab'
              aria-selected={p.id === active.id}
              aria-label={`Show ${p.title}`}
              onClick={() => setActive(p)}
              className={`w-[80px] h-[59px] sm:w-[90px] sm:h-[66px] md:w-[114px] md:h-[84px] overflow-hidden cursor-pointer transition-all duration-150 bg-[#D9D9D9] ${
                p.id === active.id
                  ? 'ring-4 ring-black/60 dark:ring-white/70'
                  : 'opacity-80 hover:opacity-100 hover:-translate-y-0.5'
              }`}
            >
              <Image
                src={SHOWCASE_IMAGES[i % SHOWCASE_IMAGES.length]}
                alt=''
                aria-hidden
                width={228}
                height={168}
                className='block w-full h-full object-cover'
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

