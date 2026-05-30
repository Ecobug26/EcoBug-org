'use client'

import { useState } from 'react'
import GlobalHamburger from '@/components/shared/GlobalHamburger'

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <>
      {isSidebarOpen && (
        <div className='fixed inset-0 z-40 bg-black/60 backdrop-blur-sm' />
      )}

      <GlobalHamburger setIsSidebarOpen={setIsSidebarOpen} />
      {children}
    </>
  )
}