import useTranslation from '@/hooks/useTranslation'
import { Flex, Image, Text } from '@mantine/core'
import classes from './Header.module.scss'

type HeaderProps = {
  onClick: () => void
  navbarOpened: boolean
}

export default function Header({ onClick, navbarOpened }: HeaderProps) {
  const t = useTranslation()

  return (
    <Flex justify="start" align="center" gap={10} onClick={onClick} className={classes.container}>
      <Image src="favicon.svg" w={36} style={{ marginLeft: navbarOpened ? 0 : '4px' }} />
      {navbarOpened && (
        <Text fz={20} fw={700}>
          {t('TITLE')}
        </Text>
      )}
    </Flex>
  )
}
