import useTranslation from '@/hooks/useTranslation'
import { Button, Stack, TextInput } from '@mantine/core'
import { UseFormReturnType } from '@mantine/form'
import { IconArrowRight } from '@tabler/icons-react'
import { FormProps } from '..'

export type ResetPasswordFormProps = {
  form: UseFormReturnType<FormProps>
  onSubmit: (values: FormProps) => void
}

export default function ResetPasswordForm({ form, onSubmit }: ResetPasswordFormProps) {
  const t = useTranslation()

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack gap={15}>
        <TextInput
          data-autofocus
          label={t('Email')}
          placeholder="email@email.com"
          {...form.getInputProps('email')}
        />
        <Button fullWidth type="submit" mt={10} rightSection={<IconArrowRight size={16} />}>
          {t('Continue')}
        </Button>
      </Stack>
    </form>
  )
}
