import useTranslation from '@/hooks/useTranslation'
import { Paper, Text } from '@mantine/core'
import ResetPasswordForm, { ResetPasswordFormProps } from './ResetPasswordForm'

export default function ResetPasswordView({ ...props }: ResetPasswordFormProps) {
  const t = useTranslation()

  return (
    <Paper shadow="xl" radius={12} px="xl" py={40} w={{ base: '95vw', sm: '360' }}>
      <Text fz={20} fw={500} ta="center">
        {t('Your email')}
      </Text>
      <Text fz={12} mb={10} c="dimmed" ta="center">
        {t('Enter your email to reset password')}
      </Text>
      <ResetPasswordForm {...props} />
    </Paper>
  )
}
