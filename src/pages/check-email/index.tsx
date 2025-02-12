import { useCallback } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import CheckEmailView from './components/CheckEmailView'

export default function CheckEmail() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const email = searchParams.get('email')

  const returnToLogin = useCallback(() => {
    navigate('/login')
  }, [navigate])

  return <CheckEmailView email={email} onReturnToLogin={returnToLogin} />
}
