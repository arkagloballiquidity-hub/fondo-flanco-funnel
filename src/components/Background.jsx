// Fondo claro fintech: malla de gradientes indigo/violeta suaves + grid de puntos.
// Capas fijas, no interactivas.
export default function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-canvas">
      {/* Blobs de gradiente (mesh) */}
      <div className="absolute -top-44 -left-32 h-[40rem] w-[40rem] rounded-full bg-accent/20 blur-[150px] animate-drift" />
      <div
        className="absolute top-1/4 -right-40 h-[38rem] w-[38rem] rounded-full bg-accent-violet/20 blur-[150px] animate-floaty"
        style={{ animationDelay: '2s' }}
      />
      <div
        className="absolute -bottom-40 left-1/3 h-[34rem] w-[34rem] rounded-full bg-accent-purple/15 blur-[150px] animate-drift"
        style={{ animationDelay: '4s' }}
      />
      <div
        className="absolute top-1/2 left-0 h-[26rem] w-[26rem] -translate-y-1/2 rounded-full bg-[#38BDF8]/10 blur-[140px] animate-floaty"
        style={{ animationDelay: '6s' }}
      />

      {/* Grid de puntos sutil */}
      <div className="absolute inset-0 grid-dots opacity-70" />

      {/* Lavado superior para mantener el header limpio */}
      <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-canvas via-canvas/70 to-transparent" />
    </div>
  )
}
