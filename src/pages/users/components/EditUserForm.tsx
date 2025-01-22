import Select from '@/components/common/Select'
import useTranslation from '@/hooks/useTranslation'
import { UpdateUserRequest, User } from '@/services/domain'
import { OptionProps } from '@/types'
import { Button, Stack, Text, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { modals } from '@mantine/modals'

const w = '100%'

const initialValues: UpdateUserRequest = {
  id: '',
  name: '',
  email: '',
  roleId: '',
  salaryRuleId: '',
}

type EditUserFormProps = {
  user: User
  reOpen: (user: UpdateUserRequest) => void
  onConfirm: (user: UpdateUserRequest) => void
  roleOptions: OptionProps[]
  salaryRuleOptions: OptionProps[]
}

export default function EditUserForm({
  user,
  reOpen,
  onConfirm,
  roleOptions,
  salaryRuleOptions,
}: EditUserFormProps) {
  const t = useTranslation()
  const form = useForm<UpdateUserRequest>({
    initialValues: user || initialValues,
    validate: _validate(t),
  })

  const onSubmit = (values: UpdateUserRequest) => {
    modals.openConfirmModal({
      title: t('Update user'),
      children: <Text size="sm">{t('Are you sure you want to update user?')}</Text>,
      labels: { confirm: t('Confirm'), cancel: t('Cancel') },
      onCancel: () => {
        modals.closeAll()
        reOpen(values)
      },
      onConfirm: () => {
        modals.closeAll()
        onConfirm({
          ...values,
          name: values.name.trim(),
          email: values.email.trim(),
        })
      },
    })
  }

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack gap={10} px={10} align="center">
        <TextInput
          w={w}
          data-autofocus
          label={t('Email')}
          {...form.getInputProps('email')}
          withAsterisk
        />
        <TextInput w={w} label={t('Name')} {...form.getInputProps('name')} withAsterisk />
        <Select
          w={w}
          label={t('Role')}
          options={roleOptions}
          withAsterisk
          {...form.getInputProps('roleId')}
        />
        <Select
          w={w}
          withAsterisk
          label={t('Salary rule')}
          options={salaryRuleOptions}
          {...form.getInputProps('salaryRuleId')}
        />
        <Button type="submit" mt={10}>
          {t('Update')}
        </Button>
      </Stack>
    </form>
  )
}

function _validate(t: (s: string) => string) {
  return {
    email: (value: string) =>
      value === '' ? t('Please enter email') : !/^\S+@\S+$/.test(value) ? t('Invalid email') : null,
    name: (value: string) => (value === '' ? t('Field is required') : null),
    roleId: (value: string | null) => (value === '' || !value ? t('Field is required') : null),
    salaryRuleId: (value: string | null) =>
      value === '' || !value ? t('Field is required') : null,
  }
}
