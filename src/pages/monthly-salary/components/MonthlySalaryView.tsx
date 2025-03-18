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
  page: number
  setPage: (page: number) => void
  onExportExcel: () => void
}

export default function MonthlySalaryView({
  dataGridConfigs,
  data,
  date,
  onChangeDate,
  page,
  setPage,
  onExportExcel,
}: MonthlySalaryViewProps) {
  return (
    <Stack gap={10}>
      <Filter date={date} onChangeDate={onChangeDate} onExportExcel={onExportExcel} />
      <DataGrid
        hasOrderColumn
        isPaginated
        columns={dataGridConfigs}
        data={data}
        page={page}
        onChangePage={setPage}
      />
    </Stack>
  )
}
