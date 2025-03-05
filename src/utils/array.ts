export function unique<T>(arr: T[]) {
  return [...new Set(arr)]
}

export function cloneDeep<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}
