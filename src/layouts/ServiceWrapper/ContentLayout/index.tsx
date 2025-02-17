import { Burger, Paper, Stack } from '@mantine/core'
import classes from './ContentLayout.module.scss'

type ContentLayoutProps = {
  children: React.ReactNode
  opened: boolean
  toggle: () => void
  close: () => void
}

export default function ContentLayout({ children, opened, toggle, close }: ContentLayoutProps) {
  return (
    <Stack gap={10}>
      <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
      <Paper className={classes.paper} radius="lg" withBorder p="md" onClick={close}>
        {children}
      </Paper>
    </Stack>
  )
}
