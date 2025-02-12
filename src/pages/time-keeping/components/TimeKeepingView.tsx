import Calendar from '@/components/common/Calendar'
import { convertEventPropsToFCEvent } from '@/configs/calendar'
import { DatesSetArg, EventClickArg } from '@fullcalendar/core'
import { Flex } from '@mantine/core'
import { useSyncExternalStore } from 'react'
import store from '../_shift.store'
import Sidebar from './Sidebar'

type TimeKeepingViewProps = {
  onEventClick: (clickInfo: EventClickArg) => void
  onDateSet: (datesInfo: DatesSetArg) => void
}

export default function TimeKeepingView({ onEventClick, onDateSet }: TimeKeepingViewProps) {
  const { events } = useSyncExternalStore(store.subscribe, store.getSnapshot)

  return (
    <Flex gap={10} direction={{ base: 'column', md: 'row' }}>
      <Sidebar />
      <Calendar
        events={events.map(convertEventPropsToFCEvent)}
        onEventClick={onEventClick}
        onDateSet={onDateSet}
      />
    </Flex>
  )
}
