const STORAGE_KEY = 'fondoflanco_leads'

// Punto único de persistencia de leads.
// HOY: guarda en localStorage (base interna del navegador) para no perder datos.
// PRODUCCIÓN: conectar aquí un backend real (Supabase / Google Sheets / CRM).
// Define VITE_LEADS_ENDPOINT en .env y se hará POST automáticamente.
export async function saveLead(lead) {
  const record = {
    ...lead,
    id:
      (typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID()) ||
      String(Date.now()),
    createdAt: new Date().toISOString(),
  }

  // 1) Persistencia local (siempre)
  try {
    const list = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    list.push(record)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  } catch (e) {
    console.warn('No se pudo guardar el lead localmente:', e)
  }

  // 2) Backend real (Google Sheets vía Apps Script, si hay endpoint configurado)
  // Nota: usamos Content-Type "text/plain" a propósito. Es una "simple request"
  // que NO dispara preflight CORS, lo cual permite que Google Apps Script reciba
  // el POST sin configuración extra. El script hace JSON.parse(e.postData.contents).
  try {
    const endpoint = import.meta.env?.VITE_LEADS_ENDPOINT
    if (endpoint) {
      await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(record),
      })
    }
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
