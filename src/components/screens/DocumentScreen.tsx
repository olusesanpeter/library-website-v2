export function DocumentScreen({ press }: { press: string | null }) {
  return (
    <div className="flex-1 overflow-hidden">
      {/* Top bar: breadcrumb + preview */}
      <div className="flex items-center justify-between border-b border-black/[0.04] px-6 py-4">
        <div className="flex items-center gap-1.5 text-[13px]">
          <span className="text-[#6b7280]">Foundations</span>
          <span className="text-[#d1d5db]">/</span>
          <span className="text-[#111827]">Typography</span>
        </div>
        <button
          className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[12px] font-medium text-white shadow-sm transition-transform duration-150"
          style={{
            background: 'linear-gradient(180deg, #8b5cf6 0%, #7c3aed 100%)',
            transform: press === 'preview' ? 'scale(0.97)' : 'scale(1)',
          }}
        >
          Preview
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path d="M3 1h7v7M10 1L3 8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Body: main + TOC */}
      <div className="grid grid-cols-[1fr_180px] gap-8 overflow-y-auto px-8 py-8">
        <article className="min-w-0">
          <h1 className="text-[38px] font-semibold tracking-[-0.02em] text-[#0f172a]">
            Typography
          </h1>

          {/* Figma embed card */}
          <div className="mt-6 overflow-hidden rounded-xl border border-black/[0.06] bg-white">
            <div className="flex items-center gap-2 border-b border-black/[0.05] bg-[#f8f9fb] px-4 py-2.5">
              <FigmaGlyph />
              <span className="text-[12.5px] font-medium text-[#111827]">Figma</span>
            </div>

            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-[12.5px] text-[#374151]">4 text styles</span>
              <div className="flex items-center gap-2">
                <button
                  className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[11.5px] font-medium text-white shadow-sm transition-transform duration-150"
                  style={{
                    background: 'linear-gradient(180deg, #8b5cf6 0%, #7c3aed 100%)',
                    transform: press === 'first-draft' ? 'scale(0.97)' : 'scale(1)',
                  }}
                >
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                    <path d="M5.5 1l1 2.5 2.5 1-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1 1-2.5z" fill="currentColor" />
                  </svg>
                  First draft with AI
                </button>
                <button className="flex items-center gap-1.5 rounded-md border border-black/[0.08] bg-white px-2.5 py-1.5 text-[11.5px] font-medium text-[#374151]">
                  <FigmaGlyph small />
                  View in Figma
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 border-t border-black/[0.05] bg-[#fafbfc] px-4 py-2.5 text-[11.5px] font-medium text-[#6b7280]">
              <span>Text Style</span>
              <span>Size / Line height</span>
              <span className="text-right">Font</span>
            </div>
            {[
              ['h4', '20/28', 'Inter'],
              ['h3', '24/32', 'Inter'],
              ['h1', '48/48', 'Inter'],
              ['h2', '30/36', 'Inter'],
            ].map(([style, size, font], i, arr) => (
              <div
                key={style}
                className={`grid grid-cols-3 px-4 py-3 text-[12.5px] text-[#111827] ${
                  i < arr.length - 1 ? 'border-t border-black/[0.04]' : ''
                }`}
              >
                <span>{style}</span>
                <span>{size}</span>
                <span className="text-right">{font}</span>
              </div>
            ))}
          </div>

          <p className="mt-6 text-[14.5px] leading-[1.65] text-[#374151]">
            Our heading system provides four distinct typographic levels designed
            to create clear visual hierarchy and improve content organization.
            Each heading level serves a specific purpose in establishing
            information architecture and guiding users through content.
          </p>

          <h2 className="mt-10 text-[24px] font-semibold tracking-[-0.01em] text-[#0f172a]">
            Heading Levels Overview
          </h2>

          {/* Table card */}
          <div className="mt-5 overflow-hidden rounded-xl border border-black/[0.06] bg-white">
            <div className="flex items-center gap-2 border-b border-black/[0.05] bg-[#f8f9fb] px-4 py-2.5">
              <TableGlyph />
              <span className="text-[12.5px] font-medium text-[#111827]">Table</span>
            </div>

            <div className="grid grid-cols-4 border-b border-black/[0.05] bg-[#fafbfc] px-4 py-2.5 text-[11.5px] font-medium text-[#6b7280]">
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
            ].map(([lvl, purpose, context, freq], i, arr) => (
              <div
                key={lvl}
                className={`grid grid-cols-4 gap-3 px-4 py-3 text-[12.5px] text-[#111827] ${
                  i < arr.length - 1 ? 'border-t border-black/[0.04]' : ''
                }`}
              >
                <span>{lvl}</span>
                <span>{purpose}</span>
                <span>{context}</span>
                <span>{freq}</span>
              </div>
            ))}
          </div>
        </article>

        {/* TOC */}
        <aside className="sticky top-4 h-fit">
          <div className="text-[10.5px] font-semibold tracking-[0.12em] text-[#9ca3af] uppercase">
            On this page
          </div>
          <div className="mt-3 space-y-2 text-[12.5px]">
            <a className="block text-[#111827]" href="#">Heading Levels Overview</a>
            <a className="block text-[#6b7280] hover:text-[#111827]" href="#">Usage Guidelines</a>
            <a className="block pl-3 text-[#6b7280] hover:text-[#111827]" href="#">Hierarchy and Structure</a>
            <a className="block pl-3 text-[#6b7280] hover:text-[#111827]" href="#">Content Organization</a>
            <a className="block pl-3 text-[#6b7280] hover:text-[#111827]" href="#">Accessibility Considerations</a>
          </div>
        </aside>
      </div>
    </div>
  )
}

function FigmaGlyph({ small }: { small?: boolean }) {
  const s = small ? 11 : 13
  return (
    <svg width={s} height={s} viewBox="0 0 14 14" fill="none">
      <path d="M7 7a2 2 0 100 4h-2a2 2 0 010-4 2 2 0 010-4h2a2 2 0 010 4z" fill="#a78bfa" />
      <path d="M7 3h2a2 2 0 010 4H7V3z" fill="#f97316" />
      <path d="M7 7a2 2 0 104 0 2 2 0 00-4 0z" fill="#2dd4bf" />
      <path d="M3 3h2v4H3a2 2 0 010-4z" fill="#ef4444" />
      <path d="M3 11a2 2 0 012-2h2v2a2 2 0 01-4 0z" fill="#3b82f6" />
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
