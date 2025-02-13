import useTranslation from '@/hooks/useTranslation'
import { MenuItem } from '@/types'
import { AppShell, Stack, Text } from '@mantine/core'
import { version } from '../../../../package.json'
import Item from '../Item'
import classes from './Footer.module.scss'

type FooterProps = {
  footerMenu: MenuItem[]
  buildTime: number
  navbarOpened: boolean
  closeNavbar: () => void
}

export default function Footer({ footerMenu, buildTime, navbarOpened, closeNavbar }: FooterProps) {
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
        {`${t('Version')}: ${version} (${buildTime})`}
      </Text>
    </AppShell.Section>
  )
}
