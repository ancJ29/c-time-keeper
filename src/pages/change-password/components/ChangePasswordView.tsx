import useTranslation from '@/hooks/useTranslation'
import { Stack, Text } from '@mantine/core'
import ChangePasswordForm, { ChangePasswordFormProps } from './ChangePasswordForm'

export default function ChangePasswordView({ ...props }: ChangePasswordFormProps) {
  const t = useTranslation()

  return (
    <Stack w="100%" align="center" justify="center" gap={10} mt={10}>
      <Text fz={20} fw={500} ta="center">
        {t('Change password')}
      </Text>
      <ChangePasswordForm {...props} />
    </Stack>
  )
}
