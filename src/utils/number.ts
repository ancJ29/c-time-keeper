export function formatNumber(value: number): string {
  const roundedValue = Math.ceil(value * 1000) / 1000
  return roundedValue.toLocaleString('en-US', {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  })
}
