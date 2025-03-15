import { NotificationData, notifications } from '@mantine/notifications'

interface NotificationProps extends Omit<NotificationData, 'message'> {
  t?: (key: string) => string
  success?: boolean
  message?: string
}

export function showNotification({ t, success, ...props }: NotificationProps) {
  const defaultMessage = success ? t?.('Your changes have been saved') : t?.('Unknown error')
  notifications.show({
    ...props,
    withBorder: true,
    autoClose: 2000,
    message: props.message || defaultMessage,
    color: _color(success),
  })
}

function _color(success?: boolean): string {
  if (success === true) {
    return 'green.5'
  }
  if (success === false) {
    return 'red.5'
  }
  return 'primary.5'
}
