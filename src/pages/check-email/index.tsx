import { useCallback } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import CheckEmailUI from './components/CheckEmailUI'

export default function CheckEmail() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const email = searchParams.get('email')

  const returnToLogin = useCallback(() => {
    navigate('/login')
  }, [navigate])

  return <CheckEmailUI email={email} onReturnToLogin={returnToLogin} />
}
