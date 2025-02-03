import useMount from '@/hooks/useMount'
import { DatesSetArg, EventClickArg } from '@fullcalendar/core'
import { modals } from '@mantine/modals'
import { useCallback, useSyncExternalStore } from 'react'
import store from './_shift.store'
import EventInformation from './components/EventInformation'
import TimeKeepingUI from './components/TimeKeepingUI'

export default function TimeKeeping() {
  const { userById } = useSyncExternalStore(store.subscribe, store.getSnapshot)
  useMount(store.initData)

  const handleEventClick = useCallback((clickInfo: EventClickArg) => {
    modals.open({
      title: clickInfo.event.title,
      size: 'xs',
      children: <EventInformation event={store.getEvent(clickInfo.event.id)} />,
    })
  }, [])

  const handleDateSet = useCallback(
    (datesInfo: DatesSetArg) => {
      const { start, end } = datesInfo
      if (Object.keys(userById).length === 0) {
        setTimeout(() => store.changeDate(start, end), 500)
      } else {
        store.changeDate(start, end)
      }
    },
    [userById],
  )

  return <TimeKeepingUI onEventClick={handleEventClick} onDateSet={handleDateSet} />
}
