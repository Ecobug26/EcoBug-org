import Link from 'next/link'
import { offbit } from '@/components/utils/utils'

/**
 * Shared UI primitives for the EcoBug design system (Figma Frame 72/73).
 * All styling comes from the token utilities defined in app/globals.css,
 * so every component below is light/dark aware out of the box.
 */

/** Black rectangular pixel-font button (Figma "BUY"/"BUY NOW" style). */
export function PixelButton({
  children,
  href,
  onClick,
  className = '',
  type = 'button',
  ariaLabel,
}: {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit'
  ariaLabel?: string
}) {
  const cls = `inline-flex items-center justify-center ${offbit.className} bg-ink text-bg px-8 py-3 tracking-widest uppercase text-sm md:text-base shadow-[0_5px_0_rgba(0,0,0,0.35)] hover:-translate-y-0.5 hover:shadow-[0_8px_0_rgba(0,0,0,0.35)] active:translate-y-0.5 active:shadow-[0_2px_0_rgba(0,0,0,0.35)] transition-all cursor-pointer select-none ${className}`
  if (href) {
    return (
      <Link href={href} className={cls} aria-label={ariaLabel}>
        {children}
      </Link>
    )
  }
  return (
    <button type={type} onClick={onClick} className={cls} aria-label={ariaLabel}>
      {children}
    </button>
  )
}

/** Big tracking-wide pixel section heading, e.g. FEATURES / WEBTOOL */
export function SectionTitle({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <h2
      className={`${offbit.className} text-2xl md:text-4xl tracking-widest uppercase text-ink ${className}`}
    >
      {children}
    </h2>
  )
}

/** White (light) / dark-green (dark) rounded card surface */
export function Panel({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`bg-panel rounded-2xl border border-line shadow-[0_6px_18px_rgba(0,0,0,0.10)] ${className}`}
    >
      {children}
    </div>
  )
}

/** Green pill search input, as in the Strategy/Plant Bank screens */
export function SearchBar({
  value,
  onChange,
  placeholder = 'Search',
  onClear,
  onSubmit,
  className = '',
  ariaLabel = 'Search',
}: {
  value?: string
  onChange?: (v: string) => void
  placeholder?: string
  onClear?: () => void
  /** Called when the user presses Enter inside the input */
  onSubmit?: () => void
  className?: string
  ariaLabel?: string
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit?.()
      }}
      className={`flex items-center bg-primary-hover rounded-full pl-4 pr-1.5 py-1.5 w-full max-w-xs ${className}`}
    >
      <input
        type='text'
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
        className={`flex-1 min-w-0 bg-transparent outline-none text-sm text-panel placeholder-panel/60 ${offbit.className}`}
      />
      {value ? (
        <button
          type='button'
          onClick={onClear}
          aria-label='Clear search'
          className='w-6 h-6 rounded-full bg-panel/20 hover:bg-panel/30 text-panel flex items-center justify-center cursor-pointer flex-shrink-0 text-xs'
        >
          ✕
        </button>
      ) : (
        <span className='w-6 h-6 flex-shrink-0' />
      )}
    </form>
  )
}

/** Active/inactive pill, renders as button when onClick is given */
export function Chip({
  children,
  active = false,
  onClick,
  className = '',
}: {
  children: React.ReactNode
  active?: boolean
  onClick?: () => void
  className?: string
}) {
  const cls = `${offbit.className} text-xs px-3.5 py-1 rounded-full font-bold whitespace-nowrap transition-all ${className} ${
    active
      ? 'bg-primary-hover text-panel scale-105'
      : 'bg-chip text-ink border border-line hover:bg-tertiary/40'
  }`
  if (onClick) {
    return (
      <button type='button' onClick={onClick} className={`cursor-pointer ${cls}`}>
        {children}
      </button>
    )
  }
  return <span className={cls}>{children}</span>
}

export function LoadingState({ label = 'Loading...' }: { label?: string }) {
  return (
    <div className='flex flex-col items-center gap-4 py-10'>
      <div className='w-10 h-10 rounded-full border-4 border-primary border-t-transparent animate-spin' />
      <p className={`${offbit.className} text-sm text-ink-muted`}>{label}</p>
    </div>
  )
}

export function ErrorState({
  message,
  onRetry,
}: {
  message: string
  onRetry?: () => void
}) {
  return (
    <div className='flex flex-col items-center gap-3 text-center py-10'>
      <div className='text-4xl' aria-hidden>
        ⚠️
      </div>
      <h3 className={`${offbit.className} text-lg font-bold text-ink`}>
        Something went wrong
      </h3>
      <p className={`${offbit.className} text-sm text-ink-muted max-w-sm`}>{message}</p>
      {onRetry && (
        <PixelButton onClick={onRetry} className='mt-2 !px-5 !py-2 !text-xs'>
          Retry
        </PixelButton>
      )}
    </div>
  )
}

export function EmptyState({
  title,
  message,
  onReset,
}: {
  title: string
  message: string
  onReset?: () => void
}) {
  return (
    <div className='w-full py-14 flex flex-col items-center justify-center text-center gap-3 bg-chip rounded-2xl border border-dashed border-line'>
      <div className='w-12 h-12 rounded-full bg-tertiary/40 flex items-center justify-center text-ink text-xl'>
        🔍
      </div>
      <h3 className={`${offbit.className} text-lg font-bold text-ink`}>{title}</h3>
      <p className={`${offbit.className} text-xs text-ink-muted max-w-sm`}>{message}</p>
      {onReset && (
        <PixelButton onClick={onReset} className='mt-2 !px-5 !py-2 !text-xs'>
          Reset Filters
        </PixelButton>
      )}
    </div>
  )
}