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
