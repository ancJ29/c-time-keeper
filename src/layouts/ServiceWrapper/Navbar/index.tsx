import { Language } from '@/configs/i18n'
import { navMenu } from '@/configs/navMenu'
import useAuthStore from '@/stores/auth.store'
import useRoleStore from '@/stores/role.store'
import { MenuItem } from '@/types'
import { ScrollArea, Stack } from '@mantine/core'
import { useState } from 'react'
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
  const [language] = useState(localStorage.__LANGUAGE__ || Language.EN)

  const handleChangeLanguage = (value: string) => {
    if (value === language) {
      return
    }
    localStorage.__LANGUAGE__ = value || Language.EN
    window.location.reload()
  }

  const onLogout = () => {
    removeToken()
    navigate('/login')
  }

  const goToProfilePage = () => {
    close()
    navigate('/profile')
  }

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
      <Footer
        language={language}
        onLogout={onLogout}
        onGoToProfilePage={goToProfilePage}
        onChangeLanguage={handleChangeLanguage}
      />
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
