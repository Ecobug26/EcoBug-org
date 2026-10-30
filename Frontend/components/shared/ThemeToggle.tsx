'use client'

import { useSyncExternalStore, useCallback } from 'react'
import { offbit } from '@/components/utils/utils'

const THEME_KEY = 'eb-theme'
const THEME_EVENT = 'eb-theme-change'

function subscribe(onChange: () => void) {
  window.addEventListener(THEME_EVENT, onChange)
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  })
  return () => {
    window.removeEventListener(THEME_EVENT, onChange)
    observer.disconnect()
  }
}

function getThemeSnapshot(): 'dark' | 'light' {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

function getServerThemeSnapshot(): 'dark' | 'light' {
  return 'light'
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getThemeSnapshot, getServerThemeSnapshot)
  const isDark = theme === 'dark'

  const toggle = useCallback(() => {
    const next = document.documentElement.classList.contains('dark') ? 'light' : 'dark'
    document.documentElement.classList.toggle('dark', next === 'dark')
    try {
      localStorage.setItem(THEME_KEY, next)
    } catch {}
    window.dispatchEvent(new Event(THEME_EVENT))
  }, [])

  return (
    <div className='flex flex-col items-center gap-1.5 w-full'>
      <button
        type='button'
        role='switch'
        aria-checked={isDark}
        aria-label='Toggle dark mode'
        onClick={toggle}
        className={`relative w-[54px] h-[28px] rounded-full flex items-center px-1 cursor-pointer transition-colors duration-300 ${
          isDark ? 'bg-[#1B3B1E] border-2 border-[#3C6E47]' : 'bg-[#6DBF4F]'
        }`}
      >
        <span
          className={`w-[20px] h-[20px] rounded-full flex items-center justify-center transition-transform duration-300 ${
            isDark ? 'translate-x-[24px] bg-[#F4B41A]' : 'translate-x-0 bg-white'
          }`}
        >
          {isDark && (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"></circle>
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>
            </svg>
          )}
        </span>
      </button>

      {/* Dynamic text based on current theme */}
      <span className={`${offbit.className} text-[9px] text-[#3C6E47] font-bold tracking-wider uppercase text-center`}>
        Toggle: {isDark ? 'Light Mode' : 'Dark Mode'}
      </span>
    </div>
  )
}