import { Burger } from '@mantine/core'
import classes from './ContentLayout.module.scss'

type ContentLayoutProps = {
  children: React.ReactNode
  navbarOpened: boolean
  toggleNavbar: () => void
}

export default function ContentLayout({
  children,
  navbarOpened,
  toggleNavbar,
}: ContentLayoutProps) {
  return (
    <div className={`${classes.container} ${navbarOpened ? classes.shifted : ''}`}>
      <Burger opened={navbarOpened} onClick={toggleNavbar} hiddenFrom="sm" size="sm" ml={-5} />
      {children}
    </div>
  )
}
