'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import AppNavbar from '@/components/shared/AppNavbar'
import AppFooter from '@/components/shared/AppFooter'
import { offbit } from '@/components/utils/utils'

interface VaultFolderProps {
  title: string
  href?: string
  disabled?: boolean
}

/**
 * Geometry is taken from the reference image (card = 211 x 426 units).
 * Positions are % of the card height; sizes use `cqw` (1% of card width),
 * so everything scales together at any width.
 */
const CARD_H = 426
const FIRST_TAB_TOP = 45 // grey gap above the first tab
const STEP = 60 // vertical distance between folders
const TAB_H = 20 // tab height; body starts right below it
const LIFT = 7 // how far a hovered folder rises, in cqw
const OVERHANG = 12 // body extends below the card (in cqw) so lifting never exposes a gap

const FOLDERS = [
  { label: 'Folder 4', color: '#5ED34F' },
  { label: 'Folder 3', color: '#A0EB72' },
  { label: 'Folder 2', color: '#63C924' },
  { label: 'Folder 1', color: '#388308' },
  { label: 'ALL', color: '#235508' },
]

const pct = (n: number) => `${((n / CARD_H) * 100).toFixed(3)}%`

function VaultFolder({ title, href, disabled = false }: VaultFolderProps) {
  const [hovered, setHovered] = useState<number | null>(null)
  const interactive = !disabled

  const enter = (i: number) => () => {
    if (interactive) setHovered(i)
  }

  const inner = (
    <div
      className={`relative w-full overflow-hidden rounded-[9.5cqw] bg-[#D9D9D9] dark:bg-[#2a352e] ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      style={{ aspectRatio: `211 / ${CARD_H}` }}
      onMouseLeave={() => setHovered(null)}
    >
      {/* ---------- Visual layers (never receive the pointer) ---------- */}
      {FOLDERS.map((f, i) => {
        const tabTop = FIRST_TAB_TOP + STEP * i
        const isBase = i === FOLDERS.length - 1
        const isActive = hovered === i

        return (
          <div
            key={f.label}
            className="pointer-events-none absolute inset-0 transition-[transform,filter] duration-300 ease-out motion-reduce:transition-none"
            style={{
              transform: `translateY(${isActive ? `-${LIFT}cqw` : '0'})`,
              filter: isActive ? 'brightness(1.1)' : 'none',
            }}
          >
            {/* Tab */}
            <div
              className="absolute flex items-center rounded-t-[4.5cqw] px-[4.5cqw]"
              style={{
                backgroundColor: f.color,
                left: '7.1%',
                width: '38%',
                top: pct(tabTop),
                height: pct(TAB_H + 1), // +1 overlaps the body to avoid a seam
              }}
            >
              <span
                className={`${offbit.className} text-white leading-none tracking-wide`}
                style={{ fontSize: '5.3cqw' }}
              >
                {f.label}
              </span>
            </div>

            {/* Body (extends past the bottom edge, hidden by overflow-hidden) */}
            <div
              className="absolute inset-x-0 rounded-t-[9.5cqw]"
              style={{
                backgroundColor: f.color,
                top: pct(tabTop + TAB_H),
                bottom: `-${OVERHANG}cqw`,
              }}
            >
              {isBase && (
                <div
                  className="flex h-full items-center justify-center"
                  style={{ paddingBottom: `${OVERHANG}cqw` }}
                >
                  <span
                    className={`${offbit.className} text-[#E4EBD6] uppercase tracking-wider text-center leading-none`}
                    style={{ fontSize: '11.5cqw' }}
                  >
                    {title}
                  </span>
                </div>
              )}
            </div>
          </div>
        )
      })}

      {/* ---------- Hit zones (static, so lifting never causes flicker) ----------
          Each folder owns its visible strip. Later folders sit on top in DOM
          order, so their tab zones win where they overlap an earlier body zone,
          matching exactly what you see on screen. */}
      {FOLDERS.map((f, i) => {
        const tabTop = FIRST_TAB_TOP + STEP * i
        const bodyTop = tabTop + TAB_H
        const isBase = i === FOLDERS.length - 1
        const bodyBottom = isBase ? CARD_H : tabTop + STEP + TAB_H
        const cursor = interactive ? 'cursor-pointer' : 'cursor-not-allowed'

        return (
          <React.Fragment key={`hit-${f.label}`}>
            {/* Body zone */}
            <div
              className={`absolute inset-x-0 ${cursor}`}
              style={{ top: pct(bodyTop), height: pct(bodyBottom - bodyTop) }}
              onMouseEnter={enter(i)}
            />
            {/* Tab zone */}
            <div
              className={`absolute ${cursor}`}
              style={{
                left: '7.1%',
                width: '38%',
                top: pct(tabTop),
                height: pct(TAB_H),
              }}
              onMouseEnter={enter(i)}
            />
          </React.Fragment>
        )
      })}
    </div>
  )

  const wrapperClass = 'block flex-1 min-w-0 max-w-[240px] [container-type:inline-size]'

  if (disabled || !href) {
    return (
      <div className={wrapperClass} aria-disabled="true">
        {inner}
      </div>
    )
  }

  return (
    <Link href={href} className={wrapperClass} aria-label={title}>
      {inner}
    </Link>
  )
}

export default function PlantVaultPage() {
  return (
    // Removed bg-[#E8F3E0]
    <div className="min-h-screen flex flex-col dark:bg-[#102112]">
      <AppNavbar />

      <main className="flex-1 flex flex-col items-center pt-24 md:pt-28 pb-16 px-4">
        <h1
          className={`${offbit.className} text-4xl sm:text-5xl md:text-6xl text-black dark:text-[#EAF2E4] tracking-widest uppercase font-bold text-center mb-10`}
        >
          PLANT VAULT
        </h1>

        {/* White panel behind the cards */}
        <div className="w-full max-w-3xl rounded-3xl bg-white dark:bg-[#18251b] p-4 sm:p-6 shadow-[0_4px_0_rgba(0,0,0,0.12)] dark:shadow-[0_4px_0_rgba(0,0,0,0.35)]">
          <div className="flex flex-nowrap items-start justify-center gap-4">
            <VaultFolder title="PLANT BANK" href="/webtool/plantbank" />
            <VaultFolder title="STRATEGY" href="/webtool/strategy" />
            <VaultFolder title="BOQ" disabled />
          </div>
        </div>
      </main>

      <AppFooter />
    </div>
  )
}