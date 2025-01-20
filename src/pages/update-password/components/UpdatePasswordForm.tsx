import { UseFormReturnType } from '@mantine/form'
import { FormProps } from '..'
import useTranslation from '@/hooks/useTranslation'
import { Button, PasswordInput, Stack, TextInput } from '@mantine/core'
import { MantineWidth } from '@/types'

const w: MantineWidth = { base: '80vw', sm: 350 }

type UpdatePasswordFormProps = {
  form: UseFormReturnType<FormProps>
  onSubmit: (values: FormProps) => void
}

export default function UpdatePasswordForm({ form, onSubmit }: UpdatePasswordFormProps) {
  const t = useTranslation()
  return (
    <Stack align="center" justify="center" gap={10}>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Stack gap={15}>
          <TextInput
            withAsterisk
            label={t('Email')}
            placeholder={t('Your email')}
            w={w}
            {...form.getInputProps('email')}
          />
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
