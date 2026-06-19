import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { profilingIntro, profilingQuestions } from '../data/funnel.js'
import { computeProfile } from '../lib/scoring.js'
import { Section, UnlockReveal } from './Section.jsx'
import { PrimaryButton, SectionHeader } from './ui.jsx'
import Quiz from './Quiz.jsx'

export default function ProfilingSection({ onProfile, onContinue }) {
  const [stage, setStage] = useState('intro') // intro | quiz | result
  const [profile, setProfile] = useState(null)

  const handleComplete = (answers) => {
    const result = computeProfile(answers)
    setProfile(result)
    onProfile?.(result)
    setStage('result')
  }

  return (
    <Section id="profiling">
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
                eyebrow={profilingIntro.eyebrow}
                title={profilingIntro.title}
                body={profilingIntro.body}
              />
              <div className="mt-8">
                <PrimaryButton onClick={() => setStage('quiz')}>{profilingIntro.cta}</PrimaryButton>
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
              <Quiz questions={profilingQuestions} onComplete={handleComplete} />
            </motion.div>
          )}

          {stage === 'result' && profile && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-3xl card card-accent p-8 text-center md:p-14"
            >
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                style={{ transformOrigin: 'center' }}
                className="mx-auto mb-7 h-px w-32 bg-accent-line"
              />
              <p className="eyebrow mb-4 justify-center">Tu resultado</p>
              <h3 className="font-display text-3xl text-accent-gradient md:text-5xl">{profile.name}</h3>
              <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate md:text-lg">
                {profile.copy}
              </p>
              <div className="mt-9">
                <PrimaryButton onClick={onContinue}>Calificar mi producto</PrimaryButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </UnlockReveal>
    </Section>
  )
}
