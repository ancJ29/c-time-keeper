import { MenuItem } from '@/types'
import { Box, Drawer, ScrollArea, Stack } from '@mantine/core'
import { useHover } from '@mantine/hooks'
import Footer from './Footer'
import Header from './Header'
import Item from './Item'
import classes from './Navbar.module.scss'
import PinButton from './PinButton'

type NavbarProps = {
  navbarOpened: boolean
  toggleNavbar: () => void
  closeNavbar: () => void
  menu: MenuItem[]
  language: string
  onChangeLanguage: (language: string) => void
  onLogout: () => void
  onGoToProfilePage: () => void
  onGoToDashboardPage: () => void
}

export default function Navbar({
  navbarOpened,
  toggleNavbar,
  closeNavbar,
  menu,
  language,
  onChangeLanguage,
  onLogout,
  onGoToProfilePage,
  onGoToDashboardPage,
}: NavbarProps) {
  const { hovered, ref } = useHover()

  const content = (
    <>
      <PinButton navbarOpened={navbarOpened} onClick={toggleNavbar} />
      <Header onClick={onGoToDashboardPage} navbarOpened={hovered || navbarOpened} />
      <ScrollArea h="calc(100dvh - 16px - 20px - 20px - 36px - 60px)">
        <Stack gap={0}>
          {menu.map((menuItem) => (
            <Item
              key={menuItem.key}
              menuItem={menuItem}
              navbarOpened={hovered || navbarOpened}
              closeNavbar={closeNavbar}
            />
          ))}
        </Stack>
      </ScrollArea>
      <Footer
        navbarOpened={hovered || navbarOpened}
        language={language}
        onChangeLanguage={onChangeLanguage}
        onLogout={onLogout}
        onGoToProfilePage={onGoToProfilePage}
      />
    </>
  )

  return (
    <>
      <Box
        ref={ref}
        className={`${classes.boxContainer} ${hovered || navbarOpened ? classes.expanded : ''}`}
        visibleFrom="sm"
      >
        {content}
      </Box>
      <Drawer
        opened={navbarOpened}
        onClose={closeNavbar}
        hiddenFrom="sm"
        withCloseButton={false}
        padding={0}
        size="xs"
        zIndex={1200}
        classNames={{ body: classes.drawerBody }}
      >
        {content}
      </Drawer>
    </>
  )
}
