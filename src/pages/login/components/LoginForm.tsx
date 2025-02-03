import useTranslation from '@/hooks/useTranslation'
import { MantineWidth } from '@/types'
import {
  Anchor,
  Button,
  Checkbox,
  Group,
  Image,
  PasswordInput,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
} from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'
import { FormProps } from '..'

const w: MantineWidth = { base: '90vw', sm: 400 }

type LoginFormProps = {
  form: UseFormReturnType<FormProps>
  onSubmit: (values: FormProps) => void
}

export default function LoginForm({ form, onSubmit }: LoginFormProps) {
  const t = useTranslation()
  return (
    <SimpleGrid cols={{ base: 1, md: 2 }}>
      <Image visibleFrom="md" h="100vh" src="/imgs/auth-background.jpg" />
      <Stack align="center" justify="center" h="100vh">
        <Text fz={32} fw={900} c="primary" tt="uppercase">
          {t('Welcome back')}
        </Text>
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
      </Stack>
    </SimpleGrid>
  )
}
