export function AskScreen() {
  return (
    <div className="flex-1 overflow-hidden p-6">
      <div className="mx-auto max-w-[560px] pt-6">
        <h2 className="text-[22px] font-semibold text-[#111827]">
          Good morning, Peter
        </h2>
        <p className="mt-1 text-[13px] text-[#6b7280]">
          Ask anything about your design system.
        </p>

        <div
          className="mt-5 rounded-2xl border bg-white p-3 shadow-sm"
          style={{ borderColor: 'rgba(124, 88, 242, 0.5)' }}
        >
          <div className="px-1 pt-2 pb-6 text-[14px] text-[#111827]">
            How do I use the{' '}
            <span className="rounded bg-[#eef0f3] px-1 py-0.5 text-[#111827]">
              Button
            </span>{' '}
            component
            <span className="ml-0.5 inline-block h-[15px] w-[1.5px] translate-y-[2px] bg-[#111827] animate-[blink_1.1s_steps(2,end)_infinite]" />
          </div>
          <div className="flex items-center justify-between border-t border-black/[0.04] pt-2">
            <div className="flex items-center gap-1.5 rounded-md px-2 py-1 text-[11.5px] text-[#6b7280]">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M6 1a5 5 0 100 10A5 5 0 006 1zm0 2v3l2 1"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Auto
            </div>
            <div className="flex items-center gap-2 text-[#9ca3af]">
              <span className="flex h-6 w-6 items-center justify-center rounded bg-[#f3f4f6] text-[11px] font-mono">
                /
              </span>
              <button
                className="flex h-7 w-7 items-center justify-center rounded-md text-white shadow-sm"
                style={{ background: 'linear-gradient(180deg, #8b5cf6 0%, #7c3aed 100%)' }}
              >
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M6.5 10V3M3 6.5L6.5 3L10 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <Chip icon={<DocIcon />} label="Find Button variants" />
          <Chip icon={<MicIcon />} label="Recap last release" />
          <Chip icon={<SparkleIcon />} label="Audit color tokens" />
        </div>

        <div className="mt-8 text-[11.5px] font-medium text-[#9ca3af] uppercase tracking-wider">
          Recent
        </div>
        <div className="mt-2 space-y-1.5">
          <Row title="How do we handle focus rings?" time="2h ago" />
          <Row title="What's our z-index scale?" time="Yesterday" />
          <Row title="Is there a new Card component?" time="2d ago" />
        </div>
      </div>
    </div>
  )
}

function Chip({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-1.5 rounded-full border border-black/[0.06] bg-white px-3 py-1.5 text-[12px] text-[#374151] shadow-sm">
      <span className="text-[#6b7280]">{icon}</span>
      {label}
    </div>
  )
}

function Row({ title, time }: { title: string; time: string }) {
  return (
    <div className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-[#f3f4f6]">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-[#9ca3af]">
        <path d="M3 3h8l-1 8H4L3 3z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M5 6h4M5 8h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
      <span className="flex-1 truncate text-[12.5px] text-[#111827]">{title}</span>
      <span className="text-[11px] text-[#9ca3af]">{time}</span>
    </div>
  )
}

function DocIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M3 1h4l2 2v8H3V1z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M7 1v2h2" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}
function MicIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <rect x="4" y="1" width="4" height="6" rx="2" stroke="currentColor" strokeWidth="1.2" />
      <path d="M2.5 6a3.5 3.5 0 007 0M6 9.5V11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}
function SparkleIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path
        d="M6 1l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z"
        fill="currentColor"
      />
    </svg>
  )
}
