"use client"

import { Product } from "@/types/product"
import { motion } from "framer-motion"
import { offbit } from "@/components/utils/utils"

export default function ProductThumbnail({
  product,
  onClick,
}: {
  product: Product
  onClick: () => void
}) {
  return (
    <motion.button
      type='button'
      layout
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      aria-label={`Show ${product.title}`}
      className="w-24 h-14 md:w-30 md:h-17.5 bg-chip border border-line flex flex-col items-center justify-center rounded-lg cursor-pointer gap-0.5"
    >
      <span className="text-lg md:text-xl text-ink" aria-hidden>▶</span>
      <span className={`${offbit.className} text-[8px] text-ink-muted truncate max-w-full px-1`}>
        {product.title}
      </span>
    </motion.button>
  )
}