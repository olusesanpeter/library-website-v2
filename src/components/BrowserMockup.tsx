import { useEffect, useRef, useState } from 'react'
import { Sidebar } from './Sidebar'
import { DocumentScreen } from './screens/DocumentScreen'
import { AskScreen } from './screens/AskScreen'
import { McpScreen } from './screens/McpScreen'
import { PreviewSiteScreen } from './screens/PreviewSiteScreen'
import type { View } from './types'

const URLS: Record<View, string> = {
  document: 'library.guide/library_uxgre5/e994b566-6add-4cd8-8bcf-64c4b23e510a/document/fe4d8be4-6f25-484a-9c70-typography',
  publish: 'library.guide/library_uxgre5/e994b566-6add-4cd8-8bcf-64c4b23e510a/document/fe4d8be4-6f25-484a-9c70-typography',
  ask: 'library.guide/library_uxgre5/librarys-design-system_x4bmhg/ask',
  mcps: 'library.guide/library_uxgre5/librarys-design-system_x4bmhg/imports/',
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
  showPopover?: boolean
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
    { x: 50, y: 50, showPopover: true },
    { x: 50, y: 50, showPopover: true },
    { x: 50, y: 50, press: 'open-link', showPopover: true },
    { x: 50, y: 50, openPreview: true },
    { x: 45, y: 70, openPreview: true },
    { x: 65, y: 45, openPreview: true },
    { x: 55, y: 60, openPreview: true },
    { x: 40, y: 35, openPreview: true },
    { x: 50, y: 50, openPreview: true },
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
    { x: 50, y: 55 },
    { x: 60, y: 60 },
    { x: 55, y: 65 },
    { x: 50, y: 55 },
  ],
}

export function BrowserMockup({ view, paused = false }: { view: View; paused?: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const tiltRef = useRef<HTMLDivElement>(null)
  const [stepIdx, setStepIdx] = useState(0)
  const [docRestart, setDocRestart] = useState(0)
  const [askRestart, setAskRestart] = useState(0)
  const [mcpRestart, setMcpRestart] = useState(0)
  const prevViewRef = useRef<View>(view)

  useEffect(() => {
    if (view === 'document' && prevViewRef.current !== 'document') {
      setDocRestart((k) => k + 1)
    }
    if (view === 'ask' && prevViewRef.current !== 'ask') {
      setAskRestart((k) => k + 1)
    }
    if (view === 'mcps' && prevViewRef.current !== 'mcps') {
      setMcpRestart((k) => k + 1)
    }
    prevViewRef.current = view
  }, [view])

  useEffect(() => {
    setStepIdx(0)
  }, [view])

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setStepIdx((i) => i + 1), 950)
    return () => clearInterval(id)
  }, [view, paused])

  // Tilt-on-hover disabled

  const path = CURSOR_PATHS[view]
  const step = path[stepIdx % path.length]
  const press = step.press ?? null
  const previewOpen = view === 'publish' && !!step.openPreview
  const showPopover = view === 'publish' && !!step.showPopover
  const showChrome = view !== 'mcps'
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
          className={`relative overflow-hidden rounded-[12px] bg-white ${showChrome ? 'ring-1 ring-black/[0.06]' : ''}`}
        >
          {showChrome && <BrowserChrome url={url} />}
          <div className="relative flex h-[clamp(520px,56vw,760px)] bg-[#fbfbfc]">
            {previewOpen ? (
              <FadeIn><PreviewSiteScreen /></FadeIn>
            ) : (
              <FadeIn>
                {view !== 'ask' && view !== 'mcps' && (
                  <Sidebar
                    active={SIDEBAR_ACTIVE[view]}
                    press={null}
                    docMode
                  />
                )}
                <div className="relative flex-1">
                  <ScreenSlot active={view === 'document'}>
                    <DocumentScreen press={press} restartKey={docRestart} paused={paused} />
                  </ScreenSlot>
                  <ScreenSlot active={view === 'publish'}>
                    <DocumentScreen press={press} skipAnimation />
                  </ScreenSlot>
                  <ScreenSlot active={view === 'ask'}>
                    <AskScreen paused={paused} restartKey={askRestart} />
                  </ScreenSlot>
                  <ScreenSlot active={view === 'mcps'}>
                    <McpScreen press={press} paused={paused} restartKey={mcpRestart} />
                  </ScreenSlot>
                </div>
              </FadeIn>
            )}
          </div>
        </div>
        </div>

        {showPopover && <PublishedPopover press={press} />}

        {view === 'mcps' && (
        <div
          className="pointer-events-none absolute z-40"
          style={{
            left: `${step.x}%`,
            top: `${step.y}%`,
            transition:
              'left 0.85s cubic-bezier(0.5, 0.05, 0.2, 1), top 0.85s cubic-bezier(0.5, 0.05, 0.2, 1)',
            transform: 'translate(-2px, -2px)',
          }}
        >
          {press && (
            <span
              className="absolute h-3 w-3 rounded-full"
              style={{
                left: '2px',
                top: '2px',
                background: 'rgba(124, 88, 242, 0.4)',
                animation: 'ripple 420ms ease-out',
              }}
            />
          )}
          <svg
            width="20"
            height="24"
            viewBox="0 0 20 24"
            fill="none"
            className="relative drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
          >
            <path
              d="M4 2 L4 18 L8.2 14.4 L10.8 19.8 L13.6 18.5 L11 13.1 L16 13.1 Z"
              fill="#000"
              stroke="#fff"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        )}
      </div>
    </div>
  )
}

