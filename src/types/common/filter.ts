export type FilterProps<T> = {
  condition?: T
  keyword: string
  names: string[]
  filtered: boolean
  reset: () => void
  reload: (keyword?: string) => void
  setCondition: (condition: T) => void
  updateCondition: (key: string, value: unknown, keyword?: string) => void
}
