import { navMenu } from '@/configs/navMenu'
import useAuthStore from '@/stores/auth.store'
import useRoleStore from '@/stores/role.store'
import { MenuItem } from '@/types'
import { ScrollArea, Stack } from '@mantine/core'
import { IconDoorExit, IconUserCircle } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import NavbarFooter from './NavbarFooter'
import NavbarItem from './NavbarItem'

type NavbarProps = {
  opened: boolean
  toggle: () => void
}

export default function Navbar({ opened, toggle }: NavbarProps) {
  const navigate = useNavigate()
  const { removeToken, user } = useAuthStore()
  const { roles } = useRoleStore()
  const buildTime = new Date().getTime()
  const filterMenu = filterMenuByRole(navMenu, roles.get(user?.roleId || '')?.name || '')

  const onLogout = () => {
    removeToken()
    navigate('/login')
  }

  const footerMenu: MenuItem[] = [
    {
      key: 'profile',
      label: 'Profile',
      icon: IconUserCircle,
      url: '/profile',
      hiddenFrom: 'xs',
    },
    {
      key: 'logout',
      label: 'Logout',
      icon: IconDoorExit,
      onClick: onLogout,
    },
  ]

  return (
    <>
      <ScrollArea h="100%">
        <Stack gap={0}>
          {filterMenu.map((menuItem) => (
            <NavbarItem
              key={menuItem.key}
              menuItem={menuItem}
              navbarOpened={opened}
              toggleNavbar={toggle}
            />
          ))}
        </Stack>
      </ScrollArea>
      <NavbarFooter footerMenu={footerMenu} buildTime={buildTime} opened={opened} toggle={toggle} />
    </>
  )
}

function filterMenuByRole(menu: MenuItem[], role: string): MenuItem[] {
  return menu
    .filter((item) => item.roles?.includes(role))
    .map((item) => ({
      ...item,
      subs: item.subs ? filterMenuByRole(item.subs, role) : undefined,
    }))
}
