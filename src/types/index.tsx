export * from './common'
export * from './schema'

export type MantineWidth =
  | number
  | string
  | Partial<Record<'base' | 'sm' | 'md' | 'lg' | 'xl', number | string>>

export type TextAlign = 'left' | 'right' | 'center'

export type GenericObject = Record<string, unknown>

export type OptionProps = {
  value: string | number
  label: string
}

export type MenuItem = {
  key: string
  label: string
  icon: React.ElementType
  url?: string
  onClick?: () => void
  hiddenFrom?: string
  subs?: MenuItem[]
  roles?: string[]
}
