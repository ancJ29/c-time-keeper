import { UseFormReturnType } from '@mantine/form'
import { FormProps } from '..'
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
import { MantineWidth } from '@/types'

const w: MantineWidth = { base: '80vw', sm: 350 }

type LoginFormProps = {
  form: UseFormReturnType<FormProps>
  onSubmit: (values: FormProps) => void
}

export default function LoginForm({ form, onSubmit }: LoginFormProps) {
  const t = useTranslation()
  return (
    <Stack bg="gray.0" align="center" justify="center" h="100vh">
      <Stack align="center" justify="center" h="100vh" gap={10}>
        <Text fz={32} fw={900}>
          {t('WELCOME BACK')}
        </Text>
        <Paper withBorder shadow="md" p={30} radius="md">
          <form onSubmit={form.onSubmit(onSubmit)}>
            <Stack gap={20}>
              <TextInput
                data-autofocus
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
    </Stack>
  )
}
