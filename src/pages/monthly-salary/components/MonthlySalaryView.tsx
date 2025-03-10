import DataGrid from '@/components/common/DataGrid'
import { Salary } from '@/services/domain'
import { DataGridColumnProps, DateValue } from '@/types'
import { Stack } from '@mantine/core'
import Filter from './Filter'

type MonthlySalaryViewProps = {
  dataGridConfigs: DataGridColumnProps[]
  data: Salary[]
  date: Date
  onChangeDate: (date: DateValue) => void
}

export default function MonthlySalaryView({
  dataGridConfigs,
  data,
  date,
  onChangeDate,
}: MonthlySalaryViewProps) {
  return (
    <Stack gap={10}>
      <Filter date={date} onChangeDate={onChangeDate} />
      <DataGrid hasOrderColumn isPaginated columns={dataGridConfigs} data={data} />
    </Stack>
  )
}
