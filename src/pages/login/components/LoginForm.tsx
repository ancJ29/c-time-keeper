import useTranslation from '@/hooks/useTranslation'
import { Anchor, Button, Checkbox, Group, PasswordInput, Stack, TextInput } from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'
import { FormProps } from '..'

export type LoginFormProps = {
  form: UseFormReturnType<FormProps>
  onSubmit: (values: FormProps) => void
}

export default function LoginForm({ form, onSubmit }: LoginFormProps) {
  const t = useTranslation()

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack gap={15}>
        <TextInput
          data-autofocus
          label={t('Username')}
          placeholder={t('Username')}
          {...form.getInputProps('username')}
        />
        <PasswordInput
          label={t('Password')}
          placeholder={t('Your password')}
          {...form.getInputProps('password')}
        />
        <Group justify="space-between" mt={5}>
          <Checkbox
            checked={form.values.remember}
            label={t('Remember me')}
            {...form.getInputProps('remember')}
          />
          <Anchor size="sm" href="/reset-password">
            {t('Forgot password?')}
          </Anchor>
        </Group>
        <Button fullWidth type="submit" my={10}>
          {t('Sign in')}
        </Button>
      </Stack>
    </form>
  )
}
