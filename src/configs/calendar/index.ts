import { Shift, User } from '@/services/domain'
import { formatTime } from '@/utils'
import { EventInput } from '@fullcalendar/core'
import { ResourceInput } from '@fullcalendar/resource'

const backgroundColors = [
  '#FF4500',
  '#8A2BE2',
  '#1E90FF',
  '#FF69B4',
  '#228B22',
  '#FFA500',
  '#00CED1',
]

export const convertShiftToFCEvent = (shift: Shift, index: number): EventInput => ({
  id: `${shift.userId}-${shift.id}`,
  resourceId: shift.userId,
  title: `${formatTime(shift.start, 'HH:mm')} - ${formatTime(shift.end, 'HH:mm')}`,
  start: new Date(shift.start).toISOString(),
  end: new Date(shift.end || 0).toISOString(),
  backgroundColor: backgroundColors[index % backgroundColors.length],
  borderColor: backgroundColors[index % backgroundColors.length],
})

export const convertUserToFCResource = (user: User): ResourceInput => ({
  id: user.id,
  title: user.name,
})
