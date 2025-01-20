import {
  addUser,
  AddUserRequest,
  getAllUsers,
  updateUser,
  UpdateUserRequest,
  User,
} from '@/services/domain'
import { useCallback, useMemo, useState } from 'react'
import useMount from '@/hooks/useMount'
import UserUI from './components/UserUI'
import AddUserForm from './components/AddUserForm'
import { modals } from '@mantine/modals'
import useTranslation from '@/hooks/useTranslation'
import EditUserForm from './components/EditUserForm'
import useRoleStore from '@/stores/role.store'
import { showNotification } from '@/configs/notifications'

export default function Users() {
  const t = useTranslation()
  const { roles } = useRoleStore()
  const [users, setUsers] = useState<User[]>([])

  const getData = async () => {
    const res = await getAllUsers()
    res && setUsers(res)
  }
  useMount(getData)

  const roleOptions = useMemo(
    () =>
      Array.from(roles.values()).map((el) => ({
        label: t(el.name),
        value: el.id,
      })),
    [roles, t],
  )

  const handleConfirmAddUser = useCallback(
    (values: AddUserRequest) => {
      addUser(values).then((res) => {
        const success = res?.success
        showNotification({ t, success })
        getData()
      })
    },
    [t],
  )

  const handleAddUser = useCallback(
    (values?: AddUserRequest) => {
      modals.open({
        title: t('Add user'),
        centered: true,
        size: 'md',
        children: (
          <AddUserForm
            initValues={values}
            reOpen={handleAddUser}
            onConfirm={handleConfirmAddUser}
            roleOptions={roleOptions}
          />
        ),
      })
    },
    [handleConfirmAddUser, roleOptions, t],
  )

  const handleConfirmUpdateUser = useCallback(
    (values: UpdateUserRequest) => {
      updateUser(values).then((res) => {
        const success = res?.success
        showNotification({ t, success })
        modals.closeAll()
        getData()
      })
    },
    [t],
  )

  const handleEditUser = useCallback(
    (user: User) => {
      modals.open({
        title: t('Update user'),
        centered: true,
        size: 'md',
        children: (
          <EditUserForm
            user={user}
            reOpen={handleEditUser}
            onConfirm={handleConfirmUpdateUser}
            roleOptions={roleOptions}
          />
        ),
      })
    },
    [handleConfirmUpdateUser, roleOptions, t],
  )

  return <UserUI users={users} onAddUser={handleAddUser} onEditUser={handleEditUser} />
}
