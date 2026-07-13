// ⚠️ Reemplazar por el número real de WhatsApp del asesor (formato internacional, sin +, sin espacios)
export const WHATSAPP_NUMBER = '5215555555555'

export const BRAND = {
  name: 'Múltiplo',
  tagline: 'Gestión patrimonial profesional',
}

export const hero = {
  eyebrow: 'Gestión patrimonial · Bróker regulado',
  headline: [
    'Ya invertiste.',
    'Ya perdiste tiempo aprendiendo.',
    'Ya confiaste en alguien que te prometió rendimientos.',
  ],
  sub: 'Lo que estás a punto de ver no es otro trader con capturas de pantalla. Es una mesa de gestión profesional, bajo un bróker regulado, con un modelo que nunca antes te habían ofrecido en Latinoamérica.',
  cta: 'Quiero ver de qué se trata',
}

export const profilingIntro = {
  eyebrow: 'Fase 1 · Perfilamiento',
  title: 'Antes de presentarte nuestros productos, necesitamos conocerte.',
  body: 'Este perfilamiento está basado en los criterios de la CNBV para determinar tu perfil de inversionista. Son 5 preguntas. Toma menos de un minuto.',
  cta: 'Comenzar perfilamiento',
}

// weight = peso para el cálculo de perfil (1 = conservador ... 4 = agresivo)
export const profilingQuestions = [
  {
    id: 'horizon',
    label: 'Horizonte de inversión',
    question:
      '¿Cuánto tiempo estás dispuesto a mantener tu capital invertido sin necesitarlo?',
    options: [
      { text: 'Menos de 6 meses', weight: 1 },
      { text: 'Entre 6 meses y 1 año', weight: 2 },
      { text: 'Entre 1 y 3 años', weight: 3 },
      { text: 'Más de 3 años', weight: 4 },
    ],
  },
  {
    id: 'volatility',
    label: 'Tolerancia a la volatilidad',
    question:
      'Si tu capital bajara temporalmente un 15% en un mes, ¿qué harías?',
    options: [
      { text: 'Retiro inmediato — no puedo permitirme esa pérdida', weight: 1 },
      { text: 'Me preocuparía mucho, pero esperaría a ver', weight: 2 },
      { text: 'Lo aceptaría si tengo claridad de que se puede recuperar', weight: 3 },
      { text: 'No me afecta, entiendo que los mercados fluctúan', weight: 4 },
    ],
  },
  {
    id: 'experience',
    label: 'Experiencia previa',
    question: '¿Cuál es tu experiencia con instrumentos financieros?',
    options: [
      { text: 'Ninguna — apenas estoy explorando', weight: 1 },
      { text: 'Tengo cuentas de ahorro o CETES', weight: 2 },
      { text: 'He invertido en fondos, ETFs o acciones', weight: 3 },
      { text: 'Conozco derivados, opciones o divisas (Forex)', weight: 4 },
    ],
  },
  {
    id: 'goal',
    label: 'Objetivo principal',
    question: '¿Cuál es tu objetivo al invertir?',
    options: [
      { text: 'Proteger mi capital contra la inflación', weight: 1 },
      { text: 'Hacer crecer mi patrimonio a largo plazo', weight: 2 },
      { text: 'Generar ingresos mensuales adicionales', weight: 3 },
      { text: 'Maximizar rendimiento, acepto mayor riesgo', weight: 4 },
    ],
  },
  {
    id: 'amount',
    label: 'Monto disponible',
    question: '¿Con qué capital estarías dispuesto a comenzar?',
    options: [
      { text: 'Menos de $5,000 USD', weight: 1 },
      { text: 'Entre $5,000 y $15,000 USD', weight: 2 },
      { text: 'Entre $15,000 y $50,000 USD', weight: 3 },
      { text: 'Más de $50,000 USD', weight: 4 },
    ],
  },
]

export const profiles = {
  conservador: {
    key: 'conservador',
    name: 'Perfil Conservador',
    copy: 'Tu perfil nos dice que la prioridad es proteger lo que construiste. Hay un producto diseñado exactamente para ti.',
  },
  moderado: {
    key: 'moderado',
    name: 'Perfil Moderado',
    copy: 'Buscas crecimiento, pero con cabeza. Tienes dos caminos que se ajustan perfectamente a tu perfil.',
  },
  dinamico: {
    key: 'dinamico',
    name: 'Perfil Dinámico / Alto',
    copy: 'Estás listo para un modelo de operativa activa. Aquí es donde entra lo bueno.',
  },
}

