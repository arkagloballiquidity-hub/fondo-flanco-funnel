import { useEffect, useRef, useState } from 'react'
import { ArrowIcon } from './Icons.jsx'

export function PrimaryButton({ children, onClick, href, target, rel, icon, type = 'button', disabled, className = '' }) {
  const content = (
    <span className="relative z-10 flex items-center justify-center gap-2.5">
      {children}
      {icon ?? <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />}
    </span>
  )
  const cls =
    'group relative inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-full bg-accent-gradient px-8 py-4 text-sm font-semibold uppercase tracking-widest text-white shadow-accent transition-transform duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-light focus-visible:ring-offset-2 focus-visible:ring-offset-canvas ' +
    (disabled ? 'pointer-events-none opacity-60 ' : '') +
    className

  const shimmer = (
    <span
      aria-hidden="true"
      className="absolute inset-0 -translate-x-full bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.45),transparent)] transition-transform duration-700 group-hover:translate-x-full"
    />
  )

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={cls}>
        {shimmer}
        {content}
      </a>
    )
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {shimmer}
      {content}
    </button>
  )
}

export function GhostButton({ children, onClick, className = '' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        'inline-flex cursor-pointer items-center gap-2 rounded-full border border-line bg-surface px-5 py-2.5 text-xs font-medium uppercase tracking-widest text-slate transition-colors duration-200 hover:border-accent/50 hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 ' +
        className
      }
    >
      {children}
    </button>
  )
}

export function CountUp({ value, suffix = '', duration = 1600 }) {
  const [display, setDisplay] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setDisplay(value)
      return
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true
            const start = performance.now()
            const tick = (now) => {
              const t = Math.min((now - start) / duration, 1)
              const eased = 1 - Math.pow(1 - t, 3)
              setDisplay(Math.round(eased * value))
              if (t < 1) requestAnimationFrame(tick)
            }
            requestAnimationFrame(tick)
          }
        })
      },
      { threshold: 0.4 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [value, duration])

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  )
}

export function SectionHeader({ eyebrow, title, body, align = 'left' }) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      {eyebrow && <p className={'eyebrow mb-4 ' + (align === 'center' ? 'justify-center' : '')}>{eyebrow}</p>}
      <h2 className="font-display text-3xl leading-tight text-ink md:text-5xl">{title}</h2>
      {body && <p className="mt-5 text-base leading-relaxed text-slate md:text-lg">{body}</p>}
    </div>
  )
}
