import useTranslation from '@/hooks/useTranslation'
import { MantineWidth } from '@/types'
import { Anchor, Button, Flex, Paper, Stack, Text, TextInput } from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'
import { FormProps } from '..'
import { IconArrowLeft } from '@tabler/icons-react'

const w: MantineWidth = { base: '80vw', sm: 350 }

type ResetPasswordFormProps = {
  form: UseFormReturnType<FormProps>
  onSubmit: (values: FormProps) => void
}

export default function ResetPasswordForm({ form, onSubmit }: ResetPasswordFormProps) {
  const t = useTranslation()
  return (
    <Stack bg="gray.0" align="center" justify="center" h="100vh">
      <Stack align="center" justify="center" h="100vh" gap={10}>
        <Text fz={32} fw={900} tt="uppercase">
          {t('Reset password')}
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
              <Button fullWidth type="submit" mt={10}>
                {t('Send password reset email')}
              </Button>
              <Anchor href="/login">
                <Flex align="center" gap={4}>
                  <IconArrowLeft size={16} />
                  {t('Back to login')}
                </Flex>
              </Anchor>
            </Stack>
          </form>
        </Paper>
      </Stack>
    </Stack>
  )
}
