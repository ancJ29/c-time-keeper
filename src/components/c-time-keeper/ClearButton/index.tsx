import useTranslation from '@/hooks/useTranslation'
import { Button } from '@mantine/core'

type ClearButtonProps = {
  onClick: () => void
  disabled: boolean
}

export default function ClearButton({ onClick, disabled }: ClearButtonProps) {
  const t = useTranslation()

  return (
    <Button onClick={onClick} disabled={disabled} mt={{ base: 10, sm: 0 }}>
      {t('Clear')}
    </Button>
  )
}