export const productIntro = {
  eyebrow: 'Fase 2 · Calificación de producto',
  title: 'Perfecto. Ahora afinemos cuál de nuestros tres modelos encaja mejor.',
  body: 'Tres preguntas más para asignarte la mesa correcta.',
  cta: 'Afinar mi producto',
}

// tags = a qué producto suma cada opción
export const productQuestions = [
  {
    id: 'liquidity',
    label: 'Liquidez',
    question: '¿Necesitas poder retirar tu dinero en cualquier momento?',
    options: [
      { text: 'Sí, necesito flexibilidad total', tags: { mensual: 2 } },
      { text: 'Podría dejarlo al menos 12 meses sin tocarlo', tags: { mensual: 1, indices: 1 } },
      { text: 'Puedo comprometer el capital 2 años o más', tags: { compuesto: 2 } },
    ],
  },
  {
    id: 'return',
    label: 'Preferencia de retorno',
    question: '¿Cómo prefieres ver crecer tu dinero?',
    options: [
      { text: 'Retiros mensuales de mis ganancias', tags: { mensual: 2 } },
      { text: 'Que todo se reinvierta y crezca solo con el tiempo', tags: { compuesto: 2 } },
      { text: 'Una combinación: algo mensual y algo acumulado', tags: { mensual: 1, indices: 1 } },
    ],
  },
  {
    id: 'markets',
    label: 'Mercados de interés',
    question: '¿Qué tipo de mercado te genera más confianza?',
    options: [
      { text: 'Divisas (Eurodólar, pares de Forex)', tags: { mensual: 2 } },
      { text: 'Índices globales (S&P 500, Nasdaq)', tags: { indices: 2 } },
      { text: 'Me da igual, confío en el criterio de la mesa', tags: { compuesto: 1 } },
      { text: 'Quiero diversificar en más de uno', tags: { indices: 1, mensual: 1 } },
    ],
  },
]

export const products = {
  compuesto: {
    key: 'compuesto',
    name: 'Cuenta de Interés Compuesto',
    sub: 'Algoritmo propietario · +4 años de track record',
    copy: 'Tu perfil apunta a algo con potencia real a largo plazo. La Cuenta de Interés Compuesto opera con un algoritmo de más de 4 años de track record, diseñado para quienes entienden que el tiempo es el activo más poderoso. Tu dinero trabaja. Tú no tienes que hacer nada.',
    metric: '+4 años',
    metricLabel: 'de track record',
    points: ['Operación 100% automatizada', 'Reinversión compuesta', 'Sin intervención manual'],
  },
  mensual: {
    key: 'mensual',
    name: 'Cuenta Operativa Mensual',
    sub: 'EURUSD + Índices · objetivo 2–4% mensual',
    copy: 'Buscas resultados visibles cada mes. La Cuenta Operativa Semiautomática opera EuroDólar e Índices con objetivo de 2 a 4% mensual. Retiras cuando quieres. La mesa trabaja por ti.',
    metric: '2–4%',
    metricLabel: 'objetivo mensual',
    points: ['Retiros flexibles', 'EURUSD + Índices', 'Gestión semiautomática'],
  },
  indices: {
    key: 'indices',
    name: 'Cuenta de Índices',
    sub: 'S&P 500 + Nasdaq · objetivo 5–12%',
    copy: 'Te mueven los mercados grandes. La operativa de Índices — S&P 500 y Nasdaq — con análisis de flujo de órdenes, macro y opciones. Objetivo: 5 a 12% sobre el capital. Sin complicaciones.',
    metric: '5–12%',
    metricLabel: 'objetivo sobre capital',
    points: ['Order flow + macro', 'S&P 500 y Nasdaq', 'Operativa activa'],
  },
}

export const conversion = {
  eyebrow: 'Fase 3 · Tu cuenta asignada',
  title: 'Un asesor oficial te contactará.',
  body: 'Te explicará los detalles de tu cuenta, el bróker asignado y los pasos para comenzar. Sin presión. Sin compromisos.',
  cta: 'Hablar con un asesor ahora',
}

