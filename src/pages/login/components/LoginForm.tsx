import useTranslation from '@/hooks/useTranslation'
import {
  Anchor,
  Button,
  Checkbox,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'
import { FormProps } from '..'

type LoginFormProps = {
  form: UseFormReturnType<FormProps>
  onSubmit: (values: FormProps) => void
}

export default function LoginForm({ form, onSubmit }: LoginFormProps) {
  const t = useTranslation()

  return (
    <Stack bg="quaternary.0" h="100vh" align="center" justify="center" gap={10}>
      <Text fz={32} fw={900} c="primary" tt="uppercase">
        {t('Welcome back')}
      </Text>
      <Paper
        shadow="xl"
        radius="md"
        withBorder
        p={{ base: 'lg', sm: 'xl' }}
        w={{ base: '92vw', sm: '500' }}
      >
        <form onSubmit={form.onSubmit(onSubmit)}>
          <Stack gap={15}>
            <TextInput
              data-autofocus
              withAsterisk
              label={t('Email')}
              placeholder={t('Your email')}
              {...form.getInputProps('email')}
            />
            <PasswordInput
              label={t('Password')}
              placeholder={t('Your password')}
              withAsterisk
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
            <Button fullWidth type="submit" mt={10}>
              {t('Sign in')}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Stack>
  )
}
