import { useEffect, useRef, useState } from 'react'
import { TabBar } from './TabBar'
import { BrowserMockup } from './BrowserMockup'
import type { View } from './types'

const VIEWS: View[] = ['document', 'publish', 'ask', 'mcps']

export function Showcase() {
  const [view, setView] = useState<View>('document')
  const [pressedTab, setPressedTab] = useState<View | null>(null)
  const [paused, setPaused] = useState(false)
  const lastInteraction = useRef(0)

  const DURATIONS: Record<View, number> = {
    document: 11000,
    publish: 5500,
    ask: 5500,
    mcps: 5500,
  }

  useEffect(() => {
    if (paused) return
    const id = setTimeout(() => {
      if (Date.now() - lastInteraction.current > 3000) {
        setView((v) => VIEWS[(VIEWS.indexOf(v) + 1) % VIEWS.length])
      }
    }, DURATIONS[view])
    return () => clearTimeout(id)
  }, [paused, view])

  const selectTab = (v: View) => {
    if (v === view) return
    lastInteraction.current = Date.now()
    setPressedTab(v)
    setTimeout(() => setPressedTab(null), 240)
    setView(v)
  }

  return (
    <div className="mt-14">
      <div className="overflow-hidden rounded-[14px] border border-black/[0.08] bg-white">
        <TabBar
          active={view}
          pressed={pressedTab}
          onSelect={selectTab}
          paused={paused}
          onTogglePause={() => setPaused((p) => !p)}
          duration={DURATIONS[view]}
        />
      </div>
      <div className="mt-8">
        <BrowserMockup view={view} paused={paused} />
      </div>
    </div>
  )
}
