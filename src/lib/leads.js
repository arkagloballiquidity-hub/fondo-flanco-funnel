const STORAGE_KEY = 'fondoflanco_leads'

// Punto único de persistencia de leads.
// 1) Guarda en localStorage (respaldo en el navegador).
// 2) Envía al endpoint serverless /api/lead, que reenvía a Supabase y al
//    grupo de Telegram (los secretos viven en variables de entorno de Vercel).
export async function saveLead(lead) {
  const record = {
    ...lead,
    id:
      (typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID()) ||
      String(Date.now()),
    createdAt: new Date().toISOString(),
  }

  // 1) Respaldo local (siempre)
  try {
    const list = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    list.push(record)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  } catch (e) {
    console.warn('No se pudo guardar el lead localmente:', e)
  }

  // 2) Backend serverless -> Supabase + Telegram
  try {
    await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record),
    })
  } catch (e) {
    console.warn('No se pudo enviar el lead al backend:', e)
  }

  return record
}

// Utilidad para inspeccionar/exportar los leads guardados localmente.
export function getLeads() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}
