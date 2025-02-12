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
