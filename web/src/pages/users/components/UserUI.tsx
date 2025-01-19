import { Flex } from '@mantine/core'
import UserTable from './UserTable'
import { User } from '@/services/domain'
import AddButton from '@/components/c-time-keeper/AddButton'

type UserUIProps = {
  users: User[]
  onAddUser: () => void
  onEditUser: (user: User) => void
}

export default function UserUI({ users, onAddUser, onEditUser }: UserUIProps) {
  return (
    <Flex pos="relative">
      <UserTable users={users} onRowClick={onEditUser} />
      <AddButton onClick={onAddUser} />
    </Flex>
  )
}
