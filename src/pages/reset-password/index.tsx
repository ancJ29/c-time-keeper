import { showNotification } from '@/configs/notifications'
import useTranslation from '@/hooks/useTranslation'
import { resetPassword } from '@/services/domain'
import { useForm } from '@mantine/form'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import ResetPasswordView from './components/ResetPasswordView'

export type FormProps = {
  email: string
}

const initialValues: FormProps = {
  email: '',
}

export default function ResetPassword() {
  const t = useTranslation()
  const navigate = useNavigate()
  const form = useForm<FormProps>({
    initialValues,
    validate: _validate(t),
  })

  const submit = useCallback(
    async (values: FormProps) => {
      resetPassword(values).then((res) => {
        const success = res?.success
        if (success) {
          setTimeout(() => navigate(`/reset-password/check-email?email=${values.email}`), 1000)
        } else {
          showNotification({
            t,
            success,
            message: t('Invalid user'),
          })
        }
      })
    },
    [navigate, t],
  )

  return <ResetPasswordView form={form} onSubmit={submit} />
}

function _validate(t: (s: string) => string) {
  return {
    email: (value: string) =>
      value === '' ? t('Please enter email') : !/^\S+@\S+$/.test(value) ? t('Invalid email') : null,
  }
}
