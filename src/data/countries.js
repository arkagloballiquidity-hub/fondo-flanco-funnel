// code = ISO 3166-1 alpha-2 · dial = prefijo telefónico
// Orden: México primero, resto de Latinoamérica, luego internacionales.
export const countries = [
  { code: 'MX', name: 'México', dial: '+52' },
  { code: 'AR', name: 'Argentina', dial: '+54' },
  { code: 'BO', name: 'Bolivia', dial: '+591' },
  { code: 'BR', name: 'Brasil', dial: '+55' },
  { code: 'CL', name: 'Chile', dial: '+56' },
  { code: 'CO', name: 'Colombia', dial: '+57' },
  { code: 'CR', name: 'Costa Rica', dial: '+506' },
  { code: 'CU', name: 'Cuba', dial: '+53' },
  { code: 'DO', name: 'República Dominicana', dial: '+1' },
  { code: 'EC', name: 'Ecuador', dial: '+593' },
  { code: 'SV', name: 'El Salvador', dial: '+503' },
  { code: 'GT', name: 'Guatemala', dial: '+502' },
  { code: 'HN', name: 'Honduras', dial: '+504' },
  { code: 'NI', name: 'Nicaragua', dial: '+505' },
  { code: 'PA', name: 'Panamá', dial: '+507' },
  { code: 'PY', name: 'Paraguay', dial: '+595' },
  { code: 'PE', name: 'Perú', dial: '+51' },
  { code: 'PR', name: 'Puerto Rico', dial: '+1' },
  { code: 'UY', name: 'Uruguay', dial: '+598' },
  { code: 'VE', name: 'Venezuela', dial: '+58' },
  { code: 'ES', name: 'España', dial: '+34' },
  { code: 'US', name: 'Estados Unidos', dial: '+1' },
  { code: 'CA', name: 'Canadá', dial: '+1' },
  { code: 'GB', name: 'Reino Unido', dial: '+44' },
  { code: 'FR', name: 'Francia', dial: '+33' },
  { code: 'DE', name: 'Alemania', dial: '+49' },
  { code: 'IT', name: 'Italia', dial: '+39' },
  { code: 'PT', name: 'Portugal', dial: '+351' },
]

export const DEFAULT_COUNTRY = 'MX'

export function dialFor(code) {
  return countries.find((c) => c.code === code)?.dial || '+52'
}
