import { motion } from 'framer-motion'

// Envoltura de cada sección mayor del funnel.
export function Section({ id, children, className = '' }) {
  return (
    <section
      id={id}
      data-rail={id}
      className={'relative mx-auto w-full max-w-5xl scroll-mt-24 px-5 py-16 md:px-8 md:py-24 ' + className}
    >
      {children}
    </section>
  )
}

// Revelado al desbloquear una sección.
export function UnlockReveal({ children, sweep = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      {sweep && (
        <motion.span
          aria-hidden="true"
          initial={{ scaleY: 0, opacity: 0.6 }}
          animate={{ scaleY: 1, opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          style={{ transformOrigin: 'top' }}
          className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-full rounded-[2rem] bg-gradient-to-b from-accent/15 via-accent/5 to-transparent"
        />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
