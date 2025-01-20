import { Navigate, useNavigate } from 'react-router-dom'
import ResetPasswordForm from './components/ResetPasswordForm'
import useAuthStore from '@/stores/auth.store'
import { useForm } from '@mantine/form'
import useTranslation from '@/hooks/useTranslation'
import { useCallback } from 'react'
import { resetPassword } from '@/services/domain'
import { showNotification } from '@/configs/notifications'

export type FormProps = {
  email: string
}

const initialValues: FormProps = {
  email: '',
}

export default function ResetPassword() {
  const t = useTranslation()
  const navigate = useNavigate()
  const { token } = useAuthStore()
  const form = useForm<FormProps>({
    initialValues,
    validate: _validate(t),
  })

  const submit = useCallback(
    async (values: FormProps) => {
      resetPassword(values).then((res) => {
        const success = res?.success
        showNotification({
          t,
          success,
          message: success ? t('Please check your email') : t('Invalid user'),
        })
        success && setTimeout(() => navigate('/login'), 2000)
      })
    },
    [navigate, t],
  )

  if (token) {
    return <Navigate to="/dashboard" />
  }

  return <ResetPasswordForm form={form} onSubmit={submit} />
}

function _validate(t: (s: string) => string) {
  return {
    email: (value: string) =>
      value === '' ? t('Please enter email') : !/^\S+@\S+$/.test(value) ? t('Invalid email') : null,
  }
}
