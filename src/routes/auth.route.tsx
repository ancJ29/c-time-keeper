import { RouteConfig } from '@/types'
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const ServiceWrapper = lazy(() => import('@/layouts/ServiceWrapper'))

const routeConfigs: RouteConfig[] = [
  {
    path: '/*',
    element: () => <Navigate to="/dashboard" />,
  },
  {
    path: '/dashboard',
    element: lazy(() => import('@/pages/dashboard')),
    wrapper: ServiceWrapper,
  },
  {
    path: '/users',
    element: lazy(() => import('@/pages/users')),
    wrapper: ServiceWrapper,
  },
  {
    path: '/attendance',
    element: lazy(() => import('@/pages/attendance')),
    wrapper: ServiceWrapper,
  },
  {
    path: '/profile',
    element: lazy(() => import('@/pages/profile')),
    wrapper: ServiceWrapper,
  },
  {
    path: '/change-password',
    element: lazy(() => import('@/pages/change-password')),
    wrapper: ServiceWrapper,
  },
  {
    path: '/monthly-salary',
    element: lazy(() => import('@/pages/monthly-salary')),
    wrapper: ServiceWrapper,
  },
]

const authRoutes = routeConfigs.map(({ path, element: Component, wrapper: Wrapper }) => {
  return {
    path,
    element: Wrapper ? (
      <Wrapper>
        <Component />
      </Wrapper>
    ) : (
      <Component />
    ),
  }
})

export default authRoutes
