"use client"

import { Product } from "@/types/product"
import { motion } from "framer-motion"

export default function ProductDetails({ product }: { product: Product }) {
  return (
    <motion.div
      key={product.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-105"
    >
      <h3 className="text-ink text-xl font-bold mb-2">{product.title}</h3>
      <p className="text-ink-muted text-base md:text-lg leading-relaxed">
        {product.description}
      </p>
    </motion.div>
  )
}