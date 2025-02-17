import { navMenu } from '@/configs/navMenu'
import useAuthStore from '@/stores/auth.store'
import useRoleStore from '@/stores/role.store'
import { MenuItem } from '@/types'
import { ScrollArea, Stack } from '@mantine/core'
import { IconDoorExit, IconUserCircle } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'
import Item from './Item'

type NavbarProps = {
  opened: boolean
  close: () => void
}

export default function Navbar({ opened, close }: NavbarProps) {
  const navigate = useNavigate()
  const { removeToken, user } = useAuthStore()
  const { roles } = useRoleStore()
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
      <Header closeNavbar={close} />
      <ScrollArea h="100%" pt={10}>
        <Stack gap={0}>
          {filterMenu.map((menuItem) => (
            <Item
              key={menuItem.key}
              menuItem={menuItem}
              navbarOpened={opened}
              closeNavbar={close}
            />
          ))}
        </Stack>
      </ScrollArea>
      <Footer footerMenu={footerMenu} navbarOpened={opened} closeNavbar={close} />
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
