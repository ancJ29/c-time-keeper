import { AppShell, Burger, Paper, Stack } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import Navbar from '../Navbar'
import classes from './ServiceWrapper.module.scss'

type ServiceWrapperProps = {
  children: React.ReactNode
}

export default function ServiceWrapper({ children }: ServiceWrapperProps) {
  const [opened, { toggle, close }] = useDisclosure(false)

  return (
    <AppShell
      navbar={{ width: 240, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      withBorder={false}
      padding="md"
    >
      <AppShell.Navbar className={classes.navbar}>
        <Navbar opened={opened} close={close} />
      </AppShell.Navbar>
      <AppShell.Main>
        <Stack gap={10}>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Paper className={classes.paper} radius="lg" withBorder p="md" onClick={close}>
            {children}
          </Paper>
        </Stack>
      </AppShell.Main>
    </AppShell>
  )
}
