import NumberInput from '@/components/common/NumberInput'
import Select from '@/components/common/Select'
import useTranslation from '@/hooks/useTranslation'
import { UpdateUserRequest, User } from '@/services/domain'
import { OptionProps } from '@/types'
import { Button, Stack, Switch, Text, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { modals } from '@mantine/modals'

const w = '100%'

const initialValues: UpdateUserRequest = {
  id: '',
  name: '',
  username: '',
  email: '',
  roleId: '',
  salaryRuleId: '',
  clientId: '',
  baseSalary: 0,
  enabled: true,
}

type EditUserFormProps = {
  user: User
  reOpen: (user: UpdateUserRequest) => void
  onConfirm: (user: UpdateUserRequest) => void
  roleOptions: OptionProps[]
}

export default function EditUserForm({ user, reOpen, onConfirm, roleOptions }: EditUserFormProps) {
  const t = useTranslation()
  const form = useForm<UpdateUserRequest>({
    initialValues: { ...initialValues, ...user, enabled: user.enabled || false },
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
          username: values.username.trim(),
        })
      },
    })
  }

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack gap={10} px={10} align="center">
        <TextInput
          data-autofocus
          w={w}
          label={t('Name')}
          {...form.getInputProps('name')}
          withAsterisk
        />
        <TextInput w={w} label={t('Username')} {...form.getInputProps('username')} withAsterisk />
        <TextInput w={w} label={t('Email')} {...form.getInputProps('email')} withAsterisk />
        <Select
          w={w}
          label={t('Role')}
          options={roleOptions}
          withAsterisk
          {...form.getInputProps('roleId')}
        />
        <NumberInput
          w={w}
          label={t('Base salary')}
          withAsterisk
          min={0}
          {...form.getInputProps('baseSalary')}
        />
        <Switch
          checked={form.values.enabled}
          w={w}
          labelPosition="left"
          label={t('Status')}
          mt={4}
          {...form.getInputProps('enabled')}
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
    name: (value: string) => (value === '' ? t('Field is required') : null),
    username: (value: string) => (value === '' ? t('Field is required') : null),
    email: (value: string) =>
      value === '' ? t('Please enter email') : !/^\S+@\S+$/.test(value) ? t('Invalid email') : null,
    roleId: (value: string | null) => (value === '' || !value ? t('Field is required') : null),
  }
}
