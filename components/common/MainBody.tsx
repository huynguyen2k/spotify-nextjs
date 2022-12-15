import { ReactNode } from 'react'

export interface MainBodyProps {
  children: ReactNode
}

export function MainBody({ children }: MainBodyProps) {
  return <div className="ml-sidebar-width w-auto h-screen bg-slate-700">{children}</div>
}
