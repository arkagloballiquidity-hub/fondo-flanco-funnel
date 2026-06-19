import { profiles, products } from '../data/funnel.js'

// answers: array de opciones elegidas (con .weight) en orden de profilingQuestions
export function computeProfile(answers) {
  const total = answers.reduce((sum, opt) => sum + (opt?.weight || 0), 0)
  // 5 preguntas × peso 1–4 → rango 5–20
  if (total <= 9) return profiles.conservador
  if (total <= 15) return profiles.moderado
  return profiles.dinamico
}

// answers: opciones elegidas (con .tags) en orden de productQuestions
export function computeProduct(answers, profile) {
  const scores = { compuesto: 0, mensual: 0, indices: 0 }

  answers.forEach((opt) => {
    if (!opt?.tags) return
    for (const key of Object.keys(opt.tags)) {
      scores[key] += opt.tags[key]
    }
  })

  // El perfil inclina ligeramente la balanza
  if (profile?.key === 'conservador') scores.compuesto += 1
  if (profile?.key === 'dinamico') scores.indices += 1

  // Orden de desempate
  const priority = ['compuesto', 'mensual', 'indices']
  let best = priority[0]
  for (const key of priority) {
    if (scores[key] > scores[best]) best = key
  }
  return products[best]
}
