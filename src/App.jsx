import { useCallback, useEffect, useRef, useState } from 'react'
import Background from './components/Background.jsx'
import ProgressRail from './components/ProgressRail.jsx'
import Hero from './components/Hero.jsx'
import ProfilingSection from './components/ProfilingSection.jsx'
import ProductSection from './components/ProductSection.jsx'
import ConversionSection from './components/ConversionSection.jsx'
import TrustSection from './components/TrustSection.jsx'
import LockedGate from './components/LockedGate.jsx'

const RAIL = [
  { key: 'hero', label: 'Inicio' },
  { key: 'profiling', label: 'Perfil' },
  { key: 'product', label: 'Producto' },
  { key: 'conversion', label: 'Asesor' },
  { key: 'trust', label: 'Confianza' },
]
const ORDER = RAIL.map((n) => n.key)

const GATES = {
  profiling: { eyebrow: 'Fase 1', label: 'Perfilamiento CNBV' },
  product: { eyebrow: 'Fase 2', label: 'Calificación de producto' },
  conversion: { eyebrow: 'Fase 3', label: 'Tu cuenta asignada' },
  trust: { eyebrow: 'Confianza', label: 'Regulación · Mesa · Track record' },
}

function scrollToId(id) {
  window.requestAnimationFrame(() => {
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 120)
  })
}

export default function App() {
  const [progress, setProgress] = useState(0)
  const [activeKey, setActiveKey] = useState('hero')
  const [profile, setProfile] = useState(null)
  const [product, setProduct] = useState(null)
  const ratios = useRef({})

  const unlock = useCallback((index, scrollKey) => {
    setProgress((p) => Math.max(p, index))
    if (scrollKey) scrollToId(scrollKey)
  }, [])

  // Scrollspy para el rail de progreso
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('[data-rail]'))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          ratios.current[e.target.id] = e.isIntersecting ? e.intersectionRatio : 0
        })
        let best = activeKey
        let bestRatio = 0
        for (const id of Object.keys(ratios.current)) {
          if (ratios.current[id] > bestRatio) {
            bestRatio = ratios.current[id]
            best = id
          }
        }
        if (bestRatio > 0) setActiveKey(best)
      },
      { threshold: [0.15, 0.35, 0.6], rootMargin: '-15% 0px -45% 0px' },
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress])

  const isUnlocked = (key) => ORDER.indexOf(key) <= progress
  const gateFor = (key) => {
    const idx = ORDER.indexOf(key)
    return <LockedGate {...GATES[key]} isNext={idx === progress + 1} />
  }

  return (
    <div className="relative min-h-screen">
      <Background />
      <ProgressRail
        nodes={RAIL}
        order={ORDER}
        progress={progress}
        activeKey={activeKey}
        onJump={scrollToId}
      />

      <main>
        <Hero onStart={() => unlock(1, 'profiling')} />

        {isUnlocked('profiling') ? (
          <ProfilingSection
            onProfile={setProfile}
            onContinue={() => unlock(2, 'product')}
          />
        ) : (
          gateFor('profiling')
        )}

        {isUnlocked('product') ? (
          <ProductSection
            profile={profile}
            onProduct={setProduct}
            onContinue={() => unlock(4, 'conversion')}
          />
        ) : (
          gateFor('product')
        )}

        {isUnlocked('conversion') ? (
          <ConversionSection product={product} profile={profile} />
        ) : (
          gateFor('conversion')
        )}

        {isUnlocked('trust') ? <TrustSection /> : gateFor('trust')}
      </main>
    </div>
  )
}
