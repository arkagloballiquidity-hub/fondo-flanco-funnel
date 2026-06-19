/**
 * Fondo Flanco · Receptor de leads → Google Sheets
 *
 * PASOS PARA CONECTARLO:
 * 1. Crea una hoja de cálculo nueva en Google Sheets (sheets.new).
 * 2. Menú: Extensiones → Apps Script.
 * 3. Borra el contenido por defecto y pega TODO este archivo. Guarda (💾).
 * 4. Botón "Implementar" (Deploy) → Nueva implementación.
 *      - Tipo: Aplicación web
 *      - Descripción: Fondo Flanco leads
 *      - Ejecutar como: Yo (tu cuenta)
 *      - Quién tiene acceso: Cualquier usuario
 *    Autoriza los permisos cuando lo pida.
 * 5. Copia la "URL de la aplicación web" (termina en /exec).
 * 6. En la raíz del proyecto crea un archivo .env con:
 *      VITE_LEADS_ENDPOINT=https://script.google.com/macros/s/XXXXX/exec
 *    Reinicia `npm run dev`. Cada registro caerá en la hoja "Leads".
 */

const SHEET_NAME = 'Leads'
const HEADERS = ['createdAt', 'name', 'phone', 'email', 'account', 'profile', 'source', 'id']

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents)
    const ss = SpreadsheetApp.getActiveSpreadsheet()
    let sheet = ss.getSheetByName(SHEET_NAME)
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME)
    }
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS)
    }
    sheet.appendRow(HEADERS.map((h) => data[h] || ''))
    return ContentService.createTextOutput(
      JSON.stringify({ ok: true })
    ).setMimeType(ContentService.MimeType.JSON)
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err) })
    ).setMimeType(ContentService.MimeType.JSON)
  }
}

function doGet() {
  return ContentService.createTextOutput('Fondo Flanco leads endpoint OK')
}
