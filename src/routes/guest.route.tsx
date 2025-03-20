import { RouteConfig } from '@/types'
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const ServiceWrapper = lazy(() => import('@/layouts/AuthServiceWrapper'))

const routeConfigs: RouteConfig[] = [
  {
    path: '/*',
    element: () => <Navigate to="/login" />,
  },
  {
    path: '/login',
    element: lazy(() => import('@/pages/login')),
    wrapper: ServiceWrapper,
  },
  {
    path: '/reset-password',
    element: lazy(() => import('@/pages/reset-password')),
    wrapper: ServiceWrapper,
  },
  {
    path: '/reset-password/check-email',
    element: lazy(() => import('@/pages/check-email')),
    wrapper: ServiceWrapper,
  },
  {
    path: '/work-entry',
    element: lazy(() => import('@/pages/work-entry')),
  },
]

const guestRoutes = routeConfigs.map(({ path, element: Component, wrapper: Wrapper }) => ({
  path,
  element: Wrapper ? (
    <Wrapper>
      <Component />
    </Wrapper>
  ) : (
    <Component />
  ),
}))

export default guestRoutes
