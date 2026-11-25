import type { ReactNode } from 'react'

function Svg({ children, size = 18 }: { children: ReactNode; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  )
}
export const FilesIcon = ({ size }: { size?: number }) => (
  <Svg size={size}><path d="M14 3H7a2 2 0 0 0-2 2v11" /><path d="M10 7h7l3 3v9a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z" /></Svg>
)
export const TerminalIcon = ({ size }: { size?: number }) => (
  <Svg size={size}><rect x="3" y="4" width="18" height="16" rx="2" /><path d="m7 9 3 3-3 3M12 16h5" /></Svg>
)
export const BackIcon = ({ size }: { size?: number }) => (
  <Svg size={size}><path d="M19 12H5M11 6l-6 6 6 6" /></Svg>
)
export const ChevronIcon = ({ open }: { open?: boolean }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ transform: open ? 'rotate(90deg)' : 'none', transition: 'transform .15s' }}>
    <path d="m9 6 6 6-6 6" />
  </svg>
)
export const CloseIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
)
export const TsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><rect width="16" height="16" rx="2" fill="#3178c6" /><text x="8" y="12" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#fff" fontFamily="ui-monospace, monospace">TS</text></svg>
)
export const MdIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><rect x="1" y="3" width="14" height="10" rx="2" fill="none" stroke="#519aba" strokeWidth="1.2" /><path d="M3.5 10.5v-5l2 2.5 2-2.5v5M11 5.5v5m-1.5-1.5 1.5 1.5 1.5-1.5" fill="none" stroke="#519aba" strokeWidth="1.1" /></svg>
)
export const FolderIcon = ({ open }: { open?: boolean }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d={open ? 'M1.5 4.5h4l1.2 1.2h7.8v7.3h-13z' : 'M1.5 3.5h4.2l1.3 1.5h7.5v8h-13z'} fill="#dcb67a" /></svg>
)
export const ViewIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><rect x="2" y="2.5" width="12" height="11" rx="1.5" fill="none" stroke="#9cdcfe" strokeWidth="1.2" /><path d="M2 6h12" stroke="#9cdcfe" strokeWidth="1.2" /></svg>
)
