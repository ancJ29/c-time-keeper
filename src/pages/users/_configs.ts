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
      key: 'email',
      header: t('Email'),
      width: '35%',
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
      width: '25%',
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
  roleId: string
  salaryRuleId: string
}

export const defaultCondition: FilterType = {
  roleId: '',
  salaryRuleId: '',
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
