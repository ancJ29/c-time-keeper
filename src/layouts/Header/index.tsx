import useTranslation from '@/hooks/useTranslation'
import { Burger, Flex, Text } from '@mantine/core'
import LanguageSelector from './LanguageSelector'
import Profile from './Profile'

type HeaderProps = {
  opened: boolean
  toggle: () => void
}

export default function Header({ opened, toggle }: HeaderProps) {
  const t = useTranslation()

  return (
    <Flex align="center" h="100%" pos="relative" gap={10}>
      <Burger opened={opened} onClick={toggle} ml="xs" style={{ zIndex: 100 }} size="sm" />
      <Text fz={24} fw={700} ml={4}>
        {t('TITLE')}
      </Text>
      <Flex align="center" justify="right" gap={12} pos="absolute" w="100%" pr={15}>
        <LanguageSelector />
        <Profile />
      </Flex>
    </Flex>
  )
}
