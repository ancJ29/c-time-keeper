import useTranslation from '@/hooks/useTranslation'
import { MenuItem } from '@/types'
import { Collapse, Flex, Text, UnstyledButton } from '@mantine/core'
import { IconChevronRight } from '@tabler/icons-react'
import NavbarItem from '../NavbarItem'

type NavbarItemViewProps = {
  menuItem: MenuItem
  opened: boolean
  isHighlighted?: boolean
  isBold?: boolean
  ml?: number
  onClick: () => void
  level?: number
  navbarOpened: boolean
  toggleNavbar: () => void
}

export default function NavbarItemView({
  menuItem,
  opened,
  isHighlighted = false,
  isBold = false,
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
        pl={`${ml}rem`}
        bg={isHighlighted || (!navbarOpened && isBold) ? 'primary.3' : 'transparent'}
        w="-webkit-fill-available"
        hiddenFrom={menuItem.hiddenFrom}
        mx={navbarOpened ? 4 : 0}
        style={{ borderRadius: navbarOpened ? '4px' : '0' }}
      >
        <Flex justify="space-between" align="center" px={12}>
          <Flex gap={8} align="end">
            <menuItem.icon size={24} stroke={1.5} />
            {navbarOpened && (
              <Text fz={14} fw={isBold ? 600 : 400} mb={1}>
                {t(menuItem.label)}
              </Text>
            )}
          </Flex>
          {menuItem.subs && navbarOpened && (
            <IconChevronRight
              size={16}
              stroke={2}
              style={{
                transform: opened ? 'rotate(90deg)' : 'none',
                transition: 'transform 200ms ease',
                marginTop: '1px',
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
