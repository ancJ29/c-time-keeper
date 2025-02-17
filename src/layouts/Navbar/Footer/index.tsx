import useTranslation from '@/hooks/useTranslation'
import { MenuItem } from '@/types'
import { AppShell, Stack, Text } from '@mantine/core'
import Item from '../Item'
import classes from './Footer.module.scss'

type FooterProps = {
  footerMenu: MenuItem[]
  navbarOpened: boolean
  closeNavbar: () => void
}

export default function Footer({ footerMenu, navbarOpened, closeNavbar }: FooterProps) {
  const t = useTranslation()

  return (
    <AppShell.Section className={classes.container}>
      <Stack gap={0}>
        {footerMenu.map((menuItem) => (
          <Item
            key={menuItem.key}
            menuItem={menuItem}
            navbarOpened={navbarOpened}
            closeNavbar={closeNavbar}
          />
        ))}
      </Stack>
      <Text fz={10} c="dimmed" ta="right" pr={8} pb={5}>
        {`${t('Version')}: ${import.meta.env.VITE_APP_VERSION} (${import.meta.env.VITE_APP_BUILD})`}
      </Text>
    </AppShell.Section>
  )
}
