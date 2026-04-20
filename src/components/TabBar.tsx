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
    <div>
      <div className="flex w-full items-stretch divide-x divide-black/[0.12]">
        {VIEWS.map((v) => {
          const isActive = v === active
          const isPressed = pressed === v
          return (
            <button
              key={v}
              onClick={() => onSelect(v)}
              className="relative flex-1 text-center"
              style={{ transform: isPressed ? 'scale(0.99)' : 'scale(1)' }}
            >
              <div
                className={`px-6 py-5 text-[15px] transition-colors duration-200 ${
                  isActive
                    ? 'font-medium text-[#111827]'
                    : 'bg-white text-[#9ca3af] hover:text-[#4b5563]'
                }`}
              >
                {LABELS[v]}
              </div>

              {/* Progress track */}
              <div className="relative h-[2px] bg-transparent">
                {isActive && (
                  <span
                    key={`${active}-${paused}`}
                    className="absolute top-0 left-0 h-full bg-[#111827]"
                    style={{
                      animation: `progressFill ${duration}ms linear forwards`,
                      animationPlayState: paused ? 'paused' : 'running',
                    }}
                  />
                )}
              </div>
            </button>
          )
        })}

        <button
          onClick={onTogglePause}
          aria-label={paused ? 'Play animation' : 'Pause animation'}
          className="flex w-14 shrink-0 items-center justify-center bg-white text-[#6b7280] transition-colors hover:bg-[#f3f4f6] hover:text-[#111827]"
        >
          {paused ? (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
              <path d="M3 2l9 5-9 5z" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
              <rect x="3" y="2" width="3" height="10" rx="0.5" />
              <rect x="8" y="2" width="3" height="10" rx="0.5" />
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}