export const trust = {
  regulation: {
    eyebrow: 'Bróker regulado · HFM',
    title: 'Tu capital opera con HF Markets (HFM), bróker global regulado desde 2010.',
    body: 'Múltiplo es la mesa de gestión; HFM es la infraestructura donde vive tu dinero: licencias internacionales, fondos segregados y más de 2,500,000 cuentas abiertas en más de 180 países.',
    badges: [
      { title: 'FCA · Reino Unido', desc: 'HF Markets (UK) Ltd · Ref. 801701' },
      { title: 'DFSA · Dubái', desc: 'HF Markets (DIFC) Ltd · Lic. F004885' },
      { title: 'FSCA · Sudáfrica', desc: 'HF Markets SA (PTY) Ltd · Lic. 46632' },
      { title: 'Fondos segregados', desc: 'Capital del cliente separado y protegido' },
    ],
  },
  team: {
    eyebrow: 'La mesa de gestión',
    title: 'Personas reales detrás de cada operación.',
    members: [
      { initials: 'HT', name: 'Head Trader', role: 'Dirección de operativa' },
      { initials: 'QA', name: 'Quant Analyst', role: 'Modelos y algoritmos' },
      { initials: 'MA', name: 'Macro Analyst', role: 'Análisis macroeconómico' },
      { initials: 'RM', name: 'Risk Manager', role: 'Gestión de riesgo' },
    ],
  },
  track: {
    eyebrow: 'Track record',
    title: 'Números, no promesas.',
    stats: [
      { value: 4, suffix: '+', label: 'Años de track record' },
      { value: 92, suffix: '%', label: 'Meses en positivo' },
      { value: 3, suffix: '', label: 'Modelos operativos' },
      { value: 24, suffix: '/7', label: 'Monitoreo de mercado' },
    ],
    // curva de equity ilustrativa (0–100)
    curve: [8, 14, 12, 22, 28, 25, 36, 44, 41, 55, 63, 60, 72, 81, 88, 100],
    disclaimer:
      'Rendimientos históricos ilustrativos. Los resultados pasados no garantizan resultados futuros.',
  },
  testimonials: {
    eyebrow: 'Testimonios',
    title: 'Lo que dicen quienes ya están dentro.',
    items: [
      {
        initials: 'L. M.',
        city: 'CDMX',
        text: 'Llevaba años saltando de "gurús" en redes. Aquí por fin entendí dónde está mi dinero y quién lo opera.',
      },
      {
        initials: 'R. G.',
        city: 'Monterrey',
        text: 'La cuenta de interés compuesto es justo lo que buscaba: la dejo trabajar y reviso el reporte cada mes.',
      },
      {
        initials: 'A. V.',
        city: 'Guadalajara',
        text: 'Lo que me convenció fue la segregación de fondos y poder hablar con un asesor real, no un bot.',
      },
    ],
  },
  faqs: {
    eyebrow: 'Preguntas frecuentes',
    title: 'Lo que necesitas saber.',
    items: [
      {
        q: '¿Puedo retirar mi dinero?',
        a: 'Sí. Cada producto tiene sus propias condiciones de liquidez: la Cuenta Operativa Mensual permite retiros flexibles, mientras que la de Interés Compuesto está diseñada para horizontes más largos. Tu asesor te explica los detalles según la cuenta asignada.',
      },
      {
        q: '¿Qué bróker es?',
        a: 'Operamos con HF Markets (HFM), un bróker global fundado en 2010 y regulado por autoridades como la FCA (Reino Unido), la DFSA (Dubái), la FSCA (Sudáfrica) y la FSA (Seychelles). Con más de 2,500,000 cuentas abiertas y presencia en +180 países, la operativa se realiza en MetaTrader 4 y MetaTrader 5.',
      },
      {
        q: '¿Están regulados?',
        a: 'Sí. HFM opera bajo múltiples licencias internacionales (FCA, DFSA, FSCA, FSA, CMA) con auditoría externa y fondos segregados. Además, nuestro perfilamiento sigue los criterios de la CNBV para clasificar tu perfil de inversionista.',
      },
      {
        q: '¿Cuánto necesito para empezar?',
        a: 'Depende del producto y de tu perfil. Hay opciones desde montos accesibles; tu asesor te indicará el mínimo de la cuenta que mejor encaja contigo.',
      },
      {
        q: '¿Garantizan rendimientos?',
        a: 'No. Ninguna inversión seria garantiza rendimientos. Trabajamos con objetivos basados en track record histórico, pero los resultados pasados no garantizan resultados futuros.',
      },
      {
        q: '¿Tengo que operar yo mismo?',
        a: 'No. La mesa de gestión opera por ti. Según el producto, la operativa es automatizada o semiautomática; tú solo das seguimiento a tus reportes.',
      },
    ],
  },
}
