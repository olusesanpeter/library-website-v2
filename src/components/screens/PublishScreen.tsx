export function PublishScreen({ press }: { press: string | null }) {
  return (
    <div className="flex-1 overflow-hidden p-6">
      <h2 className="text-[20px] font-semibold text-[#111827]">Publish</h2>
      <p className="mt-0.5 text-[12px] text-[#6b7280]">
        Share your design system with the world.
      </p>

      <div className="mt-5 overflow-hidden rounded-xl border border-black/[0.06] bg-white">
        <div className="flex items-center justify-between p-5">
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#22c55e]/15">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M5 9.5l2.5 2.5L13.5 6"
                  stroke="#22c55e"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="absolute top-0 right-0 h-2.5 w-2.5 rounded-full bg-[#22c55e]">
                <span className="absolute inset-0 rounded-full bg-[#22c55e] opacity-70 animate-[pulseRing_1.8s_ease-out_infinite]" />
              </span>
            </div>
            <div>
              <div className="text-[14px] font-semibold text-[#111827]">
                Website published
              </div>
              <div className="text-[12px] text-[#6b7280]">
                Last updated 2 minutes ago by Peter Olusesan
              </div>
            </div>
          </div>
          <button
            className="flex items-center gap-1.5 rounded-md px-3.5 py-2 text-[12px] font-medium text-white shadow-sm transition-transform duration-150"
            style={{
              background: 'linear-gradient(180deg, #8b5cf6 0%, #7c3aed 100%)',
              transform: press === 'preview' ? 'scale(0.97)' : 'scale(1)',
            }}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.2" />
              <path
                d="M1.5 6.5h10M6.5 1.5a8 8 0 010 10M6.5 1.5a8 8 0 000 10"
                stroke="currentColor"
                strokeWidth="1"
              />
            </svg>
            Preview site
          </button>
        </div>

        <div className="border-t border-black/[0.04] px-5 py-3">
          <div className="flex items-center gap-2 text-[12px] text-[#6b7280]">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full bg-[#22c55e]"
              style={{ animation: 'pulseDot 1.8s ease-in-out infinite' }}
            />
            Synced with Figma &middot;{' '}
            <span className="text-[#111827]">Atlas &mdash; v2.1</span>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <DomainCard
          title="Base domain"
          helper="Your default Library URL"
          input="shelf.preview.guide"
          action="Change"
          locked
        />
        <DomainCard
          title="Custom domain"
          helper="Point your own domain to Library"
          input="design.library.guide"
          action="Add"
          accent
        />
      </div>

      <div className="mt-5 text-[11.5px] font-medium text-[#9ca3af] uppercase tracking-wider">
        Publish history
      </div>
      <div className="mt-2 overflow-hidden rounded-lg border border-black/[0.06] bg-white">
        <HistoryRow date="Today, 11:42" by="Peter Olusesan" status="Live" />
        <HistoryRow date="18 Apr, 14:10" by="Peter Olusesan" status="Live" />
        <HistoryRow date="15 Apr, 09:05" by="Maya Kimura" status="Live" last />
      </div>
    </div>
  )
}

function DomainCard({
  title,
  helper,
  input,
  action,
  locked,
  accent,
}: {
  title: string
  helper: string
  input: string
  action: string
  locked?: boolean
  accent?: boolean
}) {
  return (
    <div className="rounded-xl border border-black/[0.06] bg-white p-4">
      <div className="text-[13px] font-semibold text-[#111827]">{title}</div>
      <div className="mt-0.5 text-[11.5px] text-[#6b7280]">{helper}</div>
      <div className="mt-3 flex items-center gap-2">
        <div className="flex flex-1 items-center gap-1.5 rounded-md border border-black/[0.06] bg-[#fafafa] px-2.5 py-2 text-[12px] text-[#374151]">
          {locked && (
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="text-[#9ca3af]">
              <rect x="2" y="4.5" width="6" height="4" rx="0.5" stroke="currentColor" strokeWidth="1.1" />
              <path d="M3.5 4.5V3a1.5 1.5 0 013 0v1.5" stroke="currentColor" strokeWidth="1.1" />
            </svg>
          )}
          <span className={locked ? 'text-[#6b7280]' : 'text-[#111827]'}>{input}</span>
        </div>
        <button
          className={`rounded-md px-2.5 py-2 text-[11.5px] font-medium ${
            accent
              ? 'text-white shadow-sm'
              : 'border border-black/[0.08] bg-white text-[#374151]'
          }`}
          style={
            accent
              ? { background: 'linear-gradient(180deg, #8b5cf6 0%, #7c3aed 100%)' }
              : undefined
          }
        >
          {action}
        </button>
      </div>
    </div>
  )
}

function HistoryRow({
  date,
  by,
  status,
  last,
}: {
  date: string
  by: string
  status: string
  last?: boolean
}) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-2.5 text-[12px] ${
        last ? '' : 'border-b border-black/[0.04]'
      }`}
    >
      <span className="inline-flex h-5 items-center gap-1 rounded-full bg-[#dcfce7] px-2 text-[10.5px] font-medium text-[#166534]">
        <span className="h-1 w-1 rounded-full bg-[#22c55e]" />
        {status}
      </span>
      <span className="text-[#111827]">{date}</span>
      <span className="text-[#6b7280]">&middot;</span>
      <span className="text-[#6b7280]">{by}</span>
      <span className="ml-auto text-[#9ca3af]">&rsaquo;</span>
    </div>
  )
}
