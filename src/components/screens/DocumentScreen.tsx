import { useEffect, useState } from 'react'

const DESC =
  'Our heading system provides four distinct typographic levels designed to create clear visual hierarchy and improve content organization. Each heading level serves a specific purpose in establishing information architecture and guiding users through content.'

const TEXTS: string[] = [
  'Foundations', // 0 breadcrumb
  'Typography', // 1 breadcrumb
  'Typography', // 2 h1
  DESC, // 3 description
  'Heading Levels Overview', // 4 h2
]

type TypedCell = { shown: string; active: boolean }

function useTypewriter(
  texts: string[],
  restartKey: number | string,
  paused: boolean,
  skip: boolean,
  speed = 160,
  startDelay = 250,
): TypedCell[] {
  const total = texts.reduce((s, t) => s + t.length, 0)
  const [tick, setTick] = useState<number>(skip ? total : -1)

  useEffect(() => {
    if (skip) {
      setTick(total)
      return
    }
    setTick(-1)
    const t = setTimeout(() => setTick(0), startDelay)
    return () => clearTimeout(t)
  }, [restartKey, startDelay, skip, total])

  useEffect(() => {
    if (paused || skip) return
    if (tick < 0) return
    if (tick >= total) return
    const id = setTimeout(() => setTick((t) => t + 1), 1000 / speed)
    return () => clearTimeout(id)
  }, [tick, texts, speed, paused, skip, total])

  const prefixLengths: number[] = []
  let sum = 0
  for (const t of texts) {
    prefixLengths.push(sum)
    sum += t.length
  }

  return texts.map((text, i) => {
    if (tick < 0) return { shown: '', active: i === 0 }
    const rem = tick - prefixLengths[i]
    if (rem <= 0) return { shown: '', active: false }
    if (rem >= text.length) return { shown: text, active: false }
    return { shown: text.slice(0, rem), active: true }
  })
}

function Cursor() {
  return (
    <span
      aria-hidden
      className="ml-[1px] inline-block h-[0.95em] w-[1.5px] translate-y-[0.15em] bg-current align-baseline"
      style={{ animation: 'blink 1s steps(2, end) infinite' }}
    />
  )
}

function T({ cell }: { cell: TypedCell }) {
  return (
    <>
      {cell.shown}
      {cell.active && <Cursor />}
    </>
  )
}

function started(c: TypedCell) {
  return c.active || c.shown.length > 0
}

function complete(c: TypedCell) {
  return !c.active && c.shown.length > 0
}

