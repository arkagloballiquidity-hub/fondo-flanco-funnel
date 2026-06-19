import { LockIcon, CheckIcon } from './Icons.jsx'

// nodes: [{ key, label }]  ·  order: array de keys ·  progress: índice máx desbloqueado
export default function ProgressRail({ nodes, order, progress, activeKey, onJump }) {
  const isUnlocked = (key) => order.indexOf(key) <= progress

  return (
    <>
      {/* Rail vertical (desktop) */}
      <nav
        aria-label="Progreso del recorrido"
        className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
      >
        <ol className="flex flex-col rounded-full border border-line bg-surface/80 px-4 py-5 shadow-soft backdrop-blur">
          {nodes.map((node, i) => {
            const unlocked = isUnlocked(node.key)
            const active = node.key === activeKey
            const last = i === nodes.length - 1
            return (
              <li key={node.key} className="flex flex-col">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    disabled={!unlocked}
                    onClick={() => unlocked && onJump(node.key)}
                    aria-current={active ? 'step' : undefined}
                    className={
                      'flex h-[15px] w-[15px] flex-none items-center justify-center rounded-full border transition-all duration-300 ' +
                      (unlocked ? 'cursor-pointer ' : 'cursor-not-allowed ') +
                      (active
                        ? 'scale-110 border-transparent bg-accent-gradient shadow-[0_0_12px_rgba(139,92,246,0.7)]'
                        : unlocked
                          ? 'border-accent/60 bg-accent/25'
                          : 'border-line bg-mist')
                    }
                  >
                    <span className="sr-only">{node.label}</span>
                  </button>
                  <span
                    className={
                      'whitespace-nowrap text-[0.7rem] uppercase tracking-[0.2em] transition-colors duration-300 ' +
                      (active ? 'text-accent' : unlocked ? 'text-slate' : 'text-muted/60')
                    }
                  >
                    {node.label}
                  </span>
                </div>

                {!last && (
                  <span
                    aria-hidden="true"
                    className={
                      'ml-[7px] h-8 w-px transition-colors duration-500 ' +
                      (i < progress ? 'bg-accent' : 'bg-line')
                    }
                  />
                )}
              </li>
            )
          })}
        </ol>
      </nav>

      {/* Rail superior compacto (móvil) */}
      <nav
        aria-label="Progreso del recorrido"
        className="fixed inset-x-0 top-0 z-40 flex items-center justify-center gap-2 border-b border-line bg-canvas/85 px-4 py-3 backdrop-blur-md lg:hidden"
      >
        {nodes.map((node, i) => {
          const unlocked = isUnlocked(node.key)
          const active = node.key === activeKey
          return (
            <button
              key={node.key}
              type="button"
              disabled={!unlocked}
              onClick={() => unlocked && onJump(node.key)}
              className={'flex items-center gap-2 ' + (unlocked ? 'cursor-pointer' : 'cursor-not-allowed')}
            >
              <span
                className={
                  'flex h-6 w-6 items-center justify-center rounded-full border text-[0.6rem] transition-colors duration-300 ' +
                  (active
                    ? 'border-transparent bg-accent-gradient text-white'
                    : unlocked
                      ? 'border-accent/50 text-accent'
                      : 'border-line text-muted/60')
                }
              >
                {unlocked ? (
                  order.indexOf(node.key) < progress ? (
                    <CheckIcon className="h-3 w-3" />
                  ) : (
                    i + 1
                  )
                ) : (
                  <LockIcon className="h-3 w-3" />
                )}
              </span>
              {active && (
                <span className="text-[0.6rem] uppercase tracking-[0.2em] text-accent">{node.label}</span>
              )}
            </button>
          )
        })}
      </nav>
    </>
  )
}
