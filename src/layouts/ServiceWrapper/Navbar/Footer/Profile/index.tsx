import Avatar from '@/components/common/Avatar'
import useTranslation from '@/hooks/useTranslation'
import useWindowResize from '@/hooks/useWindowResize'
import useAuthStore from '@/stores/auth.store'
import { showNotImplementedModal } from '@/utils'
import { Button, Menu, UnstyledButton } from '@mantine/core'
import { IconSettings } from '@tabler/icons-react'
import { useCallback, useState } from 'react'
import LanguageSelector from './LanguageSelector'
import MenuItem from './MenuItem'
import UserInformation from './UserInformation'

type ProfileProps = {
  navbarOpened: boolean
  language: string
  onChangeLanguage: (language: string) => void
  onLogout: () => void
  onGoToProfilePage: () => void
}

export default function Profile({
  navbarOpened,
  language,
  onChangeLanguage,
  onLogout,
  onGoToProfilePage,
}: ProfileProps) {
  const t = useTranslation()
  const isMobile = useWindowResize()
  const { user } = useAuthStore()
  const [opened, setOpened] = useState(false)

  const handleCloseMenu = useCallback(() => {
    setOpened(false)
  }, [])

  const handleSettingClick = useCallback(() => {
    showNotImplementedModal(t)
    handleCloseMenu()
  }, [handleCloseMenu, t])

  return (
    <Menu
      width={isMobile ? 200 : 250}
      position="top-start"
      radius={10}
      shadow="md"
      offset={8}
      opened={opened}
      onChange={setOpened}
      zIndex={1500}
    >
      <Menu.Target>
        <UnstyledButton>
          <UserInformation navbarOpened={navbarOpened} />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown p={10}>
        <MenuItem
          leftIcon={<Avatar size={20} src={user?.avatar} />}
          label={t('Profile')}
          onCloseMenu={handleCloseMenu}
          onClick={onGoToProfilePage}
        />

        <Menu.Divider p={5} />

        <LanguageSelector
          language={language}
          onChangeLanguage={onChangeLanguage}
          onCloseMenu={handleCloseMenu}
        />
        <MenuItem
          leftIcon={<IconSettings size={20} strokeWidth={1.5} />}
          label={t('Settings')}
          onCloseMenu={handleSettingClick}
        />

        <Button fullWidth mt={15} variant="default" size="xs" onClick={onLogout}>
          {t('Logout')}
        </Button>
      </Menu.Dropdown>
    </Menu>
  )
}
