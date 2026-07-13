import symbol from '../assets/logo-symbol.png'

// Lockup de marca Múltiplo: símbolo oficial + wordmark (tema claro).
export default function Brand({ size = 'h-7', className = '', showName = true }) {
  return (
    <span className={'inline-flex items-center gap-2.5 ' + className}>
      <img src={symbol} alt="Múltiplo" className={size + ' w-auto select-none'} />
      {showName && (
        <span className="font-display text-lg font-semibold tracking-[0.18em] text-ink">MÚLTIPLO</span>
      )}
    </span>
  )
}
