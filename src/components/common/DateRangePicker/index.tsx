import { DatesRangeValue, DateValue, MantineWidth } from '@/types'
import { DatePickerInput } from '@mantine/dates'

type DateRangePickerProps = {
  label?: string
  w?: MantineWidth
  defaultValue?: [DateValue, DateValue]
  onChange?: (value: DatesRangeValue) => void
}

export default function DateRangePicker({
  label,
  w,
  defaultValue,
  onChange,
}: DateRangePickerProps) {
  return (
    <DatePickerInput
      label={label}
      w={w}
      type="range"
      valueFormat="DD/MM/YYYY"
      defaultValue={defaultValue}
      onChange={onChange}
    />
  )
}
