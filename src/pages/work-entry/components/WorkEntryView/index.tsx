import useTranslation from '@/hooks/useTranslation'
import { Button, Stack } from '@mantine/core'

type WorkEntryViewProps = {
  onCheckIn: () => void
  onCheckOut: () => void
}

export default function WorkEntryView({ onCheckIn, onCheckOut }: WorkEntryViewProps) {
  const t = useTranslation()

  return (
    <Stack gap={30} h="100dvh" align="center" justify="center">
      <Button color="#1883ff" h={150} fz={50} w={{ base: '95%', sm: '80%' }} onClick={onCheckIn}>
        {t('Check in')}
      </Button>
      <Button color="#f34141" h={150} fz={50} w={{ base: '95%', sm: '80%' }} onClick={onCheckOut}>
        {t('Check out')}
      </Button>
    </Stack>
  )
}
