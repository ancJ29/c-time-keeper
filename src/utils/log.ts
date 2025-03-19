export function debug(...args: unknown[]) {
  const isDev = window.location.hostname.includes('localhost')
  if (!isDev) {
    return
  }
  // eslint-disable-next-line no-console
  console.log(
    args
      .map((arg) => {
        if (arg === undefined) {
          return 'undefined'
        }
        if (arg === null) {
          return 'null'
        }
        if (arg instanceof Date) {
          return arg.toISOString()
        }
        if (arg instanceof Error) {
          return [arg.message, arg.stack?.slice(0, 3)].filter(Boolean).join('\n')
        }
        if (typeof arg === 'object') {
          return JSON.stringify(arg, null, 2)
        } else {
          return arg
        }
      })
      .join(' '),
  )
}
