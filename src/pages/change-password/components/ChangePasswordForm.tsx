import useTranslation from '@/hooks/useTranslation'
import { MantineWidth } from '@/types'
import { Button, PasswordInput, Stack } from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'
import { FormProps } from '..'

const w: MantineWidth = { base: '80vw', sm: 400 }

export type ChangePasswordFormProps = {
  form: UseFormReturnType<FormProps>
  onSubmit: (values: FormProps) => void
}

export default function ChangePasswordForm({ form, onSubmit }: ChangePasswordFormProps) {
  const t = useTranslation()

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack gap={15} w={w}>
        <PasswordInput
          label={t('Password')}
          placeholder={t('Your password')}
          withAsterisk
          {...form.getInputProps('currentPassword')}
        />
        <PasswordInput
          label={t('New password')}
          placeholder={t('New password')}
          withAsterisk
          {...form.getInputProps('newPassword')}
        />
        <PasswordInput
          label={t('Confirm new password')}
          placeholder={t('Confirm new password')}
          withAsterisk
          {...form.getInputProps('confirmPassword')}
        />
        <Button mt={10} type="submit">
          {t('Update')}
        </Button>
      </Stack>
    </form>
  )
}
