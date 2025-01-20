import useTranslation from '@/hooks/useTranslation'
import { User } from '@/services/domain'
import { Table } from '@mantine/core'
import useRoleStore from '@/stores/role.store'

type UserTableProps = {
  users: User[]
  onRowClick: (user: User) => void
}

export default function UserTable({ users, onRowClick }: UserTableProps) {
  const t = useTranslation()
  const { roles } = useRoleStore()

  const rows = users.map((user) => {
    return (
      <Table.Tr key={user.id} onClick={() => onRowClick(user)}>
        <Table.Td>{user.name}</Table.Td>
        <Table.Td>{user.email}</Table.Td>
        <Table.Td>{t(roles.get(user.roleId)?.name)}</Table.Td>
      </Table.Tr>
    )
  })

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>{t('Name')}</Table.Th>
          <Table.Th>{t('Email')}</Table.Th>
          <Table.Th>{t('Role')}</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  )
}
