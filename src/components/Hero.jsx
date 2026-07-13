import { motion } from 'framer-motion'
import { hero } from '../data/funnel.js'
import { PrimaryButton } from './ui.jsx'
import { ChevronDown } from './Icons.jsx'
import Brand from './Brand.jsx'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}
const item = {
  hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Hero({ onStart }) {
  return (
    <section
      id="hero"
      data-rail="hero"
      className="relative flex min-h-[100svh] flex-col items-center justify-center px-5 py-24 text-center"
    >
      {/* Marca */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-14 flex items-center gap-2.5 lg:top-9"
      >
        <Brand size="h-9" />
      </motion.div>

      <motion.div variants={container} initial="hidden" animate="show" className="max-w-4xl">
        <motion.p variants={item} className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/70 px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-accent shadow-soft backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-gradient" />
          {hero.eyebrow}
        </motion.p>

        <h1 className="font-display text-[2rem] leading-[1.12] text-ink sm:text-5xl md:text-[3.6rem] md:leading-[1.08]">
          {hero.headline.map((line, i) => (
            <motion.span key={i} variants={item} className="block">
              {i === hero.headline.length - 1 ? (
                <span className="text-accent-gradient">{line}</span>
              ) : (
                line
              )}
            </motion.span>
          ))}
        </h1>

        <motion.p
          variants={item}
          className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-slate md:text-lg"
        >
          {hero.sub}
        </motion.p>

        <motion.div variants={item} className="mt-11">
          <PrimaryButton onClick={onStart}>{hero.cta}</PrimaryButton>
        </motion.div>
      </motion.div>

      {/* Hint de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 flex flex-col items-center gap-2 text-muted"
      >
        <span className="text-[0.65rem] uppercase tracking-[0.3em]">Desbloquea tu perfil</span>
        <motion.span
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-5 w-5" />
        </motion.span>
      </motion.div>
    </section>
  )
}
