import useTranslation from '@/hooks/useTranslation'
import { Button, Image, Paper, Stack, Text } from '@mantine/core'

export default function CheckEmailUI() {
  const t = useTranslation()

  return (
    <Paper shadow="xl" radius={12} p="xl" w={{ base: '95vw', sm: '450' }}>
      <Stack gap={30} align="center" justify="center">
        <Image w={190} fit="contain" src="/imgs/auth/check-email.svg" />

        <Text fw={600}>{t('Check your email')}</Text>

        <Button>{t('Skip for now')}</Button>
      </Stack>
    </Paper>
  )
}
