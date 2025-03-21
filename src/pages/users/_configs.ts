import { Role, SalaryRule, User } from '@/services/domain'
import { DataGridColumnProps, FilterProps, OptionProps } from '@/types'

export const configs = (
  t: (key: string) => string,
  roles: Map<string, Role>,
  salaryRules: Map<string, SalaryRule>,
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
      key: 'salaryRule',
      header: t('Salary rule'),
      width: '15%',
      renderCell: (_, user: User) => {
        return salaryRules.get(user.salaryRuleId)?.name || ''
      },
    },
  ]
}

export type FilterComponentProps = FilterProps<FilterType> & {
  roleOptions: OptionProps[]
  salaryRuleOptions: OptionProps[]
}

export type FilterType = {
  roleId: string | null
  salaryRuleId: string | null
}

export const defaultCondition: FilterType = {
  roleId: null,
  salaryRuleId: null,
}

export function filter(user: User, condition?: FilterType) {
  if (condition?.roleId && user.roleId !== condition.roleId) {
    return false
  }
  if (condition?.salaryRuleId && user.salaryRuleId !== condition.salaryRuleId) {
    return false
  }
  return true
}
