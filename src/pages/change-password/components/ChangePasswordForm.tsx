import useTranslation from '@/hooks/useTranslation'
import { MantineWidth } from '@/types'
import { Button, PasswordInput, Stack } from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'
import { FormProps } from '..'

const w: MantineWidth = { base: '80vw', sm: 350 }

type UpdatePasswordFormProps = {
  form: UseFormReturnType<FormProps>
  onSubmit: (values: FormProps) => void
}

export default function ChangePasswordForm({ form, onSubmit }: UpdatePasswordFormProps) {
  const t = useTranslation()
  return (
    <Stack align="center" justify="center" gap={10}>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Stack gap={15}>
          <PasswordInput
            label={t('Password')}
            placeholder={t('Your password')}
            withAsterisk
            w={w}
            {...form.getInputProps('currentPassword')}
          />
          <PasswordInput
            label={t('New password')}
            placeholder={t('New password')}
            withAsterisk
            w={w}
            {...form.getInputProps('newPassword')}
          />
          <PasswordInput
            label={t('Confirm new password')}
            placeholder={t('Confirm new password')}
            withAsterisk
            w={w}
            {...form.getInputProps('confirmPassword')}
          />
          <Button mt={10} type="submit">
            {t('Update')}
          </Button>
        </Stack>
      </form>
    </Stack>
  )
}
