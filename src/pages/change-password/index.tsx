import { showNotification } from '@/configs/notifications'
import useTranslation from '@/hooks/useTranslation'
import { changePassword } from '@/services/domain'
import { useForm } from '@mantine/form'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import ChangePasswordView from './components/ChangePasswordView'

export type FormProps = {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

const initialValues: FormProps = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
}

export default function ChangPassword() {
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

  return <ChangePasswordView form={form} onSubmit={submit} />
}

function _validate(t: (s: string) => string) {
  return {
    currentPassword: (value: string) => (value === '' ? t('Field is required') : null),
    newPassword: (value: string) => (value === '' ? t('Field is required') : null),
    confirmPassword: (value: string, values: FormProps) =>
      value !== values.newPassword ? t('The passwords did not match') : null,
  }
}
