import AppNavbar from '@/components/shared/AppNavbar'
import AppFooter from '@/components/shared/AppFooter'
import ProductSection from '@/components/product/ProductSection'
import Subscriptions from '@/pageComponents/Subscriptions/page'

export default function Product() {
  return (
    <div className='min-h-screen flex flex-col bg-bg'>
      <AppNavbar />

      <main className='flex-1 flex flex-col items-center pt-28 md:pt-32 pb-16 px-4 gap-12'>
        <Subscriptions />
        <ProductSection />
      </main>

      <AppFooter />
    </div>
  )
}
