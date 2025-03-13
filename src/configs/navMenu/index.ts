import { ClientRoles, MenuItem } from '@/types'
import { IconCalendar, IconCash, IconDashboard, IconUserCircle } from '@tabler/icons-react'

export const navMenu: MenuItem[] = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: IconDashboard,
    url: '/dashboard',
    roles: [ClientRoles.OWNER, ClientRoles.STAFF],
  },
  {
    key: 'users',
    label: 'User management',
    icon: IconUserCircle,
    url: '/users',
    roles: [ClientRoles.OWNER],
  },
  {
    key: 'attendance',
    label: 'Attendance',
    icon: IconCalendar,
    url: '/attendance',
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
