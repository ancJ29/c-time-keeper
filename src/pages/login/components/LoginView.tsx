import useTranslation from '@/hooks/useTranslation'
import { Paper, Text } from '@mantine/core'
import LoginForm, { LoginFormProps } from './LoginForm'

export default function LoginView({ ...props }: LoginFormProps) {
  const t = useTranslation()

  return (
    <Paper shadow="xl" radius={12} px="xl" py={40} w={{ base: '95vw', sm: '360' }}>
      <Text fz={20} fw={500} ta="center" mb={10}>
        {t('Sign in')}
      </Text>
      <LoginForm {...props} />
    </Paper>
  )
}
