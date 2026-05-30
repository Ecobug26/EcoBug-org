'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import SpotlightProduct from './SpotlightProduct'
import ProductThumbnail from './ProductThumbnail'
import ProductDetails from './ProductDetails'
import { products } from '@/data/products'
import { Product } from '@/types/product'

export default function ProductSection() {
  const [active, setActive] = useState<Product>(products[0])
  const others = products.filter((p) => p.id !== active.id)

  return (
    <div className='bg-[#367B38] w-full max-w-5xl mx-auto rounded-2xl p-6 md:p-12 flex flex-col md:flex-row md:justify-between items-center gap-8 md:gap-10 mb-20'>
      <SpotlightProduct product={active} />
      <div className='flex flex-col justify-between w-full md:w-1/2 items-center md:items-start'>
        <ProductDetails product={active} />
        <div className='flex gap-5 md:gap-10 mt-6 justify-center md:justify-start flex-wrap'>
          {others.map((p) => (
            <ProductThumbnail
              key={p.id}
              product={p}
              onClick={() => setActive(p)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
