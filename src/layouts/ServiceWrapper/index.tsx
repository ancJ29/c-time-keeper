import { AppShell } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import ContentLayout from './ContentLayout'
import Navbar from './Navbar'
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
        <ContentLayout opened={opened} toggle={toggle} close={close}>
          {children}
        </ContentLayout>
      </AppShell.Main>
    </AppShell>
  )
}
