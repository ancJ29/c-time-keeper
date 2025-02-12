import AddButton from '@/components/c-time-keeper/AddButton'
import DataGrid from '@/components/common/DataGrid'
import { User } from '@/services/domain'
import { DataGridColumnProps } from '@/types'
import { Stack } from '@mantine/core'
import { FilterComponentProps } from '../_configs'
import Filter from './Filter'

type UserViewProps = {
  data: User[]
  page: number
  setPage: (page: number) => void
  onAddUser: () => void
  onEditUser: (user: User) => void
  dataGridConfigs: DataGridColumnProps[]
} & FilterComponentProps

export default function UserView({
  data,
  page,
  setPage,
  onAddUser,
  onEditUser,
  dataGridConfigs,
  ...props
}: UserViewProps) {
  return (
    <Stack gap={15} pos="relative">
      <AddButton onClick={onAddUser} />
      <Filter {...props} />
      <DataGrid
        hasOrderColumn
        isPaginated
        onRowClick={onEditUser}
        columns={dataGridConfigs}
        data={data}
        page={page}
        onChangePage={setPage}
      />
    </Stack>
  )
}
