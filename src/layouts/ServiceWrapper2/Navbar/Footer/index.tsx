import useTranslation from '@/hooks/useTranslation'
import { Flex, Stack, Text } from '@mantine/core'
import classes from './Footer.module.scss'
import Logout from './Logout'
import Profile from './Profile'

type FooterProps = {
  navbarOpened: boolean
  language: string
  onChangeLanguage: (language: string) => void
  onLogout: () => void
  onGoToProfilePage: () => void
}

export default function Footer({
  navbarOpened,
  language,
  onChangeLanguage,
  onLogout,
  onGoToProfilePage,
}: FooterProps) {
  const t = useTranslation()

  return (
    <Stack gap={0} className={`${classes.container} ${!navbarOpened ? classes.contracted : ''}`}>
      <Flex justify="space-between" align="center" px={8} gap={10}>
        <Profile
          language={language}
          onGoToProfilePage={onGoToProfilePage}
          onChangeLanguage={onChangeLanguage}
          onLogout={onLogout}
        />
        <Logout onClick={onLogout} />
      </Flex>
      {navbarOpened && (
        <Text fz={10} c="dimmed" ta="right" pt={10}>
          {`${t('Version')}: ${import.meta.env.VITE_APP_VERSION} (${import.meta.env.VITE_APP_BUILD})`}
        </Text>
      )}
    </Stack>
  )
}
