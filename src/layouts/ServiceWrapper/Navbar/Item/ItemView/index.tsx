import useTranslation from '@/hooks/useTranslation'
import { MenuItem } from '@/types'
import { Collapse, Flex, Text, UnstyledButton } from '@mantine/core'
import { IconChevronRight } from '@tabler/icons-react'
import Item from '..'

type ItemViewProps = {
  menuItem: MenuItem
  opened: boolean
  isHighlighted?: boolean
  isBold?: boolean
  ml?: number
  onClick: () => void
  level?: number
  navbarOpened: boolean
  closeNavbar: () => void
}

export default function ItemView({
  menuItem,
  opened,
  isHighlighted = false,
  isBold = false,
  ml = 0,
  onClick,
  level = 0,
  navbarOpened,
  closeNavbar,
}: ItemViewProps) {
  const t = useTranslation()
  return (
    <>
      <UnstyledButton
        onClick={onClick}
        py={10}
        pl={`${ml}rem`}
        bg={isHighlighted || (!opened && isBold) ? 'primary.1' : 'transparent'}
        w="-webkit-fill-available"
        hiddenFrom={menuItem.hiddenFrom}
        style={{ borderRadius: '4px' }}
      >
        <Flex justify="space-between" align="center" px={12}>
          <Flex gap={8} align="end">
            <menuItem.icon size={24} stroke={isBold ? 1.75 : 1.5} />
            <Text fz={14} fw={isBold ? 600 : 400}>
              {t(menuItem.label)}
            </Text>
          </Flex>
          {menuItem.subs && (
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
      {menuItem.subs && (
        <Collapse in={opened}>
          {menuItem.subs.map((subMenuItem) => (
            <Item
              key={subMenuItem.key}
              menuItem={subMenuItem}
              navbarOpened={navbarOpened}
              level={level + 1}
              closeNavbar={closeNavbar}
            />
          ))}
        </Collapse>
      )}
    </>
  )
}
