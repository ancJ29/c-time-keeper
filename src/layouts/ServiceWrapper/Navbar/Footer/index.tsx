import useTranslation from '@/hooks/useTranslation'
import { AppShell, Flex, Text } from '@mantine/core'
import classes from './Footer.module.scss'
import Logout from './Logout'
import Profile from './Profile'

type FooterProps = {
  language: string
  onLogout: () => void
  onGoToProfilePage: () => void
  onChangeLanguage: (language: string) => void
}

export default function Footer({
  language,
  onLogout,
  onGoToProfilePage,
  onChangeLanguage,
}: FooterProps) {
  const t = useTranslation()

  return (
    <AppShell.Section className={classes.container}>
      <Flex justify="space-between" align="center" py={10} px={8}>
        <Profile
          language={language}
          onGoToProfilePage={onGoToProfilePage}
          onChangeLanguage={onChangeLanguage}
          onLogout={onLogout}
        />
        <Logout onClick={onLogout} />
      </Flex>
      <Text fz={10} c="dimmed" ta="right" pr={8} pb={5}>
        {`${t('Version')}: ${import.meta.env.VITE_APP_VERSION} (${import.meta.env.VITE_APP_BUILD})`}
      </Text>
    </AppShell.Section>
  )
}
