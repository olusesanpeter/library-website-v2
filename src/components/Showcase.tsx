import { useEffect, useRef, useState } from 'react'
import { TabBar } from './TabBar'
import { BrowserMockup } from './BrowserMockup'
import type { View } from './types'

const VIEWS: View[] = ['document', 'publish', 'ask', 'mcps']

export function Showcase() {
  const [view, setView] = useState<View>('document')
  const [pressedTab, setPressedTab] = useState<View | null>(null)
  const lastInteraction = useRef(0)

  useEffect(() => {
    const id = setInterval(() => {
      if (Date.now() - lastInteraction.current > 8000) {
        setView((v) => VIEWS[(VIEWS.indexOf(v) + 1) % VIEWS.length])
      }
    }, 5500)
    return () => clearInterval(id)
  }, [])

  const selectTab = (v: View) => {
    if (v === view) return
    lastInteraction.current = Date.now()
    setPressedTab(v)
    setTimeout(() => setPressedTab(null), 240)
    setView(v)
  }

  return (
    <div className="mt-14">
      <TabBar active={view} pressed={pressedTab} onSelect={selectTab} />
      <div className="mt-6">
        <BrowserMockup view={view} />
      </div>
    </div>
  )
}
