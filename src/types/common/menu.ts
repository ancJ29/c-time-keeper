export type MenuItem = {
  key: string
  label: string
  icon: React.ElementType
  url?: string
  onClick?: () => void
  subs?: MenuItem[]
  roles?: string[]
}
