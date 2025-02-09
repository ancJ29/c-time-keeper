import { EventProps } from '@/configs/calendar'
import useTranslation from '@/hooks/useTranslation'
import useVenueStore from '@/stores/venue.store'
import { diffHours, diffMinutes, formatTime } from '@/utils'
import { Stack, Text } from '@mantine/core'

type EventInformationProps = {
  event?: EventProps
}

export default function EventInformation({ event }: EventInformationProps) {
  const t = useTranslation()
  const { venues } = useVenueStore()

  if (!event) {
    return null
  }

  const { start, end, venueId } = event

  return (
    <Stack gap={2}>
      <PropertyDisplay title={t('Date')} content={formatTime(start, 'DD/MM/YYYY')} />
      <PropertyDisplay title={t('Venue')} content={venues.get(venueId)?.name || '-'} />
      <PropertyDisplay title={t('Start time')} content={formatTime(start, 'HH:mm')} />
      <PropertyDisplay title={t('End time')} content={formatTime(end, 'HH:mm')} />
      <PropertyDisplay
        title={t('Total time')}
        content={`${diffHours(start, end)} ${t('hour(s)')} ${diffMinutes(start, end)} ${t('minute(s)')}`}
      />
    </Stack>
  )
}

function PropertyDisplay({ title, content }: { title: string; content: string }) {
  return (
    <Text fz={14} fw="bold">
      {title}:{' '}
      <Text fw="normal" span fz={14}>
        {content}
      </Text>
    </Text>
  )
}
