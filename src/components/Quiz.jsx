import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckIcon } from './Icons.jsx'

const variants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
  center: { opacity: 1, x: 0 },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
}

export default function Quiz({ questions, onComplete }) {
  const [index, setIndex] = useState(0)
  const [selections, setSelections] = useState({})
  const [dir, setDir] = useState(1)
  const [locked, setLocked] = useState(false)

  const q = questions[index]
  const total = questions.length
  const selected = selections[index]
  const filled = (Object.keys(selections).length / total) * 100

  const choose = (opt) => {
    if (locked) return
    const next = { ...selections, [index]: opt }
    setSelections(next)
    setLocked(true)
    setDir(1)
    window.setTimeout(() => {
      if (index < total - 1) {
        setIndex(index + 1)
      } else {
        onComplete(questions.map((_, i) => next[i]))
      }
      setLocked(false)
    }, 450)
  }

  const back = () => {
    if (index === 0 || locked) return
    setDir(-1)
    setIndex(index - 1)
  }

  return (
    <div className="rounded-3xl card card-accent p-6 md:p-10">
      {/* Barra de progreso */}
      <div className="mb-8 flex items-center gap-4">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-mist">
          <motion.div
            className="h-full rounded-full bg-accent-gradient"
            initial={false}
            animate={{ width: `${filled}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
        <span className="text-xs font-medium tabular-nums tracking-widest text-muted">
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
      </div>

      <div className="relative min-h-[22rem]">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={index}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="eyebrow mb-3">{q.label}</p>
            <h3 className="font-display text-2xl leading-snug text-ink md:text-3xl">{q.question}</h3>

            <div className="mt-7 grid gap-3">
              {q.options.map((opt) => {
                const isSel = selected?.text === opt.text
                return (
                  <button
                    key={opt.text}
                    type="button"
                    onClick={() => choose(opt)}
                    className={
                      'group flex w-full cursor-pointer items-center gap-4 rounded-2xl border px-5 py-4 text-left transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 ' +
                      (isSel
                        ? 'border-accent bg-accent/[0.07] text-ink shadow-soft'
                        : 'border-line bg-surface text-slate hover:border-accent/40 hover:bg-mist hover:text-ink')
                    }
                  >
                    <span
                      className={
                        'flex h-6 w-6 flex-none items-center justify-center rounded-full border transition-colors duration-200 ' +
                        (isSel
                          ? 'border-transparent bg-accent-gradient text-white'
                          : 'border-muted/40 text-transparent group-hover:border-accent/60')
                      }
                    >
                      <CheckIcon className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-[0.95rem] leading-snug md:text-base">{opt.text}</span>
                  </button>
                )
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button
          type="button"
          onClick={back}
          disabled={index === 0}
          className={
            'text-xs uppercase tracking-[0.2em] transition-colors duration-200 ' +
            (index === 0 ? 'cursor-not-allowed text-muted/40' : 'cursor-pointer text-slate hover:text-accent')
          }
        >
          ← Atrás
        </button>
        <span className="text-xs uppercase tracking-[0.2em] text-muted/60">
          Selecciona una opción para continuar
        </span>
      </div>
    </div>
  )
}
