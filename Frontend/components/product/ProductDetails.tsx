"use client"

import { Product } from "@/types/product"
import { motion } from "framer-motion"


export default function ProductDetails({ product }: { product: Product }) {
  return (
    <motion.p
      key={product.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="text-white text-xl  max-w-105 leading-relaxed"
    >
      {product.description}
    </motion.p>
  )
}