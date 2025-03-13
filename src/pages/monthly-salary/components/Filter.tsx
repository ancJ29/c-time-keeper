import FilterWrapper from '@/components/c-time-keeper/FilterWrapper'
import useTranslation from '@/hooks/useTranslation'
import { DateValue } from '@/types'
import { showNotImplementedModal } from '@/utils'
import { Button } from '@mantine/core'
import { MonthPickerInput } from '@mantine/dates'
import { IconDownload } from '@tabler/icons-react'
import { useCallback } from 'react'

type FilterProps = {
  date: Date
  onChangeDate: (date: DateValue) => void
}

export default function Filter({ date, onChangeDate }: FilterProps) {
  const t = useTranslation()

  const onClick = useCallback(() => {
    showNotImplementedModal(t)
  }, [t])

  return (
    <FilterWrapper>
      <MonthPickerInput
        label={t('Month')}
        w={{ base: '100%', sm: '15vw' }}
        value={date}
        onChange={onChangeDate}
        valueFormat="MM/YYYY"
      />
      <Button rightSection={<IconDownload size={14} />} onClick={onClick}>
        {t('Export excel')}
      </Button>
    </FilterWrapper>
  )
}
