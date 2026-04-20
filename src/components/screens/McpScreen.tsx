import { useEffect, useState } from 'react'

export function McpScreen({
  press,
  paused = false,
  restartKey = 0,
}: {
  press: string | null
  paused?: boolean
  restartKey?: number
}) {
  return (
    <div className="flex h-full w-full items-start justify-center overflow-hidden bg-[#f3f4f6] px-8 py-10">
      <div className="relative w-full max-w-[1000px]">
        {/* MCP install window (back layer) */}
        <div
          className="absolute top-0 left-0 w-[540px] overflow-hidden rounded-xl bg-white"
          style={{
            boxShadow:
              '0 0 0 1px rgba(15, 15, 30, 0.06), 0 1px 2px rgba(15, 15, 30, 0.04), 0 8px 16px -4px rgba(15, 15, 30, 0.06)',
          }}
        >
          <McpWindow press={press} />
        </div>

        {/* Claude Code window (front layer, offset) */}
        <div
          className="relative ml-auto w-[600px] translate-y-24 overflow-hidden rounded-xl bg-white"
          style={{
            boxShadow:
              '0 0 0 1px rgba(15, 15, 30, 0.06), 0 1px 2px rgba(15, 15, 30, 0.04), 0 12px 32px -8px rgba(15, 15, 30, 0.18), 0 32px 64px -16px rgba(15, 15, 30, 0.12)',
          }}
        >
          <ClaudeWindow paused={paused} restartKey={restartKey} />
        </div>
      </div>
    </div>
  )
}

