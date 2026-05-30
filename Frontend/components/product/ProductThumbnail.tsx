"use client"

import { Product } from "@/types/product"
import { motion } from "framer-motion"

export default function ProductThumbnail({
  product,
  onClick,
}: {
  product: Product
  onClick: () => void
}) {
  return (
    <motion.div
      layout
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="w-24 h-14 md:w-30 md:h-17.5 bg-gray-200 flex items-center justify-center rounded cursor-pointer"
    >
      <span className="text-xl md:text-2xl">▶</span>
    </motion.div>
  )
}