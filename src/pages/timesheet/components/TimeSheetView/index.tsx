import useWindowResize from '@/hooks/useWindowResize'
import { Stack } from '@mantine/core'
import Filter, { FilterProps } from '../Filter'
import ShiftSchedule from '../ShiftSchedule'

export default function TimeSheetView({ ...props }: FilterProps) {
  const isMobile = useWindowResize()

  return (
    <Stack gap={isMobile ? 10 : 20} pb={40}>
      <Filter {...props} />
      <ShiftSchedule />
    </Stack>
  )
}
