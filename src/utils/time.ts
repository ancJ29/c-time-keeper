import { DateValue } from '@/types'
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

export function startOfWeek(timestamp: number) {
  const res = timestamp - (timestamp % ONE_WEEK) - 3 * ONE_DAY
  return res + ONE_WEEK > timestamp ? res : res + ONE_WEEK
}

export function endOfWeek(timestamp: number) {
  return endOfDay(startOfWeek(timestamp) + ONE_WEEK - ONE_DAY)
}

export function startOfMonth(timestamp: number): number {
  const date = new Date(timestamp)
  date.setDate(1)
  date.setHours(0, 0, 0, 0)
  return date.getTime()
}

export function endOfMonth(timestamp: number): number {
  const date = new Date(timestamp)
  date.setMonth(date.getMonth() + 1)
  date.setDate(0)
  date.setHours(23, 59, 59, 999)
  return date.getTime()
}

export function formatTime(dateTime?: number | string | Date | null, format = 'DD/MM/YYYY HH:mm') {
  return dateTime ? dayjs(dateTime).format(format) : '-'
}

export function diffHours(start: number | null, end: number | null) {
  if (!start || !end) {
    return 0
  }
  const diffMilliseconds = end - start
  if (diffMilliseconds <= 0) {
    return 0
  }
  return Math.floor(diffMilliseconds / ONE_HOUR)
}

export function diffMinutes(start: number | null, end: number | null) {
  if (!start || !end) {
    return 0
  }
  const diffMilliseconds = end - start
  if (diffMilliseconds <= 0) {
    return 0
  }
  const totalMinutes = Math.floor(diffMilliseconds / ONE_MINUTE)
  return totalMinutes % 60
}

export function formatDuration(totalMilliseconds: number | null) {
  if (totalMilliseconds === null) {
    return '-'
  }
  const hours = Math.floor(totalMilliseconds / ONE_HOUR)
  const minutes = Math.floor((totalMilliseconds % ONE_HOUR) / ONE_MINUTE)

  return `${hours}:${minutes.toString().padStart(2, '0')}`
}

export function isSameDate(a: Date | null, b?: Date | null) {
  if (!b || !a) {
    return false
  }
  return a.toLocaleDateString() === b.toLocaleDateString()
}

export function today(date: Date): [DateValue, DateValue] {
  return [date, date]
}

export function yesterday(date: Date): [DateValue, DateValue] {
  const yesterday = new Date(date)
  yesterday.setDate(yesterday.getDate() - 1)
  return [yesterday, yesterday]
}

export function thisWeek(date: Date): [DateValue, DateValue] {
  const _startOfWeek = new Date(startOfWeek(date.getTime()))
  const _endOfWeek = new Date(endOfWeek(date.getTime()))
  return [_startOfWeek, _endOfWeek]
}

export function lastWeek(date: Date): [DateValue, DateValue] {
  const lastWeek = date.getTime() - ONE_WEEK
  const startOfLastWeek = new Date(startOfWeek(lastWeek))
  const endOfLastWeek = new Date(endOfWeek(lastWeek))
  return [startOfLastWeek, endOfLastWeek]
}

export function thisMonth(date: Date): [DateValue, DateValue] {
  const _startOfMonth = new Date(startOfMonth(date.getTime()))
  const _endOfMonth = new Date(endOfMonth(date.getTime()))
  return [_startOfMonth, _endOfMonth]
}

export function lastMonth(date: Date): [DateValue, DateValue] {
  const lastMonthDate = new Date(date.getFullYear(), date.getMonth() - 1, 1)
  const startOfLastMonth = new Date(startOfMonth(lastMonthDate.getTime()))
  const endOfLastMonth = new Date(endOfMonth(lastMonthDate.getTime()))
  return [startOfLastMonth, endOfLastMonth]
}
