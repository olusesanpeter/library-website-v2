export function McpScreen({ press }: { press: string | null }) {
  return (
    <div className="flex-1 overflow-hidden p-6">
      <h2 className="text-[20px] font-semibold text-[#111827]">
        Install Library&rsquo;s MCP server
      </h2>
      <p className="mt-0.5 text-[12px] text-[#6b7280]">
        Choose your editor and follow the steps to connect your design system to your AI coding assistant
      </p>

      <div className="mt-4 rounded-xl border border-black/[0.06] bg-white p-4">
        <EditorTabs />

        <div className="mt-4 flex gap-3">
          <Badge n={1} />
          <div className="flex-1">
            <div className="text-[13px] font-semibold text-[#111827]">
              Install the MCP server
            </div>
            <div className="mt-0.5 text-[12px] text-[#6b7280]">
              Run this command in your terminal to add Library as an MCP server:
            </div>
            <div
              className="mt-2.5 flex items-center gap-3 rounded-md px-3 py-2 font-mono text-[11.5px] text-[#d1d5db] transition-transform duration-150"
              style={{
                background: '#1f2937',
                transform: press === 'copy-cmd' ? 'scale(0.99)' : 'scale(1)',
              }}
            >
              <span className="select-none text-[#6b7280]">1</span>
              <span className="flex-1 truncate">
                <span className="text-[#a78bfa]">claude</span> mcp add library-guide{' '}
                <span className="text-[#60a5fa]">--transport</span> sse{' '}
                <span className="text-[#facc15]">https://mcp.library.guide/shelf</span>
              </span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-[#6b7280]">
                <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.2" />
                <path d="M2 8V2a1 1 0 011-1h6" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </div>
          </div>
        </div>

        <div className="mt-4 flex gap-3">
          <Badge n={2} />
          <div className="flex-1">
            <div className="text-[13px] font-semibold text-[#111827]">
              Verify the connection
            </div>
            <div className="mt-0.5 text-[12px] text-[#6b7280]">
              Run{' '}
              <code className="rounded bg-[#f3f4f6] px-1 py-0.5 font-mono text-[11px] text-[#374151]">
                /mcp
              </code>{' '}
              inside Claude Code to confirm the server is connected.
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="text-[13px] font-semibold text-[#111827]">What the MCP can do</div>
        <div className="mt-0.5 text-[12px] text-[#6b7280]">
          The MCP server exposes a{' '}
          <code className="rounded bg-[#f3f4f6] px-1 py-0.5 font-mono text-[11px] text-[#374151]">
            get_design_context
          </code>{' '}
          tool that can query your design system
        </div>
      </div>

      <div className="mt-2 rounded-xl border border-black/[0.06] bg-white p-3 text-[12px]">
        <Capability icon={<CompassIcon />} title="Explore your design system" code="api.getWorkspace()" />
        <Capability icon={<SearchIcon />} title="Search design system pages" code="api.listDocuments()" />
        <Capability icon={<DocIcon />} title="Read design system content" code="api.readDocument(id)" last />
      </div>
    </div>
  )
}

function EditorTabs() {
  const items = [
    { key: 'claude', label: 'Claude Code', icon: <ClaudeIcon /> },
    { key: 'cursor', label: 'Cursor', icon: <CursorIcon /> },
    { key: 'windsurf', label: 'Windsurf', icon: <WindsurfIcon /> },
    { key: 'other', label: 'Other', icon: <TerminalIcon /> },
  ]
  return (
    <div className="flex items-center gap-6 border-b border-black/[0.06] pb-0.5">
      {items.map((it, i) => {
        const active = i === 0
        return (
          <div
            key={it.key}
            className={`flex items-center gap-1.5 pb-2 text-[12px] ${
              active
                ? 'mb-[-1px] border-b-2 border-[#c4411f] font-medium text-[#111827]'
                : 'text-[#6b7280]'
            }`}
          >
            <span className={active ? 'text-[#c4411f]' : 'text-[#9ca3af]'}>{it.icon}</span>
            <span>{it.label}</span>
          </div>
        )
      })}
    </div>
  )
}

function Badge({ n }: { n: number }) {
  return (
    <div
      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold text-white"
      style={{ background: '#7c3aed' }}
    >
      {n}
    </div>
  )
}

function Capability({
  icon,
  title,
  code,
  last,
}: {
  icon: React.ReactNode
  title: string
  code: string
  last?: boolean
}) {
  return (
    <div className={`flex items-start gap-3 py-2 ${last ? '' : 'border-b border-black/[0.04]'}`}>
      <span className="mt-0.5 text-[#6b7280]">{icon}</span>
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-2">
          <span className="text-[12px] font-medium text-[#111827]">{title}</span>
          <code className="rounded bg-[#f3f4f6] px-1.5 py-0.5 font-mono text-[10.5px] text-[#374151]">
            {code}
          </code>
        </div>
        <span className="text-[11.5px] text-[#6b7280]">
          {title === 'Explore your design system'
            ? 'Navigate your workspace structure — folders, pages, and how your design system is organized'
            : title === 'Search design system pages'
              ? 'Browse and find specific pages like component docs, guidelines, and token references'
              : 'Pull the full content of any page — usage guidelines, component specs, token definitions, and more'}
        </span>
      </div>
    </div>
  )
}

function ClaudeIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path
        d="M6.5 1l1.3 3 3 1.3-3 1.3-1.3 3-1.3-3-3-1.3 3-1.3 1.3-3z"
        fill="currentColor"
      />
    </svg>
  )
}
function CursorIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M6.5 1L1 4v5l5.5 3L12 9V4L6.5 1z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  )
}
function WindsurfIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M1 8c2 1 3-1 5-1s3 2 6 1M1 10c2 1 3-1 5-1s3 2 6 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}
function TerminalIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path d="M2 3l3 3-3 3M6 9h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function CompassIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M7 7l3-3-2 5-4 1 3-3z" fill="currentColor" />
    </svg>
  )
}
function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="6" cy="6" r="4" stroke="currentColor" strokeWidth="1.2" />
      <path d="M9 9l3.5 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}
function DocIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M3 1h5l3 3v9H3V1z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M8 1v3h3M5 7h4M5 10h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}
