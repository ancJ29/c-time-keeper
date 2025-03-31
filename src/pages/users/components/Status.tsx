import useTranslation from '@/hooks/useTranslation'
import { Badge } from '@mantine/core'

type StatusProps = {
  enabled?: boolean | null
}

export default function Status({ enabled = false }: StatusProps) {
  const t = useTranslation()

  return (
    <Badge
      color={enabled ? 'var(--mantine-color-xGreen-8)' : 'var(--mantine-color-xRed-5)'}
      size="sm"
      variant="outline"
    >
      {enabled ? t('Active') : t('Disable')}
    </Badge>
  )
}
