import { ParsedUrlQueryInput } from 'querystring'
import { ComponentProps } from 'react'

export interface Link {
  pathname: string
  query: ParsedUrlQueryInput
}

export interface NavItem {
  icon: (props: ComponentProps<'svg'>) => JSX.Element
  label: string
  link: Link
}
