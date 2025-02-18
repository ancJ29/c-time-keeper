export type RouteConfig = {
  path: string
  element: React.LazyExoticComponent<() => JSX.Element> | (() => JSX.Element)
  wrapper?: React.ComponentType<{ children: React.ReactNode }>
}
