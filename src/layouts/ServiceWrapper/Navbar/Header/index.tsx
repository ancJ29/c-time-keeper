import useTranslation from '@/hooks/useTranslation'
import { Flex, Image, Text } from '@mantine/core'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import classes from './Header.module.scss'

type HeaderProps = {
  closeNavbar: () => void
}

export default function Header({ closeNavbar }: HeaderProps) {
  const t = useTranslation()
  const navigate = useNavigate()

  const onClick = useCallback(() => {
    closeNavbar()
    navigate('/dashboard')
  }, [closeNavbar, navigate])

  return (
    <Flex
      justify="start"
      align="center"
      px={10}
      pt={20}
      pb={15}
      gap={10}
      className={classes.container}
      onClick={onClick}
    >
      <Image src="favicon.svg" w={40} />
      <Text fz={20} fw={700}>
        {t('TITLE')}
      </Text>
    </Flex>
  )
}
