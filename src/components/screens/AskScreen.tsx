import { useEffect, useState } from 'react'

const QUESTION = 'What are our heading font sizes?'

export function AskScreen({
  paused = false,
  restartKey = 0,
}: {
  paused?: boolean
  restartKey?: number
}) {
  const [tick, setTick] = useState<number>(-1)
  const [thinking, setThinking] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)

  useEffect(() => {
    setTick(-1)
    setThinking(false)
    setShowAnswer(false)
    const id = setTimeout(() => setTick(0), 300)
    return () => clearTimeout(id)
  }, [restartKey])

  useEffect(() => {
    if (paused || tick < 0 || tick >= QUESTION.length) return
    const id = setTimeout(() => setTick((t) => t + 1), 55)
    return () => clearTimeout(id)
  }, [tick, paused])

  useEffect(() => {
    if (paused) return
    if (tick >= QUESTION.length && !thinking && !showAnswer) {
      const id = setTimeout(() => setThinking(true), 350)
      return () => clearTimeout(id)
    }
  }, [tick, thinking, showAnswer, paused])

  useEffect(() => {
    if (paused) return
    if (thinking && !showAnswer) {
      const id = setTimeout(() => setShowAnswer(true), 1400)
      return () => clearTimeout(id)
    }
  }, [thinking, showAnswer, paused])

  const shownQ = tick < 0 ? '' : QUESTION.slice(0, tick)
  const typing = tick >= 0 && !thinking && !showAnswer
  const isInitial = !thinking && !showAnswer

  return (
    <div className="flex h-full flex-col bg-white">
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-[760px] px-10 pt-16 pb-10">
          {isInitial ? (
            <>
              <h1 className="text-[44px] font-medium leading-[1.05] tracking-[-0.025em] text-[#0f172a]">
                Library&rsquo;s design system
              </h1>
              <p className="mt-5 max-w-[620px] text-[16px] leading-[1.55] text-[#6b7280]">
                Shelf is Library&rsquo;s design system &mdash; a shared
                foundation of components, patterns, and principles. It helps
                designers and partners create work that feels distinctly
                Library, while giving us room to grow and adapt over time.
              </p>

              <div className="relative mt-12">
                <div
                  className="composer-glow pointer-events-none absolute -top-4 left-[10%] h-8 w-[80%] opacity-60 blur-xl"
                  style={{ borderRadius: '50%' }}
                />
                <Composer
                  value={shownQ}
                  typing={typing}
                  placeholder="Ask anything, search across all documents"
                  large
                />
              </div>

              <div className="reveal mt-4 flex flex-wrap gap-2">
                <Chip label="What colors do we use?" />
                <Chip label="What fonts do we use?" />
                <Chip label="Summarize our design system" />
              </div>

              <div className="mt-14 text-[11px] font-medium tracking-[0.14em] text-[#9ca3af] uppercase">
                Explore your design system
              </div>

              <div className="mt-4 grid grid-cols-3 gap-4">
                {['Foundations', 'Components', 'Patterns'].map((label, i) => (
                  <FolderCard key={label} label={label} idx={i} />
                ))}
              </div>
            </>
          ) : (
            <>
              <UserBubble text={QUESTION} />
              {thinking && !showAnswer && <ThinkingCard />}
              {showAnswer && <AnswerCard />}
            </>
          )}
        </div>
      </div>

      {!isInitial && (
        <div className="reveal bg-white px-10 py-4">
          <div className="mx-auto max-w-[760px]">
            <div className="relative">
              <div
                className="composer-glow pointer-events-none absolute -top-4 left-[10%] h-8 w-[80%] opacity-60 blur-xl"
                style={{ borderRadius: '50%' }}
              />
              <Composer value="" typing={false} placeholder="Ask a follow up" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Composer({
  value,
  typing,
  placeholder,
  large,
}: {
  value: string
  typing: boolean
  placeholder: string
  large?: boolean
}) {
  const height = large ? 'min-h-[56px]' : 'min-h-[28px]'
  const padding = large ? 'px-6 py-5' : 'px-4 py-3'
  const rounded = large ? 'rounded-3xl' : 'rounded-2xl'
  return (
    <div
      className={`relative ${rounded} border border-black/[0.08] bg-white ${padding}`}
    >
      <div className={`${height} text-[15px] text-[#0f172a]`}>
        {value.length === 0 && !typing ? (
          <span className="text-[#9ca3af]">{placeholder}</span>
        ) : (
          <>
            {value}
            {typing && (
              <span
                aria-hidden
                className="ml-[1px] inline-block h-[0.95em] w-[1.5px] translate-y-[0.15em] bg-[#0f172a] align-baseline"
                style={{ animation: 'blink 1s steps(2, end) infinite' }}
              />
            )}
          </>
        )}
      </div>
      <div className="mt-3 flex items-center justify-between">
        <button
          aria-label="Attach"
          className="flex h-7 w-7 items-center justify-center rounded-full text-[#9ca3af] transition-colors hover:bg-black/[0.03] hover:text-[#4b5563]"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </button>
        <button
          aria-label="Send"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-[#6E5DC6] text-white"
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M3 6.5h7M7 3l3 3.5-3 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}

function UserBubble({ text }: { text: string }) {
  return (
    <div className="reveal flex justify-end">
      <div className="max-w-[80%] rounded-2xl bg-[#f3f4f6] px-4 py-3 text-[15px] leading-[1.5] text-[#0f172a]">
        {text}
      </div>
    </div>
  )
}

function ThinkingCard() {
  return (
    <div className="reveal mt-6">
      <div className="text-[11px] font-medium tracking-[0.14em] uppercase">
        <span className="shimmer-text">Thinking…</span>
      </div>

      <div className="mt-4 space-y-3">
        <div className="shimmer h-3 w-[92%] rounded" />
        <div className="shimmer h-3 w-[78%] rounded" />
        <div className="shimmer h-3 w-[85%] rounded" />
        <div className="shimmer h-3 w-[60%] rounded" />
      </div>

      <div className="mt-6 space-y-2.5">
        <div className="shimmer h-3 w-[70%] rounded" />
        <div className="shimmer h-3 w-[82%] rounded" />
      </div>
    </div>
  )
}

function AnswerCard() {
  return (
    <div className="reveal mt-6">
      <div className="flex items-center gap-2 text-[11px] font-medium tracking-[0.14em] text-[#9ca3af] uppercase">
        <Sparkle />
        Answer
      </div>

      <div className="mt-3 rounded-2xl bg-white">
        <p className="text-[15px] leading-[1.65] text-[#0f172a]">
          Library uses four heading levels &mdash; all set in{' '}
          <span className="rounded bg-[#f3f4f6] px-1 py-0.5 font-mono text-[13px]">Inter</span>.
          Keep a strict one-level step between nested headings.
        </p>

        <div className="mt-4 overflow-hidden rounded-xl border border-black/[0.06] bg-white">
          <div className="grid grid-cols-[72px_112px_1fr] border-b border-black/[0.04] bg-[#fafbfc] px-4 py-2 text-[11px] font-medium tracking-[0.04em] text-[#6b7280] uppercase">
            <span>Level</span>
            <span>Size / Line</span>
            <span>Usage</span>
          </div>
          {[
            ['H1', '48 / 48', 'Page title — once per page'],
            ['H2', '30 / 36', 'Major section headings'],
            ['H3', '24 / 32', 'Subsection headings'],
            ['H4', '20 / 28', 'Minor headings'],
          ].map(([lvl, size, use], i, arr) => (
            <div
              key={lvl}
              className={`grid grid-cols-[72px_112px_1fr] px-4 py-2.5 text-[13px] text-[#0f172a] ${
                i < arr.length - 1 ? 'border-b border-black/[0.03]' : ''
              }`}
            >
              <span className="font-medium">{lvl}</span>
              <span className="text-[#374151]">{size}</span>
              <span className="text-[#6b7280]">{use}</span>
            </div>
          ))}
        </div>

        <p className="mt-4 text-[14px] leading-[1.6] text-[#374151]">
          Use H1 for the page title (one per page), H2 for major sections, and
          H3/H4 only to introduce a child section. Never skip levels &mdash;
          it breaks screen-reader navigation.
        </p>

        <div className="mt-5 flex items-center gap-2">
          <div className="text-[11px] font-medium tracking-[0.12em] text-[#9ca3af] uppercase">
            Source
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-1.5 rounded-md border border-black/[0.08] bg-white px-2.5 py-1 text-[11.5px] font-medium text-[#0f172a]"
          >
            <DocMini />
            <span>Foundations · Typography</span>
          </a>
        </div>
      </div>
    </div>
  )
}

function Chip({ label }: { label: string }) {
  return (
    <div className="rounded-full border border-black/[0.1] bg-white px-3.5 py-1.5 text-[12.5px] text-[#6b7280]">
      {label}
    </div>
  )
}

function FolderCard({ label, idx }: { label: string; idx: number }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[#f3f4f6]">
        <div className="absolute top-1/2 left-1/2 w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-2">
          <div className="flex items-center gap-[3px]">
            <span className="h-[5px] w-[5px] rounded-full bg-[#e5e7eb]" />
            <span className="h-[5px] w-[5px] rounded-full bg-[#e5e7eb]" />
            <span className="h-[5px] w-[5px] rounded-full bg-[#e5e7eb]" />
          </div>
          <div className="mt-2 flex items-center gap-1.5">
            <div
              className="h-1.5 w-1.5 rounded-sm"
              style={{ background: idx === 0 ? '#7c3aed' : idx === 1 ? '#0ea5e9' : '#f59e0b' }}
            />
            <div className="h-1.5 w-8 rounded-sm bg-[#e5e7eb]" />
          </div>
          <div className="mt-2 grid grid-cols-2 gap-1.5">
            <div className="h-6 rounded-sm bg-[#eef0f3]" />
            <div className="h-6 rounded-sm bg-[#eef0f3]" />
          </div>
        </div>
      </div>
      <span className="text-[13.5px] font-medium text-[#0f172a]">{label}</span>
    </div>
  )
}

function Sparkle() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
      <path d="M6 1l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z" />
    </svg>
  )
}

function DocMini() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" className="text-[#6b7280]">
      <path d="M3 1h4l2 2v7H3V1z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M7 1v2h2" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}
