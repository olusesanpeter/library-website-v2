import { useEffect, useRef, useState } from 'react'
import { Sidebar } from './Sidebar'
import { DocumentScreen } from './screens/DocumentScreen'
import { PublishScreen } from './screens/PublishScreen'
import { AskScreen } from './screens/AskScreen'
import { McpScreen } from './screens/McpScreen'
import { PreviewSiteScreen } from './screens/PreviewSiteScreen'
import type { View } from './types'

const URLS: Record<View, string> = {
  document: 'app.library.guide/library_uxgre5/e994b566-6add-4cd8-8bcf-64c4b23e510a/document/fe4d8be4-6f25-484a-9c70-typography',
  publish: 'app.library.guide/library_uxgre5/librarys-design-system_x4bmhg/publish',
  ask: 'app.library.guide/library_uxgre5/librarys-design-system_x4bmhg/ask',
  mcps: 'app.library.guide/library_uxgre5/librarys-design-system_x4bmhg/imports/',
}
const PREVIEW_URL =
  'shelf.preview.guide/folder/613524fc-4e7b-4971-958a-ccce8b70eca2/fe4d8be4-6f25-484a-9c70-ad0e39f9de38'

const SIDEBAR_ACTIVE: Record<View, 'home' | 'integrations' | 'settings'> = {
  document: 'home',
  publish: 'home',
  ask: 'home',
  mcps: 'integrations',
}

type CursorStep = {
  x: number
  y: number
  press?: string | null
  openPreview?: boolean
}
const CURSOR_PATHS: Record<View, CursorStep[]> = {
  document: [
    { x: 60, y: 35 },
    { x: 60, y: 28 },
    { x: 60, y: 28, press: 'first-draft' },
    { x: 86, y: 15 },
    { x: 86, y: 72 },
  ],
  publish: [
    { x: 86, y: 30 },
    { x: 86, y: 30, press: 'preview' },
    { x: 50, y: 50, openPreview: true },
    { x: 20, y: 35, openPreview: true },
    { x: 60, y: 45, openPreview: true },
    { x: 85, y: 30, openPreview: true },
    { x: 50, y: 70, openPreview: true },
  ],
  ask: [
    { x: 55, y: 43 },
    { x: 70, y: 48 },
    { x: 48, y: 62 },
    { x: 68, y: 62 },
  ],
  mcps: [
    { x: 62, y: 35 },
    { x: 75, y: 50 },
    { x: 75, y: 50, press: 'copy-cmd' },
    { x: 60, y: 72 },
  ],
}

export function BrowserMockup({ view, paused = false }: { view: View; paused?: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const tiltRef = useRef<HTMLDivElement>(null)
  const [stepIdx, setStepIdx] = useState(0)
  const [docRestart, setDocRestart] = useState(0)
  const prevViewRef = useRef<View>(view)

  useEffect(() => {
    if (view === 'document' && prevViewRef.current !== 'document') {
      setDocRestart((k) => k + 1)
    }
    prevViewRef.current = view
  }, [view])

  useEffect(() => {
    setStepIdx(0)
  }, [view])

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setStepIdx((i) => i + 1), 1400)
    return () => clearInterval(id)
  }, [view, paused])

  // Tilt-on-hover disabled

  const path = CURSOR_PATHS[view]
  const step = path[stepIdx % path.length]
  const press = step.press ?? null
  const previewOpen = view === 'publish' && !!step.openPreview
  const url = previewOpen ? PREVIEW_URL : URLS[view]

  return (
    <div
      ref={wrapRef}
      className="relative w-full"
      style={{ perspective: '1800px' }}
    >
      <div
        ref={tiltRef}
        className="relative will-change-transform"
        style={{
          transformStyle: 'preserve-3d',
          transition: 'transform 0.15s cubic-bezier(0.2, 0.7, 0.2, 1)',
        }}
      >
        <div className="rounded-[18px] bg-[#f3f4f6] p-1.5">
        <div
          className="relative overflow-hidden rounded-[12px] bg-white ring-1 ring-black/[0.06]"
        >
          <BrowserChrome url={url} />
          <div className="relative flex h-[clamp(520px,56vw,760px)] bg-[#fbfbfc]">
            {previewOpen ? (
              <FadeIn><PreviewSiteScreen /></FadeIn>
            ) : (
              <FadeIn>
                <Sidebar
                  active={SIDEBAR_ACTIVE[view]}
                  press={null}
                  docMode={view === 'document'}
                />
                <div className="relative flex-1">
                  <ScreenSlot active={view === 'document'}>
                    <DocumentScreen press={press} restartKey={docRestart} paused={paused} />
                  </ScreenSlot>
                  <ScreenSlot active={view === 'publish'}>
                    <PublishScreen press={press} />
                  </ScreenSlot>
                  <ScreenSlot active={view === 'ask'}>
                    <AskScreen />
                  </ScreenSlot>
                  <ScreenSlot active={view === 'mcps'}>
                    <McpScreen press={press} />
                  </ScreenSlot>
                </div>
              </FadeIn>
            )}
          </div>
        </div>
        </div>

        {view !== 'document' && (
        <div
          className="pointer-events-none absolute z-20"
          style={{
            left: `${step.x}%`,
            top: `${step.y}%`,
            transition:
              'left 0.85s cubic-bezier(0.5, 0.05, 0.2, 1), top 0.85s cubic-bezier(0.5, 0.05, 0.2, 1)',
            transform: 'translate(-50%, -50%)',
          }}
        >
          {press && (
            <span
              className="absolute top-1/2 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background: 'rgba(124, 88, 242, 0.4)',
                animation: 'ripple 420ms ease-out',
              }}
            />
          )}
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            className="relative drop-shadow-[0_2px_6px_rgba(0,0,0,0.25)]"
          >
            <path
              d="M3 2l14 7-6 2 4 7-3 1-4-7-5 4V2z"
              fill="#fff"
              stroke="#111"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        )}
      </div>
    </div>
  )
}

function FadeIn({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative flex w-full"
      style={{ animation: 'fadeIn 350ms ease' }}
    >
      {children}
    </div>
  )
}

function ScreenSlot({
  active,
  children,
}: {
  active: boolean
  children: React.ReactNode
}) {
  return (
    <div
      aria-hidden={!active}
      className="absolute inset-0 flex flex-col overflow-hidden"
      style={{
        opacity: active ? 1 : 0,
        pointerEvents: active ? 'auto' : 'none',
        transform: active ? 'translateY(0)' : 'translateY(6px)',
        transition: 'opacity 320ms ease, transform 320ms ease',
      }}
    >
      {children}
    </div>
  )
}

function BrowserChrome({ url: _url }: { url: string }) {
  return (
    <div className="flex h-[32px] items-center gap-3 border-b border-black/[0.06] bg-white px-3 text-[11.5px] text-[#6b7280]">
      <div className="flex items-center gap-[5px]">
        <span className="h-[9px] w-[9px] rounded-full bg-[#d1d5db]" />
        <span className="h-[9px] w-[9px] rounded-full bg-[#d1d5db]" />
        <span className="h-[9px] w-[9px] rounded-full bg-[#d1d5db]" />
      </div>

      <div className="flex-1 text-center font-medium text-[#374151]">
        app.library.guide
      </div>

      <div className="w-[42px]" />
    </div>
  )
}
