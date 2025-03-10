import FilterWrapper from '@/components/c-time-keeper/FilterWrapper'
import useTranslation from '@/hooks/useTranslation'
import { DateValue } from '@/types'
import { MonthPickerInput } from '@mantine/dates'

type FilterProps = {
  date: Date
  onChangeDate: (date: DateValue) => void
}

export default function Filter({ date, onChangeDate }: FilterProps) {
  const t = useTranslation()

  return (
    <FilterWrapper>
      <MonthPickerInput
        label={t('Month')}
        w={{ base: '100%', sm: '15vw' }}
        value={date}
        onChange={onChangeDate}
        valueFormat="MM/YYYY"
      />
    </FilterWrapper>
  )
}
