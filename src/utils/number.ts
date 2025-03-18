export function formatNumber(value: number): string {
  return new Intl.NumberFormat('de-DE').format(Math.floor(value))
}
