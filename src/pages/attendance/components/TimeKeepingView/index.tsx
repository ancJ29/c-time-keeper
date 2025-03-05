import { Stack } from '@mantine/core'
import Filter, { FilterProps } from '../Filter'
import ShiftSchedule from '../ShiftSchedule'

export default function TimeKeepingView({ ...props }: FilterProps) {
  return (
    <Stack gap={15} pb={40} miw={{ base: 1000, sm: '100%' }}>
      <Filter {...props} />
      <ShiftSchedule />
    </Stack>
  )
}
