"use client"

import { Product } from "@/types/product"
import { motion } from "framer-motion"
import { pixelifySans } from "@/components/utils/utils"

export default function SpotlightProduct({ product }: { product: Product }) {
  return (
    <motion.div
      key={product.id}
      layout
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-[320px] h-40 md:h-45 bg-chip border border-line flex flex-col items-center justify-center rounded-xl gap-1"
    >
      <div className="text-3xl md:text-4xl text-ink" aria-hidden>▶</div>
      <span className={`${pixelifySans.className} text-[10px] text-ink-muted tracking-widest uppercase`}>
        {product.title}
      </span>
    </motion.div>
  )
}