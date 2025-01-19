import Calendar from '@/components/common/Calendar'
import store from '../_shift.store'
import { useSyncExternalStore } from 'react'
import { DatesSetArg, EventClickArg } from '@fullcalendar/core'
import Sidebar from './Sidebar'
import { Flex } from '@mantine/core'
import { convertEventPropsToFCEvent } from '@/configs/calendar'

type TimeKeepingUIProps = {
  onEventClick: (clickInfo: EventClickArg) => void
  onDateSet: (datesInfo: DatesSetArg) => void
}

export default function TimeKeepingUI({ onEventClick, onDateSet }: TimeKeepingUIProps) {
  const { events } = useSyncExternalStore(store.subscribe, store.getSnapshot)

  return (
    <Flex gap={10}>
      <Sidebar />
      <Calendar
        events={events.map(convertEventPropsToFCEvent)}
        onEventClick={onEventClick}
        onDateSet={onDateSet}
      />
    </Flex>
  )
}
