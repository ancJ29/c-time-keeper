import { MantineProvider } from '@mantine/core'
import { resolver, theme } from '@/configs/themes'
import { Notifications } from '@mantine/notifications'
import { ModalsProvider } from '@mantine/modals'
import { useLocation, useNavigate, useRoutes } from 'react-router-dom'
import routes, { publicPaths } from '@/routes'
import { Suspense, useEffect, useState, useSyncExternalStore } from 'react'
import useAuthStore from '@/stores/auth.store'
import useRoleStore from '@/stores/role.store'
import useVenueStore from '@/stores/venue.store'
import useMount from '@/hooks/useMount'
import loadingStore from '@/services/request/store/loading'
import LoadingOverlay from '@/components/common/LoadingOverlay'

export default function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const loadingGlobal = useSyncExternalStore(loadingStore.subscribe, loadingStore.getSnapshot)
  const { loadToken, token, getMe } = useAuthStore()
  const { load: loadRoles } = useRoleStore()
  const { load: loadVenues } = useVenueStore()
  const [loading, setLoading] = useState(true)

  useMount(loadToken)

  useEffect(() => {
    const loadData = async () => {
      if (token) {
        await Promise.all([getMe(), loadRoles(), loadVenues()])
      }
      setLoading(false)
    }
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  useEffect(() => {
    if (loading) {
      return
    }
    if (!token && !publicPaths.includes(location.pathname)) {
      navigate('/login')
    }
  }, [location.pathname, token, loading, navigate])

  return (
    <MantineProvider theme={theme} cssVariablesResolver={resolver}>
      <Notifications position="top-right" zIndex={1000} w={300} />
      <ModalsProvider>
        <LoadingOverlay visible={loadingGlobal} />
        <Suspense fallback={<LoadingOverlay visible={true} />}>{useRoutes(routes)}</Suspense>
      </ModalsProvider>
    </MantineProvider>
  )
}
