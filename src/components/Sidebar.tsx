import type { ReactNode } from 'react'

type Active = 'home' | 'integrations' | 'settings'

export function Sidebar({
  active,
  press,
  docMode,
}: {
  active: Active
  press: string | null
  docMode?: boolean
}) {
  return (
    <aside className="flex w-[260px] shrink-0 flex-col gap-3 border-r border-black/[0.04] bg-white p-3 text-[13px] text-[#374151]">
      <div className="flex items-center justify-between">
        <div
          className="flex h-8 w-8 items-center justify-center rounded-md text-white"
          style={{
            background:
              'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 50%, #6d28d9 100%)',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 1v14M1 8h14M3 3l10 10M13 3L3 13"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f3f4f6] text-[10px] font-semibold text-[#6b7280]">
          PO
        </div>
      </div>

      <nav className="mt-1 flex flex-col gap-[2px]">
        <NavItem
          icon={<IconHome />}
          label="Home"
          active={active === 'home'}
          pressed={press === 'home'}
        />
        <NavItem
          icon={<IconBolt />}
          label="Integrations"
          active={active === 'integrations'}
          pressed={press === 'integrations'}
        />
        <NavItem
          icon={<IconGear />}
          label="Settings"
          active={active === 'settings'}
          pressed={press === 'settings'}
        />
      </nav>

      <div className="mt-3 flex flex-col gap-2">
        <Dropdown label="Library" />
        <Dropdown label="Library's design system" bold />
      </div>

      <div className="mt-2 flex flex-col gap-1 rounded-lg border border-black/[0.06] bg-white p-2">
        <div className="px-2 pt-1 pb-0.5 text-[11px] text-[#9ca3af]">Folders</div>
        {docMode ? (
          <>
            <FolderOpen label="Foundations" />
            <DocItem label="Typography" active />
            <DocItem label="Colors" />
            <FolderItem label="Components" />
            <FolderItem label="Patterns" />
          </>
        ) : (
          <>
            <FolderItem label="Foundations" />
            <FolderItem label="Components" />
            <FolderItem label="Patterns" />
          </>
        )}
      </div>
    </aside>
  )
}

function NavItem({
  icon,
  label,
  active,
  pressed,
}: {
  icon: ReactNode
  label: string
  active?: boolean
  pressed?: boolean
}) {
  return (
    <div
      className={`flex h-8 items-center gap-2.5 rounded-md px-2.5 transition-all duration-150 ${
        active ? 'bg-[#eef0f3] text-[#111827]' : 'text-[#4b5563]'
      }`}
      style={{ transform: pressed ? 'scale(0.98)' : 'scale(1)' }}
    >
      <span className="flex h-4 w-4 items-center justify-center text-[#6b7280]">
        {icon}
      </span>
      <span className="font-medium">{label}</span>
    </div>
  )
}

function Dropdown({ label, bold }: { label: string; bold?: boolean }) {
  return (
    <div className="flex h-10 items-center justify-between rounded-lg border border-black/[0.06] bg-white px-3">
      <span className={bold ? 'font-semibold text-[#111827]' : 'text-[#374151]'}>
        {label}
      </span>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-[#9ca3af]">
        <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

function FolderItem({ label }: { label: string }) {
  return (
    <div className="flex h-8 items-center gap-2.5 rounded-md px-2">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[#9ca3af]">
        <path
          d="M1.5 4a1 1 0 0 1 1-1h3.6l1.2 1.3h6.2a1 1 0 0 1 1 1V12a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1V4z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-[#4b5563]">{label}</span>
    </div>
  )
}

function FolderOpen({ label }: { label: string }) {
  return (
    <div className="flex h-8 items-center gap-2.5 rounded-md px-2">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[#6b7280]">
        <path
          d="M1.5 4a1 1 0 0 1 1-1h3.6l1.2 1.3h6.2a1 1 0 0 1 1 1v1h-13V4z"
          fill="currentColor"
          fillOpacity="0.25"
        />
        <path
          d="M1.5 4a1 1 0 0 1 1-1h3.6l1.2 1.3h6.2a1 1 0 0 1 1 1V12a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1V4z"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
      </svg>
      <span className="font-medium text-[#111827]">{label}</span>
    </div>
  )
}

function DocItem({ label, active }: { label: string; active?: boolean }) {
  return (
    <div
      className={`ml-5 flex h-8 items-center gap-2.5 rounded-md px-2 ${
        active ? 'bg-[#eef0f3] text-[#111827]' : 'text-[#4b5563]'
      }`}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-[#9ca3af]">
        <path d="M3 1h5l3 3v9H3V1z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M8 1v3h3" stroke="currentColor" strokeWidth="1.2" />
      </svg>
      <span className={active ? 'font-medium' : ''}>{label}</span>
    </div>
  )
}

function IconHome() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M1.5 6.5L7 2l5.5 4.5V12a1 1 0 0 1-1 1H2.5a1 1 0 0 1-1-1V6.5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M5 13V8.5h4V13" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  )
}
function IconBolt() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M8 1L3 8h3l-1 5 5-7H7l1-5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" fill="none" />
    </svg>
  )
}
function IconGear() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="2.2" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M7 1v2M7 11v2M1 7h2M11 7h2M2.8 2.8l1.4 1.4M9.8 9.8l1.4 1.4M2.8 11.2l1.4-1.4M9.8 4.2l1.4-1.4"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  )
}
