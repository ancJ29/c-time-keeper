import { UseFormReturnType } from '@mantine/form'
import { FormProps } from '..'
import useTranslation from '@/hooks/useTranslation'
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
import { MantineWidth } from '@/types'
import { IconArrowLeft } from '@tabler/icons-react'

const w: MantineWidth = { base: '90vw', sm: 400 }

type ResetPasswordFormProps = {
  form: UseFormReturnType<FormProps>
  onSubmit: (values: FormProps) => void
}

export default function ResetPasswordForm({ form, onSubmit }: ResetPasswordFormProps) {
  const t = useTranslation()
  return (
    <SimpleGrid cols={{ base: 1, md: 2 }}>
      <BackgroundImage visibleFrom="md" h="100vh" src="/imgs/auth-background.jpg">
        <Anchor href="/login">
          <Flex align="center" gap={4} p={12} fw="bold">
            <IconArrowLeft size={20} stroke={2.5} />
            {t('Back to login')}
          </Flex>
        </Anchor>
      </BackgroundImage>
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
      </Stack>
    </SimpleGrid>
  )
}
