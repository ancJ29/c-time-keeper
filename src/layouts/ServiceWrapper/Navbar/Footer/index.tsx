import useTranslation from '@/hooks/useTranslation'
import { Stack, Text } from '@mantine/core'
import classes from './Footer.module.scss'
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
    <Stack gap={0} className={classes.container}>
      <Profile
        navbarOpened={navbarOpened}
        language={language}
        onGoToProfilePage={onGoToProfilePage}
        onChangeLanguage={onChangeLanguage}
        onLogout={onLogout}
      />
      {navbarOpened && (
        <Text fz={10} c="dimmed" ta="right">
          {`${t('Version')}: ${import.meta.env.VITE_APP_VERSION} (${import.meta.env.VITE_APP_BUILD})`}
        </Text>
      )}
    </Stack>
  )
}
