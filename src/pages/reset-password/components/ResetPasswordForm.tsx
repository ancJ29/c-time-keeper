import useTranslation from '@/hooks/useTranslation'
import { Anchor, Button, Flex, Paper, Stack, Text, TextInput } from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'
import { IconArrowLeft } from '@tabler/icons-react'
import { FormProps } from '..'

type ResetPasswordFormProps = {
  form: UseFormReturnType<FormProps>
  onSubmit: (values: FormProps) => void
}

export default function ResetPasswordForm({ form, onSubmit }: ResetPasswordFormProps) {
  const t = useTranslation()

  return (
    <Stack bg="quaternary.0" h="100vh" align="center" justify="center" gap={10}>
      <Text fz={32} fw={900} c="primary" tt="uppercase">
        {t('Reset password')}
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
            <Button fullWidth type="submit" mt={10}>
              {t('Send password reset email')}
            </Button>
            <Anchor href="/login">
              <Flex align="center" gap={4} justify="center">
                <IconArrowLeft size={16} />
                <Text c="primary" mb={1.5}>
                  {t('Back to login')}
                </Text>
              </Flex>
            </Anchor>
          </Stack>
        </form>
      </Paper>
    </Stack>
  )
}