function McpWindow({ press }: { press: string | null }) {
  return (
    <>
      {/* Window chrome */}
      <div className="flex items-center gap-3 border-b border-black/[0.05] bg-[#fafafa] px-4 py-2.5">
        <div className="flex items-center gap-[5px]">
          <span className="h-[9px] w-[9px] rounded-full bg-[#d1d5db]" />
          <span className="h-[9px] w-[9px] rounded-full bg-[#d1d5db]" />
          <span className="h-[9px] w-[9px] rounded-full bg-[#d1d5db]" />
        </div>
        <span className="text-[12px] font-medium text-[#0f172a]">
          Install Library&rsquo;s MCP server
        </span>
      </div>

      <div className="px-5 pt-5 pb-6">
        <EditorTabs />

        <div className="mt-5 flex gap-3">
          <Badge n={1} />
          <div className="flex-1">
            <div className="text-[13px] font-medium text-[#111827]">Install the MCP server</div>
            <div
              className="mt-2.5 flex items-center gap-3 rounded-md px-3 py-2 font-mono text-[11.5px] text-[#d1d5db] transition-transform duration-150"
              style={{
                background: '#1f2937',
                transform: press === 'copy-cmd' ? 'scale(0.99)' : 'scale(1)',
              }}
            >
              <span className="flex-1 truncate">
                <span className="text-[#a78bfa]">claude</span> mcp add library-guide{' '}
                <span className="text-[#60a5fa]">--transport</span> sse{' '}
                <span className="text-[#facc15]">https://mcp.library.guide/shelf</span>
              </span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0 text-[#6b7280]">
                <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.2" />
                <path d="M2 8V2a1 1 0 011-1h6" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </div>
          </div>
        </div>

        <div className="mt-4 flex gap-3">
          <Badge n={2} />
          <div className="flex-1">
            <div className="text-[13px] font-medium text-[#111827]">Verify the connection</div>
            <div className="mt-1 text-[12px] text-[#6b7280]">
              Run{' '}
              <code className="rounded bg-[#f3f4f6] px-1 font-mono text-[11px] text-[#374151]">
                /mcp
              </code>{' '}
              inside Claude Code to confirm.
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const NARRATIVE =
  'Pulled the heading scale from Library. The marketing H1 is set to 56px and the H2 line-height is off. Updating Hero.tsx to match the tokens.'

function ClaudeWindow({
  paused,
  restartKey,
}: {
  paused: boolean
  restartKey: number
}) {
  // phase 0: user msg only
  // phase 1: + thought
  // phase 2: + tool call
  // phase 3: + narrative typing
  // phase 4: + second thought + table
  const [phase, setPhase] = useState(0)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    setPhase(0)
    setTick(0)
  }, [restartKey])

  useEffect(() => {
    if (paused) return
    if (phase === 0) {
      const id = setTimeout(() => setPhase(1), 500)
      return () => clearTimeout(id)
    }
    if (phase === 1) {
      const id = setTimeout(() => setPhase(2), 900)
      return () => clearTimeout(id)
    }
    if (phase === 2) {
      const id = setTimeout(() => setPhase(3), 700)
      return () => clearTimeout(id)
    }
    if (phase === 3 && tick >= NARRATIVE.length) {
      const id = setTimeout(() => setPhase(4), 600)
      return () => clearTimeout(id)
    }
  }, [phase, tick, paused])

  useEffect(() => {
    if (paused || phase !== 3 || tick >= NARRATIVE.length) return
    const id = setTimeout(() => setTick((t) => t + 1), 18)
    return () => clearTimeout(id)
  }, [phase, tick, paused])

  const typed = NARRATIVE.slice(0, tick)

  return (
    <>
      {/* Window chrome */}
      <div className="flex items-center gap-3 border-b border-black/[0.05] bg-[#fafafa] px-4 py-2.5">
        <div className="flex items-center gap-[5px]">
          <span className="h-[9px] w-[9px] rounded-full bg-[#d1d5db]" />
          <span className="h-[9px] w-[9px] rounded-full bg-[#d1d5db]" />
          <span className="h-[9px] w-[9px] rounded-full bg-[#d1d5db]" />
        </div>
        <span className="text-[12px] font-medium text-[#0f172a]">
          Aligning marketing site typography
        </span>
      </div>

      <div className="px-5 py-5">
        {/* User message */}
        <div className="rounded-lg bg-[#f3f4f6] px-3.5 py-3 text-[13px] leading-[1.5] text-[#0f172a]">
          Update the marketing site headings to match our design system.
        </div>

        {/* Thought */}
        {phase >= 1 && (
          <div className="reveal mt-4 flex items-center gap-2">
            <ClaudeBurst />
            <span className="text-[12px] text-[#9ca3af]">Thought for 8s</span>
          </div>
        )}

        {/* Tool call */}
        {phase >= 2 && (
          <div className="reveal mt-2.5 ml-[18px] overflow-hidden rounded-lg border border-black/[0.08]">
            <div className="flex items-center gap-2 border-b border-black/[0.05] px-3 py-1.5">
              <svg width="11" height="11" viewBox="0 0 10 10" fill="none" className="shrink-0 text-[#9ca3af]">
                <path d="M2 2v5a1 1 0 001 1h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              <code className="font-mono text-[11.5px] text-[#0f172a]">get_design_context</code>
              <span className="text-[#d1d5db]">·</span>
              <span className="text-[11.5px] text-[#6b7280]">Library MCP</span>
              <span className="ml-auto text-[#22c55e]">
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7.5l2.5 2.5L11 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
            <div className="px-3 py-2 font-mono text-[11.5px] leading-[1.55] text-[#0f172a]">
              <span className="text-[#6b7280]">Typography</span> &mdash; H1 48/48, H2 30/36, H3 24/32, H4 20/28 · Inter
            </div>
          </div>
        )}

        {/* Narrative with typewriter */}
        {phase >= 3 && (
          <p className="mt-4 text-[13px] leading-[1.6] text-[#0f172a]">
            {typed}
            {tick < NARRATIVE.length && (
              <span
                aria-hidden
                className="ml-[1px] inline-block h-[0.95em] w-[1.5px] translate-y-[0.15em] bg-[#0f172a] align-baseline"
                style={{ animation: 'blink 1s steps(2, end) infinite' }}
              />
            )}
          </p>
        )}

        {/* Summary table */}
        {phase >= 4 && (
          <div className="reveal mt-3 overflow-hidden rounded-lg border border-black/[0.06]">
            <div className="grid grid-cols-[140px_1fr_1fr] border-b border-black/[0.05] bg-[#fafafa] px-3 py-1.5 font-mono text-[11px] text-[#6b7280]">
              <span>Element</span>
              <span>Current</span>
              <span>Recommended</span>
            </div>
            {[
              ['H1', '56 / 60', '48 / 48'],
              ['H2 lh', '44', '36'],
              ['H3', '— (missing)', '24 / 32'],
            ].map(([prop, curr, rec], i, arr) => (
              <div
                key={prop}
                className={`grid grid-cols-[140px_1fr_1fr] px-3 py-1.5 font-mono text-[11.5px] text-[#0f172a] ${
                  i < arr.length - 1 ? 'border-b border-black/[0.04]' : ''
                }`}
              >
                <span>{prop}</span>
                <span className="text-[#6b7280]">{curr}</span>
                <span>{rec}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

function EditorTabs() {
  const items = [
    { key: 'claude', label: 'Claude Code', icon: <ClaudeLogo />, brand: true },
    { key: 'cursor', label: 'Cursor', icon: <CursorLogo />, brand: true },
    { key: 'other', label: 'Other', icon: <TerminalIcon />, brand: false },
  ]
  return (
    <div className="relative flex items-center gap-5">
      {items.map((it, i) => {
        const active = i === 0
        return (
          <div
            key={it.key}
            className={`flex items-center gap-1.5 pb-2 text-[12px] ${
              active
                ? 'border-b-[1.5px] border-[#6E5DC6] font-medium text-[#111827]'
                : 'border-b-[1.5px] border-transparent text-[#6b7280]'
            }`}
          >
            <span className={it.brand ? '' : active ? 'text-[#6E5DC6]' : 'text-[#9ca3af]'}>
              {it.icon}
            </span>
            <span>{it.label}</span>
          </div>
        )
      })}
      <div className="absolute right-0 bottom-0 left-0 h-px bg-black/[0.06]" />
    </div>
  )
}

function Badge({ n }: { n: number }) {
  return (
    <div
      className="flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-white"
      style={{ background: '#6E5DC6' }}
    >
      {n}
    </div>
  )
}

function ClaudeBurst() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="#CC785C" className="shrink-0">
      <g transform="translate(12 12)">
        <rect x="-1" y="-11" width="2" height="22" rx="1" />
        <rect x="-11" y="-1" width="22" height="2" rx="1" />
        <rect x="-1" y="-11" width="2" height="22" rx="1" transform="rotate(45)" />
        <rect x="-1" y="-11" width="2" height="22" rx="1" transform="rotate(-45)" />
      </g>
    </svg>
  )
}

function ClaudeLogo() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="#CC785C">
      <g transform="translate(12 12)">
        <rect x="-1" y="-11" width="2" height="22" rx="1" />
        <rect x="-11" y="-1" width="22" height="2" rx="1" />
        <rect x="-1" y="-11" width="2" height="22" rx="1" transform="rotate(45)" />
        <rect x="-1" y="-11" width="2" height="22" rx="1" transform="rotate(-45)" />
      </g>
    </svg>
  )
}

function CursorLogo() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24">
      <defs>
        <linearGradient id="cursor-mcp" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5b5b5b" />
          <stop offset="100%" stopColor="#000" />
        </linearGradient>
      </defs>
      <path d="M12 2 L22 8 L22 16 L12 22 L2 16 L2 8 Z" fill="url(#cursor-mcp)" />
      <path d="M12 2 L22 8 L12 13.5 Z" fill="#000" opacity="0.35" />
      <path d="M12 22 L22 16 L12 13.5 Z" fill="#000" opacity="0.15" />
      <path d="M12 22 L2 16 L12 13.5 Z" fill="#000" opacity="0.55" />
    </svg>
  )
}

function TerminalIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 13 13" fill="none">
      <path d="M2 3l3 3-3 3M6 9h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
