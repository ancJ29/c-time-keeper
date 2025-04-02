import { Role, User } from '@/services/domain'
import { DataGridColumnProps, FilterProps, OptionProps } from '@/types'
import { formatNumber } from '@/utils'
import Status from './components/Status'

export const configs = (
  t: (key: string) => string,
  roles: Map<string, Role>,
): DataGridColumnProps[] => {
  return [
    {
      key: 'name',
      sortable: true,
      header: t('Name'),
      width: '15%',
    },
    {
      key: 'username',
      header: t('Username'),
      width: '15%',
    },
    {
      key: 'email',
      header: t('Email'),
      width: '25%',
    },
    {
      key: 'role',
      header: t('Role'),
      width: '10%',

      renderCell: (_, user: User) => {
        return t(roles.get(user.roleId)?.name || '')
      },
    },
    {
      key: 'baseSalary',
      header: `${t('Base salary')} (VND)`,
      width: '15%',
      textAlign: 'right',
      renderCell: (_, user: User) => {
        return formatNumber(user.baseSalary || 0)
      },
    },
    {
      key: 'active',
      header: t('Status'),
      width: '20%',
      textAlign: 'center',
      renderCell: (_, user: User) => {
        return <Status enabled={user.enabled} />
      },
    },
  ]
}

export type FilterComponentProps = FilterProps<FilterType> & {
  roleOptions: OptionProps[]
}

export type FilterType = {
  roleId: string | null
}

export const defaultCondition: FilterType = {
  roleId: null,
}

export function filter(user: User, condition?: FilterType) {
  if (condition?.roleId && user.roleId !== condition.roleId) {
    return false
  }
  return true
}
