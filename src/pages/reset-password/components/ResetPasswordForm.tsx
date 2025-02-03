import useTranslation from '@/hooks/useTranslation'
import { MantineWidth } from '@/types'
import {
  Anchor,
  BackgroundImage,
  Button,
  Flex,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
} from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'
import { IconArrowLeft } from '@tabler/icons-react'
import { FormProps } from '..'

const w: MantineWidth = { base: '90vw', sm: 400 }

type ResetPasswordFormProps = {
  form: UseFormReturnType<FormProps>
  onSubmit: (values: FormProps) => void
}

export default function ResetPasswordForm({ form, onSubmit }: ResetPasswordFormProps) {
  const t = useTranslation()

  return (
    <SimpleGrid cols={{ base: 1, md: 2 }}>
      <BackgroundImage visibleFrom="md" h="100vh" src="/imgs/auth-background.jpg" />
      <Stack align="center" justify="center" h="100vh">
        <Text fz={32} fw={900} c="primary" tt="uppercase">
          {t('Reset password')}
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
            <Button fullWidth type="submit" mt={10}>
              {t('Send password reset email')}
            </Button>
          </Stack>
        </form>
        <Anchor href="/login" w={w}>
          <Flex align="center" gap={4}>
            <IconArrowLeft size={16} />
            {t('Back to login')}
          </Flex>
        </Anchor>
      </Stack>
    </SimpleGrid>
  )
}
