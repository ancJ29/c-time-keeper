import { AppShell } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import Header from '../Header'
import Navbar from '../Navbar'
import ScrollToTopButton from '../ScrollToTopButton'

type ServiceWrapperProps = {
  children: React.ReactNode
}

export default function ServiceWrapper({ children }: ServiceWrapperProps) {
  const [opened, { toggle }] = useDisclosure(false)

  return (
    <AppShell
      header={{ height: 52 }}
      navbar={{ width: opened ? 300 : 50, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="sm"
    >
      <AppShell.Header>
        <Header opened={opened} toggle={toggle} />
      </AppShell.Header>
      <AppShell.Navbar>
        <Navbar opened={opened} toggle={toggle} />
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
      <ScrollToTopButton />
    </AppShell>
  )
}