function PublishedPopover({ press }: { press: string | null }) {
  return (
    <div
      className="absolute top-[14%] right-[3%] z-30 w-[300px] rounded-xl bg-white p-3.5"
      style={{
        animation: 'popIn 260ms cubic-bezier(0.2, 0.7, 0.2, 1) both',
        boxShadow:
          '0 0 0 1px rgba(15, 15, 30, 0.04), 0 1px 2px rgba(15, 15, 30, 0.06), 0 8px 16px -4px rgba(15, 15, 30, 0.08), 0 24px 48px -12px rgba(15, 15, 30, 0.18)',
      }}
    >
      <div className="text-[13px] font-medium text-[#0f172a]">Your latest changes are ready to preview</div>
      <div className="mt-0.5 text-[11.5px] text-[#6b7280]">Share this link with your team to review.</div>

      <div className="mt-2.5 flex items-center gap-2 rounded-md border border-black/[0.08] bg-[#fafafa] px-2.5 py-2">
        <span className="flex-1 truncate font-mono text-[11px] text-[#111827]">shelf.preview.guide/...</span>
        <button
          aria-label="Copy link"
          className="shrink-0 text-[#9ca3af] transition-colors hover:text-[#0f172a]"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.2" />
            <path d="M2 8V2a1 1 0 011-1h6" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </button>
      </div>

      <a
        href="#"
        key={press === 'open-link' ? 'open-pressed' : 'open'}
        className={`mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-[#6E5DC6] px-3 py-2 text-[12px] leading-none font-medium text-white transition-transform duration-150 ${
          press === 'open-link' ? 'pulse-attn' : ''
        }`}
      >
        <span>Open preview</span>
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" className="block">
          <path d="M3 1h7v7M10 1L3 8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
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

function BrowserChrome({ url }: { url: string }) {
  const domain = url.split('/')[0]
  return (
    <div className="flex h-[32px] items-center gap-3 border-b border-black/[0.06] bg-white px-3 text-[11.5px] text-[#6b7280]">
      <div className="flex items-center gap-[5px]">
        <span className="h-[9px] w-[9px] rounded-full bg-[#d1d5db]" />
        <span className="h-[9px] w-[9px] rounded-full bg-[#d1d5db]" />
        <span className="h-[9px] w-[9px] rounded-full bg-[#d1d5db]" />
      </div>

      <div
        key={domain}
        className="flex-1 text-center font-medium text-[#374151]"
        style={{ animation: 'urlFade 350ms ease' }}
      >
        {domain}
      </div>

      <div className="w-[42px]" />
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

