import { motion } from 'framer-motion'
import { LockIcon } from './Icons.jsx'

export default function LockedGate({ eyebrow, label, isNext }) {
  return (
    <div className="relative mx-auto w-full max-w-5xl px-5 py-8 md:px-8">
      <div
        className={
          'relative overflow-hidden rounded-3xl p-8 md:p-12 transition-all duration-500 ' +
          (isNext ? 'card card-accent' : 'card opacity-70')
        }
      >
        {/* Contenido velado */}
        <div className="space-y-4 blur-[6px] [mask-image:linear-gradient(to_bottom,black,transparent)] select-none" aria-hidden="true">
          <div className="h-3 w-40 rounded-full bg-mist" />
          <div className="h-9 w-3/4 rounded-full bg-mist" />
          <div className="h-9 w-2/3 rounded-full bg-mist" />
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="h-16 rounded-2xl bg-mist" />
            <div className="h-16 rounded-2xl bg-mist" />
          </div>
        </div>

        {/* Capa de bloqueo */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <motion.div
            animate={isNext ? { scale: [1, 1.06, 1] } : {}}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            className={
              'flex h-14 w-14 items-center justify-center rounded-full border ' +
              (isNext ? 'border-accent/40 bg-accent/10 text-accent' : 'border-line bg-mist text-muted')
            }
          >
            <LockIcon className="h-6 w-6" />
          </motion.div>
          {eyebrow && <p className="eyebrow mt-5">{eyebrow}</p>}
          <p className="mt-2 font-display text-xl text-ink md:text-2xl">{label}</p>
          <p className="mt-2 text-xs uppercase tracking-[0.25em] text-muted">
            {isNext ? 'Completa el paso anterior para desbloquear' : 'Bloqueado'}
          </p>
        </div>
      </div>
    </div>
  )
}
