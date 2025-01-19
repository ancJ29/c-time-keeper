import './fullcalendar.scss'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import FullCalendar from '@fullcalendar/react'
import classes from './Calendar.module.scss'
import { DatesSetArg, EventClickArg, EventInput } from '@fullcalendar/core'
import enLocale from '@fullcalendar/core/locales/en-au'
import viLocale from '@fullcalendar/core/locales/vi'
import { Language } from '@/configs/i18n'

type CalendarProps = {
  events: EventInput[]
  onEventClick: (clickInfo: EventClickArg) => void
  onDateSet: (datesInfo: DatesSetArg) => void
}

export default function Calendar({ events, onEventClick, onDateSet }: CalendarProps) {
  return (
    <div className={classes.calendar}>
      <FullCalendar
        locales={[enLocale, viLocale]}
        locale={(localStorage.__LANGUAGE__ || Language.EN).toLowerCase()}
        events={events}
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,listWeek',
        }}
        height="90vh"
        initialView="dayGridMonth"
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
      />
    </div>
  )
}
