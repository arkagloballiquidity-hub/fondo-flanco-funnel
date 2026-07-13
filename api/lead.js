// Serverless (Vercel) · Recibe un lead del funnel, lo inserta en Supabase
// y lo notifica al grupo de Telegram. Los secretos van en variables de entorno
// de Vercel — nunca en el repositorio.
//
// Variables de entorno requeridas:
//   TELEGRAM_BOT_TOKEN          token del bot @Multiplofx_bot
//   SUPABASE_SERVICE_ROLE_KEY   service_role key del proyecto Supabase
// Opcionales (tienen default):
//   TELEGRAM_CHAT_ID            (default: grupo "Multiplo")
//   SUPABASE_URL                (default: proyecto ya creado)
//   SUPABASE_TABLE              (default: funnel_leads)

const FUNNEL = 'Múltiplo · Light'

const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '-5412686365'
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://xfdowgfemuwsgvnwpgie.supabase.co'
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const SUPABASE_TABLE = process.env.SUPABASE_TABLE || 'funnel_leads'

function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  let lead = req.body
  if (typeof lead === 'string') {
    try {
      lead = JSON.parse(lead)
    } catch {
      lead = {}
    }
  }
  lead = lead || {}

  const record = {
    name: lead.name || null,
    phone: lead.phone || null,
    email: lead.email || null,
    country: lead.country || null,
    account: lead.account || null,
    profile: lead.profile || null,
    source: lead.source || 'funnel-web',
    funnel: FUNNEL,
  }

  const results = { supabase: 'skipped', telegram: 'skipped' }

  // 1) Supabase (insert vía PostgREST)
  if (SUPABASE_KEY) {
    try {
      const r = await fetch(`${SUPABASE_URL}/rest/v1/${SUPABASE_TABLE}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          Prefer: 'return=minimal',
        },
        body: JSON.stringify(record),
      })
      results.supabase = r.ok ? 'ok' : `error ${r.status}: ${await r.text()}`
    } catch (e) {
      results.supabase = 'error: ' + String(e)
    }
  }

  // 2) Telegram (mensaje al grupo)
  if (TELEGRAM_TOKEN) {
    try {
      const text =
        `🟢 <b>Nuevo lead · ${esc(FUNNEL)}</b>\n\n` +
        `👤 <b>${esc(record.name)}</b>\n` +
        `📱 ${esc(record.phone)}\n` +
        (record.email ? `✉️ ${esc(record.email)}\n` : '') +
        (record.profile ? `🧭 Perfil: ${esc(record.profile)}\n` : '') +
        (record.account ? `💼 Cuenta: ${esc(record.account)}\n` : '') +
        (record.country ? `🌎 País: ${esc(record.country)}\n` : '') +
        `🔗 Origen: ${esc(record.source)}`
      const r = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text, parse_mode: 'HTML' }),
      })
      results.telegram = r.ok ? 'ok' : `error ${r.status}: ${await r.text()}`
    } catch (e) {
      results.telegram = 'error: ' + String(e)
    }
  }

  return res.status(200).json({ ok: true, results })
}
