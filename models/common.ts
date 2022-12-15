import { ComponentProps } from 'react'

export interface NavItem {
  icon: (props: ComponentProps<'svg'>) => JSX.Element
  label: string
  url: string
}
