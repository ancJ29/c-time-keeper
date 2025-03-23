import { ClientRoles, MenuItem } from '@/types'
import { IconCalendar, IconCash, IconUserCircle } from '@tabler/icons-react'

export const navMenu: MenuItem[] = [
  {
    key: 'users',
    label: 'User management',
    icon: IconUserCircle,
    url: '/users',
    roles: [ClientRoles.OWNER],
  },
  {
    key: 'timesheet',
    label: 'Timesheet',
    icon: IconCalendar,
    url: '/timesheet',
    roles: [ClientRoles.OWNER],
  },
  {
    key: 'monthly-salary',
    label: 'Monthly salary management',
    icon: IconCash,
    url: '/monthly-salary',
    roles: [ClientRoles.OWNER],
  },
]
