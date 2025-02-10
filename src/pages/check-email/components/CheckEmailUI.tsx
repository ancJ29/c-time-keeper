import useTranslation from '@/hooks/useTranslation'
import { Anchor, Button, Image, Paper, Stack, Text } from '@mantine/core'

type CheckEmailUIProps = {
  email?: string
}

export default function CheckEmailUI({ email }: CheckEmailUIProps) {
  const t = useTranslation()

  return (
    <Paper shadow="xl" radius={12} p="xl" w={{ base: '95vw', sm: '450' }}>
      <Stack gap={20} align="center" justify="center">
        <Image w={190} fit="contain" src="/imgs/auth/check-email.svg" />

        <Text fw={600}>{t('Check your email')}</Text>

        <Text fz={14} c="dimmed" ta="center">
          {t('Please click the link sent to your email')}{' '}
          <Text fw={600} span c="black" fz={14}>
            {email}{' '}
          </Text>
          {t('to reset your password. Thank you')}
        </Text>

        <Button>{t('Skip for now')}</Button>

        <Text fz={12} c="dimmed" ta="center">
          {t('Didn’t receive an email?')}{' '}
          <Anchor fw={500} fz={12} href="/reset-password">
            {t('Resend')}
          </Anchor>
        </Text>
      </Stack>
    </Paper>
  )
}
