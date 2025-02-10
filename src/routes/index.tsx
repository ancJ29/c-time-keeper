import { lazy } from 'react'

export const publicPaths = ['/login', '/reset-password', '/reset-password/check-email']

type RouteConfig = {
  path: string
  element: React.LazyExoticComponent<() => JSX.Element>
  wrapper?: React.ComponentType<{ children: React.ReactNode }>
}

const ServiceWrapper = lazy(() => import('@/layouts/ServiceWrapper'))
const AuthServiceWrapper = lazy(() => import('@/layouts/AuthServiceWrapper'))

const routeConfigs: RouteConfig[] = [
  {
    path: '/login',
    element: lazy(() => import('@/pages/login')),
    wrapper: AuthServiceWrapper,
  },
  {
    path: '/reset-password',
    element: lazy(() => import('@/pages/reset-password')),
    wrapper: AuthServiceWrapper,
  },
  {
    path: '/reset-password/check-email',
    element: lazy(() => import('@/pages/check-email')),
    wrapper: AuthServiceWrapper,
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
    path: '/time-keeping',
    element: lazy(() => import('@/pages/time-keeping')),
    wrapper: ServiceWrapper,
  },
  {
    path: '/profile',
    element: lazy(() => import('@/pages/profile')),
    wrapper: ServiceWrapper,
  },
  {
    path: '/update-password',
    element: lazy(() => import('@/pages/update-password')),
    wrapper: ServiceWrapper,
  },
  {
    path: '/*',
    element: lazy(() => import('@/pages/login')),
  },
]

const routes = routeConfigs.map(({ path, element: Component, wrapper: Wrapper }) => {
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

export default routes
