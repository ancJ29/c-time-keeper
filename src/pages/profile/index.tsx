import { showNotification } from '@/configs/notifications'
import useTranslation from '@/hooks/useTranslation'
import { updateUser, User } from '@/services/domain'
import useAuthStore from '@/stores/auth.store'
import useRoleStore from '@/stores/role.store'
import useSalaryRuleStore from '@/stores/salaryRule.store'
import { useForm } from '@mantine/form'
import { useCallback, useMemo } from 'react'
import ProfileForm from './components/ProfileForm'

export default function Profile() {
  const t = useTranslation()
  const { user } = useAuthStore()
  const { roles } = useRoleStore()
  const { salaryRules } = useSalaryRuleStore()
  const form = useForm<User>({
    initialValues: user || undefined,
    validate: _validate(t),
  })

  const roleOptions = useMemo(
    () =>
      Array.from(roles.values()).map((el) => ({
        label: t(el.name),
        value: el.id,
      })),
    [roles, t],
  )

  const salaryRuleOptions = useMemo(
    () =>
      Array.from(salaryRules.values()).map((el) => ({
        label: el.name,
        value: el.id,
      })),
    [salaryRules],
  )

  const submit = useCallback(
    (values: User) => {
      updateUser({
        ...values,
        name: values.name.trim(),
        email: values.email.trim(),
        username: values.username.trim(),
      }).then((res) => showNotification({ t, success: res?.success }))
    },
    [t],
  )

  return (
    <ProfileForm
      form={form}
      onSubmit={submit}
      roleOptions={roleOptions}
      salaryRuleOptions={salaryRuleOptions}
    />
  )
}

function _validate(t: (s: string) => string) {
  return {
    name: (value: string) => (value === '' ? t('Field is required') : null),
    email: (value: string) =>
      value === '' ? t('Please enter email') : !/^\S+@\S+$/.test(value) ? t('Invalid email') : null,
    username: (value: string) => (value === '' ? t('Field is required') : null),
    roleId: (value: string | null) => (value === '' || !value ? t('Field is required') : null),
    salaryRuleId: (value: string | null) =>
      value === '' || !value ? t('Field is required') : null,
  }
}
