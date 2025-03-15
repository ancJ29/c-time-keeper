import useUserStore from '@/stores/user.store'
import useVenueStore from '@/stores/venue.store'
import { Stack, Text } from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'
import { useEffect, useState } from 'react'
import { FormProps } from '../..'

type CheckInInfoProps = {
  form: UseFormReturnType<FormProps>
  showVenue?: boolean
}

export default function CheckInInfo({ form, showVenue = true }: CheckInInfoProps) {
  const { venues } = useVenueStore()
  const { users } = useUserStore()
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
  }

  return (
    <Stack gap={10}>
      <Text fz={24} fw={500} ta="center">
        {users.get(form.values.userId)?.name}{' '}
        {showVenue && `- ${venues.get(form.values.venueId)?.name}`}
      </Text>
      <Text fz={24} fw={500} ta="center">
        {formatTime(time)}
      </Text>
    </Stack>
  )
}
