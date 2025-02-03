import LoadingOverlay from '@/components/common/LoadingOverlay'
import { resolver, theme } from '@/configs/themes'
import useMount from '@/hooks/useMount'
import routes, { publicPaths } from '@/routes'
import loadingStore from '@/services/request/store/loading'
import useAuthStore from '@/stores/auth.store'
import useMetadataStore from '@/stores/metadata'
import useRoleStore from '@/stores/role.store'
import useSalaryRuleStore from '@/stores/salaryRule.store'
import useVenueStore from '@/stores/venue.store'
import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'
import { Suspense, useEffect, useState, useSyncExternalStore } from 'react'
import { useLocation, useNavigate, useRoutes } from 'react-router-dom'

export default function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const loadingGlobal = useSyncExternalStore(loadingStore.subscribe, loadingStore.getSnapshot)
  const { loadToken, token, getMe } = useAuthStore()
  const { load: loadRoles } = useRoleStore()
  const { load: loadVenues } = useVenueStore()
  const { load: loadSalaryRule } = useSalaryRuleStore()
  const { checkVersion } = useMetadataStore()
  const [loading, setLoading] = useState(true)

  useMount(loadToken)

  useEffect(() => {
    const loadData = async () => {
      await checkVersion()
      if (token) {
        await Promise.all([getMe(), loadRoles(), loadVenues(), loadSalaryRule()])
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
