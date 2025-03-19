import useTranslation from '@/hooks/useTranslation'
import { Button, ButtonProps, Text } from '@mantine/core'
import { modals } from '@mantine/modals'
import { useCallback } from 'react'

interface SaveButtonProps extends ButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export default function SaveButton({ onClick, ...props }: SaveButtonProps) {
  const t = useTranslation()

  const click = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      modals.openConfirmModal({
        title: t('Save changes'),
        children: <Text size="sm">{t('Are you sure to save changes?')}</Text>,
        labels: { confirm: 'OK', cancel: t('Cancel') },
        onConfirm: () => onClick(e),
      })
    },
    [onClick, t],
  )

  return (
    <Button onClick={click} {...props}>
      {t('Save')}
    </Button>
  )
}
