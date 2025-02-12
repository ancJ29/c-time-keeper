import useTranslation from '@/hooks/useTranslation'
import { Anchor, Button, Image, Paper, Stack, Text } from '@mantine/core'

type CheckEmailViewProps = {
  email: string | null
  onReturnToLogin: () => void
}

export default function CheckEmailView({ email, onReturnToLogin }: CheckEmailViewProps) {
  const t = useTranslation()

  return (
    <Paper shadow="xl" radius={12} px="xl" py={40} w={{ base: '95vw', sm: '450' }}>
      <Stack gap={20} align="center" justify="center">
        <Image w={190} fit="contain" src="/imgs/auth/check-email.svg" />

        <Text fw={600}>{t('Check your email')}</Text>

        {email ? (
          <Text fz={14} c="dimmed" ta="center">
            {t('Please check your email')}{' '}
            <Text fw={600} span c="black" fz={14}>
              {email}{' '}
            </Text>
            {t('to retrieve your new password. Thank you')}
          </Text>
        ) : (
          <Text fw={600} c="red">
            {t('No email provided')}{' '}
          </Text>
        )}

        <Button onClick={onReturnToLogin}>{t('Sign in again')}</Button>

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
