import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { productIntro, productQuestions, products } from '../data/funnel.js'
import { computeProduct } from '../lib/scoring.js'
import { Section, UnlockReveal } from './Section.jsx'
import { PrimaryButton, SectionHeader } from './ui.jsx'
import { CheckIcon } from './Icons.jsx'
import Quiz from './Quiz.jsx'

function ProductCard({ product, recommended, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={
        'group relative flex h-full cursor-pointer flex-col rounded-3xl border p-6 text-left transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 ' +
        (selected
          ? 'border-accent bg-surface shadow-ring'
          : 'border-line bg-surface shadow-soft hover:-translate-y-0.5 hover:border-accent/40')
      }
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        {recommended ? (
          <span className="rounded-full bg-accent-gradient px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-white">
            Recomendada
          </span>
        ) : (
          <span className="rounded-full bg-mist px-3 py-1 text-[0.6rem] font-medium uppercase tracking-[0.18em] text-muted">
            Alternativa
          </span>
        )}
        <span
          className={
            'flex h-5 w-5 items-center justify-center rounded-full border transition-colors duration-200 ' +
            (selected ? 'border-transparent bg-accent-gradient text-white' : 'border-muted/40 text-transparent')
          }
        >
          <CheckIcon className="h-3 w-3" />
        </span>
      </div>

      <h4 className="font-display text-xl leading-tight text-ink">{product.name}</h4>
      <p className="mt-1 text-[0.7rem] uppercase tracking-[0.15em] text-accent">{product.sub}</p>

      <div className="my-4">
        <span className="font-display text-3xl text-accent-gradient">{product.metric}</span>
        <span className="ml-2 text-xs text-muted">{product.metricLabel}</span>
      </div>

      <p className="flex-1 text-sm leading-relaxed text-slate">{product.copy}</p>

      <ul className="mt-5 space-y-2">
        {product.points.map((p) => (
          <li key={p} className="flex items-center gap-2 text-xs text-ink">
            <span className="flex h-4 w-4 flex-none items-center justify-center rounded-full bg-accent/12 text-accent">
              <CheckIcon className="h-2.5 w-2.5" />
            </span>
            {p}
          </li>
        ))}
      </ul>
    </button>
  )
}

export default function ProductSection({ profile, onProduct, onContinue }) {
  const [stage, setStage] = useState('intro')
  const [recommended, setRecommended] = useState(null)
  const [selectedKey, setSelectedKey] = useState(null)

  const handleComplete = (answers) => {
    const result = computeProduct(answers, profile)
    setRecommended(result)
    setSelectedKey(result.key)
    onProduct?.(result)
    setStage('result')
  }

  const confirm = () => {
    onProduct?.(products[selectedKey])
    onContinue?.()
  }

  // Recomendada primero, luego las otras dos
  const ordered = recommended
    ? [recommended, ...Object.values(products).filter((p) => p.key !== recommended.key)]
    : []

  return (
    <Section id="product">
      <UnlockReveal>
        <AnimatePresence mode="wait">
          {stage === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl card p-8 md:p-12"
            >
              <SectionHeader
                eyebrow={productIntro.eyebrow}
                title={productIntro.title}
                body={productIntro.body}
              />
              <div className="mt-8">
                <PrimaryButton onClick={() => setStage('quiz')}>{productIntro.cta}</PrimaryButton>
              </div>
            </motion.div>
          )}

          {stage === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45 }}
            >
              <Quiz questions={productQuestions} onComplete={handleComplete} />
            </motion.div>
          )}

          {stage === 'result' && recommended && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-3xl card card-accent p-6 md:p-10"
            >
              <div className="text-center">
                <p className="eyebrow mb-3 justify-center">Tu perfil encaja con esto</p>
                <h3 className="font-display text-2xl leading-tight text-ink md:text-4xl">
                  Tienes {ordered.length} cuentas disponibles
                </h3>
                <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate md:text-base">
                  Marcamos la recomendada para tu perfil, pero puedes elegir la que prefieras.
                </p>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {ordered.map((p) => (
                  <ProductCard
                    key={p.key}
                    product={p}
                    recommended={p.key === recommended.key}
                    selected={p.key === selectedKey}
                    onSelect={() => setSelectedKey(p.key)}
                  />
                ))}
              </div>

              <div className="mt-9 flex flex-col items-center gap-3">
                <PrimaryButton onClick={confirm}>
                  Quiero la {products[selectedKey]?.name}
                </PrimaryButton>
                <p className="text-xs uppercase tracking-[0.2em] text-muted/70">
                  Podrás afinar los detalles con tu asesor
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </UnlockReveal>
    </Section>
  )
}
