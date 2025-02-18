import LoadingOverlay from '@/components/common/LoadingOverlay'
import { resolver, theme } from '@/configs/themes'
import useMount from '@/hooks/useMount'
import authRoutes from '@/routes/auth.route'
import guestRoutes from '@/routes/guest.route'
import loadingStore from '@/services/request/store/loading'
import useAuthStore from '@/stores/auth.store'
import useMetadataStore from '@/stores/metadata'
import useRoleStore from '@/stores/role.store'
import useSalaryRuleStore from '@/stores/salaryRule.store'
import useVenueStore from '@/stores/venue.store'
import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { Notifications } from '@mantine/notifications'
import { Suspense, useEffect, useMemo, useState, useSyncExternalStore } from 'react'
import { useRoutes } from 'react-router-dom'

export default function App() {
  const loadingGlobal = useSyncExternalStore(loadingStore.subscribe, loadingStore.getSnapshot)
  const { loadToken, token, getMe, user } = useAuthStore()
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
      setTimeout(() => setLoading(false), 200)
    }
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  const routes = useMemo(() => {
    if (loading) {
      return [
        {
          path: '/*',
          element: <LoadingOverlay />,
        },
      ]
    }
    return user ? authRoutes : guestRoutes
  }, [user, loading])

  return (
    <MantineProvider theme={theme} cssVariablesResolver={resolver}>
      <Notifications position="top-right" zIndex={1000} w={300} />
      <ModalsProvider>
        <LoadingOverlay visible={loadingGlobal} />
        <Suspense fallback={<LoadingOverlay />}>{useRoutes(routes)}</Suspense>
      </ModalsProvider>
    </MantineProvider>
  )
}
