import useTranslation from '@/hooks/useTranslation'
import { ActionIcon, Flex, Image, Text } from '@mantine/core'
import { IconArrowsRightLeft } from '@tabler/icons-react'
import { CSSProperties } from 'react'
import classes from './Header.module.scss'

type HeaderProps = {
  onClick: () => void
  navbarOpened: boolean
  toggleNavbar: () => void
}

export default function Header({ onClick, navbarOpened, toggleNavbar }: HeaderProps) {
  const t = useTranslation()

  return (
    <Flex
      justify={navbarOpened ? 'space-between' : 'center'}
      align="center"
      className={classes.container}
    >
      {navbarOpened ? (
        <Flex align="center" gap={5}>
          <Image src="favicon.svg" w={36} onClick={onClick} />
          <Text fz={16} fw={700} mt={1}>
            {t('TITLE')}
          </Text>
        </Flex>
      ) : (
        <SwitchButton onClick={toggleNavbar} style={{ margin: '4px 0' }} />
      )}
      {navbarOpened && <SwitchButton onClick={toggleNavbar} />}
    </Flex>
  )
}

function SwitchButton({ onClick, style }: { onClick: () => void; style?: CSSProperties }) {
  return (
    <ActionIcon variant="transparent" onClick={onClick} size="md" radius="md" style={style}>
      <IconArrowsRightLeft size={24} strokeWidth={1.5} color="black" />
    </ActionIcon>
  )
}
