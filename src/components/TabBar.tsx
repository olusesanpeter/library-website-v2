import type { View } from './types'

const VIEWS: View[] = ['document', 'publish', 'ask', 'mcps']
const LABELS: Record<View, string> = {
  document: 'Document',
  publish: 'Publish',
  ask: 'Ask with AI',
  mcps: 'MCPs',
}

export function TabBar({
  active,
  pressed,
  onSelect,
  paused,
  onTogglePause,
  duration = 5500,
}: {
  active: View
  pressed: View | null
  onSelect: (v: View) => void
  paused: boolean
  onTogglePause: () => void
  duration?: number
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
      {VIEWS.map((v) => {
        const isActive = v === active
        const isPressed = pressed === v
        return (
          <button
            key={v}
            onClick={() => onSelect(v)}
            className="group relative flex flex-col items-start transition-opacity"
            style={{ transform: isPressed ? 'scale(0.99)' : 'scale(1)' }}
          >
            <span
              className={`text-[32px] font-medium tracking-[-0.02em] leading-[1.1] transition-colors duration-200 ${
                isActive
                  ? 'text-[#0f172a]'
                  : 'text-[#9ca3af] hover:text-[#4b5563]'
              }`}
            >
              {LABELS[v]}
            </span>
            <span className="mt-2 block h-[2px] w-full bg-transparent">
              {isActive && (
                <span
                  key={`${active}-${paused}`}
                  className="block h-full bg-[#0f172a]"
                  style={{
                    animation: `progressFill ${duration}ms linear forwards`,
                    animationPlayState: paused ? 'paused' : 'running',
                  }}
                />
              )}
            </span>
          </button>
        )
      })}

      <button
        onClick={onTogglePause}
        aria-label={paused ? 'Play animation' : 'Pause animation'}
        className="ml-auto flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.08] bg-white text-[#6b7280] transition-colors hover:bg-[#f3f4f6] hover:text-[#111827]"
      >
        {paused ? (
          <svg width="12" height="12" viewBox="0 0 14 14" fill="currentColor">
            <path d="M3 2l9 5-9 5z" />
          </svg>
        ) : (
          <svg width="12" height="12" viewBox="0 0 14 14" fill="currentColor">
            <rect x="3" y="2" width="3" height="10" rx="0.5" />
            <rect x="8" y="2" width="3" height="10" rx="0.5" />
          </svg>
        )}
      </button>
    </div>
  )
}
