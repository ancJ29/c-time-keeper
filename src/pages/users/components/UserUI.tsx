import AddButton from '@/components/c-time-keeper/AddButton'
import DataGrid from '@/components/common/DataGrid'
import { User } from '@/services/domain'
import { DataGridColumnProps } from '@/types'
import { Flex } from '@mantine/core'

type UserUIProps = {
  data: User[]
  page: number
  setPage: (page: number) => void
  onAddUser: () => void
  onEditUser: (user: User) => void
  dataGridConfigs: DataGridColumnProps[]
}

export default function UserUI({
  data,
  page,
  setPage,
  onAddUser,
  onEditUser,
  dataGridConfigs,
}: UserUIProps) {
  return (
    <Flex pos="relative">
      <AddButton onClick={onAddUser} />
      <DataGrid
        hasOrderColumn
        isPaginated
        onRowClick={onEditUser}
        columns={dataGridConfigs}
        data={data}
        page={page}
        onChangePage={setPage}
      />
    </Flex>
  )
}
