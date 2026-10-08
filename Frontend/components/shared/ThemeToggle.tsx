'use client'

import { useSyncExternalStore, useCallback } from 'react'

const THEME_KEY = 'eb-theme'
const THEME_EVENT = 'eb-theme-change'

/** The DOM class list is the single source of truth; persistence + DOM updates happen together in toggle(). */
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

/** Figma pill switch (sun/moon) that flips the `dark` class on <html>. */
export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getThemeSnapshot, getServerThemeSnapshot)
  const isDark = theme === 'dark'

  const toggle = useCallback(() => {
    const next = document.documentElement.classList.contains('dark') ? 'light' : 'dark'
    document.documentElement.classList.toggle('dark', next === 'dark')
    try {
      localStorage.setItem(THEME_KEY, next)
    } catch {
      /* private mode etc. — theme still applies for the session */
    }
    window.dispatchEvent(new Event(THEME_EVENT))
  }, [])

  return (
    <button
      type='button'
      role='switch'
      aria-checked={isDark}
      aria-label='Toggle dark mode'
      onClick={toggle}
      className='relative w-14 h-7 rounded-full bg-primary-hover flex items-center px-1 cursor-pointer flex-shrink-0'
    >
      <span
        className={`w-5 h-5 rounded-full bg-panel flex items-center justify-center text-[10px] transition-transform duration-200 ${
          isDark ? 'translate-x-7' : 'translate-x-0'
        }`}
      >
        {isDark ? '🌙' : '☀️'}
      </span>
    </button>
  )
}