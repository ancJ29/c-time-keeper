import { Role, User } from '@/services/domain'
import { DataGridColumnProps, FilterProps, OptionProps } from '@/types'
import { formatNumber } from '@/utils'

export const configs = (
  t: (key: string) => string,
  roles: Map<string, Role>,
): DataGridColumnProps[] => {
  return [
    {
      key: 'name',
      sortable: true,
      header: t('Name'),
      width: '20%',
    },
    {
      key: 'username',
      header: t('Username'),
      width: '20%',
    },
    {
      key: 'email',
      header: t('Email'),
      width: '20%',
    },
    {
      key: 'role',
      header: t('Role'),
      width: '15%',

      renderCell: (_, user: User) => {
        return t(roles.get(user.roleId)?.name || '')
      },
    },
    {
      key: 'baseSalary',
      header: t('Base salary'),
      width: '12%',
      renderCell: (_, user: User) => {
        return formatNumber(user.baseSalary || 0)
      },
    },
    {
      key: 'active',
      header: t('Status'),
      width: '13%',
      renderCell: (_, user: User) => {
        return user.enabled ? t('Active') : t('Disabled')
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
