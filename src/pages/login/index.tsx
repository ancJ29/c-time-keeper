import useMount from '@/hooks/useMount'
import useTranslation from '@/hooks/useTranslation'
import { login } from '@/services/domain'
import useAuthStore from '@/stores/auth.store'
import { useForm } from '@mantine/form'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginView from './components/LoginView'

export type FormProps = {
  username: string
  password: string
  remember: boolean
}

const initialValues: FormProps = {
  username: '',
  password: '',
  remember: localStorage.__REMEMBER__ === 'true',
}

export default function Login() {
  const navigate = useNavigate()
  const t = useTranslation()
  const { setToken } = useAuthStore()

  const form = useForm<FormProps>({
    initialValues,
    validate: _validate(t),
  })

  useMount(() => form.setFieldValue('remember', localStorage.__REMEMBER__ === 'true'))

  const submit = useCallback(
    async (values: FormProps) => {
      const res = await login(values)
      if (res?.token) {
        setToken(res.token, form.values.remember)
        navigate('/timesheet')
      } else {
        form.setErrors({
          password: 'Username or password is incorrect',
        })
      }
    },
    [setToken, form, navigate],
  )

  return <LoginView form={form} onSubmit={submit} />
}

function _validate(t: (s: string) => string) {
  return {
    email: (value: string) => (value === '' ? t('Please enter username') : null),
    password: (value: string) => (value === '' ? t('Please enter password') : null),
  }
}
