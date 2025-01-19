import store from './_shift.store'
import { useCallback, useSyncExternalStore } from 'react'
import { DatesSetArg, EventClickArg } from '@fullcalendar/core'
import TimeKeepingUI from './components/TimeKeepingUI'
import EventInformation from './components/EventInformation'
import { modals } from '@mantine/modals'
import useMount from '@/hooks/useMount'

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
