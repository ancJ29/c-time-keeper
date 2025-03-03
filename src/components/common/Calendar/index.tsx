import { Language } from '@/configs/i18n'
import useWindowResize from '@/hooks/useWindowResize'
import { DatesSetArg, EventClickArg, EventInput } from '@fullcalendar/core'
import enLocale from '@fullcalendar/core/locales/en-au'
import viLocale from '@fullcalendar/core/locales/vi'
import FullCalendar from '@fullcalendar/react'
import { ResourceInput } from '@fullcalendar/resource'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import classes from './Calendar.module.scss'
import './fullcalendar.scss'

type CalendarProps = {
  events: EventInput[]
  resources: ResourceInput[]
  onEventClick: (clickInfo: EventClickArg) => void
  onDateSet: (datesInfo: DatesSetArg) => void
}

export default function Calendar({ events, resources, onEventClick, onDateSet }: CalendarProps) {
  const isMobile = useWindowResize()

  return (
    <div className={classes.calendar}>
      <FullCalendar
        initialView="resourceTimelineDay"
        locales={[enLocale, viLocale]}
        locale={(localStorage.__LANGUAGE__ || Language.EN).toLowerCase()}
        resources={resources}
        events={events}
        plugins={[resourceTimelinePlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'resourceTimelineDay,resourceTimelineWeek,resourceTimelineMonth',
        }}
        height={isMobile ? undefined : '90vh'}
        fixedWeekCount={false}
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        eventClick={onEventClick}
        datesSet={onDateSet}
        views={{
          dayGridMonth: {
            titleFormat: { year: 'numeric', month: '2-digit' },
            eventTimeFormat: { hour: '2-digit', minute: '2-digit', hour12: false },
          },
          listWeek: {
            titleFormat: { year: 'numeric', month: '2-digit', day: '2-digit' },
            eventTimeFormat: { hour: '2-digit', minute: '2-digit', hour12: false },
            listDaySideFormat: { day: '2-digit', year: 'numeric', month: '2-digit' },
          },
        }}
        slotLabelFormat={{
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }}
        schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
      />
    </div>
  )
}
