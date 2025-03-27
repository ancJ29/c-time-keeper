import NumberInput from '@/components/common/NumberInput'
import Select from '@/components/common/Select'
import useTranslation from '@/hooks/useTranslation'
import { AddUserRequest } from '@/services/domain'
import { OptionProps } from '@/types'
import { randomPassword } from '@/utils'
import {
  Box,
  Button,
  Flex,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  UnstyledButton,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { modals } from '@mantine/modals'
import { notifications } from '@mantine/notifications'
import { IconCopy } from '@tabler/icons-react'
import { useCallback } from 'react'

const w = '100%'

const initialValues: AddUserRequest = {
  username: '',
  name: '',
  email: '',
  password: '',
  roleId: '',
  baseSalary: 0,
}

type AddUserFormProps = {
  initValues?: AddUserRequest
  reOpen: (values: AddUserRequest) => void
  onConfirm: (values: AddUserRequest) => void
  roleOptions: OptionProps[]
}

export default function AddUserForm({
  initValues,
  reOpen,
  onConfirm,
  roleOptions,
}: AddUserFormProps) {
  const t = useTranslation()
  const form = useForm<AddUserRequest>({
    initialValues: initValues ?? {
      ...initialValues,
      password: randomPassword(),
    },
    validate: _validate(t),
  })

  const onSubmit = (values: AddUserRequest) => {
    modals.openConfirmModal({
      title: t('Add user'),
      children: <Text size="sm">{t('Are you sure you want to add new user?')}</Text>,
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

  const copyPassword = useCallback(() => {
    navigator.clipboard.writeText(form.values.password)
    notifications.show({
      message: t('Password copied to clipboard'),
    })
  }, [form.values.password, t])

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
        <Box w={w}>
          <Flex w={w} align="end" justify="between" gap={5}>
            <PasswordInput
              w={w}
              disabled
              visible
              label={t('Password')}
              placeholder={t('Password')}
              {...form.getInputProps('password')}
            />
            <UnstyledButton onClick={copyPassword}>
              <IconCopy strokeWidth="1.5" color="black" />
            </UnstyledButton>
          </Flex>
          <Flex w={w} justify="end">
            <Text ta="right" fz={12} c="red.5">
              {t('Please copy and keep password safe before create new user')}
            </Text>
          </Flex>
        </Box>
        <Button type="submit" mt={10}>
          {t('Add')}
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
    password: (value: string) => (value === '' ? t('Field is required') : null),
    roleId: (value: string | null) => (value === '' || !value ? t('Field is required') : null),
  }
}
