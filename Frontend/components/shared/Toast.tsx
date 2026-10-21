'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { offbit } from '@/components/utils/utils'

type ToastType = 'success' | 'error' | 'info' | 'warning'

export type Toast = {
  id: string
  title: string
  message?: string
  type: ToastType
}

type ToastContextType = {
  toasts: Toast[]
  toast: (options: {
    title: string
    message?: string
    type?: ToastType
  }) => void
  dismiss: (id: string) => void
}

const ToastContext = createContext<ToastContextType | null>(null)

// Per-type styling mapped to the EcoBug token palette (app/globals.css).
// The palette is green-themed, so error/warning share the amber warning color.
const TYPE_STYLE: Record<
  ToastType,
  { border: string; icon: string; iconBg: string; iconText: string }
> = {
  success: {
    border: 'border-primary',
    icon: '✓',
    iconBg: 'bg-primary',
    iconText: 'text-panel',
  },
  error: {
    border: 'border-warning',
    icon: '✕',
    iconBg: 'bg-warning',
    iconText: 'text-panel',
  },
  info: {
    border: 'border-secondary',
    icon: 'i',
    iconBg: 'bg-secondary',
    iconText: 'text-panel',
  },
  warning: {
    border: 'border-warning',
    icon: '!',
    iconBg: 'bg-warning',
    iconText: 'text-panel',
  },
}

let toastId = 0

export function ToastProvider({
  children,
}: {
  children: ReactNode
}) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = useCallback(
    ({ title, message, type = 'info' }: { title: string; message?: string; type?: ToastType }) => {
      const id = String(++toastId)
      setToasts((prev) => [...prev, { id, title, message, type }])
    },
    []
  )

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
      <ToastList toasts={toasts} dismiss={dismiss} />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used inside ToastProvider')
  }
  return context
}

function ToastList({
  toasts,
  dismiss,
}: {
  toasts: Toast[]
  dismiss: (id: string) => void
}) {
  return (
    <div className='fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none'>
      <AnimatePresence>
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} dismiss={dismiss} />
        ))}
      </AnimatePresence>
    </div>
  )
}

function ToastItem({
  toast,
  dismiss,
}: {
  toast: Toast
  dismiss: (id: string) => void
}) {
  const style = TYPE_STYLE[toast.type]
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    timerRef.current = setTimeout(() => dismiss(toast.id), 5000)
    return () => clearTimeout(timerRef.current)
  }, [toast.id, dismiss])

  return (
    <motion.div
      initial={{ y: 10, opacity: 0, scale: 0.95 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: 10, opacity: 0, scale: 0.95 }}
      transition={{ type: 'spring', damping: 26, stiffness: 320 }}
      className='pointer-events-auto flex items-start gap-3 p-4 rounded-xl border border-line bg-panel shadow-lg min-w-[300px] max-w-sm'
    >
      <div className='flex-shrink-0 mt-1'>
        <span
          className={`rounded-md ${style.iconBg} ${style.iconText} flex items-center justify-center w-6 h-6 text-xs font-bold`}
          aria-hidden
        >
          {style.icon}
        </span>
      </div>
      <div className='flex-1 leading-snug'>
        <h4 className={`${offbit.className} text-sm font-bold text-ink`}>{toast.title}</h4>
        {toast.message && (
          <p className={`${offbit.className} text-xs text-ink-muted mt-1 leading-relaxed`}>
            {toast.message}
          </p>
        )}
      </div>
      <button
        onClick={() => dismiss(toast.id)}
        aria-label='Dismiss notification'
        className='flex-shrink-0 mt-0.5 p-1 rounded hover:bg-chip/50 transition-colors text-ink-muted'
      >
        <span className='text-xs' aria-hidden>
          ✕
        </span>
      </button>
    </motion.div>
  )
}