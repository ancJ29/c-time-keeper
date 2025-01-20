import { Navigate, useNavigate } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import { useForm } from '@mantine/form'
import { useCallback } from 'react'
import useTranslation from '@/hooks/useTranslation'
import { login } from '@/services/domain'
import useAuthStore from '@/stores/auth.store'
import useRoleStore from '@/stores/role.store'
import useVenueStore from '@/stores/venue.store'
import useSalaryRuleStore from '@/stores/salaryRule.store'
import useMount from '@/hooks/useMount'

export type FormProps = {
  email: string
  password: string
  remember: boolean
}

const initialValues: FormProps = {
  email: '',
  password: '',
  remember: localStorage.__REMEMBER__ === 'true',
}

export default function Login() {
  const navigate = useNavigate()
  const t = useTranslation()
  const { token, setToken, getMe } = useAuthStore()
  const { load: loadRoles } = useRoleStore()
  const { load: loadVenues } = useVenueStore()
  const { load: loadSalaryRule } = useSalaryRuleStore()

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
        await Promise.all([getMe(), loadRoles(), loadVenues(), loadSalaryRule()])
        navigate('/dashboard')
      } else {
        form.setErrors({
          password: 'Username or password is incorrect',
        })
      }
    },
    [setToken, form, getMe, loadRoles, loadVenues, loadSalaryRule, navigate],
  )

  if (token) {
    return <Navigate to="/dashboard" />
  }

  return <LoginForm form={form} onSubmit={submit} />
}

function _validate(t: (s: string) => string) {
  return {
    email: (value: string) =>
      value === '' ? t('Please enter email') : !/^\S+@\S+$/.test(value) ? t('Invalid email') : null,
    password: (value: string) => (value === '' ? t('Please enter password') : null),
  }
}
