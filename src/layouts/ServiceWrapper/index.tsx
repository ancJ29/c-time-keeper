import { Language } from '@/configs/i18n'
import { navMenu } from '@/configs/navMenu'
import useWindowResize from '@/hooks/useWindowResize'
import useAuthStore from '@/stores/auth.store'
import useRoleStore from '@/stores/role.store'
import { MenuItem } from '@/types'
import { Box } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ContentLayout from './ContentLayout'
import Navbar from './Navbar'

type ServiceWrapperProps = {
  children: React.ReactNode
}

export default function ServiceWrapper({ children }: ServiceWrapperProps) {
  const isMobile = useWindowResize()
  const navigate = useNavigate()
  const { removeToken, user } = useAuthStore()
  const [navbarOpened, { toggle: toggleNavbar, close: closeNavbar, open: openNavbar }] =
    useDisclosure(!isMobile)
  const [language] = useState(localStorage.__LANGUAGE__ || Language.VI)
  const { roles } = useRoleStore()
  const filterMenu = filterMenuByRole(navMenu, roles.get(user?.roleId || '')?.name || '')

  const handleChangeLanguage = (value: string) => {
    if (value === language) {
      return
    }
    localStorage.__LANGUAGE__ = value || Language.VI
    window.location.reload()
  }

  const logout = useCallback(() => {
    removeToken()
    navigate('/login')
  }, [navigate, removeToken])

  const goToProfilePage = useCallback(() => {
    close()
    navigate('/profile')
  }, [navigate])

  const goToTimesheetPage = useCallback(() => {
    navigate('/timesheet')
  }, [navigate])

  return (
    <Box>
      <Navbar
        menu={filterMenu}
        navbarOpened={navbarOpened}
        language={language}
        onChangeLanguage={handleChangeLanguage}
        onLogout={logout}
        onGoToProfilePage={goToProfilePage}
        onGoToTimesheetPage={goToTimesheetPage}
        toggleNavbar={toggleNavbar}
        closeNavbar={closeNavbar}
        openNavbar={openNavbar}
      />
      <ContentLayout navbarOpened={navbarOpened} toggleNavbar={toggleNavbar}>
        {children}
      </ContentLayout>
    </Box>
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