export function DocumentScreen({
  press,
  restartKey = 0,
  paused = false,
  skipAnimation = false,
}: {
  press: string | null
  restartKey?: number
  paused?: boolean
  skipAnimation?: boolean
}) {
  const t = useTypewriter(TEXTS, restartKey, paused, skipAnimation)

  return (
    <div className="flex flex-1 gap-3 overflow-hidden p-3">
      <div className="flex h-full flex-1 flex-col overflow-hidden rounded-xl border border-black/[0.06] bg-white">
        {/* Top bar: breadcrumb + preview */}
        <div className="flex items-center justify-between border-b border-black/[0.04] bg-white px-6 py-2.5">
          <div className="flex items-center gap-1.5 text-[13px]">
            {started(t[0]) && (
              <span className="reveal text-[#6b7280]"><T cell={t[0]} /></span>
            )}
            {started(t[1]) && (
              <>
                <span className="reveal text-[#d1d5db]">/</span>
                <span className="reveal text-[#111827]"><T cell={t[1]} /></span>
              </>
            )}
          </div>
          {started(t[2]) && (
            <button
              key={press === 'preview' ? 'preview-pressed' : 'preview'}
              className={`reveal inline-flex items-center gap-1.5 rounded-md bg-[#6E5DC6] px-2.5 py-1.5 text-[11.5px] leading-none font-medium text-white transition-transform duration-150 ${
                press === 'preview' ? 'pulse-attn' : ''
              }`}
            >
              <span>Preview</span>
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" className="block">
                <path d="M3 1h7v7M10 1L3 8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
        </div>

        {/* Body: main */}
        <div className="overflow-y-auto bg-white px-8 py-8">
          <article className="mx-auto min-w-0 max-w-[580px]">
            {started(t[2]) && (
              <h1 className="reveal text-[38px] font-medium tracking-[-0.02em] text-[#0f172a]">
                <T cell={t[2]} />
              </h1>
            )}

            {/* Figma embed card */}
            {complete(t[2]) && (
              <div className="reveal mt-6 overflow-hidden rounded-xl bg-[#f3f4f6]">
                <div className="flex items-center justify-between px-4 py-1.5">
                  <div className="flex items-center gap-2 text-[12.5px] font-medium text-[#6b7280]">
                    <FigmaLogo size={13} />
                    <span>Figma</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="inline-flex items-center gap-1.5 rounded-md bg-[#6E5DC6] px-2.5 py-1.5 text-[11.5px] leading-none font-medium text-white transition-transform duration-150"
                      style={{ transform: press === 'first-draft' ? 'scale(0.97)' : 'scale(1)' }}
                    >
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="none" className="block">
                        <path d="M5.5 1l1 2.5 2.5 1-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1 1-2.5z" fill="currentColor" />
                      </svg>
                      <span>First draft with AI</span>
                    </button>
                    <button className="inline-flex items-center gap-1.5 rounded-md border border-black/[0.08] bg-white px-2.5 py-1.5 text-[11.5px] leading-none font-medium text-[#374151]">
                      <span className="block"><FigmaLogo /></span>
                      <span>View in Figma</span>
                    </button>
                  </div>
                </div>

                <div className="mx-1 mb-1 overflow-hidden rounded-lg border border-black/[0.06] bg-white">
                  <div className="grid grid-cols-[100px_160px_1fr] bg-white px-4 py-2.5 text-[11.5px] font-medium text-[#6b7280]">
                    <span>Text Style</span>
                    <span>Size / Line height</span>
                    <span>Font</span>
                  </div>
                  {[
                    ['h1', '48/48', 'Inter'],
                    ['h2', '30/36', 'Inter'],
                    ['h3', '24/32', 'Inter'],
                    ['h4', '20/28', 'Inter'],
                  ].map(([style, size, font]) => (
                    <div
                      key={style}
                      className="grid grid-cols-[100px_160px_1fr] border-t border-black/[0.04] px-4 py-3 text-[12.5px] text-[#111827]"
                    >
                      <span>{style}</span>
                      <span>{size}</span>
                      <span>{font}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {started(t[3]) && (
              <p className="reveal mt-6 text-[14.5px] leading-[1.65] text-[#374151]">
                <T cell={t[3]} />
              </p>
            )}

            {started(t[4]) && (
              <h2 className="reveal mt-10 text-[24px] font-medium tracking-[-0.01em] text-[#0f172a]">
                <T cell={t[4]} />
              </h2>
            )}

            {/* Table card */}
            {complete(t[4]) && (
              <div className="reveal mt-5 overflow-hidden rounded-xl bg-[#f3f4f6]">
                <div className="flex items-center gap-2 px-4 py-1.5 text-[12.5px] font-medium text-[#6b7280]">
                  <TableGlyph />
                  <span>Table</span>
                </div>

                <div className="mx-1 mb-1 overflow-hidden rounded-lg border border-black/[0.06] bg-white">
                  <div className="grid grid-cols-4 bg-white px-4 py-2.5 text-[11.5px] font-medium text-[#6b7280]">
                    <span>Level</span>
                    <span>Purpose</span>
                    <span>Context</span>
                    <span>Frequency</span>
                  </div>
                  {[
                    ['H1', 'Primary page title', 'Page headers, main sections', 'Once per page'],
                    ['H2', 'Major section headings', 'Primary content divisions', '2-4 per page'],
                    ['H3', 'Subsection headings', 'Secondary content groups', 'Multiple per section'],
                    ['H4', 'Minor headings', 'Detailed subdivisions', 'As needed'],
                  ].map(([lvl, purpose, context, freq]) => (
                    <div
                      key={lvl}
                      className="grid grid-cols-4 gap-3 border-t border-black/[0.04] px-4 py-3 text-[12.5px] text-[#111827]"
                    >
                      <span>{lvl}</span>
                      <span>{purpose}</span>
                      <span>{context}</span>
                      <span>{freq}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Additional doc sections (static, not part of the typewriter) */}
            {complete(t[4]) && (
              <>
                <UsageGuidelinesSection />
                <DosAndDontsSection />
              </>
            )}
          </article>
        </div>
      </div>
      <FloatingToolbar />
    </div>
  )
}

/* ---------- extra design-system content ---------- */
function UsageGuidelinesSection() {
  return (
    <section className="reveal mt-12">
      <h2 className="text-[24px] font-medium tracking-[-0.01em] text-[#0f172a]">Usage Guidelines</h2>

      <h3 className="mt-6 text-[16px] font-medium text-[#0f172a]">Hierarchy and Structure</h3>
      <p className="mt-2 text-[14px] leading-[1.65] text-[#374151]">
        Maintain a consistent heading hierarchy. Begin every page with a single H1
        and use each subsequent level only to introduce a child section. Skipping
        levels &mdash; jumping from H2 to H4, for example &mdash; breaks both screen-reader
        navigation and the visual rhythm of the page.
      </p>

      <h3 className="mt-6 text-[16px] font-medium text-[#0f172a]">Content Organization</h3>
      <p className="mt-2 text-[14px] leading-[1.65] text-[#374151]">
        Reserve H1 for the page title. Group related ideas under H2. Use H3 for
        distinct subsections and H4 only when a section needs further
        subdivisions. When in doubt, split content into separate pages rather
        than adding a fifth heading level.
      </p>

      <h3 className="mt-6 text-[16px] font-medium text-[#0f172a]">Accessibility</h3>
      <p className="mt-2 text-[14px] leading-[1.65] text-[#374151]">
        Headings are the primary landmarks screen readers use to navigate a
        document. Always use a semantic heading element (<code className="rounded bg-[#f3f4f6] px-1 font-mono text-[12px]">h1</code>&ndash;<code className="rounded bg-[#f3f4f6] px-1 font-mono text-[12px]">h4</code>) rather than
        styled text. Never rely on size alone to communicate importance.
      </p>
      <ul className="mt-3 space-y-1.5 pl-5 text-[14px] text-[#374151]">
        <li className="list-disc">Ensure headings follow a logical reading order.</li>
        <li className="list-disc">Keep line-length under 70 characters for H2+ body.</li>
        <li className="list-disc">Verify contrast ratios hit at least WCAG AA.</li>
      </ul>
    </section>
  )
}

function DosAndDontsSection() {
  const [tab, setTab] = useState<'dos' | 'donts'>('dos')

  const dos = [
    'Follow sequential heading order (H1 → H2 → H3 → H4)',
    'Use descriptive, concise heading text',
    'Maintain consistent spacing between headings and content',
    'Test heading structure with screen readers',
  ]
  const donts = [
    'Skip heading levels for visual emphasis',
    'Use H1 more than once per page',
    'Style other elements to look like headings',
    'Mix title-case and sentence-case in one section',
  ]
  const items = tab === 'dos' ? dos : donts

  return (
    <section className="reveal mt-12">
      <h2 className="text-[24px] font-medium tracking-[-0.01em] text-[#0f172a]">Do&rsquo;s and Don&rsquo;ts</h2>
      <p className="mt-2 text-[14px] leading-[1.6] text-[#6b7280]">
        Quick checks to help your team apply the scale consistently.
      </p>

      <div className="mt-5 overflow-hidden rounded-xl bg-[#f3f4f6]">
        <div className="flex items-center gap-2 px-4 py-1.5 text-[12.5px] font-medium text-[#6b7280]">
          Tabs
        </div>

        <div className="mx-1 mb-1 overflow-hidden rounded-lg border border-black/[0.06] bg-white">
          <div className="flex items-center gap-1 px-3 pt-3">
            <button
              onClick={() => setTab('dos')}
              className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[12.5px] font-medium transition-colors ${
                tab === 'dos'
                  ? 'bg-[#f3f4f6] text-[#0f172a]'
                  : 'text-[#6b7280] hover:text-[#0f172a]'
              }`}
            >
              Do&rsquo;s
              {tab === 'dos' && <span className="text-[#9ca3af]">&middot;&middot;&middot;</span>}
            </button>
            <button
              onClick={() => setTab('donts')}
              className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[12.5px] font-medium transition-colors ${
                tab === 'donts'
                  ? 'bg-[#f3f4f6] text-[#0f172a]'
                  : 'text-[#6b7280] hover:text-[#0f172a]'
              }`}
            >
              Don&rsquo;ts
              {tab === 'donts' && <span className="text-[#9ca3af]">&middot;&middot;&middot;</span>}
            </button>
            <button
              className="ml-1 flex h-6 w-6 items-center justify-center rounded-md text-[#9ca3af] transition-colors hover:bg-[#f3f4f6] hover:text-[#0f172a]"
              aria-label="Add tab"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 2v8M2 6h8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <ul className="space-y-3 px-4 pt-4 pb-5 text-[13.5px] leading-[1.55] text-[#0f172a]">
            {items.map((item) => (
              <li key={item} className="flex gap-2.5">
                <span className="mt-[8px] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#0f172a]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}


function FloatingToolbar() {
  return (
    <div className="my-auto flex flex-col items-center gap-2 self-center rounded-full border border-black/[0.06] bg-white px-1.5 py-3">
      <button className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-black/[0.03]">
        <FigmaLogo size={18} />
      </button>
      <button className="flex h-8 w-8 items-center justify-center rounded-md transition-colors hover:bg-black/[0.03]">
        <StorybookLogo />
      </button>
      <button className="flex h-8 w-8 items-center justify-center rounded-full text-[#0f172a] transition-colors hover:bg-black/[0.03]">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path
            d="M9 1l1.8 4.4L15 7l-4.2 1.6L9 13l-1.8-4.4L3 7l4.2-1.6L9 1z"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
          <path
            d="M14 12l.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6.6-1.4z"
            fill="currentColor"
          />
        </svg>
      </button>
    </div>
  )
}

function StorybookLogo() {
  return (
    <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
      <path
        d="M0.5 1.2L1 16.5a1 1 0 001 1l12-.4a1 1 0 001-1V.9a1 1 0 00-1-1L2 .2a1 1 0 00-1 1z"
        fill="#FF4785"
      />
      <path
        d="M11.2 2.7l.08-2.3 1.5-.06.06 2.46c0 .14-.16.22-.27.14l-.58-.46-.68.52c-.11.08-.26 0-.26-.14l.15.24zM7.5 10.8c0 .66.45 1 1.5 1.09.76.08 1.1-.25 1.14-.6.05-.35-.12-.61-.78-.79l-.8-.18c-1.3-.28-1.95-.83-1.95-1.87 0-1.21 1.1-2.01 2.7-2.01 1.6 0 2.66.78 2.7 2.08v.1h-1.54c-.03-.5-.34-.82-1.06-.82-.6 0-.93.22-.94.55 0 .27.18.42.7.55l.9.2c1.4.3 2.02.83 2.02 1.93 0 1.26-.98 2.07-2.82 2.07-1.72 0-2.81-.78-2.86-2.17v-.1H7.5v.06z"
        fill="white"
      />
    </svg>
  )
}

function FigmaLogo({ size = 12 }: { size?: number }) {
  return (
    <svg width={size * (38 / 57)} height={size} viewBox="0 0 38 57" fill="none">
      <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE" />
      <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0ACF83" />
      <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262" />
      <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E" />
      <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF" />
    </svg>
  )
}

function TableGlyph() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="text-[#6b7280]">
      <rect x="1.5" y="2" width="10" height="9" rx="1" stroke="currentColor" strokeWidth="1.1" />
      <path d="M1.5 5h10M1.5 8h10M5 5v6M8.5 5v6" stroke="currentColor" strokeWidth="1.1" />
    </svg>
  )
}
