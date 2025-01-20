import useTranslation from '@/hooks/useTranslation'
import { AppShell, Stack, Text } from '@mantine/core'
import { MenuItem } from '@/types'
import { version } from '../../../../package.json'
import NavbarItem from '../NavbarItem'

type NavbarFooterProps = {
  footerMenu: MenuItem[]
  opened: boolean
  toggle: () => void
  buildTime: number
}

export default function NavbarFooter({ footerMenu, opened, toggle, buildTime }: NavbarFooterProps) {
  const t = useTranslation()

  return (
    <AppShell.Section>
      <Stack gap={0}>
        {footerMenu.map((menuItem) => (
          <NavbarItem
            key={menuItem.key}
            menuItem={menuItem}
            navbarOpened={opened}
            toggleNavbar={toggle}
          />
        ))}
      </Stack>
      {opened && (
        <Text fz={12} c="dimmed" ta="right" pr={12} pb={5}>
          {`${t('Version')}: ${version} (${buildTime})`}
        </Text>
      )}
    </AppShell.Section>
  )
}
