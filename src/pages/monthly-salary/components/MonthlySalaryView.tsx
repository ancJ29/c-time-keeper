import DataGrid from '@/components/common/DataGrid'
import { Salary } from '@/services/domain'
import { DataGridColumnProps } from '@/types'
import { Stack } from '@mantine/core'
import Filter from './Filter'

type MonthlySalaryViewProps = {
  dataGridConfigs: DataGridColumnProps[]
  data: Salary[]
}

export default function MonthlySalaryView({ dataGridConfigs, data }: MonthlySalaryViewProps) {
  return (
    <Stack gap={10}>
      <Filter />
      <DataGrid hasOrderColumn isPaginated columns={dataGridConfigs} data={data} />
    </Stack>
  )
}
