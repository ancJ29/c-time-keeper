import dayjs from 'dayjs'

export const ONE_SECOND = 1000
export const ONE_MINUTE = ONE_SECOND * 60
export const ONE_HOUR = ONE_MINUTE * 60
export const ONE_DAY = ONE_HOUR * 24
export const ONE_WEEK = ONE_DAY * 7

export function startOfDay(timestamp: number) {
  return dayjs(timestamp).startOf('day').valueOf()
}

export function endOfDay(timestamp: number) {
  return startOfDay(timestamp) + ONE_DAY - ONE_SECOND
}

export function startOfMonth(timestamp: number): number {
  const date = new Date(timestamp)
  date.setDate(1)
  date.setHours(0, 0, 0, 0)
  return date.getTime()
}

export function endOfMonth(timestamp: number): number {
  const date = new Date(timestamp)
  date.setMonth(date.getUTCMonth() + 1)
  date.setDate(0)
  date.setHours(23, 59, 59, 999)
  return date.getTime()
}

export function formatTime(dateTime?: number | string | Date | null, format = 'DD/MM/YYYY HH:mm') {
  return dateTime ? dayjs(dateTime).format(format) : '-'
}

export function diffHours(start: Date | null, end: Date | null) {
  if (!start || !end) {
    return 0
  }
  const diffMilliseconds = end.getTime() - start.getTime()
  if (diffMilliseconds <= 0) {
    return 0
  }
  return Math.floor(diffMilliseconds / ONE_HOUR)
}

export function diffMinutes(start: Date | null, end: Date | null) {
  if (!start || !end) {
    return 0
  }
  const diffMilliseconds = end.getTime() - start.getTime()
  if (diffMilliseconds <= 0) {
    return 0
  }
  const totalMinutes = Math.floor(diffMilliseconds / ONE_MINUTE)
  return totalMinutes % 60
}
