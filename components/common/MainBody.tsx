import { ReactNode } from 'react'

export interface MainBodyProps {
  children: ReactNode
}

export function MainBody({ children }: MainBodyProps) {
  return <div className="ml-sidebar-width h-screen w-auto bg-slate-700">{children}</div>
}
