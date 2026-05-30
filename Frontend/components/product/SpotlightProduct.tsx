"use client"

import { Product } from "@/types/product"
import { motion } from "framer-motion"

export default function SpotlightProduct({ product }: { product: Product }) {
  return (
    <motion.div
      key={product.id}
      layout
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-[320px] h-40 md:h-45 bg-gray-200 flex items-center justify-center rounded"
    >
      <div className="text-3xl md:text-4xl">▶</div>
    </motion.div>
  )
}