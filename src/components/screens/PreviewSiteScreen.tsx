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
          <span className="text-[17px] font-semibold tracking-[-0.01em] text-[#0f172a]">
            library
          </span>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-black/[0.06] bg-[#fafafa] px-2.5 py-1.5">
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
        <div className="mx-auto grid max-w-[960px] grid-cols-[1fr_180px] gap-10 px-10 py-8">
          <article className="min-w-0">
            <div className="flex items-center gap-1.5 text-[10.5px] font-medium tracking-[0.1em] text-[#9ca3af] uppercase">
              <span>Home</span>
              <span className="text-[#d1d5db]">/</span>
              <span>Foundations</span>
              <span className="text-[#d1d5db]">/</span>
              <span className="text-[#0f172a]">Typography</span>
            </div>

            <h1 className="mt-4 text-[40px] font-semibold tracking-[-0.02em] text-[#0f172a]">
              Typography
            </h1>

            <div className="mt-6 overflow-hidden rounded-xl border border-black/[0.06] bg-white">
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-[12.5px] text-[#374151]">4 text styles</span>
                <button className="flex items-center gap-1.5 rounded-md border border-black/[0.08] bg-white px-2.5 py-1.5 text-[11.5px] font-medium text-[#374151]">
                  <FigmaGlyph small />
                  View in Figma
                </button>
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
                  className={`grid grid-cols-3 px-4 py-3 text-[12.5px] text-[#0f172a] ${
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

            <div className="mt-5 overflow-hidden rounded-xl border border-black/[0.06] bg-white">
              <div className="grid grid-cols-4 border-b border-black/[0.05] bg-[#fafbfc] px-4 py-2.5 text-[11.5px] font-medium text-[#6b7280]">
                <span>Level</span>
                <span>Purpose</span>
                <span>Context</span>
                <span>Frequency</span>
              </div>
              {[
                ['H1', 'Primary page title', 'Page headers', 'Once per page'],
                ['H2', 'Major section headings', 'Content divisions', '2-4 per page'],
                ['H3', 'Subsection headings', 'Secondary groups', 'Multiple'],
                ['H4', 'Minor headings', 'Detailed subdivisions', 'As needed'],
              ].map(([lvl, purpose, context, freq], i, arr) => (
                <div
                  key={lvl}
                  className={`grid grid-cols-4 gap-3 px-4 py-3 text-[12.5px] text-[#0f172a] ${
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

            <h2 className="mt-10 text-[20px] font-semibold tracking-[-0.01em] text-[#0f172a]">
              Usage Guidelines
            </h2>
            <h3 className="mt-4 text-[15px] font-semibold text-[#0f172a]">
              Hierarchy and Structure
            </h3>
            <p className="mt-2 text-[14px] leading-[1.65] text-[#374151]">
              Always maintain proper heading hierarchy without skipping levels.
              Start with H1 for page titles.
            </p>
          </article>

          <aside className="sticky top-4 h-fit">
            <div className="text-[10.5px] font-semibold tracking-[0.12em] text-[#9ca3af] uppercase">
              On this page
            </div>
            <div className="mt-3 space-y-2 text-[12.5px]">
              <a className="block text-[#0f172a]" href="#">Heading Levels Overview</a>
              <a className="block text-[#6b7280]" href="#">Usage Guidelines</a>
              <a className="block pl-3 text-[#6b7280]" href="#">Hierarchy and Structure</a>
              <a className="block pl-3 text-[#6b7280]" href="#">Content Organization</a>
              <a className="block pl-3 text-[#6b7280]" href="#">Accessibility Considerations</a>
            </div>
          </aside>
        </div>
      </div>

      {/* Ask AI floating button */}
      <div
        className="pointer-events-none absolute right-5 bottom-5 flex items-center gap-1.5 rounded-full border border-black/[0.08] bg-white px-3 py-2 text-[12px] font-medium text-[#374151] shadow-md"
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

function SectionHeader({ label, open }: { label: string; open?: boolean }) {
  return (
    <div className="flex items-center gap-1 px-1 py-1.5 text-[10.5px] font-semibold tracking-[0.1em] text-[#0f172a] uppercase">
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
      className={`ml-4 flex items-center rounded-md px-2 py-1.5 text-[13px] ${
        active ? 'bg-[#eef0f3] font-medium text-[#0f172a]' : 'text-[#6b7280]'
      }`}
    >
      {label}
    </div>
  )
}

function FigmaGlyph({ small }: { small?: boolean }) {
  const size = small ? 11 : 13
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
