import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { conversion, WHATSAPP_NUMBER, BRAND } from '../data/funnel.js'
import { countries, DEFAULT_COUNTRY, dialFor } from '../data/countries.js'
import { saveLead } from '../lib/leads.js'
import { Section, UnlockReveal } from './Section.jsx'
import { PrimaryButton } from './ui.jsx'
import { WhatsappIcon, CheckIcon, ChevronDown } from './Icons.jsx'

const fieldBase =
  'w-full rounded-xl border bg-surface px-4 py-3 text-sm text-ink outline-none transition-colors duration-200 placeholder:text-muted/50 focus:border-accent focus:ring-2 focus:ring-accent/15'

function Field({ id, label, type = 'text', value, onChange, error, placeholder, autoComplete, inputMode }) {
  return (
    <div className="text-left">
      <label htmlFor={id} className="mb-1.5 block text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-slate">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={fieldBase + ' ' + (error ? 'border-red-400' : 'border-line')}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  )
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Detección de país por IP (sin API key). Cae a un segundo proveedor y, si todo
// falla, se queda con el país por defecto.
async function detectCountry() {
  const sources = [
    ['https://ipapi.co/json/', (d) => d.country_code],
    ['https://ipwho.is/', (d) => d.country_code],
  ]
  for (const [url, pick] of sources) {
    try {
      const res = await fetch(url)
      if (!res.ok) continue
      const data = await res.json()
      const code = pick(data)
      if (code) return code
    } catch {
      /* siguiente proveedor */
    }
  }
  return null
}

export default function ConversionSection({ product, profile }) {
  const [form, setForm] = useState({
    name: '',
    country: DEFAULT_COUNTRY,
    phone: '',
    email: '',
    consent: false,
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const countryTouched = useRef(false)

  // Autoseleccionar país por IP al abrir (si el usuario no lo cambió aún).
  useEffect(() => {
    let active = true
    detectCountry().then((code) => {
      if (!active || !code || countryTouched.current) return
      if (countries.some((c) => c.code === code)) {
        setForm((f) => ({ ...f, country: code }))
      }
    })
    return () => {
      active = false
    }
  }, [])

  const productName = product?.name || 'cuenta de gestión'
  const profileName = profile?.name
  const dial = dialFor(form.country)
  const fullPhone = form.phone ? `${dial} ${form.phone.trim()}` : ''

  const waMessage =
    `Hola, soy ${form.name || '[nombre]'}. Completé mi perfil en ${BRAND.name}` +
    (profileName ? ` (${profileName})` : '') +
    `, me interesa la ${productName}` +
    (fullPhone ? `. Mi WhatsApp: ${fullPhone}` : '') +
    '. Me gustaría recibir más información.'
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMessage)}`

  const update = (key) => (e) => {
    const val = key === 'consent' ? e.target.checked : e.target.value
    if (key === 'country') countryTouched.current = true
    setForm((f) => ({ ...f, [key]: val }))
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const validate = () => {
    const next = {}
    if (form.name.trim().length < 2) next.name = 'Ingresa tu nombre.'
    if (form.phone.replace(/\D/g, '').length < 7) next.phone = 'Ingresa un número válido.'
    if (form.email && !EMAIL_RE.test(form.email)) next.email = 'Correo no válido.'
    if (!form.consent) next.consent = 'Necesitamos tu autorización para contactarte.'
    return next
  }

  const handleSubmit = async (e) => {
    e?.preventDefault()
    const next = validate()
    if (Object.keys(next).length) {
      setErrors(next)
      return
    }
    setSubmitting(true)
    await saveLead({
      name: form.name.trim(),
      phone: fullPhone,
      country: form.country,
      email: form.email.trim(),
      account: product?.name || null,
      profile: profileName || null,
      source: 'funnel-web',
    })
    setSubmitting(false)
    setSubmitted(true)
    window.open(waHref, '_blank', 'noopener,noreferrer')
  }

  return (
    <Section id="conversion">
      <UnlockReveal>
        <div className="relative overflow-hidden rounded-3xl card card-accent p-8 md:p-14">
          <div className="absolute inset-x-0 top-0 h-1 bg-accent-gradient" aria-hidden="true" />

          {!submitted ? (
            <>
              <div className="text-center">
                <p className="eyebrow mb-5 justify-center">{conversion.eyebrow}</p>
                <h2 className="mx-auto max-w-2xl font-display text-3xl leading-tight text-ink md:text-5xl">
                  {conversion.title}
                </h2>
                <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate md:text-lg">
                  {conversion.body}
                </p>

                {product && (
                  <div className="mx-auto mt-7 inline-flex items-center gap-3 rounded-full border border-accent/25 bg-accent/[0.06] px-5 py-2.5">
                    <span className="h-2 w-2 rounded-full bg-accent animate-pulseAccent" aria-hidden="true" />
                    <span className="text-sm text-slate">
                      Cuenta seleccionada: <span className="font-medium text-ink">{product.name}</span>
                    </span>
                  </div>
                )}
              </div>

              <form onSubmit={handleSubmit} className="mx-auto mt-9 max-w-xl">
                <div className="grid gap-4">
                  <Field
                    id="name"
                    label="Nombre completo"
                    value={form.name}
                    onChange={update('name')}
                    error={errors.name}
                    placeholder="Tu nombre"
                    autoComplete="name"
                  />

                  {/* WhatsApp: código de país + número */}
                  <div className="text-left">
                    <label htmlFor="phone" className="mb-1.5 block text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-slate">
                      WhatsApp
                    </label>
                    <div className="flex gap-2">
                      <div className="relative w-32 flex-none">
                        <select
                          id="country"
                          name="country"
                          value={form.country}
                          onChange={update('country')}
                          autoComplete="tel-country-code"
                          aria-label="Código de país"
                          className="w-full cursor-pointer appearance-none overflow-hidden rounded-xl border border-line bg-surface py-3 pl-3 pr-8 text-sm text-ink outline-none transition-colors duration-200 focus:border-accent focus:ring-2 focus:ring-accent/15"
                        >
                          {countries.map((c) => (
                            <option key={c.code} value={c.code} className="bg-surface text-ink">
                              {c.dial} · {c.name}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                      </div>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        inputMode="tel"
                        value={form.phone}
                        onChange={update('phone')}
                        placeholder="55 1234 5678"
                        autoComplete="tel-national"
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? 'phone-error' : undefined}
                        className={fieldBase + ' flex-1 ' + (errors.phone ? 'border-red-400' : 'border-line')}
                      />
                    </div>
                    {errors.phone && (
                      <p id="phone-error" className="mt-1 text-xs text-red-500">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <Field
                    id="email"
                    label="Email (opcional)"
                    type="email"
                    inputMode="email"
                    value={form.email}
                    onChange={update('email')}
                    error={errors.email}
                    placeholder="tu@correo.com"
                    autoComplete="email"
                  />

                  <div className="text-left">
                    <label className="flex items-start gap-3 text-xs leading-relaxed text-slate">
                      <input
                        type="checkbox"
                        checked={form.consent}
                        onChange={update('consent')}
                        aria-invalid={!!errors.consent}
                        className="mt-0.5 h-4 w-4 flex-none cursor-pointer accent-[#7C3AED]"
                      />
                      <span>
                        Autorizo a {BRAND.name} a contactarme por WhatsApp o correo para darme información
                        sobre mi cuenta. Sin compromiso.
                      </span>
                    </label>
                    {errors.consent && <p className="mt-1 text-xs text-red-500">{errors.consent}</p>}
                  </div>
                </div>

                <div className="mt-8 flex flex-col items-center gap-3">
                  <PrimaryButton
                    type="submit"
                    onClick={handleSubmit}
                    disabled={submitting}
                    icon={<WhatsappIcon className="h-5 w-5" />}
                  >
                    {submitting ? 'Enviando…' : conversion.cta}
                  </PrimaryButton>
                  <p className="text-xs uppercase tracking-[0.2em] text-muted/70">Sin presión · Sin compromisos</p>
                </div>
              </form>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="py-6 text-center"
            >
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-accent">
                <CheckIcon className="h-8 w-8" />
              </div>
              <p className="eyebrow mb-3 justify-center">Registro recibido</p>
              <h2 className="font-display text-3xl leading-tight text-ink md:text-4xl">
                ¡Gracias, {form.name.split(' ')[0]}!
              </h2>
              <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-slate">
                Un asesor oficial te contactará para la <span className="text-ink">{productName}</span>. Si no se
                abrió WhatsApp, puedes hacerlo aquí:
              </p>
              <div className="mt-7">
                <PrimaryButton href={waHref} target="_blank" rel="noopener noreferrer" icon={<WhatsappIcon className="h-5 w-5" />}>
                  Abrir WhatsApp
                </PrimaryButton>
              </div>
            </motion.div>
          )}
        </div>
      </UnlockReveal>
    </Section>
  )
}
