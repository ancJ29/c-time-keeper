import { useForm } from '@mantine/form'
import UpdatePasswordForm from './components/UpdatePasswordForm'
import useTranslation from '@/hooks/useTranslation'
import { useCallback } from 'react'
import { changePassword } from '@/services/domain'
import { showNotification } from '@/configs/notifications'
import { useNavigate } from 'react-router-dom'

export type FormProps = {
  email: string
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

const initialValues: FormProps = {
  email: '',
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
}

export default function UpdatePassword() {
  const t = useTranslation()
  const navigate = useNavigate()
  const form = useForm<FormProps>({
    initialValues: initialValues,
    validate: _validate(t),
  })

  const submit = useCallback(
    (values: FormProps) => {
      changePassword(values).then((res) => {
        const success = res?.success
        showNotification({ t, success })
        success && setTimeout(() => navigate('/profile'), 1000)
      })
    },
    [navigate, t],
  )

  return <UpdatePasswordForm form={form} onSubmit={submit} />
}

function _validate(t: (s: string) => string) {
  return {
    email: (value: string) =>
      value === '' ? t('Please enter email') : !/^\S+@\S+$/.test(value) ? t('Invalid email') : null,
    currentPassword: (value: string) => (value === '' ? t('Field is required') : null),
    newPassword: (value: string) => (value === '' ? t('Field is required') : null),
    confirmPassword: (value: string, values: FormProps) =>
      value !== values.newPassword ? t('The passwords did not match') : null,
  }
}
