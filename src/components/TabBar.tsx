import type { View } from './types'

const VIEWS: View[] = ['document', 'publish', 'ask', 'mcps']
const LABELS: Record<View, string> = {
  document: 'Document',
  publish: 'Publish',
  ask: 'Ask',
  mcps: 'MCPs',
}

export function TabBar({
  active,
  pressed,
  onSelect,
}: {
  active: View
  pressed: View | null
  onSelect: (v: View) => void
}) {
  return (
    <div className="mx-auto flex max-w-[1100px] items-end">
      {VIEWS.map((v) => {
        const isActive = v === active
        const isPressed = pressed === v
        return (
          <button
            key={v}
            onClick={() => onSelect(v)}
            className="relative flex-1 text-center transition-all"
            style={{ transform: isPressed ? 'scale(0.985)' : 'scale(1)' }}
          >
            <div
              className={`px-6 py-5 text-[15px] transition-colors duration-200 ${
                isActive
                  ? 'font-medium text-[#111827]'
                  : 'text-[#9ca3af] hover:text-[#4b5563]'
              }`}
            >
              {LABELS[v]}
            </div>
            <span
              className={`absolute right-0 bottom-0 left-0 h-px transition-colors duration-200 ${
                isActive ? 'bg-[#111827]' : 'bg-black/[0.08]'
              }`}
            />
          </button>
        )
      })}
    </div>
  )
}
