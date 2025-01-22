import { MenuItem } from '@/types'
import { ClientRoles } from '@/types'
import { IconCalendar, IconDashboard, IconServer, IconUserCircle } from '@tabler/icons-react'

export const navMenu: MenuItem[] = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: IconDashboard,
    url: '/dashboard',
    roles: [ClientRoles.OWNER, ClientRoles.STAFF],
  },
  {
    key: 'category-management',
    label: 'Category management',
    icon: IconServer,
    roles: [ClientRoles.OWNER],
    subs: [
      {
        key: 'users',
        label: 'User management',
        icon: IconUserCircle,
        url: '/users',
        roles: [ClientRoles.OWNER],
      },
    ],
  },
  {
    key: 'time-keeping',
    label: 'Time keeping',
    icon: IconCalendar,
    url: '/time-keeping',
    roles: [ClientRoles.OWNER],
  },
]
