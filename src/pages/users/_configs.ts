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
      width: '25%',
    },
    {
      key: 'username',
      header: t('Username'),
      width: '20%',
    },
    {
      key: 'email',
      header: t('Email'),
      width: '25%',
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
      width: '15%',
      renderCell: (_, user: User) => {
        return formatNumber(user.baseSalary || 0)
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
