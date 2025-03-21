import useTranslation from '@/hooks/useTranslation'
import { User } from '@/services/domain'
import { Button, Flex, Image, Stack, Text } from '@mantine/core'

type PictureProps = {
  userId: string
  users: Record<string, User>
  imageSrc: string | null
  onConfirm: () => void
  onRetry: () => void
}

export default function Picture({
  userId,
  users,
  imageSrc = '',
  onConfirm,
  onRetry,
}: PictureProps) {
  const t = useTranslation()

  return (
    <Stack gap={20} align="center">
      <Image src={imageSrc} />

      <Text fw="bold" fz={24}>
        {users[userId]?.name}
      </Text>

      <Flex gap={20}>
        <Button color="#ffab09" onClick={onRetry}>
          {t('Retry')}
        </Button>
        <Button color="#51b68c" onClick={onConfirm}>
          {t('Confirm')}
        </Button>
      </Flex>
    </Stack>
  )
}
