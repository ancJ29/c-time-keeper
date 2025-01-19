import { EventApi, EventInput } from '@fullcalendar/core'

export type EventProps = {
  id: string
  venueId: string
  userName: string
  start: Date
  end: Date
  allDay: boolean
  backgroundColor?: string
  borderColor?: string
  textColor?: string
}

export const convertFCEventToEventProps = (event: EventApi): EventProps => ({
  id: event.id,
  userName: event.title,
  venueId: '',
  start: event.start || new Date(),
  end: event.end || new Date(),
  allDay: event.allDay || false,
  backgroundColor: event.backgroundColor,
  borderColor: event.borderColor,
  textColor: event.textColor,
})

export const convertEventPropsToFCEvent = (event: EventProps): EventInput => ({
  id: event.id,
  title: event.userName,
  start: event.start.toISOString(),
  end: event.end?.toISOString(),
  allDay: event.allDay,
  backgroundColor: event.backgroundColor,
  borderColor: event.borderColor,
  textColor: event.textColor,
})
