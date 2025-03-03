import { Shift, User } from '@/services/domain'
import { formatTime } from '@/utils'
import { EventInput } from '@fullcalendar/core'
import { ResourceInput } from '@fullcalendar/resource'

const backgroundColors = [
  '#FF4500',
  '#D2691E',
  '#8A2BE2',
  '#1E90FF',
  '#228B22',
  '#B8860B',
  '#E63946',
  '#6A5ACD',
]

export const convertShiftToFCEvent = (shift: Shift, index: number): EventInput => ({
  id: `${shift.userId}-${shift.id}`,
  resourceId: shift.userId,
  title: `${formatTime(shift.start, 'HH:mm')} - ${formatTime(shift.end, 'HH:mm')}`,
  start: new Date(shift.start).toISOString(),
  end: new Date(shift.end).toISOString(),
  backgroundColor: 'transparent',
  borderColor: backgroundColors[index % backgroundColors.length],
  textColor: backgroundColors[index % backgroundColors.length],
})

export const convertUserToFCResource = (user: User): ResourceInput => ({
  id: user.id,
  title: user.name,
})
