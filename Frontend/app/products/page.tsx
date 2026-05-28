import ProductSection from '@/components/product/ProductSection'
import { pixelifySans } from '@/components/utils/utils'
import Subscriptions from '@/pageComponents/Subscriptions/page'

export default function Product() {
  return (
    <main
      className={`min-h-screen flex flex-col gap-12 md:gap-15 items-center px-4 ${pixelifySans.className}`}
    >
      <Subscriptions />
      <ProductSection />
    </main>
  )
}
