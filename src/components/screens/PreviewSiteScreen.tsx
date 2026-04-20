import { useState } from 'react'

export function PreviewSiteScreen() {
  return (
    <div className="flex w-full bg-white">
      {/* Docs-site sidebar */}
      <aside className="flex w-[240px] shrink-0 flex-col gap-4 border-r border-black/[0.04] bg-white p-5 text-[13px]">
        <div className="flex items-center gap-1.5">
          <div
            className="flex h-6 w-6 items-center justify-center rounded"
            style={{
              background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-white">
              <path
                d="M6 1v10M1 6h10M2.5 2.5l7 7M9.5 2.5l-7 7"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <span className="text-[17px] font-medium tracking-[-0.01em] text-[#0f172a]">
            Library
          </span>
        </div>

        <div className="flex items-center gap-2 rounded-lg bg-[#fafafa] px-2.5 py-1.5">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-[#9ca3af]">
            <circle cx="5" cy="5" r="3.5" stroke="currentColor" strokeWidth="1.2" />
            <path d="M7.5 7.5l3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
          <span className="text-[12px] text-[#9ca3af]">Search...</span>
        </div>

        <nav className="flex flex-col gap-0.5">
          <SectionHeader label="Foundations" open />
          <DocRow label="Typography" active />
          <DocRow label="Colors" />
          <SectionHeader label="Components" />
          <SectionHeader label="Patterns" />
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto grid max-w-[860px] grid-cols-[1fr_180px] gap-10 px-10 py-10">
        <article className="min-w-0">
          <div className="flex items-center gap-1.5 text-[10.5px] font-medium tracking-[0.1em] text-[#9ca3af] uppercase">
            <span>Home</span>
            <span className="text-[#d1d5db]">/</span>
            <span>Foundations</span>
            <span className="text-[#d1d5db]">/</span>
            <span className="text-[#0f172a]">Typography</span>
          </div>

          <h1 className="mt-4 text-[32px] font-medium tracking-[-0.02em] text-[#0f172a]">
            Typography
          </h1>

          {/* Figma embed card (title hidden on published view) */}
          <div className="mt-6 overflow-hidden rounded-xl border border-black/[0.06] bg-white">
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
                className="grid grid-cols-[100px_160px_1fr] border-t border-black/[0.04] px-4 py-3 text-[12.5px] text-[#0f172a]"
              >
                <span>{style}</span>
                <span>{size}</span>
                <span>{font}</span>
              </div>
            ))}
          </div>

          <p className="mt-6 text-[14.5px] leading-[1.65] text-[#374151]">
            Our heading system provides four distinct typographic levels designed
            to create clear visual hierarchy and improve content organization.
            Each heading level serves a specific purpose in establishing
            information architecture and guiding users through content.
          </p>

          <h2 className="mt-10 text-[24px] font-medium tracking-[-0.01em] text-[#0f172a]">
            Heading Levels Overview
          </h2>

          {/* Table card (title hidden on published view) */}
          <div className="mt-5 overflow-hidden rounded-xl border border-black/[0.06] bg-white">
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
                className="grid grid-cols-4 gap-3 border-t border-black/[0.04] px-4 py-3 text-[12.5px] text-[#0f172a]"
              >
                <span>{lvl}</span>
                <span>{purpose}</span>
                <span>{context}</span>
                <span>{freq}</span>
              </div>
            ))}
          </div>

          {/* Usage Guidelines */}
          <section className="mt-12">
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

          <DosAndDontsTabs />
        </article>

        <aside className="sticky top-4 h-fit">
          <div className="text-[10.5px] font-medium tracking-[0.12em] text-[#9ca3af] uppercase">
            On this page
          </div>
          <div className="mt-4 flex flex-col gap-3">
            <span className="h-2.5 w-[140px] rounded bg-[#eef0f3]" />
            <span className="h-2.5 w-[108px] rounded bg-[#eef0f3]" />
            <span className="h-2.5 w-[128px] rounded bg-[#eef0f3]" />
            <span className="h-2.5 w-[96px] rounded bg-[#eef0f3]" />
          </div>
        </aside>
        </div>
      </div>

      {/* Ask AI floating button */}
      <div
        className="pointer-events-none absolute right-10 bottom-6 flex items-center gap-1.5 rounded-full bg-white px-3 py-2 text-[12px] font-medium text-[#374151]"
        style={{
          boxShadow:
            '0 0 0 1px rgba(15, 15, 30, 0.04), 0 1px 2px rgba(15, 15, 30, 0.06), 0 8px 16px -4px rgba(15, 15, 30, 0.08), 0 24px 48px -12px rgba(15, 15, 30, 0.18)',
        }}
      >
        <span
          className="flex h-4 w-4 items-center justify-center rounded-full"
          style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)' }}
        >
          <svg width="9" height="9" viewBox="0 0 9 9" fill="none" className="text-white">
            <circle cx="3" cy="4.5" r="0.8" fill="currentColor" />
            <circle cx="6" cy="4.5" r="0.8" fill="currentColor" />
          </svg>
        </span>
        Ask AI
      </div>
    </div>
  )
}

function DosAndDontsTabs() {
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
    <section className="mt-12">
      <h2 className="text-[24px] font-medium tracking-[-0.01em] text-[#0f172a]">Do&rsquo;s and Don&rsquo;ts</h2>
      <p className="mt-2 text-[14px] leading-[1.6] text-[#6b7280]">
        Quick checks to help your team apply the scale consistently.
      </p>

      <div className="mt-5 overflow-hidden rounded-xl border border-black/[0.06] bg-white">
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
    </section>
  )
}

function SectionHeader({ label, open }: { label: string; open?: boolean }) {
  return (
    <div className="flex items-center gap-1 px-1 py-1.5 text-[10.5px] font-medium tracking-[0.1em] text-[#0f172a] uppercase">
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="text-[#9ca3af]">
        {open ? (
          <path d="M2 4l3 3 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M4 2l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
      {label}
    </div>
  )
}

function DocRow({ label, active }: { label: string; active?: boolean }) {
  return (
    <div
      className={`ml-4 flex items-center rounded-md py-1.5 pr-2 pl-5 text-[13px] ${
        active ? 'bg-[#eef0f3] font-medium text-[#0f172a]' : 'text-[#6b7280]'
      }`}
    >
      {label}
    </div>
  )
}

