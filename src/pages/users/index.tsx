import { showNotification } from '@/configs/notifications'
import useFilterData from '@/hooks/useFilterData'
import useMount from '@/hooks/useMount'
import useTranslation from '@/hooks/useTranslation'
import {
  addUser,
  AddUserRequest,
  getAllUsers,
  updateUser,
  UpdateUserRequest,
  User,
} from '@/services/domain'
import useRoleStore from '@/stores/role.store'
import useSalaryRuleStore from '@/stores/salaryRule.store'
import { modals } from '@mantine/modals'
import { useCallback, useMemo, useState } from 'react'
import { configs } from './_configs'
import AddUserForm from './components/AddUserForm'
import EditUserForm from './components/EditUserForm'
import UserUI from './components/UserUI'

export default function Users() {
  const t = useTranslation()
  const { roles } = useRoleStore()
  const { salaryRules } = useSalaryRuleStore()
  const [users, setUsers] = useState<User[]>([])
  const dataGridConfigs = useMemo(() => configs(t, roles, salaryRules), [roles, salaryRules, t])

  const getData = async () => {
    const res = await getAllUsers()
    res && setUsers(res)
  }
  useMount(getData)

  const dataLoader = useCallback(() => {
    return users
  }, [users])

  const { data, page, setPage } = useFilterData<User>({
    dataLoader,
  })

  const roleOptions = useMemo(
    () =>
      Array.from(roles.values()).map((el) => ({
        label: t(el.name),
        value: el.id,
      })),
    [roles, t],
  )

  const salaryRuleOptions = useMemo(
    () =>
      Array.from(salaryRules.values()).map((el) => ({
        label: el.name,
        value: el.id,
      })),
    [salaryRules],
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
            salaryRuleOptions={salaryRuleOptions}
          />
        ),
      })
    },
    [handleConfirmAddUser, roleOptions, salaryRuleOptions, t],
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
            salaryRuleOptions={salaryRuleOptions}
          />
        ),
      })
    },
    [handleConfirmUpdateUser, roleOptions, salaryRuleOptions, t],
  )

  return (
    <UserUI
      key={roles.size}
      data={data}
      page={page}
      setPage={setPage}
      onAddUser={handleAddUser}
      onEditUser={handleEditUser}
      dataGridConfigs={dataGridConfigs}
    />
  )
}
