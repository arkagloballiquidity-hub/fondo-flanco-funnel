import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { trust, BRAND } from '../data/funnel.js'
import { CountUp, SectionHeader } from './ui.jsx'
import { ShieldIcon, ChartIcon, ChevronDown, LogoMark } from './Icons.jsx'

const reveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
}

function Regulation() {
  const { regulation } = trust
  return (
    <motion.div {...reveal} className="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-20">
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <div>
          <p className="eyebrow mb-4">{regulation.eyebrow}</p>
          <h2 className="font-display text-3xl leading-tight text-ink md:text-4xl">{regulation.title}</h2>
          <p className="mt-5 text-base leading-relaxed text-slate md:text-lg">{regulation.body}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {regulation.badges.map((b) => (
            <div key={b.title} className="rounded-2xl card p-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
                <ShieldIcon className="h-5 w-5" />
              </span>
              <p className="mt-4 text-sm font-medium text-ink">{b.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-slate">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function Team() {
  const { team } = trust
  return (
    <motion.div {...reveal} className="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-20">
      <SectionHeader eyebrow={team.eyebrow} title={team.title} align="center" />
      <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
        {team.members.map((m) => (
          <div
            key={m.name}
            className="group rounded-2xl card p-6 text-center transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-accent/30 bg-accent/[0.06] font-display text-xl text-accent-gradient">
              {m.initials}
            </div>
            <p className="mt-4 text-sm font-medium text-ink">{m.name}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.15em] text-muted">{m.role}</p>
          </div>
        ))}
      </div>
      <p className="mt-6 text-center text-xs uppercase tracking-[0.2em] text-muted/60">
        Imágenes y nombres del equipo · placeholder
      </p>
    </motion.div>
  )
}

function EquityCurve({ data }) {
  const w = 320
  const h = 140
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w
    const y = h - ((v - min) / range) * (h - 24) - 12
    return [x, y]
  })
  const line = pts.map((p) => p.join(',')).join(' ')
  const area = `0,${h} ${line} ${w},${h}`
  const [lastX, lastY] = pts[pts.length - 1]

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      className="h-full w-full overflow-visible"
      role="img"
      aria-label="Curva de equity histórica ilustrativa"
    >
      <defs>
        <linearGradient id="equityFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="equityStroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#A855F7" />
        </linearGradient>
      </defs>

      {/* Área de relleno (estática, siempre visible) */}
      <polygon points={area} fill="url(#equityFill)" />

      {/* Línea (se dibuja al montar la sección) */}
      <motion.polyline
        points={line}
        fill="none"
        stroke="url(#equityStroke)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.6, ease: 'easeInOut' }}
      />

      {/* Punto final */}
      <circle cx={lastX} cy={lastY} r="3.5" fill="#8B5CF6" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

function TrackRecord() {
  const { track } = trust
  return (
    <motion.div {...reveal} className="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-20">
      <div className="rounded-3xl card card-accent p-8 md:p-12">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="eyebrow mb-4">{track.eyebrow}</p>
            <h2 className="font-display text-3xl leading-tight text-ink md:text-4xl">{track.title}</h2>
            <div className="mt-8 grid grid-cols-2 gap-6">
              {track.stats.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-4xl text-accent-gradient md:text-5xl">
                    <CountUp value={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-1 text-xs leading-snug text-slate">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-line bg-mist/60 p-5">
            <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate">
              <ChartIcon className="h-4 w-4 text-accent" />
              Equity histórico (ilustrativo)
            </div>
            <div className="h-36">
              <EquityCurve data={track.curve} />
            </div>
          </div>
        </div>
        <p className="mt-8 text-xs leading-relaxed text-muted">{track.disclaimer}</p>
      </div>
    </motion.div>
  )
}

function Testimonials() {
  const { testimonials } = trust
  return (
    <motion.div {...reveal} className="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-20">
      <SectionHeader eyebrow={testimonials.eyebrow} title={testimonials.title} align="center" />
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {testimonials.items.map((t) => (
          <figure key={t.initials} className="flex flex-col rounded-2xl card p-7">
            <div className="mb-4 font-display text-3xl leading-none text-accent/40">“</div>
            <blockquote className="flex-1 text-sm leading-relaxed text-ink">{t.text}</blockquote>
            <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-accent/30 bg-accent/[0.06] text-xs font-medium text-accent">
                {t.initials}
              </span>
              <span className="text-xs uppercase tracking-[0.15em] text-muted">{t.city}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </motion.div>
  )
}

function FaqItem({ item, open, onToggle }) {
  return (
    <div className="border-b border-line">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left transition-colors duration-200 hover:text-accent"
      >
        <span className="text-base font-medium text-ink md:text-lg">{item.q}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }} className="flex-none text-accent">
          <ChevronDown className="h-5 w-5" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-5 pr-8 text-sm leading-relaxed text-slate">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Faqs() {
  const { faqs } = trust
  const [open, setOpen] = useState(0)
  return (
    <motion.div {...reveal} className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-20">
      <SectionHeader eyebrow={faqs.eyebrow} title={faqs.title} align="center" />
      <div className="mt-10">
        {faqs.items.map((item, i) => (
          <FaqItem key={item.q} item={item} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
        ))}
      </div>
    </motion.div>
  )
}

export default function TrustSection() {
  return (
    <div id="trust" data-rail="trust" className="scroll-mt-24">
      <div className="mx-auto h-px max-w-5xl bg-accent-line" />
      <Regulation />
      <Team />
      <TrackRecord />
      <Testimonials />
      <Faqs />
      <footer className="border-t border-line py-10 text-center">
        <div className="flex items-center justify-center gap-2.5">
          <LogoMark className="h-6 w-6" />
          <p className="font-display text-lg font-semibold tracking-[0.18em] text-ink">{BRAND.name.toUpperCase()}</p>
        </div>
        <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted">{BRAND.tagline}</p>
        <p className="mx-auto mt-4 max-w-md px-6 text-[0.7rem] leading-relaxed text-muted/70">
          Inversiones de riesgo. Los rendimientos históricos no garantizan resultados futuros. Este sitio no
          constituye asesoría financiera personalizada.
        </p>
      </footer>
    </div>
  )
}
