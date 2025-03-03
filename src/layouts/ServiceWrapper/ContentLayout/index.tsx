import { Burger, Flex, Image } from '@mantine/core'
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
    <div className={`${classes.container} ${!navbarOpened ? classes.shifted : ''}`}>
      <Flex justify="space-between" align="start" hiddenFrom="sm" className={classes.header}>
        <Image src="favicon.svg" w={28} />
        <Burger opened={navbarOpened} onClick={toggleNavbar} size="sm" />
      </Flex>
      <div className={classes.content}>{children}</div>
    </div>
  )
}
