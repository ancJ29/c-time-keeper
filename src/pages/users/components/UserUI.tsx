import AddButton from '@/components/c-time-keeper/AddButton'
import DataGrid from '@/components/common/DataGrid'
import { User } from '@/services/domain'
import { DataGridColumnProps } from '@/types'
import { Flex } from '@mantine/core'

type UserUIProps = {
  data: User[]
  onAddUser: () => void
  onEditUser: (user: User) => void
  dataGridConfigs: DataGridColumnProps[]
}

export default function UserUI({ data, onAddUser, onEditUser, dataGridConfigs }: UserUIProps) {
  return (
    <Flex pos="relative">
      <AddButton onClick={onAddUser} />
      <DataGrid hasOrderColumn onRowClick={onEditUser} columns={dataGridConfigs} data={data} />
    </Flex>
  )
}
