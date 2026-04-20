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

export function BrowserMockup({ view }: { view: View }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const tiltRef = useRef<HTMLDivElement>(null)
  const [stepIdx, setStepIdx] = useState(0)

  useEffect(() => {
    setStepIdx(0)
    const id = setInterval(() => setStepIdx((i) => i + 1), 1400)
    return () => clearInterval(id)
  }, [view])

  useEffect(() => {
    const wrap = wrapRef.current
    const tilt = tiltRef.current
    if (!wrap || !tilt) return

    let raf = 0
    let tx = 0
    let ty = 0
    let cx = 0
    let cy = 0
    let active = false

    const handle = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      tx = (x - 0.5) * 2
      ty = (y - 0.5) * 2
      active = true
    }
    const leave = () => {
      tx = 0
      ty = 0
      active = false
    }
    const loop = () => {
      cx += (tx - cx) * 0.06
      cy += (ty - cy) * 0.06
      const rotY = cx * 6
      const rotX = -cy * 3.5
      const lift = active ? -6 : 0
      tilt.style.transform = `translateY(${lift}px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`
      raf = requestAnimationFrame(loop)
    }
    loop()

    wrap.addEventListener('mousemove', handle)
    wrap.addEventListener('mouseleave', leave)
    return () => {
      cancelAnimationFrame(raf)
      wrap.removeEventListener('mousemove', handle)
      wrap.removeEventListener('mouseleave', leave)
    }
  }, [])

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
        className="pointer-events-none absolute -inset-8 -z-10 rounded-[40px] opacity-60 blur-3xl"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 60%, rgba(124, 88, 242, 0.18), transparent 70%)',
        }}
      />

      <div
        ref={tiltRef}
        className="relative will-change-transform"
        style={{
          transformStyle: 'preserve-3d',
          transition: 'transform 0.15s cubic-bezier(0.2, 0.7, 0.2, 1)',
        }}
      >
        <div
          className="relative overflow-hidden rounded-[14px] bg-white"
          style={{
            boxShadow:
              '0 30px 80px -20px rgba(15, 15, 30, 0.35), 0 10px 30px -10px rgba(15, 15, 30, 0.2), 0 0 0 1px rgba(15, 15, 30, 0.08)',
          }}
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
                    <DocumentScreen press={press} />
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

function BrowserChrome({ url }: { url: string }) {
  return (
    <div className="flex h-[44px] items-center gap-3 border-b border-black/[0.06] bg-white px-3 text-[12px] text-[#6b7280]">
      <div className="flex items-center gap-[6px]">
        <span className="h-[11px] w-[11px] rounded-full bg-[#ff5f57]" />
        <span className="h-[11px] w-[11px] rounded-full bg-[#febc2e]" />
        <span className="h-[11px] w-[11px] rounded-full bg-[#28c840]" />
      </div>

      <div className="ml-2 flex items-center gap-1 text-[#9ca3af]">
        <button className="flex h-6 w-6 items-center justify-center rounded hover:bg-black/5">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <rect x="1" y="1" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </button>
        <button className="flex h-6 w-6 items-center justify-center rounded hover:bg-black/5">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M7.5 3l-3 3 3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button className="flex h-6 w-6 items-center justify-center rounded hover:bg-black/5">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M4.5 3l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button className="flex h-6 w-6 items-center justify-center rounded hover:bg-black/5">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M2.5 6a3.5 3.5 0 1 1 1 2.5M2.5 8.5v-2h2"
              stroke="currentColor"
              strokeWidth="1.3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div
        key={url}
        className="flex-1 truncate text-center font-medium text-[#374151]"
        style={{ animation: 'urlFade 350ms ease' }}
      >
        {url}
      </div>

      <div className="flex items-center gap-1 text-[#9ca3af]">
        <button className="flex h-6 w-6 items-center justify-center rounded hover:bg-black/5">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.2" />
            <path d="M2 6h8M6 2a7 7 0 0 1 0 8M6 2a7 7 0 0 0 0 8" stroke="currentColor" strokeWidth="1" />
          </svg>
        </button>
        <button className="flex h-6 w-6 items-center justify-center rounded hover:bg-black/5">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3 3h6v6H3z" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </button>
        <button className="flex h-6 w-6 items-center justify-center rounded hover:bg-black/5">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <rect x="1.5" y="2.5" width="9" height="7" rx="1" stroke="currentColor" strokeWidth="1.2" />
            <path d="M4 10v1M8 10v1" stroke="currentColor" strokeWidth="1" />
          </svg>
        </button>
        <button className="ml-1 flex items-center gap-1.5 rounded-md border border-black/10 bg-white px-2.5 py-1 text-[11px] font-medium text-[#374151] shadow-sm hover:bg-black/[0.02]">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M6 1l1.2 2.8L10 5l-2.8 1.2L6 9 4.8 6.2 2 5l2.8-1.2L6 1z"
              fill="#374151"
            />
          </svg>
          <span>Ask Chat</span>
        </button>
      </div>
    </div>
  )
}
