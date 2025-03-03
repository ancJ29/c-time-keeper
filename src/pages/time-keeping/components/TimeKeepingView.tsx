import Calendar from '@/components/common/Calendar'
import { DatesSetArg, EventClickArg } from '@fullcalendar/core'
import { useSyncExternalStore } from 'react'
import store from '../_shift.store'

type TimeKeepingViewProps = {
  onEventClick: (clickInfo: EventClickArg) => void
  onDateSet: (datesInfo: DatesSetArg) => void
}

export default function TimeKeepingView({ onEventClick, onDateSet }: TimeKeepingViewProps) {
  const { events, resources } = useSyncExternalStore(store.subscribe, store.getSnapshot)

  return (
    <Calendar
      events={events}
      resources={resources}
      onEventClick={onEventClick}
      onDateSet={onDateSet}
    />
  )
}
