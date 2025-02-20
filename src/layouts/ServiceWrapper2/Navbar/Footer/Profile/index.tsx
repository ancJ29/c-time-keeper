import Avatar from '@/components/common/Avatar'
import useTranslation from '@/hooks/useTranslation'
import useWindowResize from '@/hooks/useWindowResize'
import { Button, Menu, UnstyledButton } from '@mantine/core'
import { IconSettings } from '@tabler/icons-react'
import { useCallback, useState } from 'react'
import LanguageSelector from './LanguageSelector'
import MenuItem from './MenuItem'
import UserInformation from './UserInformation'

type ProfileProps = {
  language: string
  onGoToProfilePage: () => void
  onChangeLanguage: (language: string) => void
  onLogout: () => void
}

export default function Profile({
  language,
  onGoToProfilePage,
  onChangeLanguage,
  onLogout,
}: ProfileProps) {
  const t = useTranslation()
  const isMobile = useWindowResize()
  const [opened, setOpened] = useState(false)

  const handleCloseMenu = useCallback(() => {
    setOpened(false)
  }, [])

  return (
    <Menu
      width={isMobile ? 200 : 250}
      position={isMobile ? 'top' : 'right-end'}
      radius={10}
      shadow="md"
      offset={8}
      opened={opened}
      onChange={setOpened}
      zIndex={1500}
    >
      <Menu.Target>
        <UnstyledButton style={{ display: 'flex' }}>
          <Avatar size={24} />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown p={10}>
        <UserInformation onClick={onGoToProfilePage} onCloseMenu={handleCloseMenu} />

        <Menu.Divider p={5} />

        <LanguageSelector
          language={language}
          onChangeLanguage={onChangeLanguage}
          onCloseMenu={handleCloseMenu}
        />
        <MenuItem
          leftIcon={<IconSettings size={20} strokeWidth={1.5} />}
          label={t('Settings')}
          onCloseMenu={handleCloseMenu}
        />

        <Button fullWidth mt={15} variant="default" size="xs" onClick={onLogout}>
          {t('Logout')}
        </Button>
      </Menu.Dropdown>
    </Menu>
  )
}
