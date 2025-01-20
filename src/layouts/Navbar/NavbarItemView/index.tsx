import { MenuItem } from '@/types'
import { Collapse, Flex, Text, UnstyledButton } from '@mantine/core'
import NavbarItem from '../NavbarItem'
import useTranslation from '@/hooks/useTranslation'
import { IconChevronRight } from '@tabler/icons-react'

type NavbarItemViewProps = {
  menuItem: MenuItem
  opened: boolean
  active?: boolean
  ml?: number
  onClick: () => void
  level?: number
  navbarOpened: boolean
  toggleNavbar: () => void
}

export default function NavbarItemView({
  menuItem,
  opened,
  active = false,
  ml = 0,
  onClick,
  level = 0,
  navbarOpened,
  toggleNavbar,
}: NavbarItemViewProps) {
  const t = useTranslation()
  return (
    <>
      <UnstyledButton
        onClick={onClick}
        py={10}
        ml={`${ml}rem`}
        bg={active ? `primary.${4 - level}` : 'transparent'}
        w={`calc(100% - ${ml}rem)`}
        hiddenFrom={menuItem.hiddenFrom}
      >
        <Flex justify="space-between" align="center" px={12}>
          <Flex gap={8} align="end">
            <menuItem.icon size={24} stroke={1.5} />
            {navbarOpened && (
              <Text fz={14} fw={400}>
                {t(menuItem.label)}
              </Text>
            )}
          </Flex>
          {menuItem.subs && navbarOpened && (
            <IconChevronRight
              size={16}
              stroke={1.5}
              style={{
                transform: opened ? 'rotate(90deg)' : 'none',
                transition: 'transform 200ms ease',
              }}
            />
          )}
        </Flex>
      </UnstyledButton>
      {menuItem.subs && navbarOpened && (
        <Collapse in={opened}>
          {menuItem.subs.map((subMenuItem) => (
            <NavbarItem
              key={subMenuItem.key}
              menuItem={subMenuItem}
              navbarOpened={navbarOpened}
              level={level + 1}
              toggleNavbar={toggleNavbar}
            />
          ))}
        </Collapse>
      )}
    </>
  )
}
