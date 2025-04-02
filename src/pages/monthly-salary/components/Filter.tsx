import useTranslation from '@/hooks/useTranslation'
import { DateValue } from '@/types'
import { Button, Flex } from '@mantine/core'
import { MonthPickerInput } from '@mantine/dates'
import { IconDownload } from '@tabler/icons-react'

type FilterProps = {
  date: Date
  onChangeDate: (date: DateValue) => void
  onExportExcel: () => void
}

export default function Filter({ date, onChangeDate, onExportExcel }: FilterProps) {
  const t = useTranslation()

  return (
    <Flex gap={10} align="end" justify="end">
      <MonthPickerInput
        label={t('Month')}
        w={{ base: '30%', sm: '15vw' }}
        value={date}
        onChange={onChangeDate}
        valueFormat="MM/YYYY"
      />
      <Button rightSection={<IconDownload size={14} />} onClick={onExportExcel}>
        {t('Export excel')}
      </Button>
    </Flex>
  )
}
